var express = require("express");
var app = express();
var http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 3000;
const client = require("./client");

// 設定値(PTT:0=受信)
let params = { freq: 1800000, mode: "AM", sql: 0, smeter: 0, ptt: 0 };

app.get("/", function(req, res) {
  res.send("HamliBridge is running!");
});

// 接続開始
io.on("connection", function(socket) {
  // 初回接続処理
  getCurrentParamsAndSendClient();

  // 制御コマンドを受信する
  socket.on("command", function(cmd) {
    client.sendCommand(cmd);
  });

  // 信号強度を送信する
  setInterval(function() {
    getSmeter();
  }, 2000);
});

// 設定値を取得しクライアントに送信する
async function getCurrentParamsAndSendClient() {
  // コマンドを送信する
  params.freq = await client.sendCommand("get_freq");
  params.mode = await client.sendCommand("get_mode");
  params.sql = await client.sendCommand("get_level SQL");
  params.smeter = await client.sendCommand("get_level RAWSTR");
  params.ptt = await client.sendCommand("get_ptt");

  // WEBアプリに設定値を送信する
  io.emit("command", params);
}

// 信号強度を取得しクライアントに送信する
async function getSmeter() {
  const smeter = await client.sendCommand("get_level RAWSTR");
  io.emit("smeter", smeter);
}

http.listen(PORT, function() {
  console.log("server listening. Port:" + PORT);
});
