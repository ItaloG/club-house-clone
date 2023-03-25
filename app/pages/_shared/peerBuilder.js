export default class PeerBuilder {
  constructor({ peerConfig }) {
    this.peerConfig = peerConfig;

    this.onError = () => {};
    this.onConnectionOpened = () => {};
    this.onCallError = () => {};
    this.onCallClose = () => {};
    this.onCallReceived = () => {};
    this.onStreamReceived = () => {};
  }

  setOnError(fn) {
    this.onError = fn;

    return this;
  }

  setOnConnectionOpened(fn) {
    this.onConnectionOpened = fn;

    return this;
  }

  setOnCallError(fn) {
    this.onCallError = fn;

    return this;
  }

  setOnCallClose(fn) {
    this.onCallClose = fn;

    return this;
  }

  setOnCallReceived(fn) {
    this.onCallReceived = fn;

    return this;
  }

  setOnStreamReceived(fn) {
    this.onStreamReceived = fn;

    return this;
  }

  build() {
    // o peer recebe uma lista de argumentos,
    // new Peer(id, config1, config2)
    // params = [], new Peer(...params)

    const peer = new globalThis.Peer(...this.peerConfig);
    peer.on("error", this.onError);

    return new Promise((resolve) =>
      peer.on("open", () => {
        this.onConnectionOpened(peer);
        return resolve(peer);
      })
    );
  }
}
