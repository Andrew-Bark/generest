import { createID } from "@/lib/utils";

export const addModuleUtility = (modules, newModule) => {
  try {
    return [...modules, { ...newModule, id: createID(modules) }];
  } catch (e) {
    console.error('Error adding modules:', e);
    return modules;
  }
};

export const updateModuleUtility = (modules, updatedModule) => {
  try {
    return modules.map((module) =>
      module.id === updatedModule.id ? updatedModule : module
    );
  } catch (e) {
    console.error('Error updating modules:', e);
    return modules;
  }
};
