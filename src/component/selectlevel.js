import { useNavigate } from "react-router-dom";
import { useState} from "react";

function Level(){
    const navgivate=useNavigate()
    const [level,setLevel]=useState('easy')

    const go=()=>{
      navgivate(`/game/${level}`)
    }
    
    return(
        <>
          <div>Select Game Level</div>
          <select onChange={(e)=>setLevel(e.target.value)}>
              <option value="easy">easy</option>
              <option value="normal">normal</option>
              <option value="hard">hard</option>
          </select>
          <button onClick={()=>go()}>go to game</button>
        </>
    )
}

export default Level;