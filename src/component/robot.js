const getData=async()=>{
  let res=await fetch('http://localhost:3000/words.txt')
  let data=await res.text()
  let mydata=data.split(',')
  return mydata;
}
var arrConst=[0,1,2,3,4]
const getLetter=async(list,word)=>{
  let yellowLetter=[]
  let greenLetter=[]
  let redletter=[]
  for(let i=0;i<list.length;i++){
    let value=list[i];
    for(let j=0;j<=4;j++){
      let arr1=arrConst.filter(v=>v!==j)
      if(value[j]===word[j]){
        greenLetter.push([j,value[j]])
      }else if((value[j]===word[arr1[0]])||(value[j]===word[arr1[1]])||(value[j]===word[arr1[2]])||(value[j]===word[arr1[3]])){
        yellowLetter.push([j,value[j]])
      }else{
        redletter.push(value[j])
      }
    }
  }
  return {greenLetter,yellowLetter,redletter}
}


//*** Random Fuctions ***//

// In random 1 robot can not guess correct word 
const random1=async(word,data)=>{
  let guess=data[Math.floor(Math.random()*672)]
  while ((guess===word)) {
    guess=data[Math.floor(Math.random()*672)]
  }
  console.log("robot level 1")
  return guess;
}
// In random 2 robot can not guess correct word But guess a random word that has greenletter in correct position or has yellowletter in other positions
const random2=async(word,data,list)=>{
  let {greenLetter,yellowLetter}=await getLetter(list,word)
  let search=[]
  let guess="";
  let wordInList=[];
  if((greenLetter.length===0)&&(yellowLetter.length===0)){
    guess=await random1(word,data)
  }else{
    data.map(v=>{
      let sum=0;
      if(greenLetter.length!==0){
        for(let i=0;i<greenLetter.length;i++){
          if(greenLetter[i][1]===v[greenLetter[i][0]]){
            sum++;
          }
        }
      }
      if(yellowLetter.length!==0){
        for(let i=0;i<yellowLetter.length;i++){
          if((yellowLetter[i][1]===v[0])||(yellowLetter[i][1]===v[1])||(yellowLetter[i][1]===v[2])||(yellowLetter[i][1]===v[3])||(yellowLetter[i][1]===v[4])){
            sum++;
          }
        }
      }
      if(sum>0){
        search.push([v,sum])
      }
      return v;
    })

    const changeGuess=()=>{
      guess=search[Math.floor(Math.random()*search.length)][0]
      search=search.filter(v=>v[0]!==guess)
      wordInList=list.filter(v=>v===guess)
    }
    do {
      changeGuess();
    } while ((wordInList[0]===guess)||(word===guess));
  }
  console.log("robot level 2")
  return guess;
}

const random3=async(word,data,list)=>{
  // this function choose a word and guess a random word that has greenletter in correct position
  let {greenLetter}=await getLetter(list,word)
  let search=[]
  let guess="";
  let wordInList=[];
  if(greenLetter.length===0){
    guess=await random3(word,data,list)
  }else{
    data.map(v=>{
      let sum=0;
      for(let i=0;i<greenLetter.length;i++){
        if(greenLetter[i][1]===v[greenLetter[i][0]]){
          sum++;
        }
      }
      if(sum>0){
        search.push([v,sum])
      }
      return v;
    })

    const changeGuess=()=>{
      guess=search[Math.floor(Math.random()*search.length)][0]
      search=search.filter(v=>v[0]!==guess)
      wordInList=list.filter(v=>v===guess)
    }

    do {
      changeGuess();
    } while (wordInList[0]===guess);
  }
  console.log("robot level 3")
  return guess;
}

const random5=async(word,data,list)=>{
  // this function choose a word and guess each word has the largest number of yellowletter in other positions
  let {yellowLetter}=await getLetter(list,word)
  let search=[]
  let guess="";
  let wordInList=[];
  if(yellowLetter.length===0){
    guess=await random3(word,data,list)
  }else{
    data.map(v=>{
      let sum=0;
      for(let i=0;i<yellowLetter.length;i++){
        if((yellowLetter[i][1]===v[0])||(yellowLetter[i][1]===v[1])||(yellowLetter[i][1]===v[2])||(yellowLetter[i][1]===v[3])||(yellowLetter[i][1]===v[4])){
          sum++;
        }
      }
      if(sum>0){
        search.push([v,sum])
      }
      return v;
    })

    let maxnumber=0;
    const changeGuess=()=>{
      search.map(v=>{
        if(v[1]>=maxnumber){
          guess=v[0]
          maxnumber=v[1]
        }
        return v;
      })
      search=search.filter(v=>v[0]!==guess)
      wordInList=list.filter(v=>v===guess)
      maxnumber=0;
    }

    do {
      changeGuess();
    } while (wordInList[0]===guess);
  }
  console.log("robot level 5")
  return guess;
}


