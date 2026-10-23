import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Work from '../app/components/Work';
import Skills from '../app/components/Skills';
import Contact from '../app/components/Contact';
import { projects, skills, skillCategories } from '../app/data/portfolio';
import SystemsLab from '../app/components/SystemsLab';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

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
  it('starts with six projects and expands or collapses the full collection', async () => {
    const user = userEvent.setup();
    const { container } = render(<Work />);
    expect(container.querySelectorAll('.featured-card, .directory-card')).toHaveLength(6);
    expect(container.querySelector('.design-gallery')).toBeNull();
    expect(screen.getByText('Showing 6 of 22 projects')).toBeTruthy();
    const more = screen.getByRole('button', { name: 'Show more projects' });
    expect(more.getAttribute('aria-expanded')).toBe('false');
    expect(document.getElementById(more.getAttribute('aria-controls'))).toBeTruthy();
    more.focus();
    await user.keyboard('{Enter}');
    expect(container.querySelectorAll('.featured-card, .directory-card')).toHaveLength(22);
    expect(container.querySelector('.design-gallery')).toBeTruthy();
    const fewer = screen.getByRole('button', { name: 'Show fewer projects' });
    expect(fewer.getAttribute('aria-expanded')).toBe('true');
    await user.click(fewer);
    expect(container.querySelectorAll('.featured-card, .directory-card')).toHaveLength(6);
    expect(container.querySelector('.design-gallery')).toBeNull();
  });

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
    expect(screen.queryByRole('button', { name: 'Show more projects' })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'All projects' }));
    await user.click(screen.getByRole('button', { name: 'Show more projects' }));
    await user.click(screen.getByRole('button', { name: 'Sports Analytics' }));
    await user.click(screen.getByRole('button', { name: 'All projects' }));
    expect(within(rows).getAllByRole('link')).toHaveLength(3);
  });

  it('makes every existing project reachable without a dead-end filter', async () => {
    const user = userEvent.setup();
    render(<Work />);
    expect(within(document.querySelector('.archive-list')).getAllByRole('link')).toHaveLength(3);
    await user.click(screen.getByRole('button', { name: 'Show more projects' }));
    expect(within(document.querySelector('.archive-list')).getAllByRole('link')).toHaveLength(19);
    for (const project of projects) {
      const link = [...document.querySelectorAll('a')].find((a) => a.href === project.link);
      expect(link, project.title).toBeTruthy();
      expect(link.target).toBe('_blank');
      expect(link.rel).toContain('noopener');
    }
  });

  it('searches across the entire collection and can clear an empty result', async () => {
    const user = userEvent.setup();
    render(<Work />);
    await user.click(screen.getByRole('button', { name: 'Show more projects' }));
    const search = screen.getByRole('textbox', { name: 'Search projects' });
    await user.type(search, 'python');
    const directory = document.querySelector('.archive-list');
    expect(within(directory).getAllByRole('link')).toHaveLength(6);
    const more = screen.getByRole('button', { name: 'Show more projects' });
    expect(more.getAttribute('aria-expanded')).toBe('false');
    await user.click(more);
    expect(within(directory).getAllByRole('link').length).toBeGreaterThan(6);
    await user.clear(search);
    expect(within(directory).getAllByRole('link')).toHaveLength(3);
    await user.type(search, 'health tracker');
    expect(within(directory).getByText('Health tracker app')).toBeTruthy();
    await user.clear(search);
    await user.type(search, 'pinecone');
    expect(within(directory).getAllByRole('link')).toHaveLength(1);
    expect(within(directory).getByText('Pinecone RAG Studio')).toBeTruthy();
    await user.clear(search);
    await user.type(search, 'no-such-project');
    expect(within(directory).queryAllByRole('link')).toHaveLength(0);
    await user.click(screen.getByRole('button', { name: 'Clear project search' }));
    expect(within(directory).getAllByRole('link')).toHaveLength(3);
  });
});

describe('skills keyboard', () => {
  beforeEach(() => {
    viewport.visible = true;
  });

  it('keeps every original technology in one explorer without a duplicate catalog', () => {
    render(<Skills />);
    const explorer = screen.getByRole('group', { name: 'Explore skills' });
    expect(within(explorer).getAllByRole('button')).toHaveLength(48);
    expect(document.querySelector('.skill-category-grid')).toBeNull();
    expect(screen.queryByText('Every layer. Every possibility.')).toBeNull();
    const original = [
      'JavaScript',
      'TypeScript',
      'Java',
      'PHP',
      'Kotlin',
      'Python',
      'C++',
      'C',
      'SQL',
      'HTML',
      'CSS',
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
      'OpenCV',
      'Pandas',
      'NumPy',
      'Jupyter',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'Django',
      'Android',
      'MongoDB',
      'Firebase',
      'MySQL',
      'SQL Server',
      'SSAS',
      'Power BI',
      'ETL',
      'Git',
      'GitHub',
      'VSCode',
      'Figma',
      'AWS',
      'OpenAI',
      'LangChain',
      'CrewAI',
      'RAG',
      'n8n',
      'Groq',
    ];
    for (const name of original)
      expect(within(explorer).getByText(name, { selector: 'span' }), name).toBeTruthy();
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

describe('expanded portfolio integrity', () => {
  it('provides an asset for every key, unique shortcuts, and complete category references', () => {
    expect(skills).toHaveLength(48);
    const keys = skills.map((skill) => skill.key).filter(Boolean);
    expect(new Set(keys).size).toBe(keys.length);
    for (const skill of skills) {
      expect(
        existsSync(resolve(process.cwd(), 'public', 'tech', `${skill.id}.svg`)),
        skill.name,
      ).toBe(true);
      expect(
        existsSync(resolve(process.cwd(), 'public', 'tech', `${skill.id}.png`)),
        `${skill.name} WebGL texture`,
      ).toBe(true);
    }
    const visibleIds = new Set(skillCategories.flatMap((category) => category.ids));
    expect(skills.every((skill) => visibleIds.has(skill.id))).toBe(true);
  });

  it('switches system topics and explains the selected workflow stage', async () => {
    const user = userEvent.setup();
    render(<SystemsLab />);
    await user.click(screen.getByRole('button', { name: 'RAG & agents' }));
    await user.click(screen.getByRole('button', { name: /Vector search/ }));
    expect(screen.getByRole('heading', { name: 'Vector search' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Pinecone RAG Studio' }).href).toContain(
      'pinecone-rag-studio',
    );
    await user.click(screen.getByRole('button', { name: 'Data engineering' }));
    expect(screen.getByRole('heading', { name: 'Source data' })).toBeTruthy();
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
