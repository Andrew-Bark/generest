/** generest
 * generative music playground using public APIs as input
 *
 * Solo project for codeworks
 * Philipp Norton, 2025
 *
 * Guaranteed 100% AI free :)
 */

import "./App.css";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Module from "./models/module.ts";
import { ConnectionObj, ModuleObj } from "./models/types.ts";
import Connection from "./models/connection.ts";
import { AudioControls } from "./lib/audioControls.ts";
import Environment from "./components/Environment.tsx";
import { createShapes } from "./helpers/shapes.helper.ts";
import {
  addModuleUtility,
  updateModuleUtility,
} from "./helpers/modules.helper.ts";
import {
  addConnectionUtility,
  removeConnectionUtility,
  updateConnectionUtility,
} from "./helpers/connections.helper.ts";
import RenderConnections from "./components/RenderConnections.tsx";
import RenderModules from "./components/RenderModules.tsx";
import { Html } from "@react-three/drei";
import GlobalActionButton from "./components/GlobalActionButton.tsx";

export default function App() {
  const [modules, setModules] = useState<ModuleObj[]>([]);
  const [connections, setConnections] = useState<ConnectionObj[]>([]);
  const [hotConnection, setHotConnection] = useState<ModuleObj | undefined>(
    undefined
  );
  const audio = AudioControls(modules);

  // simple is playing state for the buttons
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (modules.length === 0) createShapes(addModule);
  }, [modules, addModule]);

  // <- State Handlers ->
  function addModule(newModule: Module): void {
    setModules((existingModules: ModuleObj[]) => {
      return addModuleUtility(existingModules, { module: newModule });
    });
  }

  function updateModule(moduleObj: ModuleObj): void {
    setModules((existingModules: ModuleObj[]) => {
      return updateModuleUtility(existingModules, moduleObj);
    });
  }

  function addConnection(newConnection: Connection): void {
    setConnections((existingConnections: ConnectionObj[]) => {
      return addConnectionUtility(existingConnections, newConnection);
    });
  }

  function removeConnection(connectionId: number): void {
    setConnections((existingConnections: ConnectionObj[]) => {
      return removeConnectionUtility(existingConnections, connectionId);
    });
  }

  function updateConnection(connectionObj: ConnectionObj): void {
    setConnections((existingConnections: ConnectionObj[]) => {
      return updateConnectionUtility(existingConnections, connectionObj);
    });
  }
  // <- End of State Handlers ->

  return (
    <>
      <span onContextMenu={(e) => e.nativeEvent.preventDefault()}>
        <h1 className="text-4xl absolute left-1/2 -translate-x-1/2 translate-y-[130px] font-mono ">
          Generest
        </h1>
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
          <Html>
            <div className="flex justify-between h-20 w-[300px] m-0 p-0 translate-y-[30vh] translate-x-[-150px]">
              <GlobalActionButton
                type="play"
                callback={audio.start}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              ></GlobalActionButton>
              <GlobalActionButton
                type="stop"
                callback={audio.stop}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              ></GlobalActionButton>
            </div>
          </Html>
        </Canvas>
      </span>
    </>
  );
}
