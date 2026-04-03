import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TaskInput } from '../components/TaskInput';

describe('TaskInput', () => {
  it('renders input and button', () => {
    render(<TaskInput onAdd={vi.fn()} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hinzufügen/i })).toBeInTheDocument();
  });

  it('button is disabled when input is empty', () => {
    render(<TaskInput onAdd={vi.fn()} />);
    expect(screen.getByRole('button', { name: /hinzufügen/i })).toBeDisabled();
  });

  it('button is disabled when input contains only whitespace', async () => {
    const user = userEvent.setup();
    render(<TaskInput onAdd={vi.fn()} />);
    await user.type(screen.getByRole('textbox'), '   ');
    expect(screen.getByRole('button', { name: /hinzufügen/i })).toBeDisabled();
  });

  it('button is enabled when input has text', async () => {
    const user = userEvent.setup();
    render(<TaskInput onAdd={vi.fn()} />);
    await user.type(screen.getByRole('textbox'), 'Buy milk');
    expect(screen.getByRole('button', { name: /hinzufügen/i })).toBeEnabled();
  });

  it('clicking Hinzufügen calls onAdd with the input value', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TaskInput onAdd={onAdd} />);
    await user.type(screen.getByRole('textbox'), 'Buy milk');
    await user.click(screen.getByRole('button', { name: /hinzufügen/i }));
    expect(onAdd).toHaveBeenCalledWith('Buy milk');
  });

  it('pressing Enter calls onAdd and clears the input', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TaskInput onAdd={onAdd} />);
    await user.type(screen.getByRole('textbox'), 'Walk the dog{Enter}');
    expect(onAdd).toHaveBeenCalledWith('Walk the dog');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('pressing Enter on empty input does not call onAdd', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TaskInput onAdd={onAdd} />);
    await user.type(screen.getByRole('textbox'), '{Enter}');
    expect(onAdd).not.toHaveBeenCalled();
  });
});
