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
      if(value[j]==word[j]){
        greenLetter.push([j,value[j]])
      }else if((value[j]==word[arr1[0]])||(value[j]==word[arr1[1]])||(value[j]==word[arr1[2]])||(value[j]==word[arr1[3]])){
        yellowLetter.push([j,value[j]])
      }else{
        redletter.push(value[j])
      }
    }
  }

  return {greenLetter,yellowLetter,redletter}
}


const random1=async(word,data)=>{
  let guess=data[Math.ceil(Math.random()*672)]
  while ((guess===word)) {
    guess=data[Math.ceil(Math.random()*672)]
  }
  console.log("robot level 1")
  return guess;
}
const random2=async(word,data,list)=>{
  let {greenLetter,yellowLetter,redletter}=await getLetter(list,word)
  let search=[]
  let random=Math.random()
  if((random>0.8)&&(greenLetter.length!==0)){
    for(let i=0;i<greenLetter.length;i++){
      let arr=greenLetter[i]
      let j=arr[0]
      let letter=arr[1]
      let searched=data.filter(v=>v[j]==letter)
      search.push(...searched)
    }

  }else if((yellowLetter.length!==0)){
    for(let i=0;i<yellowLetter.length;i++){
      let arr=yellowLetter[i]
      let j=arr[0];
      let letter=arr[1]
      let arr1=arrConst.filter(v=>v!==j)
      let searched=data.filter(v=>(v[arr1[0]]==letter)||(v[arr1[1]]==letter)||(v[arr1[2]]==letter)||(v[arr1[3]]==letter))
      search.push(...searched)
    }
  }else{
    for(let i=0;i<redletter.length;i++){
      let letter=redletter[i]
      let searched=data.filter(v=>(v[0]!==letter)&&(v[1]!==letter)&&(v[2]!==letter)&&(v[3]!==letter)&&(v[4]!==letter))
      search.push(...searched)
    }
  }
  let guess=search[Math.ceil(Math.random()*search.length)]
  let wordIndata=list.filter(v=>v==guess)
  while ((guess===word)||(wordIndata==guess)) {
    guess=search[Math.ceil(Math.random()*search.length)]
    wordIndata=list.filter(v=>v==guess)
  }
  console.log("robot level 2")
  return guess;
}
const random3=async(word,data,list)=>{
  let {greenLetter,yellowLetter,redletter}=await getLetter(list,word)
  let search=[]
  let random=Math.random()
  if((random>0.6)&&(greenLetter.length!==0)){
    for(let i=0;i<greenLetter.length;i++){
      let arr=greenLetter[i]
      let j=arr[0]
      let letter=arr[1]
      let searched=data.filter(v=>v[j]==letter)
      search.push(...searched)
    }
  }else if((random>0.3)&&(yellowLetter.length!==0)){
    for(let i=0;i<yellowLetter.length;i++){
      let arr=yellowLetter[i]
      let j=arr[0];
      let letter=arr[1]
      let arr1=arrConst.filter(v=>v!==j)
      let searched=data.filter(v=>(v[arr1[0]]==letter)||(v[arr1[1]]==letter)||(v[arr1[2]]==letter)||(v[arr1[3]]==letter))
      search.push(...searched)
    }
  }else{
    for(let i=0;i<redletter.length;i++){
      let letter=redletter[i]
      let searched=data.filter(v=>(v[0]!==letter)&&(v[1]!==letter)&&(v[2]!==letter)&&(v[3]!==letter)&&(v[4]!==letter))
      search.push(...searched)
    }
  }
  let guess=search[Math.ceil(Math.random()*search.length)]
  let wordIndata=list.filter(v=>v==guess)
  while (wordIndata===guess) {
    guess=search[Math.ceil(Math.random()*search.length)]
    wordIndata=list.filter(v=>v==guess)
  }
  console.log("robot level 3")
  return guess;
}
const random6=async(word,data,list)=>{
  let {greenLetter,yellowLetter,redletter}=await getLetter(list,word)
  let search=[]
  let guess=""
  if(greenLetter.length==0){
    guess=await random3(word,data,list)
  }else{
    data.map(v=>{
      let sum=0;
      for(let i=0;i<greenLetter.length;i++){
        if(greenLetter[i][1]==v[greenLetter[i][0]]){
          sum++;
        }
      }
      if(sum>0){
        search.push([v,sum])
      }
    })
  
    let maxnumber=0;
    search.map(v=>{
      if(v[1]>=maxnumber){
        guess=v[0]
        maxnumber=v[1]
      }
    })
    maxnumber=0;
    search=search.filter(v=>v[0]!==guess)
    let wordIndata=list.filter(v=>v==guess)

    while(wordIndata==guess){
      search.map(v=>{
        if(v[1]>maxnumber){
          guess=v[0]
          maxnumber=v[1]
        }
      })
      search=search.filter(v=>v[0]!=guess)
      wordIndata=list.filter(v=>v==guess)
      maxnumber=0;
    }
  }
  console.log("robot level 6")
  return guess;
}
const random10=async(word,data,list)=>{
  let {greenLetter,yellowLetter,redletter}=await getLetter(list,word)
  let search=[]
  let guess=""
  if(greenLetter.length==0){
    guess=await random3(word,data,list)
  }else{
    data.map(v=>{
      let sum=0;
      for(let i=0;i<greenLetter.length;i++){
        if(greenLetter[i][1]==v[greenLetter[i][0]]){
          sum++;
        }
      }
      for(let i=0;i<yellowLetter.length;i++){
        if((yellowLetter[i][1]==v[0])||(yellowLetter[i][1]==v[1])||(yellowLetter[i][1]==v[2])||(yellowLetter[i][1]==v[3])||(yellowLetter[i][1]==v[4])){
          sum++;
        }
      }
      if(sum>0){
        search.push([v,sum])
      }
    })

    let maxnumber=0;
    search.map(v=>{
      if(v[1]>=maxnumber){
        guess=v[0]
        maxnumber=v[1]
      }
    })
    
    maxnumber=0;
    search=search.filter(v=>v[0]!==guess)
    let wordIndata=list.filter(v=>v==guess)
    while(wordIndata==guess){
      search.map(v=>{
        if(v[1]>maxnumber){
          guess=v[0]
          maxnumber=v[1]
        }
      })
      search=search.filter(v=>v[0]!=guess)
      wordIndata=list.filter(v=>v==guess)
      maxnumber=0;
    }
  }
  console.log("robot level 10")
  return guess;
}




async function robot(level,list,word){
  let data=await getData();

  let guess='';

  if(level=='easy'){
    if(list.length<2){
      guess=await random1(word,data)
    }else if(list.length<5){
      guess=await random2(word,data,list);
    }else if(list.length<17){
      guess=await random3(word,data,list);
    }else{
      guess=await random6(word,data,list)
    }

  }else if(level=='normal'){
    if(list.length<2){
      guess=await random1(word,data)
    }else if(list.length<4){
      guess=await random2(word,data,list);
    }else if(list.length<10){
      guess=await random3(word,data,list);
    }else if(list.length<12){
      guess=await random6(word,data,list)
    }else{
      guess=await random10(word,data,list)
    }
  }else{
    if(list.length<2){
      guess=await random1(word,data)
    }else if(list.length<7){
      guess=await random3(word,data,list);
    }else if(list.length<10){
      guess=await random6(word,data,list)
    }else{
      guess=await random10(word,data,list)
    }
  }
  return guess;

}

export default robot;