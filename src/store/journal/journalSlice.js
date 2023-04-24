import {createSlice} from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaving: '',
        notes: [],
        activeNote: null,
        // activeNote: {
        //     id: 'abc',
        //     title: '',
        //     body: '',
        //     date: 12345,
        //     imageUrls: []
        // },
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        // sync
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
            state.messageSaving = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaving = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if(note.id == action.payload.id) return action.payload;
                return note;
            });

            state.messageSaving = `${action.payload.title}, successfully saved`;
        },
        deleteNoteById: (state, action) => {
            console.log(action);
            state.isSaving = false;
            state.notes = state.notes.filter(note => note.id !== action.payload.id);
            state.activeNote = null;
        },
        setPhotoToActiveNote: (state, action) => {
            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaving = '';
            state.notes = [];
            state.activeNote = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotoToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;