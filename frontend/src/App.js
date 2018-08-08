import React from 'react';
import Main from './components/Main'
import ListImages from './components/ListImages'

const style = {
   display: 'none'
}

const App = () => (
   <div className="container">
      <div className="alert alert-success" style={style} id="notif" role="alert"></div>
      <h1>File Upload</h1>
      <Main />
   </div>
)

export default App;
