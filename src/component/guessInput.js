import { useEffect,useState } from "react"


function GuessInput({value,word}){
    const [style1,setStyle1]=useState({width:'5%',textAlign:'center'})
    const [style2,setStyle2]=useState({width:'5%',textAlign:'center'})
    const [style3,setStyle3]=useState({width:'5%',textAlign:'center'})
    const [style4,setStyle4]=useState({width:'5%',textAlign:'center'})
    const [style5,setStyle5]=useState({width:'5%',textAlign:'center'})

    useEffect(()=>{
        let timeout=setTimeout(()=>{
            if((value.length===5)&&(typeof(value)==='string')){
            if(value[0]===word[0]){
                setStyle1({width:'5%',textAlign:'center',backgroundColor:'green'})
            }else if(value[0]===word[1]||value[0]===word[2]||value[0]===word[3]||value[0]===word[4]){
                setStyle1({width:'5%',textAlign:'center',backgroundColor:'yellow'})
            }else{
                setStyle1({width:'5%',textAlign:'center',backgroundColor:'gray'})
            }
            if(value[1]===word[1]){
                setStyle2({width:'5%',textAlign:'center',backgroundColor:'green'})
            }else if(value[1]===word[0]||value[1]===word[2]||value[1]===word[3]||value[1]===word[4]){
                setStyle2({width:'5%',textAlign:'center',backgroundColor:'yellow'})
            }else{
                setStyle2({width:'5%',textAlign:'center',backgroundColor:'gray'})
            }
            if(value[2]===word[2]){
                setStyle3({width:'5%',textAlign:'center',backgroundColor:'green'})
            }else if(value[2]===word[1]||value[2]===word[0]||value[2]===word[3]||value[2]===word[4]){
                setStyle3({width:'5%',textAlign:'center',backgroundColor:'yellow'})
            }else{
                setStyle3({width:'5%',textAlign:'center',backgroundColor:'gray'})
            }
            if(value[3]===word[3]){
                setStyle4({width:'5%',textAlign:'center',backgroundColor:'green'})
            }else if(value[3]===word[1]||value[3]===word[2]||value[3]===word[0]||value[3]===word[4]){
                setStyle4({width:'5%',textAlign:'center',backgroundColor:'yellow'})
            }else{
                setStyle4({width:'5%',textAlign:'center',backgroundColor:'gray'})
            }
            if(value[4]===word[4]){
                setStyle5({width:'5%',textAlign:'center',backgroundColor:'green'})
            }else if(value[4]===word[1]||value[4]===word[2]||value[4]===word[3]||value[4]===word[0]){
                setStyle5({width:'5%',textAlign:'center',backgroundColor:'yellow'})
            }else{
                setStyle5({width:'5%',textAlign:'center',backgroundColor:'gray'})
            }}else{
                console.log("guess is invalid")
            }
        },1000)
        return()=>{
            clearTimeout(timeout)
        }
    },[word,value])

    return(
        <div style={{margin:'auto',texAlign:'center'}}>
          <input type="text" value={value[0]} style={style1} readOnly/>
          <input type="text" value={value[1]} style={style2} readOnly/>
          <input type="text" value={value[2]} style={style3} readOnly/>
          <input type="text" value={value[3]} style={style4} readOnly/>
          <input type="text" value={value[4]} style={style5} readOnly/>
        </div>  
    )

}
export default GuessInput;