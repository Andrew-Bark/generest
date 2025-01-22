/** generest
 * generative music playground using public APIs as input
 *
 * Solo project for codeworks
 * Philipp Norton, 2025
 *
 * Guaranteed 100% AI free :)
 */

import './App.css';
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Module from './models/module.ts';
import { ConnectionObj, ModuleObj } from './models/types.ts';
import Connection from './models/connection.ts';
import {AudioControls} from './lib/audioControls.ts';
import Environment from './components/Environment.tsx';
import { createShapes } from './helpers/shapes.helper.ts';
import {
  addModuleUtility,
  updateModuleUtility
} from './helpers/modules.helper.ts';
import {
  addConnectionUtility,
  removeConnectionUtility,
  updateConnectionUtility
} from './helpers/connections.helper.ts';
import RenderConnections from './components/RenderConnections.tsx';
import RenderModules from './components/RenderModules.tsx';

export default function App() {
  const [modules, setModules] = useState<ModuleObj[]>([]);
  const [connections, setConnections] = useState<ConnectionObj[]>([]);
  const [hotConnection, setHotConnection] = useState<ModuleObj | undefined>(
    undefined
  );
  const audio = AudioControls(modules);

  useEffect(() => {
    if (modules.length === 0) createShapes(addModule);
  }, [modules, addModule]);

  // <- State Handlers ->
  function addModule(newModule: Module): void {
    setModules((existingModules) => {
      return addModuleUtility(existingModules, { module: newModule });
    });
  }

  function updateModule(moduleObj: ModuleObj): void {
    setModules((existingModules) => {
      return updateModuleUtility(existingModules, moduleObj);
    });
  }

  function addConnection(newConnection: Connection): void {
    setConnections((existingConnections) => {
      return addConnectionUtility(existingConnections, newConnection);
    });
  }

  function removeConnection(connectionId: number): void {
    setConnections((existingConnections) => {
      return removeConnectionUtility(existingConnections, connectionId);
    });
  }

  function updateConnection(connectionObj: ConnectionObj): void {
    setConnections((existingConnections) => {
      return updateConnectionUtility(existingConnections, connectionObj);
    });
  }
  // <- End of State Handlers ->

  return (
    <>
      <span onContextMenu={(e) => e.nativeEvent.preventDefault()}>
        {/* TODO: Move buttons to own component - small window */}
        <button onClick={audio.start}>start</button>
        <button onClick={audio.stop}>stop</button>
        <Canvas camera={{ position: [0, 0, 20], fov: 40 }}>
          <Environment />
          {modules.length ? (
            <RenderModules
              modules={modules}
              addModule={addModule}
              updateModule={updateModule}
              addConnection={addConnection}
              hotConnection={hotConnection}
              setHotConnection={setHotConnection}
            />
          ) : (
            <p>No modules found.</p>
          )}
          {connections.length ? (
            <RenderConnections connections={connections} modules={modules} />
          ) : null}
        </Canvas>
      </span>
    </>
  );
}