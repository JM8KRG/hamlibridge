# Hamlibrige

このソフトウェアはクライアント WEB アプリの操作コマンドを rigctld の仕様に合わせた操作コマンドに変換し,rigctld に送信する。また、rigctld から受け取った値を汎用性の高い Json 形式で格納しクライアント WEB アプリケーションに送信するという双方向のデータ形式の差異を吸収することを目的としたゲートウェイサーバである。

アマチュア無線の S メーター(信号強度計)は高頻度で更新されるため,従来の TCP 接続でデータを伝送してしまうと通信効率が悪い。そこで,クライアント WEB アプリケーションとサーバ間を WebSocket を用いて接続することで,TCP 接続を維持することができる。

## 開発環境

- Mac OS Mojave 10.14.2
- Node.js 10.15.0
- 別途、無線機、Hamlib を用意

## rigctld の起動

```bash
$ rigctld -m [無線機のモデル] -s [ボーレート] -r /dev/ttyUSB0 &
```

## 実行

```bash
$ git clone https://github.com/JM8KRG/hamlibridge.git
$ cd hamlibridge
$ npm install
$ npm start
```
