import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Counter from '../lib/Counter.svelte';

const user = userEvent.setup();

beforeEach(() => {
    render(Counter, { count: 0 })
})

test('should render correctly', () => {
    expect(screen.getByText(/count/)).toBeInTheDocument();
    expect(screen.getByText(/click edit/i)).toBeInTheDocument();
})

test('should be able to increment', async () => {
    await user.click(screen.getByText(/increment/i));

    expect(screen.getByText(/count/).innerHTML).toBe('count is 1');
})

test('should be able to decrement', async () => {
    await user.click(screen.getByText(/decrement/i));

    expect(screen.getByText(/count/).innerHTML).toBe('count is -1');
})

test('should be able to reset', async () => {
    await user.click(screen.getByText(/increment/i));
    await user.click(screen.getByText(/increment/i));

    expect(screen.getByText(/count/).innerHTML).toBe('count is 2');

    await user.click(screen.getByText(/reset/i));

    expect(screen.getByText(/count/).innerHTML).toBe('count is 0');
})

test('should be able to edit title', async () => {
    await user.click(screen.getByText('Edit'));
    await user.type(screen.getByPlaceholderText('Title'), 'New Title');
    await user.click(screen.getByText(/reset/i));

    expect(screen.getByText('New Title')).toBeInTheDocument();

    await user.click(screen.getByText('Edit'));
    await user.clear(screen.getByPlaceholderText('Title'));
    await user.type(screen.getByPlaceholderText('Title'), 'Another Title');
    await user.click(screen.getByText(/reset/i));

    expect(screen.getByText('Another Title')).toBeInTheDocument();
})