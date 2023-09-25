import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import CounterList from '../lib/CounterList.svelte';

const user = userEvent.setup();

beforeEach(() => {
    render(CounterList)
})

test('should render correctly', () => {
    expect(screen.getByText(/count/)).toBeInTheDocument();
    expect(screen.getByText(/add counter/i)).toBeInTheDocument();    
})

test('should be able to add counter', async () => {
    await user.click(screen.getByText(/add counter/i));

    expect(screen.getAllByText(/count is/).length).toBe(2);
})

test('should be able to remove counter', async () => {
    await user.click(screen.getByText(/add counter/i));

    expect(screen.getAllByText(/count is/).length).toBe(2);

    await user.click(screen.getAllByText(/remove/i)[0]);

    expect(screen.getAllByText(/count is/).length).toBe(1);
})