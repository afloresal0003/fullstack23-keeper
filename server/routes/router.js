const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

router.get('/getnotes', async(req, res) => {
   const notes = schemas.Notes

   const allNotes = await notes.find({}, { _id: 0 }).exec()
   if (allNotes) {
      res.send(JSON.stringify(allNotes))
   }
})

router.post('/addnote', async(req, res) => {
   const {key, title, content} = req.body;
   const notesData = {
      key: key,
      title: title,
      content: content
   }
   const newNote = new schemas.Notes(notesData)
   const saveNote = await newNote.save()
   if (saveNote) {
      res.send('Note sent. Thank you');
   } else {
      res.send('Failed to send message');
   }
   res.end()
})

router.delete('/deletenote', async(req, res) => {
   const { noteKey } = req.body;

   try {
      const result = await schemas.Notes.deleteOne({key: noteKey});
      if(result.deletedCount > 0){
         res.send('Note deleted successfully');
      } else {
         res.send('Note not found');
      }
   } catch (error) {
      console.error('Error deleting note: ', error);
      res.status(500).send('Internal Server Error');
   }
});


module.exports = router