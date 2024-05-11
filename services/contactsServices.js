import Contact from "../models/Contact";

export async function listContacts() {
  return Contact.find();
}

export async function getContactById(contactId) {
  return Contact.findById(contactId);
}

export async function removeContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export async function addContact(contact) {
  return Contact.create(contact);
}

export const updateContact = async (contactId, data) => {
  return Contact.findByIdAndUpdate(contactId, data);
};
