import {startNewNote} from "../../../src/store/journal/thunks.js";
import {addNewEmptyNote, savingNewNote, setActiveNote} from "../../../src/store/journal/index.js";
import {collection, deleteDoc, getDocs} from "firebase/firestore/lite";
import {FirebaseDB} from "../../../src/firebase/config.js";

describe('test on journal thunks', function () {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const uid = 'TEST-UID';
    const newNote = {
        body: 'Content...',
        title: 'New Note',
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: expect.any(Array)
    };

    beforeEach(() => jest.clearAllMocks());

    afterEach(async ()=>{
        // clear firebase
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
        const { docs } = await getDocs( collectionRef )
        await Promise.all(docs.map(doc=>deleteDoc( doc.ref )))
    })

    test('should be call startNewNote crete note in blank', async () => {
        getState.mockReturnValue({auth: {uid}});

        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(newNote));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote(newNote));


        // reemplazado por afterEach
        // const deletePromises = [];
        // const collectionRefs = collection(FirebaseDB, `${uid}/journal/notes`);
        // const docs = await getDocs(collectionRefs);
        // docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));
        // await Promise.all(deletePromises);
    });

});