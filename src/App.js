import React, {useState} from "react";

import Activity from "./Activity";
import MessageContent from "./MessageContent";

function App() {
  const [Name, setName] = useState(null);
  const [UserLogs, setUserLogs] = useState([]);
  const [Messages, setMessages] = useState([]);

  // Join to the server
  const JoinServer = async (Value) => {
    let response;

    // Cloud API https://online-messaging-api.vercel.app/
    // Localhost http://localhost:4000

    try {
      response = await fetch("https://online-messaging-api.vercel.app/Join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: Value,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const result = await response.json();
      if (response.status === 400) {
        alert(result.Error);
        window.location.reload(false);
      } else {
        localStorage.setItem("localName", result.Name);
        setUserLogs(result.ActivityLog);
        setMessages(result.SentMessages);
        setName(result.Name);
      }
    }
  };

  // User previously used the app and has joined the server before.
  if (localStorage.getItem("localName") && Name === null) {
    JoinServer(localStorage.getItem("localName"));
  }

  // The user is new to the app and has not joined the server before.
  if (Name === null && !localStorage.getItem("localName")) {
    let name = prompt(
      "Enter your name (Must be 3 to 10 characters with no spaces)"
    );
    JoinServer(name);
  } else {
    return (
      <div className='w-screen h-screen bg-slate-200 flex p-6'>
        <Activity
          UserLogs={UserLogs}
          setUserLogs={setUserLogs}
          Messages={Messages}
          setMessages={setMessages}
        />
        <MessageContent
          Name={Name}
          Messages={Messages}
          setMessages={setMessages}
          setUserLogs={setUserLogs}
        />
      </div>
    );
  }
}

export default App;
