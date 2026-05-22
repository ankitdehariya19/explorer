import React, { useState } from "react";
import "./styles.css";
import Folder from "./components/Folder";
import explorer from "./data/explorerData";
import useTraverseTree from "./hooks/useTraverseTree";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode, updateNode } = useTraverseTree();

  // ADD
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  };

  // DELETE
  const handleDeleteNode = (nodeId) => {
    const finalTree = deleteNode(explorerData, nodeId);

    setExplorerData(finalTree);
  };

  // EDIT
  const handleUpdateNode = (nodeId, newName) => {
    const finalTree = updateNode(explorerData, nodeId, newName);

    setExplorerData(finalTree);
  };

  return (
    <div className="App">
      <Folder
        explorerData={explorerData}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleUpdateNode={handleUpdateNode}
      />
    </div>
  );
}
