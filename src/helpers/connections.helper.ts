import { createID } from '@/lib/utils';

export const addConnectionUtility = (connections, newConnection) => {
  try {
    return [...connections, { id: createID(connections), connection: newConnection }];
  } catch (error) {
    console.error('Error adding connection:', error);
    return connections;
  }
};

export const removeConnectionUtility = (connections, connectionId) => {
  try {
    return connections.filter((conn) => conn.id !== connectionId);
  } catch (error) {
    console.error('Error removing connection:', error);
    return connections;
  }
};

export const updateConnectionUtility = (connections, updatedConnection) => {
  try {
    return connections.map((conn) =>
      conn.id === updatedConnection.id ? updatedConnection : conn
    );
  } catch (error) {
    console.error('Error updating connection:', error);
    return connections;
  }
};
