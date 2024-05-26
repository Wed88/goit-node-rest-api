import Contact from "../models/Contact.js";

export async function listContacts(search = {}) {
  const { filter = {}, fields = "", settings = {} } = search;
  return Contact.find(filter, fields, settings);
}

export async function countContacts(filter) {
  return Contact.countDocuments(filter);
}

export async function getContactById(filter) {
  return Contact.findOne(filter);
}

export async function removeContact(filter) {
  return Contact.findOneAndDelete(filter);
}

export async function addContact(contact) {
  return Contact.create(contact);
}

export async function updateContactById(filter, data) {
  return Contact.findOneAndUpdate(filter, data);
}
