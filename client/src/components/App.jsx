import React, { useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

function App() {

  // variables to hold button click states
  const [isAddNoteClicked, setAddClicked] = useState(false);
  const [isDelNoteClicked, setDelClicked] = useState(false);

  const [noteKeyToDelete, setNoteKeyToDelete] = useState('');

  // This is a note from what user is inputting
  const [newNote, setNewNote] = useState({
    noteKey: 0,
    noteTitle: "",
    noteContent: ""
  });

  // These are all the notes currently being rendered
  const [notes, setNotes] = useState([]);

  // allows us to retrieve notes from server
  useEffect(() => {
   const fetchNotes = async () => {
      try {
         const response = await fetch('/getnotes');
         const jsonString = await response.json();

         setNotes(jsonString)
      } catch (error) {
         console.error('Error fetching or parsing notes: ', error);
      }
   };

   fetchNotes();
  }, [isAddNoteClicked, isDelNoteClicked])

  // allows us to add note to db 
  useEffect(() => {
   const postData = async () => {
      if (isAddNoteClicked && newNote.noteTitle.length !== 0 && newNote.noteContent.length !== 0) {
         try {

            // get list of current notes
            const updatedNotes = [...notes];
            const currLen = updatedNotes.length; // # of notes
            // variable for new note to be added
            var someNote = {};
            // Create the key for the new note
            if (currLen === 0) {
               someNote["key"] = 1;
            } else {
               someNote["key"] = updatedNotes[currLen - 1].key + 1;
            }
            someNote["title"] = newNote.noteTitle;
            someNote["content"] = newNote.noteContent;
            
            // POST new note to server
            const response = await fetch("/addnote", {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(someNote)
            });

            if (response.ok) {
               console.log('Data sent succesfully');
            } else {
               console.error('Error sending data');
            }
         } catch (error) {
            console.error('Error', error);
         } finally {
            setAddClicked(false);
            setNewNote({
               noteKey: 0,
               noteTitle: "",
               noteContent: ""
            })
         }
      }
   };

   postData();
  }, [isAddNoteClicked, newNote])

  // allows us to delete a note from notes in db
  useEffect(() => {
   const deleteNote = async () => {
      if (isDelNoteClicked) {
         try {
            const response = await fetch("/deletenote", {
               method: 'DELETE',
               headers: {
               'Content-Type': 'application/json',
               },
               body: JSON.stringify({ noteKey: noteKeyToDelete }),
            });

            if (response.ok) {
               console.log('Note deleted successfully');
            } else {
               console.error('Error deleting note');
            } 
         } catch (error) {
            console.error('Error', error);
         } finally {
            setDelClicked(false);
            setNoteKeyToDelete('');
         }
      }
   };

   deleteNote();
  }, [isDelNoteClicked, noteKeyToDelete])

  // populates newNote variable with currently inputted data
  function handleChange(event) {
    const { value, name } = event.target;
    setNewNote((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // delete button on note triggers delete effect
  const handleDelete2 = (delKey) => {
   setNoteKeyToDelete(delKey)
   setDelClicked(true);
 };

  // add button on note triggers add effect
  function handleAdd2(event) {
   event.preventDefault();
   setAddClicked(true);
  }

  // creates Notes component for each existing note in server
  function RenderNotes() {
    var notesList = notes.map((ent) => {
      return (
        <Note
          key={ent.key}
          noteKey={ent.key}
          title={ent.title}
          content={ent.content}
          handleDelete={handleDelete2}
        />
      );
    });

    return <div>{notesList}</div>;
  }

  // HTML/REACT 
  return (
    <div>
      <Header />
      <form className="inputNote">
        <input
          type="text"
          name="noteTitle"
          placeholder="Title"
          value={newNote.noteTitle}
          onChange={handleChange}
        />
        <textarea
          name="noteContent"
          placeholder="Take a note..."
          value={newNote.noteContent}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleAdd2}>
          Add
        </button>
      </form>
      <div>
        <RenderNotes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
