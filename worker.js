const { parentPort, isMainThread } = require('worker_threads');
const process = require('process');

if (!isMainThread) {
  console.log("🧵 Worker thread started | PID:", process.pid);

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

  const result = slowTask();
  parentPort.postMessage({ result, pid: process.pid });
}
