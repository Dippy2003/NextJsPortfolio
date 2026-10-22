import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Work from '../app/components/Work';
import Skills from '../app/components/Skills';
import Contact from '../app/components/Contact';
import { projects } from '../app/data/portfolio';

const viewport = vi.hoisted(() => ({ visible: true }));

vi.mock('../app/components/Reveal', () => ({
  default: ({ children, className }) => <div className={className}>{children}</div>,
}));
vi.mock('../app/components/Preferences', () => ({
  usePreferences: () => ({ motionEnabled: false, reduced: false }),
}));
vi.mock('motion/react', () => ({ useInView: () => viewport.visible }));
vi.mock('next/dynamic', () => ({ default: () => () => null }));
vi.mock('next/image', () => ({ default: (props) => <span role="img" aria-label={props.alt} /> }));

describe('project discovery', () => {
  it('filters the whole collection, including featured sports projects', async () => {
    const user = userEvent.setup();
    render(<Work />);
    await user.click(screen.getByRole('button', { name: 'Sports Analytics' }));
    const rows = document.querySelector('.archive-list');
    expect(within(rows).getByText('RepVision')).toBeTruthy();
    expect(within(rows).getByText('PlayerPulse')).toBeTruthy();
    expect(within(rows).queryByText('Chest X-Ray Diagnosis')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Mobile', exact: true }));
    expect(within(rows).getAllByRole('link')).toHaveLength(2);
    expect(within(rows).getByText('Health tracker app')).toBeTruthy();
  });

  it('makes every existing project reachable without a dead-end filter', async () => {
    const user = userEvent.setup();
    render(<Work />);
    await user.click(screen.getByRole('button', { name: /Explore all \d+ projects/ }));
    for (const project of projects) {
      const link = [...document.querySelectorAll('a')].find((a) => a.href === project.link);
      expect(link, project.title).toBeTruthy();
      expect(link.target).toBe('_blank');
      expect(link.rel).toContain('noopener');
    }
  });
});

describe('skills keyboard', () => {
  beforeEach(() => {
    viewport.visible = true;
  });

  it('selects a skill and exposes its related project links', async () => {
    const user = userEvent.setup();
    render(<Skills />);
    await user.click(screen.getByRole('button', { name: 'React, shortcut R' }));
    expect(screen.getByRole('heading', { name: 'React', exact: true })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'PlayerPulse' }).href).toContain(
      'football-fatigue-analytics',
    );
  });

  it('accepts shortcuts only in view, without intercepting typing or modifier shortcuts', () => {
    const { rerender } = render(<Skills />);
    fireEvent.keyDown(document.body, { key: 'r' });
    expect(screen.getByRole('heading', { name: 'React', exact: true })).toBeTruthy();
    const input = document.createElement('input');
    document.body.append(input);
    fireEvent.keyDown(input, { key: 'p' });
    fireEvent.keyDown(document.body, { key: 'p', ctrlKey: true });
    expect(screen.getByRole('heading', { name: 'React', exact: true })).toBeTruthy();
    input.remove();
    viewport.visible = false;
    rerender(<Skills />);
    fireEvent.keyDown(document.body, { key: 'p' });
    expect(screen.getByRole('heading', { name: 'React', exact: true })).toBeTruthy();
  });
});

describe('contact delivery states (mocked network)', () => {
  let fetchMock;
  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  async function fillForm() {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Your name'), 'Portfolio visitor');
    await user.type(screen.getByLabelText('Email address'), 'visitor@example.com');
    await user.type(screen.getByLabelText(/on your mind/), 'I would like to discuss a project.');
    return user;
  }

  it('does not send invalid forms', () => {
    render(<Contact />);
    fireEvent.submit(document.querySelector('form'));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('prevents duplicate submissions, reports success, and resets the form', async () => {
    let complete;
    fetchMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          complete = resolve;
        }),
    );
    render(<Contact />);
    const user = await fillForm();
    await user.click(screen.getByRole('button', { name: 'Send your message' }));
    fireEvent.submit(document.querySelector('form'));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, options] = fetchMock.mock.calls[0];
    expect(options.body.get('message')).toContain('discuss a project');
    complete({ ok: true, json: async () => ({ success: true }) });
    expect(await screen.findByText(/Your message has been sent/)).toBeTruthy();
    expect(screen.getByLabelText('Your name').value).toBe('');
  });

  it('keeps a failed message available for retry and offers LinkedIn', async () => {
    fetchMock.mockRejectedValue(new Error('Offline'));
    render(<Contact />);
    const user = await fillForm();
    await user.click(screen.getByRole('button', { name: 'Send your message' }));
    expect(await screen.findByText(/Your message could not be sent/)).toBeTruthy();
    expect(screen.getByLabelText('Your name').value).toBe('Portfolio visitor');
    expect(screen.getByRole('link', { name: 'LinkedIn' }).href).toContain('linkedin.com');
  });
});
