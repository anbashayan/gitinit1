// const express = require('express');
// const mongoose = require('mongoose');

// const app = express ();

// app.get('/', (req, res) => {
//     res.send(`Yayyy! It's working`);
// });

app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Note', notesSchema);


const ejs = app.set('view engine', 'ejs'); 

app.get('/', async (req, res) => {
    const notes = await Note.find().sort('-createdAt');
    res.render('index', { notes: notes });
  });

//   const express = require('express');
//   const router = express.Router();
//   const Note = require('../models/note');
  
//   router.get('/new', (req, res) => {
//     res.render('new');
//   });



  router.post('/', async (req, res) => {
    let note = await new Note({
      title: req.body.title,
      description: req.body.description,
    });
    try {
      note = await note.save();
      res.redirect('/');
    } catch (e) {
      console.log(e);
      res.render('new');
    }
  });

  const express = require('express');
const router = express.Router();
const Note = require('../models/note');

router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/', async (req, res) => {
  let note = await new Note({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    note = await note.save();
    res.redirect('/');
  } catch (e) {
    console.log(e);
    res.render('new');
  }
});

module.exports = router;



const express = require('express');
const mongoose = require('mongoose');

const app = express();
const Note = require('./models/note');
const notesRouter = require('./routes/notes');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const notes = await Note.find().sort('-createdAt');
  res.render('index', { notes: notes });
});

mongoose.connect('mongodb://localhost/notes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', notesRouter);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Has Started`);
});









