import { transport } from '@/instrument.tsx';
import { ModuleObj } from '@/models/types';

export function AudioControls(modules: ModuleObj[]) {
  return {
    start: () => {
      transport.start();
      modules.forEach((m) => {
        if (m.module.type === 'instrument') {
          m.module.instrument?.playSequence();
        }
      });
    },
    stop: () => {
      transport.stop();
      modules.forEach((m) => {
        if (m.module.type === 'instrument') {
          m.module.instrument?.stopSequence();
        }
      });
    }
  };
}
