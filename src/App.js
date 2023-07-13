// PART 2A and 2B EXAMPLES

import { useState, useEffect } from 'react';
import noteService from './services/notes';
import './index.css';
import Note from './Components/Note';
import Notification from './Components/Notification';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022
      </em>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...');

  // THIS
  useEffect(() => {
    // console.log('effect');
    noteService.getAll().then((initialNotes) => {
      // console.log('promise fulfilled');
      setNotes(initialNotes);
    });
  }, []);
  // AND THIS BELOW ARE THE SAME
  // const hook = () => {
  //   console.log('effect');
  //   axios.get('http://localhost:3001/notes').then((response) => {
  //     console.log('promise fulfilled');
  //     setNotes(response.data);
  //   });
  // };

  // useEffect(hook, []);
  // console.log('render', notes.length, 'notes');

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: notes.length + 1,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from the server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  );
};

// // CURRENCY CONVERTER EXAMPLE
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [value, setValue] = useState('');
//   const [rates, setRates] = useState({});
//   const [currency, setCurrency] = useState(null);

//   useEffect(() => {
//     console.log('effect run, currency is now', currency);

//     // skip if currency is not defined
//     if (currency) {
//       console.log('fetching exchange rates...');
//       axios
//         .get(`https://open.er-api.com/v6/latest/${currency}`)
//         .then((response) => {
//           setRates(response.data.rates);
//         });
//     }
//   }, [currency]);

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   const onSearch = (event) => {
//     event.preventDefault();
//     setCurrency(value);
//   };

//   return (
//     <div>
//       <form onSubmit={onSearch}>
//         currency: <input value={value} onChange={handleChange} />
//         <button type='submit'>exchange rate</button>
//       </form>
//       <pre>{JSON.stringify(rates, null, 2)}</pre>
//     </div>
//   );
// };

// // EXERCISE 2.18 - 2.20 FROM PART 2E
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const Display = (props) => {
//   return <div>{props.name}</div>;
// };

// const App = () => {
//   const [value, setValue] = useState('');
//   const [countries, setCountries] = useState([]);
//   const [name, setName] = useState(null);
//   const [showAll, setShowAll] = useState(true);

//   useEffect(
//     () => {
//       // console.log(`effect run, name is now`, name);

//       axios
//         // .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
//         .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
//         .then((response) => {
//           setCountries(response.data);
//         });
//     },
//     [countries] /*[name]*/
//   );

//   const filter = (event) => {
//     setValue(event.target.value);
//     setName(value);
//     countries.find((country) => console.log(country.name.common === value));
//   };

//   // console.log(countries[0]);
//   return (
//     <div>
//       <form>
//         find countries <input value={value} onChange={filter} />
//       </form>
//       <div>
//         <pre>
//           <h1>{countries[0].name.common}</h1>
//           <p>capital {countries[0].capital}</p>
//           <p>area {countries[0].area}</p>
//           <h3>languages:</h3>
//           <ul>
//             <li>{Object.values(countries[0].languages)}</li>
//           </ul>
//           <img src='https://flagcdn.com/w320/kw.png' alt='' />
//         </pre>
//       </div>
//       {/* <pre>{JSON.stringify(countries, null, 2)}</pre> */}
//     </div>
//   );
// };

export default App;
