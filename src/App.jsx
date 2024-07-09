import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
let oldMessages = [];

async function addMsg(text){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "text": text
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch("http://127.0.0.1:8000/addMsg", requestOptions)
}


function App() {
  const [list, setList] = useState(["Loading..."])
  setInterval(() => {fetchMessages()}, 5000)

  async function fetchMessages(){
    let response = await fetch("http://127.0.0.1:8000/getMsgs")
    let messages =  await response.json()
    console.log("fetching")
    console.log(oldMessages.length)
    if(true){
      console.log(messages.length)
      oldMessages = messages; 
      console.log(messages)
      setList(messages)
    }
  }



  return (
    <>
      <input  id = "input" type="text"></input>

      <button onClick = {() => {
        let text = document.getElementById("input").value; 
        addMsg(text);
        list.push(text)
        let temp = [...list]
        setList(temp)
        document.getElementById("input").value = "";
        }}>Submit
      </button>

      <div>
        {list.map((item) => (
          <p>{item}</p>
        ))}
      </div>

 
    </>
  )
}

export default App
