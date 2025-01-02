const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const cors = require("cors");
const express = require("express");
const { WebSocketServer } = require("ws");

// Create a SerialPort instance
const port = new SerialPort({ path: "COM13", baudRate: 9600 });

// Create a parser to read lines from the SerialPort
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// Log incoming data
let allData = null;
parser.on("data", (data) => {
  console.log("Raw Data from Arduino:", data);
  allData = data;

  // Broadcast the data to all connected WebSocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify({ temperature: allData }));
    }
  });
});

// Create an Express server
const app = express();
app.use(
  cors({ origin: ["http://localhost:3000", "https://192.168.244.163:3000"] })
);

// Simple health check API for the server
app.get("/", (req, res) => {
  res.send("Server is running. Use WebSocket for real-time updates.");
});

// Start the Express server
const server = app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

// Create a WebSocket server
const wss = new WebSocketServer({ server });

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("New WebSocket client connected");

  // Send the latest data to the new client immediately
  if (allData) {
    ws.send(JSON.stringify({ temperature: allData }));
  }

  // Handle client disconnections
  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});
