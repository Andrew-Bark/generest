/** generest
 * generative music playground using public APIs as input
 *
 * Solo project for codeworks
 * Philipp Norton, 2025
 *
 * Guaranteed 100% AI free :)
 */

import "./App.css";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import Shape from "./components/Shape.tsx";
import Line from "./components/Line.tsx";
import { Instrument, transport } from "./instrument.tsx";
import { Datasource } from "./datasource.tsx";
import Module from "./models/module.ts";
import { ConnectionObj, ModuleObj } from "./models/types.ts";
import Connection from "./models/connection.ts";

// to track the state of modules in App.tsx, modules are wrapped in an object with numeric id
// (this can probably be refactored, it is a relatively late addition)
// TODO: Move to a models/types.ts

// A connection is formed between two modules, from a datasource
// (in the future maybe also from a trigger) to an instrument
// TODO: Move to models/Connection.ts

// to track the state of connections in App.tsx, connections are wrapped in an object with numeric id
// TODO: Move to a models/types.ts

function App() {
  // States ###############################################
  const [modules, setModules] = useState<ModuleObj[]>([]);
  const [connections, setConnections] = useState<ConnectionObj[]>([]);
  // when the user clicks on a module to connect it to another, this state will be
  // set to the first module (datasource/instrument) in Shape.tsx, otherwise it is null
  const [hotConnection, setHotConnection] = useState<ModuleObj | undefined>(
    undefined
  );

  // "Menu items" (i.e. one static instance of each module that can be cloned
  //  and activated by dragging it into the interface area)
  function createShapes() {
    // TODO: Refactor addModule -> src
    const datasource = new Module(
      "datasource",
      new Vector3(-3, 6, 0),
      undefined,
      new Datasource()
    );
    // const trigger = new Module(
    //   "trigger",
    //   new Vector3(0, 6, 0),
    //   undefined,
    //   undefined
    // );
    const instrument = new Module(
      "instrument",
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
    console.log("createShapes called");
  }

  // start main time component of Tone.js
  const handleStart = () => {
    transport.start();
    // loop through instruments and stop them
    modules.forEach((m) => {
      if (m.module.type === "instrument") m.module.instrument?.playSequence();
    });
  };
  const handleStop = () => {
    transport.stop();
    // loop through instruments and stop them
    modules.forEach((m) => {
      if (m.module.type === "instrument") m.module.instrument?.stopSequence();
    });
  };

  // TODO: ADD Render connections AND Render modules here <-

  // module & connection creation/update ###################################
  // TODO: createID helper function
  function addModule(newModule: Module): void {
    setModules((existingModules) => {
      // TODO: Extract to helper function
      if (!existingModules.length) return [{ id: 0, module: newModule }];
      // find highest existing id
      const maxId = existingModules.reduce((a, b) => (a.id > b.id ? a : b)).id;
      // return a list of existing modules plus the new one with id = maxId + 1
      const updatedModules = [
        ...existingModules,
        { id: maxId + 1, module: newModule },
      ];
      return updatedModules;
    });
  }

  function updateModule(moduleObj: ModuleObj): void {
    // update the state (list of module objects in App.tsx) with changes made to moduleObj
    setModules((existingModules) => {
      const updatedModules = [...existingModules];
      updatedModules[moduleObj.id].module = moduleObj.module;
      return updatedModules;
    });
    console.log("in App: modules updated");
  }

  // TODO: Move to utils/connection.utils.ts
  function addConnection(newConnection: Connection): void {
    setConnections((existingConnections) => {
      if (!existingConnections.length)
        return [{ id: 0, connection: newConnection }];
      // find highest existing id
      const maxId = existingConnections.reduce((a, b) =>
        a.id > b.id ? a : b
      ).id;
      // return a list of existing connections plus the new one with id = maxId + 1
      return [
        ...existingConnections,
        { id: maxId + 1, connection: newConnection },
      ];
    });
  }

  // TODO: Move to utils/connection.utils.ts
  // TODO: Add remove connection function -> add to connections utility
  function removeConnection(connectionId: number): void {
    setConnections((existingConnections) =>
      existingConnections.filter((conn) => conn.id !== connectionId)
    );
  }

  // TODO: Remove function
  function updateConnection(connectionObj: ConnectionObj): void {
    // update the state (list of connection objects in App.tsx) with changes made to connectionObj
    setConnections((existingConnections) => {
      const updatedConnections = [...existingConnections];
      updatedConnections[connectionObj.id].connection =
        connectionObj.connection;
      return updatedConnections;
    });
  }

  // JSX ###############################################
  // TODO: Extract render logic to seperate functions for renderConnection and renderModules
  return (
    <>
      <span onContextMenu={(e) => e.nativeEvent.preventDefault()}>
        <button onClick={handleStart}>start</button>
        <button onClick={handleStop}>stop</button>
        <Canvas camera={{ position: [0, 0, 20], fov: 40 }}>
          <Environment />
          {modules.length ? (
            modules.map((moduleObj) => {
              return (
                <Shape
                  moduleObj={moduleObj}
                  addModule={addModule}
                  updateModule={updateModule}
                  addConnection={addConnection}
                  hotConnection={hotConnection}
                  setHotConnection={setHotConnection}
                  key={moduleObj.id}
                ></Shape>
              );
            })
          ) : (
            <p>No modules found.</p>
          )}
          {connections.length
            ? connections.map((connectionObj) => {
                return (
                  <Line
                    connectionObj={connectionObj}
                    modules={modules}
                    key={connectionObj.id}
                  ></Line>
                );
              })
            : null}
        </Canvas>
      </span>
    </>
  );
}

// Component for lighting, etc.
// TODO: Move to components/Environment.tsx
function Environment() {
  const dirLightPos = new Vector3(5, 2, 5);

  // JSX
  return (
    <>
      {/* <OrbitControls> */}
      <ambientLight intensity={1.0} />
      {/* directionalLight: sun; casts shadows; infinitely far w/ parallel rays */}
      {/* pointLight: light bulb */}
      <directionalLight color="white" position={dirLightPos} />
      <mesh position={dirLightPos} visible={false} /* DEBUG */>
        <boxGeometry />
      </mesh>
      {/* </OrbitControls> */}
    </>
  );
}

export default App;
