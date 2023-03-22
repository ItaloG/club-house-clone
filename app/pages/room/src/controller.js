import { constants } from "../../_shared/constants.js";

export default class RoomController {
  constructor({ roomInfo, socketBuilder, view }) {
    this.socketBuilder = socketBuilder;
    this.roomInfo = roomInfo;
    this.view = view;

    this.socket = {};
  }

  static async initialize(deps) {
    return new RoomController(deps)._initialize();
  }

  async _initialize() {
    this._setupViewEvents();
    this.socket = this._setupSocket();
    this.socket.emit(constants.event.JOIN_ROOM, this.roomInfo);
  }

  _setupViewEvents() {
    this.view.updateUSerImage(this.roomInfo.user);
    this.view.updateRoomTopic(this.roomInfo.room);
  }

  _setupSocket() {
    return this.socketBuilder
      .setOnUserConnected(this.onUserConnected())
      .setOnUserDisconnected(this.onUserDisconnected())
      .setOnLobbyUpdated(this.onLobbyUpdated())
      .build();
  }

  onLobbyUpdated() {
    return (room) => console.log("room list", room);
  }

  onUserDisconnected() {
    return (user) => console.log("user disconnected!", user);
  }

  onUserConnected() {
    return (user) => console.log("user connected!", user);
  }
}
