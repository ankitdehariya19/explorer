import React from "react";

const useTraverseTree = () => {
  // INSERT NODE
  const insertNode = (tree, folderId, item, isFolder) => {
    if (tree.id === folderId && tree.isFolder) {
      return {
        ...tree,
        items: [
          {
            id: new Date().getTime(),
            name: item,
            isFolder,
            items: [],
          },
          ...tree.items,
        ],
      };
    }

    return {
      ...tree,
      items: tree.items.map((child) =>
        insertNode(child, folderId, item, isFolder)
      ),
    };
  };

  // DELETE NODE
  const deleteNode = (tree, nodeId) => {
    if (!tree.items) return tree;

    const filteredItems = tree.items
      .filter((child) => child.id !== nodeId)
      .map((child) => deleteNode(child, nodeId));

    return {
      ...tree,
      items: filteredItems,
    };
  };

  // EDIT NODE
  const updateNode = (tree, nodeId, newName) => {
    if (tree.id === nodeId) {
      return {
        ...tree,
        name: newName,
      };
    }

    return {
      ...tree,
      items: tree.items.map((child) => updateNode(child, nodeId, newName)),
    };
  };

  return {
    insertNode,
    deleteNode,
    updateNode,
  };
};

export default useTraverseTree;
