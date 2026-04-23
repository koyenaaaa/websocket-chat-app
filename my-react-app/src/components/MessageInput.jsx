import { useState } from "react";

function MessageInput({ sendMessage }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") return;
    sendMessage(text);
    setText("");
  };

  return (
    <div className="input-box">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageInput;