import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './hello';
import Index from './Index.jsx'
import CommentApp from './CommentApp'
import * as serviceWorker from './serviceWorker';
import Card from './Card'
ReactDOM.render(
  <React.StrictMode>
    <Index/>
    {/* <App /> */}
    <CommentApp />
    <Card>
    <h2>React.js 小书</h2>
    <div>dduu</div>
    订阅：<input />
    </Card>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
