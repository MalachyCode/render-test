import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

// // const promise = axios.get('http://localhost:3001/notes');

// // promise.then((response) => {
// //   console.log(response);
// // });

// // THE commented out process above is same as the one below
// axios.get('http://localhost:3001/notes').then((response) => {
//   const notes = response.data;
//   // request the notes from our local server and render them, initially as the App component.
//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <App notes={notes} />
//   );
// });

// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true,
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false,
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most the important methods of HTTP protocol',
//     important: true,
//   },
// ];

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
