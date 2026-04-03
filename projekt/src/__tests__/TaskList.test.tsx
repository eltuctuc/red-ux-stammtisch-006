import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskList } from '../components/TaskList';
import type { Task } from '../types/task';

const tasks: Task[] = [
  { id: '1', title: 'First task', done: false, createdAt: 1 },
  { id: '2', title: 'Second task', done: true, createdAt: 2 },
];

const defaultProps = {
  tasks,
  editingId: null,
  onToggle: vi.fn(),
  onUpdate: vi.fn(),
  onDelete: vi.fn(),
  onStartEdit: vi.fn(),
  onCancelEdit: vi.fn(),
};

describe('TaskList', () => {
  it('renders all tasks', () => {
    render(<TaskList {...defaultProps} />);
    expect(screen.getByText('First task')).toBeInTheDocument();
    expect(screen.getByText('Second task')).toBeInTheDocument();
  });

  it('shows empty state when tasks is empty', () => {
    render(<TaskList {...defaultProps} tasks={[]} />);
    expect(screen.getByText(/noch keine tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/füge deinen ersten task oben hinzu/i)).toBeInTheDocument();
  });

  it('empty state has role="status" for screen readers', () => {
    render(<TaskList {...defaultProps} tasks={[]} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('task list has aria-live="polite"', () => {
    render(<TaskList {...defaultProps} />);
    const list = screen.getByRole('list');
    expect(list).toHaveAttribute('aria-live', 'polite');
  });
});
