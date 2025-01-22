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
import { Vector3 } from 'three';
import Shape from './components/Shape.tsx';
import Line from './components/Line.tsx';
import { Instrument, transport } from './instrument.tsx';
import { Datasource } from './datasource.tsx';
import Module from './models/module.ts';
import { ConnectionObj, ModuleObj } from './models/types.ts';
import Connection from './models/connection.ts';
import Environment from './components/Environment.tsx';

function App() {
  const [modules, setModules] = useState<ModuleObj[]>([]);
  const [connections, setConnections] = useState<ConnectionObj[]>([]);
  const [hotConnection, setHotConnection] = useState<ModuleObj | undefined>(
    undefined
  );

  // "Menu items" (i.e. one static instance of each module that can be cloned
  //  and activated by dragging it into the interface area)
  function createShapes() {
    const datasource = new Module(
      'datasource',
      new Vector3(-3, 6, 0),
      undefined,
      new Datasource()
    );

    const instrument = new Module(
      'instrument',
      new Vector3(3, 6, 0),
      new Instrument(),
      undefined
    );
    addModule(datasource);
    // addModule(trigger);
    addModule(instrument);
    // todo: do this dynamically when interacting with the datasource controls
    const yesterday = new Date(Date.now());
    yesterday.setDate(yesterday.getDate() - 1);
    datasource.datasource?.getFullDay(yesterday);
  }

  // create the "menu" shapes (ensure that this only runs once)
  // TODO: initialize with useEffect - outside of this function (move to top of file)
  if (modules.length === 0) {
    createShapes();
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
      if (!existingModules.length) return [{ id: 0, module: newModule }];
      const maxId = existingModules.reduce((a, b) => (a.id > b.id ? a : b)).id;

      const updatedModules = [
        ...existingModules,
        { id: maxId + 1, module: newModule }
      ];
      return updatedModules;
    });
  }

  function updateModule(moduleObj: ModuleObj): void {
    setModules((existingModules) => {
      const updatedModules = [...existingModules];
      updatedModules[moduleObj.id].module = moduleObj.module;
      return updatedModules;
    });
  }

  function addConnection(newConnection: Connection): void {
    setConnections((existingConnections) => {
      if (!existingConnections.length)
        return [{ id: 0, connection: newConnection }];
      // find highest existing id
      const maxId = existingConnections.reduce((a, b) =>
        a.id > b.id ? a : b
      ).id;
      return [
        ...existingConnections,
        { id: maxId + 1, connection: newConnection }
      ];
    });
  }

  // TODO: Add remove connection function -> add to connections utility
  function removeConnection(connectionId: number): void {
    setConnections((existingConnections) =>
      existingConnections.filter((conn) => conn.id !== connectionId)
    );
  }

  // TODO: Remove function
  function updateConnection(connectionObj: ConnectionObj): void {
    setConnections((existingConnections) => {
      const updatedConnections = [...existingConnections];
      updatedConnections[connectionObj.id].connection =
        connectionObj.connection;
      return updatedConnections;
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
