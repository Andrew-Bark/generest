import { createID } from "@/lib/utils";
import { ModuleObj } from "@/models/types";

export const addModuleUtility = (modules: ModuleObj[], newModule: ModuleObj) => {
  try {
    return [...modules, { ...newModule, id: createID(modules) }];
  } catch (e) {
    console.error('Error adding modules:', e);
    return modules;
  }
};

export const updateModuleUtility = (modules: ModuleObj[], updatedModule: ModuleObj) => {
  try {
    return modules.map((module) =>
      module.id === updatedModule.id ? updatedModule : module
    );
  } catch (e) {
    console.error('Error updating modules:', e);
    return modules;
  }
};
