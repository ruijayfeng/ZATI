import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AnswerScale, AxisMeter, Button, IconButton, PersonaCard, Progress } from '.';

describe('design system components', () => {
  it('exposes accessible command names', () => {
    render(<><Button>开始测试</Button><IconButton label="返回">←</IconButton></>);
    expect(screen.getByRole('button', { name: '开始测试' })).toHaveClass('command');
    expect(screen.getByRole('button', { name: '返回' })).toBeInTheDocument();
  });

  it('uses a keyboard-operable six-value radiogroup', async () => {
    const onChange = vi.fn();
    render(<AnswerScale value={3} onChange={onChange} left="推动决定" right="寻找共识" />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(6);
    await userEvent.click(radios[4]);
    expect(onChange).toHaveBeenCalledWith(5);
    radios[2].focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('explains both response poles and every six-point choice', () => {
    render(<AnswerScale value={undefined} onChange={vi.fn()} left="核对原则" right="观察环境" />);
    expect(screen.getByText('请选择更接近你平时第一反应的一侧，而不是更正确的一侧。')).toBeInTheDocument();
    expect(screen.getByText('核对原则')).toBeInTheDocument();
    expect(screen.getByText('观察环境')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '1 · 几乎总是左侧反应' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '6 · 几乎总是右侧反应' })).toBeInTheDocument();
  });

  it('keeps the numeric answer while exposing the selected meaning', async () => {
    const onChange = vi.fn();
    render(<AnswerScale value={5} onChange={onChange} left="核对原则" right="观察环境" />);
    expect(screen.getByRole('status')).toHaveTextContent('多数时候右侧反应');
    await userEvent.click(screen.getByRole('radio', { name: '4 · 略偏右侧反应' }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('announces progress and textual axis values', () => {
    render(<><Progress value={9} max={24} /><AxisMeter label="根定 A" value={68} /></>);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '9');
    expect(screen.getByText('68%')).toBeInTheDocument();
  });

  it('uses identity-first card heading structure', () => {
    render(<PersonaCard code="AVLH" title="帷幄国师" core="谋" domain="破局星域" />);
    expect(screen.getByRole('heading', { name: '帷幄国师' })).toBeInTheDocument();
    expect(screen.getByText('命核 · 谋')).toBeInTheDocument();
  });
});
