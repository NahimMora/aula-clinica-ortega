// Punto de entrada de Remotion (solo producción). Render:
//   npx remotion render video/src/index.ts dig-01 video/out/dig-01.mp4
import { registerRoot } from 'remotion';
import { Root } from './Root';

registerRoot(Root);
