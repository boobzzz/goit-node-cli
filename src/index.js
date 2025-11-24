import { program } from 'commander';
import {
    listContacts,
    getContactById,
    addContact,
    removeContact
} from './contacts.js';

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contacts = await listContacts();
            contacts.length > 0
                ? console.table(contacts)
                : console.log('No contacts found.');
            break;

        case "get":
            const contact = await getContactById(id);
            contact
                ? console.log(contact)
                : console.log(`Contact with id: ${id} not found.`);
            break;

        case "add":
            const added = await addContact(name, email, phone);
            added
                ? console.table(added)
                : console.log('No contacts found.');
            break;

        case "remove":
            const removed = await removeContact(id);
            removed
                ? console.table(removed)
                : console.log('No contacts found.');
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);

// Usage:
// node src/index.js -a list
// node src/index.js -a get -i 69243ecbec5722eaf047168f
// node src/index.js -a add -n Mango -e mango@gmail.com -p 322-22-22
// node src/index.js -a remove -i rlkt-YNJOxdD7LIteFQh-
