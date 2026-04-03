import { useState, useRef } from 'react';
import './TaskInput.css';

interface TaskInputProps {
  onAdd: (title: string) => void;
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isDisabled = !value.trim();

  function handleAdd() {
    if (isDisabled) return;
    onAdd(value);
    setValue('');
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleAdd();
    }
  }

  return (
    <div className="task-input">
      <label htmlFor="new-task-input" className="sr-only">
        Neuen Task eingeben
      </label>
      <input
        ref={inputRef}
        id="new-task-input"
        type="text"
        name="new-task"
        className="task-input__field"
        placeholder="Neuen Task eingeben..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      <button
        className="btn btn--primary task-input__button"
        onClick={handleAdd}
        disabled={isDisabled}
      >
        Hinzufügen
      </button>
    </div>
  );
}
