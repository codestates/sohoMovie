import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { App } from './App';
import './global.css';

// ReactDOM.render(<App />, document.getElementById('root'));


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//   </React.StrictMode>
// ); 

ReactDOM.render(

  <React.StrictMode>
      {/* <Provider store={store}> */}
      {/* provider는 리덕스에서옴.. */}
        <App />
      {/* </Provider> */}
  </React.StrictMode>,

  document.getElementById('root')
);