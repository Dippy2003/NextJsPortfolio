import { Config } from '@remotion/cli/config';

// Keep both tools independent of the Next.js development server on port 3000.
Config.setStudioPort(3100);
Config.setRendererPort(3101);
