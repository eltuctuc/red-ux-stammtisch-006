import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useTasks } from '../hooks/useTasks';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  localStorageMock.clear();
});

describe('useTasks', () => {
  it('addTask with valid title adds task to the list', () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask('Buy milk'); });
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('Buy milk');
  });

  it('addTask with empty title does not add a task', () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask(''); });
    expect(result.current.tasks).toHaveLength(0);
  });

  it('addTask with whitespace-only title does not add a task', () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask('   '); });
    expect(result.current.tasks).toHaveLength(0);
  });

  it('addTask trims title whitespace', () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask('  Walk the dog  '); });
    expect(result.current.tasks[0].title).toBe('Walk the dog');
  });

  it('addTask prepends new task (newest first)', () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask('First'); });
    act(() => { result.current.addTask('Second'); });
    expect(result.current.tasks[0].title).toBe('Second');
    expect(result.current.tasks[1].title).toBe('First');
  });

  it('toggleTask flips done status', () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask('Test task'); });
    const id = result.current.tasks[0].id;
    expect(result.current.tasks[0].done).toBe(false);
    act(() => { result.current.toggleTask(id); });
    expect(result.current.tasks[0].done).toBe(true);
    act(() => { result.current.toggleTask(id); });
    expect(result.current.tasks[0].done).toBe(false);
  });

  it('updateTask with valid title updates the title', () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask('Old title'); });
    const id = result.current.tasks[0].id;
    act(() => { result.current.updateTask(id, 'New title'); });
    expect(result.current.tasks[0].title).toBe('New title');
  });

  it('updateTask with empty title does not change anything', () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask('Keep this'); });
    const id = result.current.tasks[0].id;
    act(() => { result.current.updateTask(id, ''); });
    expect(result.current.tasks[0].title).toBe('Keep this');
  });

  it('deleteTask removes the task from the list', () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask('Task to delete'); });
    const id = result.current.tasks[0].id;
    act(() => { result.current.deleteTask(id); });
    expect(result.current.tasks).toHaveLength(0);
  });

  it('stores tasks in localStorage after addTask', () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask('Persisted task'); });
    const stored = JSON.parse(localStorageMock.getItem('tasks') ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].title).toBe('Persisted task');
  });

  it('startEditing sets editingId', () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask('Task'); });
    const id = result.current.tasks[0].id;
    act(() => { result.current.startEditing(id); });
    expect(result.current.editingId).toBe(id);
  });

  it('cancelEditing clears editingId', () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask('Task'); });
    const id = result.current.tasks[0].id;
    act(() => { result.current.startEditing(id); });
    act(() => { result.current.cancelEditing(); });
    expect(result.current.editingId).toBeNull();
  });
});
