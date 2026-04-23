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
    <div style={{
      width: "400px",
      margin: "40px auto",
      padding: "20px",
      borderRadius: "10px",
      background: "#f0f0f0",
      boxShadow: "0 0 10px rgba(0,0,0,0.2)"
    }}>
      <h2 style={{ textAlign: "center" }}>💬 Chat App</h2>

      <input
        placeholder="Enter username"
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <div style={{
        height: "200px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        background: "white"
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: "5px" }}>
            <b>{m.sender}</b>: {m.content}
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
        style={{ width: "70%", padding: "8px" }}
      />

      <button
        onClick={sendMessage}
        style={{
          width: "25%",
          marginLeft: "5%",
          padding: "8px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Send
      </button>
    </div>
  );
}