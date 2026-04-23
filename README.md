# 💬 WebSocket Chat Application

A real-time chat application built using Spring Boot (Backend) and React (Frontend) with WebSocket communication.

---

## 📌 Project Overview
This application allows users to send and receive messages instantly without refreshing the page.

---

## 🚀 Features
- Real-time messaging  
- Username-based chat  
- Instant message broadcast  
- Enhanced user interface  

---

## 🛠️ Tech Stack

Frontend:
- React (Vite)
- SockJS
- STOMP.js  

Backend:
- Spring Boot
- WebSocket
- Maven  

---

## ⚙️ How to Run

### Run Backend (Port 8080)
mvn spring-boot:run

### Run Frontend (Port 5173)
cd my-react-app  
npm install  
npm run dev  

---

## 🔌 WebSocket Endpoints
- /ws → Connection  
- /topic/messages → Receive messages  
- /app/chat → Send messages  

---

## 📸 Output

### Chat UI
![Chat UI](image1.png)

### Message Exchange
![Message Exchange](image2.png)

### Build Success
![Build Success](image.png)

---

## 📌 Author
Koyena
