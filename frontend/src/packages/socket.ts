import { io } from "socket.io-client";

const URL = "http://localhost:5000";
console.log(URL)

export const socket = io(URL);
