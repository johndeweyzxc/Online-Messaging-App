import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ActivityLogs from "./Pages/ActivityLogs";
import MessageContent from "./Pages/MessageContent";
import ApiRequest from "./Utils/ApiFunctions";
import About from "./Pages/About";

export default function App() {
  const [Name, setName] = useState(null);
  const [UserLogs, setUserLogs] = useState([]);
  const [Messages, setMessages] = useState([]);
  const [SelectedNav, setNav] = useState("Messages");

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

  // Sync data from the server
  const ServerSync = async () => {
    const response = await ApiRequest.SyncWithServer(UserLogs, Messages);

    if (response) {
      const result = await response.json();
      let UpdatedAct = result.ActivityLog;
      let UpdatedMsg = result.SentMessages;

      if (UpdatedAct === undefined) {
        window.location.reload(false);
      } else {
        setUserLogs((prev) => {
          return [...prev, ...UpdatedAct];
        });
      }

      if (UpdatedMsg === undefined) {
        window.location.reload(false);
      } else {
        setMessages((prev) => {
          return [...prev, ...UpdatedMsg];
        });
      }
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const selectNav = (SelectedNav) => {
    setAnchorEl(null);
    if (SelectedNav === "Sync with Server") {
      ServerSync();
    } else {
      setNav(SelectedNav);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const NavMenu = [
    { name: "About" },
    { name: "Messages" },
    { name: "Logs" },
    { name: "Sync with Server" },
  ];

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
      <div className="h-screen w-screen">
        <div className="w-full bg-CoolBlue p-3 flex justify-start items-center">
          <GiHamburgerMenu
            className="text-4xl text-white cursor-pointer"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <h2 className="ml-4 text-white font-Nacelle tracking-wide text-xl">{SelectedNav}</h2>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {NavMenu?.map((nav, i) => (
              <MenuItem onClick={() => selectNav(nav?.name)} key={i}>
                {nav?.name}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div
          className={`p-6 h-screen ${
            SelectedNav === "Messages" ? "bg-slate-300" : "bg-white"
          } phone:p-4`}
        >
          <MessageContent
            SelectedNav={SelectedNav}
            Name={Name}
            Messages={Messages}
            setMessages={setMessages}
            setUserLogs={setUserLogs}
          />
          <ActivityLogs SelectedNav={SelectedNav} UserLogs={UserLogs} />
          <About SelectedNav={SelectedNav} />
        </div>
      </div>
    );
  }
}
