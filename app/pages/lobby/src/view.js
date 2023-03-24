import Room from "./entities/room.js";
import getTemplate from "./template/lobbyItem.js";

const roomGrid = document.getElementById("roomGrid");
const imgUser = document.getElementById("imgUser");
const txtTopic = document.getElementById("txtTopic");
const btnCreateRoomWithTopic = document.getElementById(
  "btnCreateRoomWithTopic"
);
const btnCreateRoomWithoutTopic = document.getElementById(
  "btnCreateRoomWithoutTopic"
);

export default class View {
  static clearRoomList() {
    roomGrid.innerHTML = "";
  }

  static redirectToRoom(topic = "") {
    const uniqueId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    window.location = View.generateRoomLink({ id: uniqueId, topic });
  }

  static configureCreateRoomButton() {
    btnCreateRoomWithoutTopic.addEventListener("click", () => {
      View.redirectToRoom();
    });
    btnCreateRoomWithTopic.addEventListener("click", () => {
      const topic = txtTopic.value;
      View.redirectToRoom(topic);
    });
  }

  static generateRoomLink({ id, topic }) {
    return `./../room/index.html?id=${id}&topic=${topic}`;
  }

  static updateRoomList(rooms) {
    View.clearRoomList();

    rooms.forEach((room) => {
      const params = new Room({
        ...room,
        roomLink: View.generateRoomLink(room),
      });
      const htmlTemplate = getTemplate(params);

      roomGrid.innerHTML += htmlTemplate;
    });
  }

  static updateUSerImage({ img, username }) {
    imgUser.src = img;
    imgUser.alt = username;
  }
}
