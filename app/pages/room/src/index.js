import { constants } from "../../_shared/constants.js";
import RoomSocketBuilder from "./util/roomSocket.js";

const socketBuilder = new RoomSocketBuilder({
  socketUrl: constants.socketUrl,
  namespace: constants.socketNamespaces.room,
});

const socket = socketBuilder
  .setOnUserConnected((user) => console.log("user connected!", user))
  .setOnUserDisconnected((user) => console.log("user disconnected!", user))
  .setOnLobbyUpdated((room) => console.log("room list", room))
  .build();

const room = {
  id: "001",
  topic: "JS Expert e noix",
};

const user = {
  img: "https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Profile-512.png",
  username: "ItaloG" + Date.now(),
};

socket.emit(constants.event.JOIN_ROOM, { user, room });
