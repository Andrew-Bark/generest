const createID = (modules) => {
  try {
    if (!modules.length)
      throw new Error('Modules array is empty. Cannot create an ID.');

    const maxId = modules.reduce((currentModule, nextModule) =>
      currentModule.id > nextModule.id ? currentModule : nextModule
    ).id;
    return maxId + 1;
  } catch (e) {
    console.error('Error creating ID:', e);
    return 0;
  }
};

export const addModuleUtility = (modules, newModule) => {
  try {
    const id = createID(modules);
    return [...modules, { ...newModule, id }];
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
