import { constants } from "../../_shared/constants.js";
import Attendee from "./entities/attendee.js";

export default class RoomController {
  constructor({ roomInfo, socketBuilder, view, peerBuilder, roomService }) {
    this.socketBuilder = socketBuilder;
    this.roomInfo = roomInfo;
    this.view = view;
    this.roomService = roomService;
    this.peerBuilder = peerBuilder;

    this.socket = {};
  }

  static async initialize(deps) {
    return new RoomController(deps)._initialize();
  }

  async _initialize() {
    this._setupViewEvents();
    this.roomService.init();
    this.socket = this._setupSocket();
    this.roomService.setCurrentPeer(await this._setupWebRTC());
  }

  _setupViewEvents() {
    this.view.updateUserImage(this.roomInfo.user);
    this.view.updateRoomTopic(this.roomInfo.room);
  }

  _setupSocket() {
    return this.socketBuilder
      .setOnUserConnected(this.onUserConnected())
      .setOnUserDisconnected(this.onDisconnected())
      .setOnRoomUpdated(this.onRoomUpdated())
      .setOnUserProfileUpgrade(this.onUserProfileUpgrade())
      .build();
  }

  async _setupWebRTC() {
    return this.peerBuilder
      .setOnError(this.onPeerError())
      .setOnConnectionOpened(this.onPeerConnectionOpened())
      .build();
  }

  onPeerError() {
    return (error) => {
      console.error("deu rim");
    };
  }

  //quando a conezão for aberta ele pede para entrar na sala do socket
  onPeerConnectionOpened() {
    return (peer) => {
      console.log("peer connection", peer);
      this.roomInfo.user.peerId = peer.id;
      this.socket.emit(constants.event.JOIN_ROOM, this.roomInfo);
    };
  }

  onUserProfileUpgrade() {
    return (data) => {
      const attendee = new Attendee(data);
      console.log("onUserProfileUpgrade", attendee);
      this.roomService.upgradeUserPermission(attendee);
      if (attendee.isSpeaker) this.view.addAttendeeOnGrid(attendee, true);

      this.activeUserFeatures();
    };
  }

  onRoomUpdated() {
    return (data) => {
      const users = data.map((item) => new Attendee(item));

      console.log("room list", users);
      this.view.updateAttendeesOnGrid(users);
      this.roomService.updateCurrentUserProfile(users);
      this.activeUserFeatures();
    };
  }

  onDisconnected() {
    return (data) => {
      const attendee = new Attendee(data);
      console.log(`${attendee.username} disconnected!!`);
      this.view.removeItemFromGrid(attendee.id);
    };
  }

  onUserConnected() {
    return (data) => {
      console.log(data);
      const attendee = new Attendee(data);
      console.log("user connected!", attendee);
      this.view.addAttendeeOnGrid(attendee);
    };
  }

  activeUserFeatures() {
    const currentUser = this.roomService.getCurrentUser();
    this.view.showUserFeatures(currentUser.isSpeaker);
  }
}
