import socketIOClient from "socket.io-client";
const serverEndpoint = "http://trivia-game-socket-server-a-trivia-game.trivia-test-bsh-082721-162e406f043e20da9b0ef0731954a894-0000.us-east.containers.appdomain.cloud/";

export const socket = socketIOClient(serverEndpoint, {
	transports: ['websocket']
});
