import { constants } from "../../_shared/constants.js";
import SocketBuilder from "../../_shared/socketBuilder.js";

const socketBuilder = new SocketBuilder({
  socketUrl: constants.socketUrl,
  namespace: constants.socketNamespaces.room,
});

const socket = socketBuilder
  .setOnUserConnected((user) => console.log("user connected!", user))
  .setOnUserDisconnected((user) => console.log("user disconnected!", user))
  .build();

const room = {
  id: Date.now(),
  topic: "JS Expert e noix",
};

const user = {
  img: "https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Profile-512.png",
  username: "ItaloG",
};

socket.emit(constants.event.JOIN_ROOM, { user, room });
