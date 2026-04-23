import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const clientRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,

      onConnect: () => {
        client.subscribe("/topic/messages", (msg) => {
          const data = JSON.parse(msg.body);
          setMessages((prev) => [...prev, data]);
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => client.deactivate();
  }, []);

  const sendMessage = () => {
    if (!username || !text) return;

    clientRef.current.publish({
      destination: "/app/chat",
      body: JSON.stringify({
        sender: username,
        content: text,
      }),
    });

    setText("");
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <input
        placeholder="Enter name"
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <div style={{ border: "1px solid #ccc", height: "200px", overflow: "auto", marginBottom: "10px" }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.sender}:</b> {m.content}
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message"
        style={{ width: "70%" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}