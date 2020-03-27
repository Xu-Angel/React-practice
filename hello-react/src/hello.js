import React from 'react';
import L from './L.jsx'
function App() {
  const words ={ 'likedText': "x", 'unlikedText': "y" }
  return (
    <div className="App">
      <L words={{ ...words }} onClick={() => console.log('Click on like button')}></L>
      <L></L>
    </div>
  );
}

export default App;
