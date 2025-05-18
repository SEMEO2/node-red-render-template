const express = require("express");
const http = require("http");
const RED = require("node-red");
const path = require("path");  // 🔥 경로 처리용 모듈

const app = express();
const server = http.createServer(app);

// Node-RED 설정
const settings = {
  httpAdminRoot: "/",                    // Node-RED 에디터 UI 경로
  httpNodeRoot: "/",                     // HTTP 노드 경로
  userDir: path.join(__dirname, "data"), // 🔥 절대경로로 data 폴더 지정
  functionGlobalContext: {},             // 전역 함수 컨텍스트
  uiPort: process.env.PORT || 1880       // Render가 설정한 포트 사용
};

// Node-RED 초기화
RED.init(server, settings);

// Node-RED HTTP 라우팅 연결
app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

// 서버 시작
server.listen(settings.uiPort, () => {
  console.log(`✅ Node-RED running on port ${settings.uiPort}`);
});

// Node-RED 시작
RED.start().catch(err => {
  console.error("❌ Failed to start Node-RED:", err);
});
