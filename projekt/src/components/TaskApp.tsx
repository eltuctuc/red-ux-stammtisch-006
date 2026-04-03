import { useTasks } from '../hooks/useTasks';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';
import './TaskApp.css';

export function TaskApp() {
  const { tasks, editingId, addTask, toggleTask, updateTask, deleteTask, startEditing, cancelEditing } = useTasks();

  return (
    <main className="task-app" aria-label="Task-Manager">
      <h1 className="task-app__heading">Meine Tasks</h1>
      <TaskInput onAdd={addTask} />
      <TaskList
        tasks={tasks}
        editingId={editingId}
        onToggle={toggleTask}
        onUpdate={updateTask}
        onDelete={deleteTask}
        onStartEdit={startEditing}
        onCancelEdit={cancelEditing}
      />
    </main>
  );
}
