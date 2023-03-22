const imgUser = document.getElementById("imgUser");
const roomTopic = document.getElementById("pTopic");

export default class View {
  static updateUSerImage({ img, username }) {
    imgUser.src = img;
    imgUser.alt = username;
  }

  static updateRoomTopic({topic}) {
    roomTopic.innerHTML = topic;
  }
}
