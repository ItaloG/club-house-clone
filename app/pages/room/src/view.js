import Attendee from "./entities/attendee.js";
import getTemplate from "./templates/attendeeTemplate.js";

const imgUser = document.getElementById("imgUser");
const roomTopic = document.getElementById("pTopic");
const gridAttendees = document.getElementById("gridAttendees");
const gridSpeakers = document.getElementById("gridSpeakers");
const btnMicrophone = document.getElementById("btnMicrophone");
const btnClipBoard = document.getElementById("btnClipBoard");
const btnClap = document.getElementById("btnClap");

export default class View {
  static updateUserImage({ img, username }) {
    imgUser.src = img;
    imgUser.alt = username;
  }

  static updateRoomTopic({ topic }) {
    roomTopic.innerHTML = topic;
  }

  static updateAttendeesOnGrid(users) {
    users.forEach((item) => View.addAttendeeOnGrid(item));
  }

  static _getExistingItemOnGrid({ id, baseElement = document }) {
    const existingItem = baseElement.querySelector(`[id="${id}"]`);
    return existingItem;
  }

  static removeItemFromGrid(id) {
    const existingElement = View._getExistingItemOnGrid({ id });
    existingElement?.remove();
  }

  static addAttendeeOnGrid(item, removeFirst = false) {
    const attendee = new Attendee(item);
    const id = attendee.id;
    const htmlTEmplate = getTemplate(attendee);
    const baseElement = attendee.isSpeaker ? gridSpeakers : gridAttendees;

    if (removeFirst) {
      View.removeItemFromGrid(id);
      baseElement.innerHTML += htmlTEmplate;
      return;
    }

    const existingItem = View._getExistingItemOnGrid({ id, baseElement });
    if (existingItem) {
      existingItem.innerHTML = htmlTEmplate;
      return;
    }

    baseElement.innerHTML += htmlTEmplate;
  }

  static showUserFeatures(isSpeaker) {
    if (!isSpeaker) {
      btnClap.classList.remove("hidden");
      btnMicrophone.classList.add("hidden");
      btnClipBoard.classList.add("hidden");
      return;
    }

    btnClap.classList.add("hidden");
    btnMicrophone.classList.remove("hidden");
    btnClipBoard.classList.remove("hidden");
  }
}
