import React, { useRef } from "react";
import ApiRequest from "../ApiFunctions";

export default function MessageContent({ Name, Messages, setMessages, setUserLogs, SelectedNav }) {
  const inputRef = useRef();

  // Send a message to the server
  const SendMessage = async () => {
    const val = inputRef.current.value;

    if (val === undefined || val === "") {
      return;
    }

    const response = await ApiRequest.SendMsg(val, Name);

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
  };

  // Where the user create and sends its message
  const InputMessage = () => {
    return (
      <div className="flex w-full">
        <input
          className="p-2 pl-4 pr-4 text-lg font-Nacelle tracking-wide outline-none w-full rounded-md 
          shadow-lg border-2 border-solid border-white focus:border-CoolBlue phone:text-base"
          placeholder={"Send a message"}
          ref={inputRef}
          type={"text"}
        />
        <div
          onClick={SendMessage}
          className="flex justify-center items-center p-2 pl-4 pr-4 text-lg bg-CoolBlue text-white
          ml-6 self-center rounded-md shadow-lg tracking-wide cursor-pointer hover:bg-LightBlue
          transition-all ease-in phone:text-base font-Nacelle"
        >
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
        <div className="bg-slate-200 p-2 pl-4 pr-4 rounded-full font-Nacelle tracking-wide">
          {msg.msg}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`w-full h-full flex flex-col justify-evenly ${
        SelectedNav === "Messages" ? "block" : "hidden"
      }`}
    >
      <div className="bg-white mb-4 rounded-xl shadow-lg p-4 min-h-[90%] overflow-auto">
        {Messages.map(IndividualMessage)}
      </div>
      <InputMessage />
    </div>
  );
}
