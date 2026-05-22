import React, { useState } from "react";

export default function Folder({
  explorerData,
  handleInsertNode,
  handleDeleteNode,
  handleUpdateNode,
}) {
  const [expand, setExpand] = useState(false);

  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  // ADD NEW
  const handleNew = (e, isFolder) => {
    e.stopPropagation();

    setExpand(true);

    setShowInput({
      visible: true,
      isFolder,
    });
  };

  // CREATE
  const handleCreate = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);

      setShowInput({
        ...showInput,
        visible: false,
      });
    }
  };

  // EDIT
  const handleEdit = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleUpdateNode(explorerData.id, e.target.value);

      setIsEditing(false);
    }
  };

  if (explorerData.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpand(!expand)}>
          {isEditing ? (
            <input
              autoFocus
              defaultValue={explorerData.name}
              onKeyDown={handleEdit}
              onBlur={() => setIsEditing(false)}
            />
          ) : (
            <span>📂 {explorerData.name}</span>
          )}

          <div>
            <button onClick={(e) => handleNew(e, true)}>+ Folder</button>

            <button onClick={(e) => handleNew(e, false)}>+ File</button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNode(explorerData.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>

        <div
          style={{
            display: expand ? "block" : "none",
            paddingLeft: "20px",
          }}
        >
          {showInput.visible && (
            <div>
              <span>{showInput.isFolder ? "📂" : "📄"}</span>

              <input
                type="text"
                autoFocus
                onKeyDown={handleCreate}
                onBlur={() =>
                  setShowInput({
                    ...showInput,
                    visible: false,
                  })
                }
              />
            </div>
          )}

          {explorerData.items.map((exp) => (
            <Folder
              key={exp.id}
              explorerData={exp}
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              handleUpdateNode={handleUpdateNode}
            />
          ))}
        </div>
      </div>
    );
  }

  // FILE UI
  return (
    <div className="file">
      {isEditing ? (
        <input
          autoFocus
          defaultValue={explorerData.name}
          onKeyDown={handleEdit}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <span>📄 {explorerData.name}</span>
      )}

      <button onClick={() => setIsEditing(true)}>Edit</button>

      <button onClick={() => handleDeleteNode(explorerData.id)}>Delete</button>
    </div>
  );
}
