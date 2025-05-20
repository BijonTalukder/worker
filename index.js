const express = require('express');
const { Worker } = require('worker_threads');
const os = require('os');
const process = require('process');
const path = require('path');

const app = express();
const port = 3000;

console.log("🖥️ Total CPU Cores:", os.cpus().length);
console.log("🧩 Main Thread PID:", process.pid);
console.log("🕒 Server started at:", new Date().toLocaleString());
app.get("/health", (req, res) => {
  res.send("✅ Server is healthy");
});
function slowTask() {
  let total = 0;
  const start = Date.now();
  while (Date.now() - start < 10000) {
    for (let i = 0; i < 1e5; i++) {
      total += Math.sqrt(i * Math.random());
    }
  }
  return total;
}

app.get("/single-thread", (req, res) => {
  console.log("📌 /single-thread - Main PID:", process.pid);
  console.time("⏱️ single-thread time");
  const result = slowTask();
  console.timeEnd("⏱️ single-thread time");
  res.send({ pid: process.pid, result });
});

app.get("/multi-thread", (req, res) => {
  console.log("📌 /multi-thread - Main PID:", process.pid);
  console.time("⏱️ multi-thread time");

//   const worker = new Worker('./worker.js');
const worker = new Worker(path.resolve(__dirname, 'worker.js'));

  worker.on('message', (data) => {
    console.timeEnd("⏱️ multi-thread time");
    console.log("✅ Worker Finished | PID:", data.pid);
    res.send(data);
  });

  worker.on('error', (err) => {
    console.error("❌ Worker Error:", err);
    res.status(500).send({ error: err.message });
  });

  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ Worker exited with code ${code}`);
    }
  });
});



app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
