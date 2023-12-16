import React from "react";

function Note(props) {
  return (
    <div className="note">
      <h1 className="note">{props.title}</h1>
      <p className="note">{props.content}</p>
      <button type="submit" onClick={() => props.handleDelete(props.noteKey)}>
        Delete
      </button>
    </div>
  );
}

export default Note;
