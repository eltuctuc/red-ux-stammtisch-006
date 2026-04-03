import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TaskItem } from '../components/TaskItem';
import type { Task } from '../types/task';

const baseTask: Task = {
  id: 'task-1',
  title: 'Buy milk',
  done: false,
  createdAt: Date.now(),
};

function renderTaskItem(overrides?: Partial<Parameters<typeof TaskItem>[0]>) {
  const props = {
    task: baseTask,
    onToggle: vi.fn(),
    onUpdate: vi.fn(),
    onDelete: vi.fn(),
    isEditing: false,
    onStartEdit: vi.fn(),
    onCancelEdit: vi.fn(),
    ...overrides,
  };
  return { ...render(<ul><TaskItem {...props} /></ul>), props };
}

describe('TaskItem – normal mode', () => {
  it('renders task title', () => {
    renderTaskItem();
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });

  it('checkbox click calls onToggle with task id', async () => {
    const user = userEvent.setup();
    const { props } = renderTaskItem();
    await user.click(screen.getByRole('checkbox'));
    expect(props.onToggle).toHaveBeenCalledWith('task-1');
  });

  it('edit button click calls onStartEdit with task id', async () => {
    const user = userEvent.setup();
    const { props } = renderTaskItem();
    await user.click(screen.getByRole('button', { name: /buy milk bearbeiten/i }));
    expect(props.onStartEdit).toHaveBeenCalledWith('task-1');
  });

  it('delete button click calls onDelete with task id', async () => {
    const user = userEvent.setup();
    const { props } = renderTaskItem();
    await user.click(screen.getByRole('button', { name: /buy milk löschen/i }));
    expect(props.onDelete).toHaveBeenCalledWith('task-1');
  });

  it('done task title has line-through style class', () => {
    renderTaskItem({ task: { ...baseTask, done: true } });
    const li = screen.getByRole('listitem');
    expect(li).toHaveClass('task-item--done');
  });
});

describe('TaskItem – edit mode', () => {
  it('shows edit input pre-filled with current title', () => {
    renderTaskItem({ isEditing: true });
    expect(screen.getByRole('textbox')).toHaveValue('Buy milk');
  });

  it('pressing Enter calls onUpdate', async () => {
    const user = userEvent.setup();
    const { props } = renderTaskItem({ isEditing: true });
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'Updated title{Enter}');
    expect(props.onUpdate).toHaveBeenCalledWith('task-1', 'Updated title');
  });

  it('pressing Escape calls onCancelEdit', async () => {
    const user = userEvent.setup();
    const { props } = renderTaskItem({ isEditing: true });
    await user.type(screen.getByRole('textbox'), '{Escape}');
    expect(props.onCancelEdit).toHaveBeenCalled();
  });

  it('save button calls onUpdate', async () => {
    const user = userEvent.setup();
    const { props } = renderTaskItem({ isEditing: true });
    await user.click(screen.getByRole('button', { name: /änderungen speichern/i }));
    expect(props.onUpdate).toHaveBeenCalledWith('task-1', 'Buy milk');
  });

  it('cancel button calls onCancelEdit', async () => {
    const user = userEvent.setup();
    const { props } = renderTaskItem({ isEditing: true });
    await user.click(screen.getByRole('button', { name: /bearbeitung abbrechen/i }));
    expect(props.onCancelEdit).toHaveBeenCalled();
  });
});
