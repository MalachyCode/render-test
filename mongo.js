const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Malachy:${password}@cluster0.owb16au.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// GENERATE NEW NOTE
// const note = new Note({
//   content: 'Mongoose makes things easy',
//   // content: 'HTML is Easy',
//   important: true,
// });

// SAVE GENERATED NOTE TO DATABASE
// note.save().then((result) => {
//   console.log('note saved!');
//   mongoose.connection.close();
// });

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})

// 'mongodb+srv://Malachy:<password>@cluster0.owb16au.mongodb.net/?retryWrites=true&w=majority';
// `mongodb+srv://Malachy:${password}@cluster0.owb16au.mongodb.net/?retryWrites=true&w=majority`;
