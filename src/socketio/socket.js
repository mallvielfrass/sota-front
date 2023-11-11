import { io } from "socket.io-client";
export class Socket {
  socket;
  connected = false;
  userId = "";
  /**
   *  Map containing string keys and function values.
   * @type {Map<string, {pusher: (data: any) => void,errorHandler: (data: any) => void }>}
   */
  rooms = new Map();

  constructor() {
    this.socket = io("/");
  }
  disconnect() {
    this.socket.disconnect();
  }
  connect() {
    this.socket.connect();
    this.mount();
    this.auth();
  }
  async auth() {
    const token = localStorage.getItem("token");
    if (token) {
      this.socket.emit("auth", { Authorization: `Bearer ${token}` });
    }
  }
  mount() {
    this.socket.on("connect", () => {
      console.log("socket connected");
    });
    this.socket.on("disconnect", () => {
      console.log("disconnected");
    });
    this.socket.on("auth", (data) => {
      console.log("auth", data);
      if (data.status == "success") {
        this.connected = true;
        this.userId = data.user.userId;
      }
    });
    this.socket.on("service", (data) => {
      console.log("service", data);
      if (data.typeName == "join") {
        //handle join errors
        const dialogId = data.dialogId;
        const room = this.rooms.get(dialogId);
        if (room) {
          room.errorHandler(data);
        }
      }
    });

    this.messageListener();
  }
  async messageListener() {
    this.socket.on("message", (data) => {
      console.log("message", data);
      const dialogId = data.dialogId;
      const message = data.message;

      message.isMyMessage = data.userId == this.userId;
      console.log(
        `isMyMessage ${message.isMyMessage}|${data.userId}|${this.userId}`
      );
      const room = this.rooms.get(dialogId);
      if (room) {
        room.pusher(message);
      }
      // fn(message);
    });
  }
  //func subscribeToChat jdoc
  /**
   * Subscribe to chat
   * @constructor
   * @param {number} id
   * @param {function} pusher: (data: any) => void
   * @param {function} errorHandler: (data: any) => void
   */
  async subscribeToChat(id, pusher, errorHandler) {
    this.socket.emit("join", { dialogId: id });
    console.log("join", { dialogId: id });
    this.rooms.set(id, { pusher, errorHandler });
  }
  async unsubscribeToChat(id) {
    this.socket.emit("leave", { dialogId: id });
    console.log("leave", { dialogId: id });
    this.rooms.delete(id);
  }
}
export const socketIo = new Socket();
