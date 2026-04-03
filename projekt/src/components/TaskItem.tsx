import { useState, useRef, useEffect } from 'react';
import type { Task } from '../types/task';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
}

function IconPencil() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M9.5 2.5L11.5 4.5L5 11H3V9L9.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 3.5H12M5 3.5V2.5C5 2 5.5 1.5 6 1.5H8C8.5 1.5 9 2 9 2.5V3.5M5.5 6V10.5M8.5 6V10.5M3.5 3.5L4 11C4 11.5 4.5 12 5 12H9C9.5 12 10 11.5 10 11L10.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TaskItem({
  task,
  onToggle,
  onUpdate,
  onDelete,
  isEditing,
  onStartEdit,
  onCancelEdit,
}: TaskItemProps) {
  const [editValue, setEditValue] = useState(task.title);
  const editInputRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const wasEditingRef = useRef(false);

  // Focus management: input when entering edit mode, edit button when leaving
  useEffect(() => {
    if (isEditing) {
      wasEditingRef.current = true;
      setEditValue(task.title);
      editInputRef.current?.focus();
    } else if (wasEditingRef.current) {
      wasEditingRef.current = false;
      editButtonRef.current?.focus();
    }
  }, [isEditing, task.title]);

  function handleSave() {
    if (editValue.trim()) {
      onUpdate(task.id, editValue);
    } else {
      onCancelEdit();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') onCancelEdit();
  }

  if (isEditing) {
    return (
      <li className="task-item task-item--editing">
        <label className="task-item__checkbox-wrap task-item__checkbox-wrap--disabled">
          <input
            type="checkbox"
            className="task-item__checkbox"
            checked={task.done}
            disabled
            aria-label={`Task erledigt markieren: ${task.title}`}
            readOnly
          />
        </label>
        <label htmlFor={`edit-input-${task.id}`} className="sr-only">
          Task bearbeiten
        </label>
        <input
          ref={editInputRef}
          id={`edit-input-${task.id}`}
          type="text"
          name="edit-task"
          className="task-item__edit-input"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        <button
          className="btn btn--ghost btn--sm btn--icon"
          onClick={handleSave}
          aria-label="Änderungen speichern"
        >
          <IconCheck />
        </button>
        <button
          className="btn btn--ghost btn--sm btn--icon"
          onClick={onCancelEdit}
          aria-label="Bearbeitung abbrechen"
        >
          <IconX />
        </button>
      </li>
    );
  }

  return (
    <li className={`task-item${task.done ? ' task-item--done' : ''}`}>
      <label className="task-item__checkbox-wrap">
        <input
          type="checkbox"
          className="task-item__checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          aria-label={`Task erledigt markieren: ${task.title}`}
        />
      </label>
      <span className="task-item__title">{task.title}</span>
      <button
        ref={editButtonRef}
        className="btn btn--ghost btn--sm btn--icon"
        onClick={() => onStartEdit(task.id)}
        aria-label={`${task.title} bearbeiten`}
      >
        <IconPencil />
      </button>
      <button
        className="btn btn--danger btn--sm btn--icon"
        onClick={() => onDelete(task.id)}
        aria-label={`${task.title} löschen`}
      >
        <IconTrash />
      </button>
    </li>
  );
}
