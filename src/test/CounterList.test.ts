import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CounterList from '../lib/CounterList.svelte';

const user = userEvent.setup();

beforeEach(() => {
  render(CounterList);
});

test('should render correctly', () => {
  expect(screen.getByText(/count is/i)).toBeInTheDocument();
  expect(screen.getByText(/add counter/i)).toBeInTheDocument();
});

describe('should handle adding and removing counter', () => {
  test('should be able to add counter', async () => {
    await user.click(screen.getByText(/add counter/i));

    expect(screen.getAllByText(/count is/i).length).toBe(2);
  });

  test('should be able to remove counter', async () => {
    await user.click(screen.getByText(/add counter/i));
    expect(screen.getAllByText(/count is/i).length).toBe(2);

    await user.click(screen.getAllByText(/remove/i)[0]);
    expect(screen.getAllByText(/count is/i).length).toBe(1);
  });
});

describe('should handle sum', () => {
  test('sum should increase & decrease when 1 count changes', async () => {
    await user.click(screen.getAllByText(/increment/i)[0]);
    expect(screen.getByText('The sum is 1')).toBeInTheDocument();

    await user.click(screen.getAllByText(/decrement/i)[0]);
    expect(screen.getByText('The sum is 0')).toBeInTheDocument();

    await user.click(screen.getAllByText(/increment/i)[0]);
    await user.click(screen.getAllByText(/reset/i)[0]);
    expect(screen.getByText('The sum is 0')).toBeInTheDocument();
  });

  test('sum should increase & decrease when multiple counts changes', async () => {
    await user.click(screen.getByText(/add counter/i));

    await user.click(screen.getAllByText(/increment/i)[0]);
    await user.click(screen.getAllByText(/decrement/i)[1]);
    expect(screen.getByText('The sum is 1')).toBeInTheDocument();

    await user.click(screen.getAllByText(/increment/i)[1]);
    await user.click(screen.getAllByText(/increment/i)[1]);
    await user.click(screen.getAllByText(/decrement/i)[0]);
    expect(screen.getByText('The sum is 2')).toBeInTheDocument();

    await user.click(screen.getAllByText(/reset/i)[1]);
    await user.click(screen.getAllByText(/decrement/i)[0]);

    expect(screen.getByText('The sum is 0')).toBeInTheDocument();
  });

  test('sum should increase & decrease when adding & removing counters', async () => {
    await user.click(screen.getByText(/add counter/i));
    await user.click(screen.getAllByText(/increment/i)[0]);
    expect(screen.getByText('The sum is 1')).toBeInTheDocument();

    await user.click(screen.getAllByText(/decrement/i)[1]);
    expect(screen.getByText('The sum is 1')).toBeInTheDocument();

    await user.click(screen.getAllByText(/remove/i)[0]);
    expect(screen.getByText('The sum is 0')).toBeInTheDocument();
  });
});

describe('should handle titles correctly', () => {
  test('should change when 1 title changes', async () => {
    await user.click(screen.getByText('Edit'));
    await user.type(screen.getByPlaceholderText('Title'), 'New Title');
    await user.click(screen.getByText(/reset/i));

    expect(screen.getAllByText(/New Title/).length).toBe(2);

    await user.click(screen.getByText('Edit'));
    await user.clear(screen.getByPlaceholderText('Title'));
    await user.click(screen.getByText(/reset/i));
    expect(screen.queryByText(/New Title/)).not.toBeInTheDocument();
  });

  test('should update when multiple titles changes', async () => {
    await user.click(screen.getByText(/add counter/i));

    await user.click(screen.getAllByText('Edit')[0]);
    await user.type(screen.getByPlaceholderText('Title'), 'New Title');
    await user.click(screen.getAllByText(/reset/i)[0]);

    await user.click(screen.getAllByText('Edit')[1]);
    await user.type(screen.getByPlaceholderText('Title'), 'Another Title');
    await user.click(screen.getAllByText(/reset/i)[1]);

    expect(screen.getAllByText(/New Title/).length).toBe(2);
    expect(screen.getAllByText(/Another Title/).length).toBe(2);
    expect(screen.getByText(/New Title,Another Title/)).toBeInTheDocument();
  });

  test('should update when adding/removing counters', async () => {
    await user.click(screen.getByText(/add counter/i));
    await user.click(screen.getByText(/add counter/i));

    await user.click(screen.getAllByText('Edit')[0]);
    await user.type(screen.getByPlaceholderText('Title'), 'Title 1');
    await user.click(screen.getAllByText(/reset/i)[0]);

    await user.click(screen.getAllByText('Edit')[2]);
    await user.type(screen.getByPlaceholderText('Title'), 'Title 3');
    await user.click(screen.getAllByText(/reset/i)[2]);

    expect(screen.getByText(/Title 1,"",Title 3/)).toBeInTheDocument();

    await user.click(screen.getByText(/add counter/i));
    expect(screen.getByText(/Title 1,"",Title 3,""/)).toBeInTheDocument();

    await user.click(screen.getAllByText(/remove/i)[2]);
    expect(screen.getByText(/Title 1,"",""/)).toBeInTheDocument();

    await user.click(screen.getAllByText(/remove/i)[0]);
    expect(screen.getByText(/,/)).toBeInTheDocument();
  });
});
