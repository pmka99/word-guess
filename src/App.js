import React, { useEffect, useState } from 'react';
import GuessInput from './component/myinput'
import Game from './component/game'
import SelectLevel from './component/selectlevel'
import {Route, Routes, useNavigate} from 'react-router-dom'

function App() {
  const navgivate=useNavigate()

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
