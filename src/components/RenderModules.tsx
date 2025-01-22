import Shape from './Shape';
import { RenderModulesProps } from '@/models/types';

function RenderModules({
  modules,
  addModule,
  updateModule,
  addConnection,
  hotConnection,
  setHotConnection
}: RenderModulesProps) {
  return (
    <>
      {modules.map((moduleObj) => (
        <Shape
          key={moduleObj.id}
          moduleObj={moduleObj}
          addModule={addModule}
          updateModule={updateModule}
          addConnection={addConnection}
          hotConnection={hotConnection}
          setHotConnection={setHotConnection}
        />
      ))}
    </>
  );
}

export default RenderModules;
