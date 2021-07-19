import React, { useRef, useState, useEffect } from "react";
import ChatMessage from "../components/ChatMessage";
import Picker, { SKIN_TONE_NEUTRAL } from "emoji-picker-react";

import { FaPaperPlane, FaSmile } from "react-icons/fa";

import SignOutButton from ".././components/SignOutButton";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import pp from ".././assets/img/sup.png";
import Profile from "../components/Profile";
import { toast } from "react-toastify";

var Filter = require("bad-words"),
  filter = new Filter();
filter.addWords("amk", "aq", "oç");

export default function ChatRoom({ firebase, auth, firestore }) {
  const [user] = useAuthState(auth);

  const dummy = useRef();

  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt");
  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const [emojiActive, setEmojiActive] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setFormValue(formValue + emojiObject.emoji);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (formValue === "" || formValue == null || formValue == undefined) {
      toast.error("Message field cannot be left blank!");
      return null;
    }

    if(formValue.length > 1024){
      toast.error("Message is too long! It can contain up to 1024 characters.");
      return null;
    }

    let text = formValue;
    let hasEmoji = text.search(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g);
    if(hasEmoji != -1){
      text = text + "a"
      text = filter?.clean(text);
      text = text.substring(0,text.length-1)
    }
    else{
      text = filter?.clean(text);
    }

    const { uid, photoURL, displayName } = user;

    const data = {
      text: text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    };
    setFormValue("");

    await messagesRef.add(data);
  };

  useEffect(() => {
    toast.success("Login successful!")
  }, [])

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-room">
      <header>
        <img className="logo" src={pp} />
        <div className="right">
          <Profile auth={auth}/>
        {user ? <SignOutButton auth={auth} /> : null}

        </div>
      </header>

      <main>
        {messages?.length > 0 ?
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              type={user.uid == msg.uid ? "sent" : "received"}
            />
          )) : <h2 className="first-message">Ilk mesaji yazan SEN ol!</h2>}
        <div ref={dummy}></div>
      </main>

      {emojiActive && (
        <div className="picker">
          <Picker
            onEmojiClick={onEmojiClick}
            disableAutoFocus={true}
            skinTone={SKIN_TONE_NEUTRAL}
            groupNames={{ smileys_people: "PEOPLE" }}
            native
          />
        </div>
      )}

      <form onSubmit={sendMessage}>
        <button
          style={{ background: emojiActive ? "#8da9c4" : "#6e578b" }}
          type="button"
          className="emoji-button"
          onClick={() => setEmojiActive(!emojiActive)}
        >
          <FaSmile />
        </button>
        <input
          className="type"
          autoFocus
          value={formValue}
          placeholder="say something"
          onChange={(e) => setFormValue(e.target.value)}
          type="text"
        />
        <button className="send" type="submit">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}
