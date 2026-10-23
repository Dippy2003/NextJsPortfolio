import { getWorkData } from '@/assets/assets';

export const profile = {
  name: 'Dipna Wijesinghe',
  github: 'https://github.com/Dippy2003',
  linkedin: 'https://www.linkedin.com/in/dipna-wijesinghe-50401a396/',
  instagram: 'https://www.instagram.com/dippy_w/',
  resume: '/DIPNA%20WIJESINGHE-DM.pdf',
};

export const projects = getWorkData();
export const featuredProjects = [projects[0], projects[1], projects[5]];
export const skillGroups = ['All keys', 'AI & Data', 'Web & Apps', 'Tools'];

export const skills = [
  {
    id: 'python',
    name: 'Python',
    short: 'Py',
    key: 'p',
    color: '#e7ab45',
    group: 'AI & Data',
    description:
      'The starting point for my machine learning experiments, computer vision systems, and data pipelines.',
    projects: ['RepVision', 'PlayerPulse', 'Pinecone RAG Studio'],
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    short: 'Pt',
    key: 't',
    color: '#ed7050',
    group: 'AI & Data',
    description:
      'Deep learning experiments, pose estimation, and research into data-efficient vision transformers.',
    projects: ['RepVision', 'Data-Efficient ViT'],
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    short: 'Tf',
    key: 'f',
    color: '#ef9c42',
    group: 'AI & Data',
    description:
      'Exploring neural networks and classification as part of my AI and machine learning toolkit.',
    projects: ['Chest X-Ray Diagnosis', 'Kidney Disease Classification'],
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    short: 'Cv',
    key: 'o',
    color: '#8abd70',
    group: 'AI & Data',
    description:
      'Working with video frames and visual information to turn movement into useful feedback.',
    projects: ['RepVision'],
  },
  {
    id: 'pandas',
    name: 'Pandas',
    short: 'Pd',
    key: 'd',
    color: '#a393da',
    group: 'AI & Data',
    description:
      'Cleaning, exploring, and transforming data before it becomes an insight, a model, or a dashboard.',
    projects: ['PlayerPulse', 'EV Adoption Analytics'],
  },
  {
    id: 'react',
    name: 'React',
    short: 'Re',
    key: 'r',
    color: '#65bfcf',
    group: 'Web & Apps',
    description:
      'Building responsive interfaces that make complex information feel approachable and useful.',
    projects: ['PlayerPulse', 'Mern project'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    short: 'N',
    key: 'n',
    color: '#dddcd5',
    group: 'Web & Apps',
    description:
      'My framework for this portfolio: React interfaces, optimized assets, and server-rendered content.',
    projects: [],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    short: 'Ts',
    key: 'y',
    color: '#5f97cc',
    group: 'Web & Apps',
    description: 'Bringing clear contracts and safer application logic to my full-stack projects.',
    projects: ['PlayerPulse'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    short: 'Js',
    key: 'j',
    color: '#e8c85d',
    group: 'Web & Apps',
    description: 'Connecting interfaces, application behavior, and the web experiences I build.',
    projects: ['Smart Campus', 'Gold Price Tracker', 'Mern project'],
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    short: 'Tw',
    key: 'c',
    color: '#61bfc5',
    group: 'Web & Apps',
    description:
      'Creating responsive layouts and consistent visual systems, including this portfolio.',
    projects: [],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    short: 'No',
    key: 'b',
    color: '#83b575',
    group: 'Web & Apps',
    description: 'The server-side JavaScript foundation behind my MERN development work.',
    projects: ['Mern project'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    short: 'Mg',
    key: 'm',
    color: '#72ad80',
    group: 'Web & Apps',
    description: 'Working with document data and connecting it to full-stack applications.',
    projects: ['Mern project'],
  },
  {
    id: 'sql',
    name: 'SQL Server',
    short: 'SQL',
    key: 's',
    color: '#d77370',
    group: 'AI & Data',
    description:
      'Structuring analytics data through ETL pipelines, dimensional models, and OLAP cubes.',
    projects: ['Hotel Data Warehouse ETL', 'Hotel DW SSAS Cube'],
  },
  {
    id: 'powerbi',
    name: 'Power BI',
    short: 'BI',
    key: 'i',
    color: '#dfbc50',
    group: 'AI & Data',
    description:
      'Making hotel booking and electric vehicle data easier to explore through visual analytics.',
    projects: ['Hotel Booking Dashboard', 'EV Adoption Analytics'],
  },
  {
    id: 'git',
    name: 'Git',
    short: 'Git',
    key: 'g',
    color: '#e17a57',
    group: 'Tools',
    description:
      'Keeping experiments, application changes, and collaboration organized through version control.',
    projects: [],
  },
  {
    id: 'figma',
    name: 'Figma',
    short: 'Fi',
    key: 'u',
    color: '#b298ce',
    group: 'Tools',
    description:
      'Exploring interface ideas and building prototypes before bringing them to the web.',
    projects: ['Jewelry shop website', 'UI/UX designing'],
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    short: 'Kt',
    key: 'k',
    color: '#b78cce',
    group: 'Web & Apps',
    description: 'Developing Android applications, from health tracking to mobile experiences.',
    projects: ['Health tracker app', 'Mobile app'],
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    short: 'Fa',
    key: 'a',
    color: '#65b5a5',
    group: 'Web & Apps',
    description:
      'Exposing Python application logic through APIs that connect analytics with the frontend.',
    projects: ['PlayerPulse'],
  },
  {
    id: 'rag',
    name: 'RAG',
    short: 'RAG',
    key: 'e',
    color: '#8cb7cf',
    group: 'AI & Data',
    description:
      'Connecting language models with retrieved context, including semantic search over lecture notes.',
    projects: ['Pinecone RAG Studio', 'RAG-N'],
  },
  {
    id: 'automation',
    name: 'AI automation',
    short: 'AI',
    key: 'w',
    color: '#dc8792',
    group: 'Tools',
    description:
      'Exploring agent workflows, multi-agent content generation, and automated support ticket routing.',
    projects: ['Content Crew', 'Email Triage Bot'],
  },
];

export const allSkillCategories = [
  ['Languages', 'Python, JavaScript, TypeScript, SQL, Java, PHP, Kotlin, C++, C, HTML, CSS'],
  ['Machine learning', 'PyTorch, TensorFlow, Scikit-learn, OpenCV, Pandas, NumPy, Jupyter'],
  ['Web & mobile', 'React, Next.js, Tailwind CSS, Node.js, Express.js, Django, FastAPI, Android'],
  ['Data & databases', 'SQL Server, SSAS, Power BI, ETL, MongoDB, Firebase, MySQL, SQLite'],
  [
    'Agents & tooling',
    'OpenAI, LangChain, CrewAI, RAG, n8n, Groq, Git, GitHub, VS Code, Figma, AWS',
  ],
];
