import { Composition } from 'remotion';
import HeroComposition from '../app/remotion/HeroComposition';
import ProjectReel from '../app/remotion/ProjectReel';
import AboutComposition from '../app/remotion/AboutComposition';
import { HERO_DURATION, HERO_FPS } from '../app/remotion/heroMotion';

export const RemotionRoot = () => (
  <>
    <Composition
      id="AboutPortrait"
      component={AboutComposition}
      durationInFrames={360}
      fps={30}
      width={600}
      height={640}
      defaultProps={{ theme: 'dark' }}
    />
    <Composition
      id="HeroOrbit"
      component={HeroComposition}
      durationInFrames={HERO_DURATION}
      fps={HERO_FPS}
      width={600}
      height={680}
      defaultProps={{ theme: 'dark' }}
    />
    <Composition
      id="RepVision"
      component={ProjectReel}
      durationInFrames={240}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{
        title: 'RepVision',
        description: 'Real-Time Rep Counting & Form Feedback with Pose Estimation',
        kind: 0,
        technologies: ['Python', 'YOLO', 'OpenCV', 'PyTorch'],
      }}
    />
    <Composition
      id="PlayerPulse"
      component={ProjectReel}
      durationInFrames={240}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{
        title: 'PlayerPulse',
        description: 'Explainable Football Workload & Fatigue-Risk Analytics',
        kind: 1,
        technologies: ['Python', 'FastAPI', 'React', 'TypeScript'],
      }}
    />
    <Composition
      id="PineconeRAG"
      component={ProjectReel}
      durationInFrames={240}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{
        title: 'Pinecone RAG Studio',
        description: 'Semantic Search over Lecture Notes with Vector Embeddings',
        kind: 2,
        technologies: ['Python', 'Pinecone', 'Streamlit', 'RAG'],
      }}
    />
  </>
);
