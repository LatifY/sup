import React from "react";

export default function ChatMessage({ message, type }) {
  const { text, photoURL, createdAt, displayName } = message;

  var myDate = new Date(createdAt?.seconds * 1000);

  return (
    <div className={"message " + type}>
      <img className="pp" src={photoURL} />

      <div className={"text " + type}>
        <span className="name">{displayName}</span>
        <p>{text}</p>
        <span className="time">
          {myDate.toLocaleTimeString().substring(0, 5)}
        </span>
      </div>
    </div>
  );
}
