import Module from "./module";
import Connection from "./connection";

export interface ModuleObj {
  id: number;
  module: Module;
}

export interface ConnectionObj {
  id: number;
  connection: Connection;
}

export interface RenderModulesProps {
  modules: ModuleObj[];
  addModule: (newModule: Module) => void;
  updateModule: (moduleObj: ModuleObj) => void;
  addConnection: (newConnection: Connection) => void;
  hotConnection: ModuleObj | undefined;
  setHotConnection: React.Dispatch<React.SetStateAction<ModuleObj | undefined>>;
}

export interface RenderProps {
  connections: ConnectionObj[];
  modules: ModuleObj[];
}