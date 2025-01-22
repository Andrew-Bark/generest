/** generest
 * generative music playground using public APIs as input
 *
 * Solo project for codeworks
 * Philipp Norton, 2025
 *
 * Guaranteed 100% AI free :)
 */

import './App.css';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Shape from './components/Shape.tsx';
import Line from './components/Line.tsx';
import Module from './models/module.ts';
import { ConnectionObj, ModuleObj } from './models/types.ts';
import Connection from './models/connection.ts';
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

function App() {
  const [modules, setModules] = useState<ModuleObj[]>([]);
  const [connections, setConnections] = useState<ConnectionObj[]>([]);
  const [hotConnection, setHotConnection] = useState<ModuleObj | undefined>(
    undefined
  );

  // create the "menu" shapes (ensure that this only runs once)
  // TODO: initialize with useEffect - outside of this function (move to top of file)
  if (modules.length === 0) {
    createShapes(addModule);
    console.log('createShapes called');
  }

  // Starts playing
  const handleStart = () => {
    transport.start();
    modules.forEach((m) => {
      if (m.module.type === 'instrument') m.module.instrument?.playSequence();
    });
  };

  // Stops playing
  const handleStop = () => {
    transport.stop();
    modules.forEach((m) => {
      if (m.module.type === 'instrument') m.module.instrument?.stopSequence();
    });
  };

  function addModule(newModule: Module): void {
    setModules((existingModules) => {
      return addModuleUtility(existingModules, { module: newModule });
    });
  }

  function updateModule(moduleObj) {
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

  function renderModules() {
    return (
      <>
        {modules.map((moduleObj) => (
          <Shape
            moduleObj={moduleObj}
            addModule={addModule}
            updateModule={updateModule}
            addConnection={addConnection}
            hotConnection={hotConnection}
            setHotConnection={setHotConnection}
            key={moduleObj.id}
          ></Shape>
        ))}
      </>
    );
  }

  function renderConnections() {
    return (
      <>
        {connections.map((connectionObj) => (
          <Line
            connectionObj={connectionObj}
            modules={modules}
            key={connectionObj.id}
          ></Line>
        ))}
      </>
    );
  }

  return (
    <>
      <span onContextMenu={(e) => e.nativeEvent.preventDefault()}>
        <button onClick={handleStart}>start</button>
        <button onClick={handleStop}>stop</button>
        <Canvas camera={{ position: [0, 0, 20], fov: 40 }}>
          <Environment />
          {modules.length ? renderModules() : <p>No modules found.</p>}
          {connections.length ? renderConnections() : null}
        </Canvas>
      </span>
    </>
  );
}

export default App;
