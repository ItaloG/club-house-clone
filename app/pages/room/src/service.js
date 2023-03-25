export default class RoomService {
  constructor({ media }) {
    this.media = media;

    this.currentPeer = {};
    this.currentUser = {};
    this.currentStream = {};
  }

  async init() {
    this.currentStream = await this.media.getUserAudio();
  }

  setCurrentPeer(peer) {
    this.currentPeer = peer;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  upgradeUserPermission(user) {
    if (!user.isSpeaker) return;

    const isCurrentUser = user.id === this.currentUser.id;
    if (!isCurrentUser) return;

    this.currentUser = user;
  }

  updateCurrentUserProfile(users) {
    this.currentUser = users.find(
      ({ peerId }) => peerId === this.currentPeer.id
    );
  }
}
