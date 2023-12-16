import React from "react";

function InputArea() {

  return (
    <div className="note">
      <form className="inputNote">
        <input
          type="text"
          name="noteTitle"
          placeholder="Title"
          onChange={handleChange}
        />
        <textarea
          name="noteContent"
          placeholder="Take a note..."
          onChange={handleChange}
        />
        <button type="submit" onClick={handleAdd}>
          Add
        </button>
      </form>
    </div>
  );
}

export default Note;
