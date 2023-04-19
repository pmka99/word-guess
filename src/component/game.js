import { useState,useEffect} from "react"
import { useNavigate,useParams } from "react-router-dom"
import GuessInput from "./guessInput"
import robot from "./robot"

function Game(){
    const [turn,setTurn]=useState(false)
    const [v1,setv1]=useState('')
    const [v2,setv2]=useState('')
    const [v3,setv3]=useState('')
    const [v4,setv4]=useState('')
    const [v5,setv5]=useState('')
    const [guess,setGuess]=useState([])
    const [word,setWord]=useState('')
    const [message,setMessage]=useState('')
    const [style,setStyle]=useState({margin:'auto',texAlign:'center',visibility:'hidden'})
    const [end,setEnd]=useState(false)
    const [time,setTime]=useState(10)
    const [overTime,setTimeOver]=useState()
    const [level,setLevel]=useState('easy')

    const navigate=useNavigate()
    const params=useParams()

    useEffect(()=>{
      let timeout=setTimeout(async()=>{
        let data=await getData();
        console.log(data.length,'data length')
        setWord(data[Math.floor(Math.random()*672)])
        setLevel(params.slug)
      },200)

      return()=>{
        clearTimeout(timeout) 
      }
    },[params.slug])

    useEffect(()=>{
      var timer=setTimeout(async()=>{
        // check()
        if(!end){
          if(turn){
            let remainTime=Math.ceil(((overTime-Date.now())/1000))
            if(remainTime===0){
              setTurn(false)
              setStyle({margin:'auto',texAlign:'center',visibility:'hidden'})
              setTime(10)
            }else{
              setTime(remainTime)
            }
          }else{
            // robot guess function
            let allguess=guess
            let robotGuess=await robot(level,allguess,word)
            if(word===robotGuess){
              setMessage("You loose")
              setEnd(true)
              allguess.push(robotGuess)
              setStyle({margin:'auto',texAlign:'center',visibility:'hidden'})
            }else if((typeof robotGuess)!=="string"){
              console.log("robot guess is invalid",robotGuess)
            }else{
              allguess.push(robotGuess)
              setv1('');setv2('');setv3('');setv4('');setv5('')
              setTurn(true)
              setStyle({margin:'auto',texAlign:'center',visibility:'visible'})
              setTimeOver(Date.now()+10000)
            }
          }
        }else{
          setStyle({margin:'auto',texAlign:'center',visibility:'hidden'})
        }
      },1000)
      return ()=>{clearTimeout(timer)}
    },[time,overTime])
    
    
    const getData=async()=>{
      let res=await fetch('http://localhost:3000/words.txt')
      let data=await res.text()
      let mydata=data.split(',')
      return mydata;
    }
  
    const clear=()=>{
      if(v5!==''){
        setv5('')
      }else if(v4!==''){
        setv4('')
      }else if(v3!==''){
        setv3('')
      }else if(v2!==''){
        setv2('')
      }else if(v1!==''){
        setv1('')
      }
    }
  
    const handler1=(e)=>{
      if(e.target.value[0]!==''){
        setv1(e.target.value[0].toUpperCase());
        let next=document.querySelector('input[id=v2]');
        if(next){
          next.focus()
        }
      }
    }
    const handler2=async(e)=>{
      if(e.target.value[0]!==''){
        setv2(e.target.value[0].toUpperCase());
        let next=document.querySelector('input[id=v3]');
        if(next){
          next.focus()
        }
      }
    }
    const handler3=async(e)=>{
      if(e.target.value[0]!==''){
        setv3(e.target.value[0].toUpperCase());
        let next=document.querySelector('input[id=v4]');
        if(next){
          next.focus()
        }
      }
    }
    const handler4=async(e)=>{
      if(e.target.value[0]!==''){
        setv4(e.target.value[0].toUpperCase());
        
        let next=document.querySelector('input[id=v5]');
        if(next){
          next.focus()
        }
      }  
    }
    const handler5=async(e)=>{
      if(e.target.value[0]!==''){
        setv5(e.target.value[0].toUpperCase());
        let next=document.querySelector('input[id=v1]');
        if(next){
          next.focus()
        }
        let search=v1+v2+v3+v4+e.target.value[0].toUpperCase()
        let set=true
        for(let i=0;i<=4;i++){
          if(search[i]===' '){
            set=false
            setMessage("one letter is empety")
          }
        }
        if((search.length===5)&&set){
          let allguess=guess
          let data=await getData()
          let wordIndata=data.filter(v=>v===search)
          allguess.map(v=>{v===search?set=false:set=true;return v})
          if(set){
            setv1('');setv2('');setv3('');setv4('');setv5('')
            if(word===search){
              guess.push(search)
              setGuess(allguess)
              setTurn(false)
              setMessage("you Win") 
              setEnd(true)
              setTimeout(()=>{navigate('/')},2000) 
            }else if(wordIndata[0]===search){
              allguess.push(search)
              setGuess(allguess)
              setTurn(false)
              setMessage("try again")
            }else{
              allguess.push(search)
              setGuess(allguess)
              setTurn(false)
              setMessage("invalid word ,try again")
            }
          }else{
            allguess.push(search)
            setGuess(allguess)
            setTurn(false)
            setMessage("You have already entered this word ,try again")
          }
        }
      }
    }
    const back =()=>{
        navigate('/')
    }
  
    return (
      <div className="App">
        <div style={{margin:'auto',texAlign:'center'}}>
          <div style={{margin:'auto',texAlign:'center'}}>
            {
              guess.map((v,id)=><GuessInput word={word} key={id} value={v} />)
            }
          </div>
          <div style={style}>
            <input type="text" value={v1} id='v1' onChange={(e)=>handler1(e)} style={{width:'5%',textAlign:'center'}}/>
            <input type="text" value={v2} id='v2' onChange={(e)=>handler2(e)} style={{width:'5%',textAlign:'center'}}/>
            <input type="text" value={v3} id='v3' onChange={(e)=>handler3(e)} style={{width:'5%',textAlign:'center'}}/>
            <input type="text" value={v4} id='v4' onChange={(e)=>handler4(e)} style={{width:'5%',textAlign:'center'}}/>
            <input type="text" value={v5} id='v5' onChange={(e)=>handler5(e)} style={{width:'5%',textAlign:'center'}}/>
            <button onClick={()=>clear()} style={{marginLeft:'5px'}}>clear</button>
            <button onClick={()=>back()} style={{marginLeft:'5px'}}>back to main room</button>
          </div>
          {time} remainTime
          <br/>

          <div style={{fontWeight:'bolder',color:'blue'}}>{message}</div>
          <br/>
          {word}
        </div>
  
        
      </div>
    );
}

export default Game;