const random6=async(word,data,list)=>{
  // this function choose a word and guess each word has the largest number of greenletter in correct position
  let {greenLetter}=await getLetter(list,word)
  let search=[]
  let guess="";
  let wordInList=[];
  if(greenLetter.length===0){
    guess=await random5(word,data,list)
  }else{
    data.map(v=>{
      let sum=0;
      for(let i=0;i<greenLetter.length;i++){
        if(greenLetter[i][1]===v[greenLetter[i][0]]){
          sum++;
        }
      }
      if(sum>0){
        search.push([v,sum])
      }
      return v;
    })
  
    let maxnumber=0;
    const changeGuess=()=>{
      search.map(v=>{
        if(v[1]>=maxnumber){
          guess=v[0]
          maxnumber=v[1]
        }
        return v;
      })
      search=search.filter(v=>v[0]!==guess)
      wordInList=list.filter(v=>v===guess)
      maxnumber=0;
    }
  
    do {
      changeGuess();
    } while (wordInList[0]===guess);
  }
  console.log("robot level 6")
  return guess;
}

const random10=async(word,data,list)=>{
  // this function choose a word and guess each word has the largest number of greenletter in correct position and yellowletter in other positions
  let {greenLetter,yellowLetter}=await getLetter(list,word)
  let search=[]
  let guess="";
  let wordInList="";
  if(greenLetter.length===0){
    guess=await random5(word,data,list)
  }else{
    data.map(v=>{
      let sum=0;
      for(let i=0;i<greenLetter.length;i++){
        if(greenLetter[i][1]===v[greenLetter[i][0]]){
          sum++;
        }
      }
      for(let i=0;i<yellowLetter.length;i++){
        if((yellowLetter[i][1]===v[0])||(yellowLetter[i][1]===v[1])||(yellowLetter[i][1]===v[2])||(yellowLetter[i][1]===v[3])||(yellowLetter[i][1]===v[4])){
          sum++;
        }
      }
      if(sum>0){
        search.push([v,sum])
      }
      return v;
    })

    let maxnumber=0;
    const changeGuess=()=>{
      search.map(v=>{
        if(v[1]>=maxnumber){
          guess=v[0]
          maxnumber=v[1]
        }
        return v;
      })
      search=search.filter(v=>v[0]!==guess)
      wordInList=list.filter(v=>v===guess)
      maxnumber=0;
    }
    do {
      changeGuess();
    } while (wordInList[0]===guess);
  }
  console.log("robot level 10")
  return guess;
}




async function robot(level,list,word){
  let data=await getData();
  let guess='';

  if(level==='easy'){
    if(list.length<3){
      guess=await random1(word,data)
    }else if(list.length<5){
      guess=await random2(word,data,list);
    }else if(list.length<9){
      guess=await random3(word,data,list);
    }else if(list.length<11){
      guess=await random5(word,data,list);
    }else{
      guess=await random6(word,data,list)
    }

  }else if(level==='normal'){
    if(list.length<2){
      guess=await random1(word,data)
    }else if(list.length<4){
      guess=await random2(word,data,list);
    }else if(list.length<6){
      guess=await random3(word,data,list);
    }else if(list.length<8){
      guess=await random5(word,data,list);
    }else if(list.length<12){
      guess=await random6(word,data,list)
    }else{
      guess=await random10(word,data,list)
    }
  }else{
    if(list.length<2){
      guess=await random1(word,data)
    }else if(list.length<3){
      guess=await random2(word,data,list);
    }else if(list.length<4){
      guess=await random3(word,data,list)
    }else if(list.length<7){
      guess=await random5(word,data,list)
    }else if(list.length<8){
      guess=await random6(word,data,list)
    }else{
      guess=await random10(word,data,list)
    }
  }

  return guess;
}

export default robot;