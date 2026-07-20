import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { createAppRouter } from './router';

describe('application routes', () => {
  it.each([
    ['/', '以选择看见自己'],
    ['/test/quick', '收到多数人不认同的反馈时'],
    ['/reveal', '结果尚未生成'],
    ['/result', '还没有本命人格牌'],
    ['/archetypes', '十六张本命人格牌'],
  ])('resolves %s', async (path, heading) => {
    const router = createAppRouter([path]);
    render(<RouterProvider router={router} />);
    expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument();
  });
});
