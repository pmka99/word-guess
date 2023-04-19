import React from 'react';
import Game from './component/game'
import SelectLevel from './component/selectlevel'
import {Route, Routes} from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SelectLevel />} />
        <Route path='/game/:slug' element={<Game />}/>
      </Routes>
    </div>
  );
}

export default App;
