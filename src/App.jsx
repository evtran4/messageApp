import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
let messages = [];

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

  setInterval(() => {fetchMessages()}, 2000)

  const [list, setList] = useState(["Loading..."])

  async function fetchMessages(){
    let response = await fetch("http://127.0.0.1:8000/getMsgs")
    let messages =  await response.json()
    console.log(messages)
    if(messages.length != list.length || list[0] == "Loading..."){
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
