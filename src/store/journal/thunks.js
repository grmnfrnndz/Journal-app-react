import {doc, collection, setDoc, deleteDoc} from 'firebase/firestore/lite';
import {FirebaseDB} from "../../firebase/config.js";
import {addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setPhotoToActiveNote, setSaving, updateNote} from "./journalSlice.js";
import {fileUpload} from "../../helpers/fileUpload.js";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        const {uid} = getState().auth;

        const newNote = {
            title: 'New Note',
            body: 'Content...',
            imageUrls: [],
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        const {uid} = getState().auth;
        const {activeNote} = getState().journal;
        const noteToFirestore = {...activeNote};
        // delete property
        delete noteToFirestore.id;

        const docRefs = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRefs, noteToFirestore, {merge: true});

        dispatch(updateNote(activeNote));

    }
}

export const startUploadImages = (files = []) => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
        console.log(files);

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }
        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotoToActiveNote(photosUrls));

    }
}


export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
        const {uid} = getState().auth;
        const {activeNote} = getState().journal;
        const activeNoteId = activeNote.id;

        const docRefs = doc(FirebaseDB, `${uid}/journal/notes/${activeNoteId}`);
        await deleteDoc(docRefs);

        dispatch(deleteNoteById({id: activeNoteId}));

    }
}