import { constants } from "../../_shared/constants.js";
import RoomController from "./controller.js";
import RoomSocketBuilder from "./util/roomSocket.js";
import View from "./view.js";

const urlParams = new URLSearchParams(window.location.search);
const keys = ["id", "topic"];

const urlData = keys.map((key) => [key, urlParams.get(key)]);

const user = {
  img: "https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Profile-512.png",
  username: "ItaloG" + Date.now(),
};

const roomInfo = {
  user,
  room: {
    ...Object.fromEntries(urlData),
  },
};

const socketBuilder = new RoomSocketBuilder({
  socketUrl: constants.socketUrl,
  namespace: constants.socketNamespaces.room,
});

const dependencies = { socketBuilder, roomInfo, view: View };
await RoomController.initialize(dependencies);
