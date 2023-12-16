const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notesSchema = new Schema({
   key: {type:Number},
   title: {type:String},
   content: {type:String}
}, { versionKey: false })


const Notes = mongoose.model('Notes', notesSchema, 'keeper-notes')
const mySchemas = {'Notes':Notes}

module.exports = mySchemas