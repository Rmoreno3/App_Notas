import React from "react";

const Note = ({ note }) => {
  return (
    <li>
      <h3>{note.content}</h3>
    </li>
  );
};

export default Note;
