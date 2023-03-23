import Attendee from "./entities/attendee.js";
import getTemplate from "./templates/attendeeTemplate.js";

const imgUser = document.getElementById("imgUser");
const roomTopic = document.getElementById("pTopic");
const gridAttendees = document.getElementById("gridAttendees");
const gridSpeakers = document.getElementById("gridSpeakers");

export default class View {
  static updateUSerImage({ img, username }) {
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

  static addAttendeeOnGrid(item) {
    const attendee = new Attendee(item);
    const htmlTEmplate = getTemplate(attendee);
    const baseElement = attendee.isSpeaker ? gridSpeakers : gridAttendees;
    baseElement.innerHTML += htmlTEmplate;
  }
}
