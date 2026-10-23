'use client';

import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CheckCheck,
  Database,
  FileSearch,
  Layers3,
  ScanLine,
  Video,
  Workflow,
} from 'lucide-react';
import { projects } from '../data/portfolio';
import SectionLabel from './SectionLabel';
import Reveal from './Reveal';

const explorations = [
  {
    id: 'vision',
    title: 'Computer vision',
    eyebrow: 'FROM MOVEMENT TO MEANING',
    description: 'How visual information becomes a useful signal.',
    project: 'RepVision',
    icon: ScanLine,
    steps: [
      {
        title: 'Video frames',
        icon: Video,
        text: 'Start with movement captured in video. Each frame is an opportunity to understand what is happening.',
      },
      {
        title: 'Pose estimation',
        icon: ScanLine,
        text: 'Use pose information to represent the position of the body. RepVision explores this with YOLO, OpenCV, and PyTorch.',
      },
      {
        title: 'Rep counting',
        icon: Layers3,
        text: 'Connect the pose information across movement to explore repetition counting.',
      },
      {
        title: 'Form feedback',
        icon: CheckCheck,
        text: 'Turn movement information into feedback that is easier to understand. Explore the repository for the implementation.',
      },
    ],
  },
  {
    id: 'rag',
    title: 'RAG & agents',
    eyebrow: 'FROM NOTES TO CONTEXT',
    description: 'Connecting a question with information that can help answer it.',
    project: 'Pinecone RAG Studio',
    icon: BrainCircuit,
    steps: [
      {
        title: 'Lecture notes',
        icon: BookOpen,
        text: 'Bring information into the workflow. Pinecone RAG Studio explores semantic search over lecture notes.',
      },
      {
        title: 'Embeddings',
        icon: Layers3,
        text: 'Represent text in a form that supports comparing meaning rather than relying only on exact words.',
      },
      {
        title: 'Vector search',
        icon: FileSearch,
        text: 'Retrieve relevant material from a vector store. Pinecone is part of this project’s toolkit.',
      },
      {
        title: 'Contextual answers',
        icon: BrainCircuit,
        text: 'Use retrieved context in a retrieval-augmented workflow. The project interface is built with Streamlit.',
      },
    ],
  },
  {
    id: 'data',
    title: 'Data engineering',
    eyebrow: 'FROM RAW DATA TO DIRECTION',
    description: 'Explore the connected parts of my warehouse and BI work.',
    project: 'Hotel Data Warehouse ETL',
    icon: Database,
    steps: [
      {
        title: 'Source data',
        icon: Database,
        text: 'Start with the information that needs to support analysis. My hotel analytics projects focus on booking data.',
      },
      {
        title: 'ETL pipeline',
        icon: Workflow,
        text: 'Extract, transform, and load data into an analytical structure. Explore the hotel ETL project for this part of the work.',
      },
      {
        title: 'Warehouse & cube',
        icon: Layers3,
        text: 'Organize data for analysis. My related work includes a SQL Server Analysis Services OLAP cube.',
      },
      {
        title: 'BI dashboard',
        icon: CheckCheck,
        text: 'Give the data a visual interface. Hotel booking and EV adoption dashboards are part of my Power BI work.',
      },
    ],
  },
];

export default function SystemsLab() {
  const [topicIndex, setTopicIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const topic = explorations[topicIndex];
  const step = topic.steps[stepIndex];
  const project = projects.find((item) => item.title === topic.project);
  const TopicIcon = topic.icon;
  return (
    <section className="systems-lab section shell" id="lab">
      <Reveal>
        <SectionLabel number="03">INSIDE THE EXPLORATION</SectionLabel>
        <div className="section-heading">
          <h2>
            Follow the signal.
            <br />
            <span className="muted-heading">See how ideas connect.</span>
          </h2>
          <p>
            A closer look at the systems
            <br />
            behind the projects.
          </p>
        </div>
      </Reveal>
      <div className="lab-topic-tabs" role="group" aria-label="Explore a system">
        {explorations.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              aria-pressed={topicIndex === index}
              onClick={() => {
                setTopicIndex(index);
                setStepIndex(0);
              }}
            >
              <Icon size={18} />
              <span>{item.title}</span>
              <ArrowUpRight size={15} />
            </button>
          );
        })}
      </div>
      <div className="lab-console">
        <div className="lab-console-header">
          <span>
            <span className="status-dot" />
            SYSTEM EXPLORER / {topic.id.toUpperCase()}
          </span>
          <span>ILLUSTRATED PROJECT FLOW</span>
        </div>
        <div className="lab-console-layout">
          <div className="pipeline-board">
            <div className="pipeline-headline">
              <TopicIcon size={22} />
              <div>
                <span className="mini-label">{topic.eyebrow}</span>
                <p>{topic.description}</p>
              </div>
            </div>
            <div className="pipeline-stages">
              <svg viewBox="0 0 600 280" preserveAspectRatio="none" aria-hidden="true">
                <path d="M140 65H460V215H140" fill="none" stroke="var(--line)" strokeWidth="2" />
                <path
                  className="pipeline-signal"
                  d="M140 65H460V215H140"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeDasharray="8 25"
                />
              </svg>
              {topic.steps.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.title}
                    className={`pipeline-stage stage-${index} ${stepIndex === index ? 'selected' : ''}`}
                    aria-pressed={stepIndex === index}
                    onClick={() => setStepIndex(index)}
                  >
                    <span className="stage-number">0{index + 1}</span>
                    <Icon size={28} strokeWidth={1.3} />
                    <span>{item.title}</span>
                    <ArrowRight size={13} />
                  </button>
                );
              })}
            </div>
            <p className="pipeline-hint">Choose a stage to explore the idea.</p>
          </div>
          <div className="pipeline-inspector" aria-live="polite">
            <span className="mini-label">STEP 0{stepIndex + 1} / 04</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <div>
              <span className="mini-label">EXPLORE THE RELATED WORK</span>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                {project.title}
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
