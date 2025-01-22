import Line from './Line';
import { RenderProps } from '@/models/types';

export default function RenderConnections({ connections, modules }: RenderProps) {
  return (
    <>
      {connections.map((connectionObj) => (
        <Line
          key={connectionObj.id}
          connectionObj={connectionObj}
          modules={modules}
        />
      ))}
    </>
  );
}


