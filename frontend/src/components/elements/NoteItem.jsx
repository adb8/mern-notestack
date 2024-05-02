import React from "react";

const NoteItem = ({ title, author, date, content }) => {
  return (
    <div className="note-item">
      <div className="note-title">{title}</div>
      <div className="note-author-date">
        {author} - {date}
      </div>
      <div className="note-content">{content}</div>
    </div>
  );
};

export default NoteItem;
