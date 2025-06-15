export function addUniqueContact(newContact, currentContacts) {
  const exists = currentContacts.some(
    (c) => c.login.uuid === newContact.login.uuid
  );
  if (exists) return currentContacts;
  return [...currentContacts, newContact];
}

export function delUniqueContact(userToDelete, currentContacts) {
  const uuidToDelete = userToDelete.login.uuid;
  return currentContacts.filter((c) => c.login.uuid !== uuidToDelete);
}
