/**
 * @typedef {{title: string, body: string}} note
 */
/**
 * @typedef {note[]} notes
 */

const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Notes...';
};

/**
 * @param {string} title
 * @param {string} body
 */
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (duplicateNote) {
        console.log(chalk.red.inverse(`Note title "${title}" is already taken!`));
    } else {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('Note added!'));
    }
};

/**
 * @param {string} title
 */
const removeNote = (title) => {
    const notes = loadNotes();
    const noteIndex = notes.findIndex((note) => note.title === title);

    if (noteIndex != -1) {
        notes.splice(noteIndex, 1);
        saveNotes(notes);
        console.log(chalk.green.inverse('Note removed!'));
    } else {
        console.log(chalk.red.inverse(`Could not find note with title "${title}"`));
    }
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(`${chalk.blue.inverse('Your notes')}`);
    notes.forEach((note) => console.log(note.title));
};

/**
 * @param {string} title
 */
const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log(chalk.inverse(note.title) + '\n' + note.body);
    } else {
        console.log(chalk.red.inverse(`Note with title "${title}" not found!`));
    }
};

/**
 * @param {notes} notes
 */
const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
};

/**
 * @return {notes}
 */
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (error) {
        return [];
    }
};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};
