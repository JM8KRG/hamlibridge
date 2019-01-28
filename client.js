const net = require("net");

// コマンドを送信する
exports.sendCommand = function(command) {
  // 接続開始
  const client = net.createConnection(
    { host: "192.168.1.41", port: "4532" },
    function() {}
  );

  // データ送信
  client.write("\\" + command + "\n");

  // エラーハンドリング
  client.on("error", function(error) {
    console.log(error.message);
  });

  // 受信したデータを返却する
  return new Promise(resolve => {
    // rigctldからデータ受信
    client.on("data", function(data) {
      // コネクションを破棄する
      client.destroy();
      // データ加工
      const rawResponse = data
        .toString()
        .trim()
        .replace(/^\r/gm, "")
        .split(/\r\n|\r|\n/);
      // 値を返す
      resolve(rawResponse[0]);
    });
  });
};
