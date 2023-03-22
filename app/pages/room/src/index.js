import { constants } from "../../_shared/constants.js";
import RoomController from "./controller.js";
import RoomSocketBuilder from "./util/roomSocket.js";
import View from "./view.js";

const room = {
  id: "001",
  topic: "JS Expert e noix",
};

const user = {
  img: "https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Profile-512.png",
  username: "ItaloG" + Date.now(),
};

const socketBuilder = new RoomSocketBuilder({
  socketUrl: constants.socketUrl,
  namespace: constants.socketNamespaces.room,
});

const roomInfo = { user, room };

const dependencies = { socketBuilder, roomInfo, view: View };
await RoomController.initialize(dependencies);
