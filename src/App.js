import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import Activity from "./Activity";
import MessageContent from "./MessageContent";
import SideBarActivity from "./SideBarActivity";
import ApiRequest from "./ApiFunctions";

function App() {
  const [Name, setName] = useState(null);
  const [UserLogs, setUserLogs] = useState([]);
  const [Messages, setMessages] = useState([]);
  const [OpenNav, setOpenNav] = useState(false);

  // Join to the server
  const JoinServer = async (UserName) => {
    const response = await ApiRequest.InitiateJoin(UserName);

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
    let name = prompt("Enter your name (Must be 3 to 10 characters with no spaces)");
    JoinServer(name);
  } else {
    return (
      <div className="h-screen w-screen flex flex-col">
        <header className="bg-CoolBlue hidden tablet:block p-3 z-10">
          <GiHamburgerMenu className="text-4xl text-white" onClick={() => setOpenNav(true)} />
        </header>
        <div className="flex p-6 h-full bg-slate-200 phone:p-4 tablet:z-10">
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
        <SideBarActivity
          UserLogs={UserLogs}
          setUserLogs={setUserLogs}
          Messages={Messages}
          setMessages={setMessages}
          OpenNav={OpenNav}
          setOpenNav={setOpenNav}
        />
      </div>
    );
  }
}

export default App;
