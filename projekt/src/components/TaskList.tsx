import { TaskItem } from './TaskItem';
import type { Task } from '../types/task';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  editingId: string | null;
  onToggle: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
}

export function TaskList({
  tasks,
  editingId,
  onToggle,
  onUpdate,
  onDelete,
  onStartEdit,
  onCancelEdit,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="task-empty" role="status">
        <div className="task-empty__icon" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="10" width="32" height="34" rx="3" stroke="#9CA3AF" strokeWidth="2" />
            <path d="M16 10V8C16 6.9 16.9 6 18 6H30C31.1 6 32 6.9 32 8V10" stroke="#9CA3AF" strokeWidth="2" />
            <path d="M17 22H31M17 29H27" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="task-empty__title">Noch keine Tasks</h2>
        <p className="task-empty__desc">Füge deinen ersten Task oben hinzu.</p>
      </div>
    );
  }

  return (
    <ul
      className="task-list"
      aria-label="Task-Liste"
      aria-live="polite"
      aria-relevant="additions removals"
    >
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onStartEdit={onStartEdit}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </ul>
  );
}
