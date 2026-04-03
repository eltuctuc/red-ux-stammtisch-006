import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Task } from '../types/task';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [editingId, setEditingId] = useState<string | null>(null);

  function addTask(title: string): void {
    const trimmed = title.trim();
    if (!trimmed) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: trimmed,
      done: false,
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
  }

  function toggleTask(id: string): void {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function updateTask(id: string, newTitle: string): void {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    setTasks(tasks.map(t => (t.id === id ? { ...t, title: trimmed } : t)));
    setEditingId(null);
  }

  function deleteTask(id: string): void {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function startEditing(id: string): void {
    setEditingId(id);
  }

  function cancelEditing(): void {
    setEditingId(null);
  }

  return { tasks, editingId, addTask, toggleTask, updateTask, deleteTask, startEditing, cancelEditing };
}
