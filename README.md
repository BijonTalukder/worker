
# 🧵 Node.js Single vs Multi Thread Performance Demo

This project demonstrates how Node.js handles **CPU-bound tasks** using:

- 🧠 **Single Thread (Main Thread Execution)**
- 🔧 **Multi Thread (Worker Threads)**

It helps compare performance and learn how to offload heavy tasks to prevent blocking the event loop.

---

## 📁 Project Structure

```
.
├── server.js        # Main Express server with single and multi-thread routes
├── worker.js        # Worker Thread script for multi-threaded execution
├── README.md        # This file
```

---

## 🚀 How to Run

### 1. Install Node.js

Make sure you have Node.js (v12+ recommended) installed.

```bash
node -v
```

---

### 2. Clone and Run

```bash
git clone <your-repo-url>
cd <project-folder>
node server.js
```

Server will start at:

```
http://localhost:3000
```

---

## 📌 Available Routes

### 🧠 `GET /single-thread`

- Executes a heavy `slowTask()` on the **main thread**
- Blocks the event loop for ~10 seconds
- Logs execution time and PID

### 🔧 `GET /multi-thread`

- Offloads the `slowTask()` to a **worker thread**
- Main thread stays non-blocking
- Uses `worker_threads` module
- Logs execution time and worker PID

### ❤️ `GET /health`

- Returns basic health check of the server

---

## 📊 Output Sample

```bash
/single-thread
⏱️ Time: 10.000s
PID: 9632

/multi-thread
🧵 Worker PID: 9710
⏱️ Time: 10.100s
✅ Main thread stays responsive
```

---

## 💡 Learning Points

| Concept         | Description                                                       |
|----------------|-------------------------------------------------------------------|
| Main Thread     | Executes all code unless explicitly offloaded                    |
| Worker Threads  | Helps run heavy CPU-bound tasks in parallel                      |
| Event Loop      | Node.js non-blocking behavior for I/O-bound tasks                |
| Cluster         | For multi-process parallelization using all CPU cores            |

---
