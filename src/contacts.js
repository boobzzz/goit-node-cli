import fs from 'node:fs/promises';
import path from 'node:path';
import { nanoid } from 'nanoid';

const __dirname = import.meta.dirname;
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

export async function listContacts() {
    const json = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(json);
}

export async function getContactById(contactId) {
    const contacts = await listContacts();
    if (contacts.length === 0) {
        return null;
    }
    return contacts.find((contact) => contact.id === contactId);
}

export async function removeContact(contactId) {
    const contacts = await listContacts();
    if (contacts.length === 0) {
        return null;
    }
    const updated = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updated), 'utf8');
    return updated;
}

export async function addContact(name, email, phone) {
    if (!name || !email || !phone) {
        return null;
    }
    const contacts = await listContacts();
    contacts.push({
        id: nanoid(),
        name,
        email,
        phone
    });
    await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8');
    return contacts;
}
