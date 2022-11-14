import React, { useRef } from "react";

import "./Style/messages.css";

export default function MessageContent({ Name, Messages, setMessages, setUserLogs }) {
  const inputRef = useRef();

  // Send a message to the server
  const SendMessage = async () => {
    const val = inputRef.current.value;
    let response;

    if (val === undefined) {
      return;
    }

    if (val !== "") {
      try {
        response = await fetch("https://online-messaging-api.vercel.app/SendMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserName: Name,
            MessageContent: val,
          }),
        });
      } catch (error) {
        console.log(error);
      }

      if (response) {
        const result = await response.json();
        if (response.status === 400) {
          alert(result.Error);
        } else {
          setMessages((prev) => {
            return [...prev, result.newMsg];
          });
          setUserLogs((prev) => {
            return [...prev, result.newLogMsg];
          });
        }
      }
    } else {
      return;
    }
  };

  // Where the user create and sends its message
  const InputMessage = () => {
    return (
      <div className="flex w-full">
        <input className="InputMessage" placeholder={"Send a message"} ref={inputRef} type={"text"} />
        <div onClick={SendMessage} className="Send">
          Send
        </div>
      </div>
    );
  };

  // The indivual message inside the message view
  const IndividualMessage = (msg) => {
    return (
      <div key={msg.id} className="mb-4 w-max">
        <div className="text-xs text-slate-400 tracking-wider pl-2 mb-1">{msg.creator}</div>
        <div className="bg-slate-200 p-2 pl-4 pr-4 rounded-full">{msg.msg}</div>
      </div>
    );
  };

  // This is the list of the message
  const MessageView = () => {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex-grow mb-4">
          <div className="bg-white h-full mb-4 rounded-xl shadow-lg p-4">
            {Messages.map(IndividualMessage)}
          </div>
        </div>
        <InputMessage />
      </div>
    );
  };

  return <MessageView />;
}
