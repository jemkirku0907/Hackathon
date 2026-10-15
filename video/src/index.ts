import { registerRoot } from 'remotion';
import { loadFont } from '@remotion/google-fonts/PlusJakartaSans';
import { RemotionRoot } from './Root';

loadFont();
registerRoot(RemotionRoot);
