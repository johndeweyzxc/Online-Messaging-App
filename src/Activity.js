import React from "react";

import "./Style/activity.css";

export default function Activity({ UserLogs, setUserLogs, setMessages, Messages }) {
  // Sync data from the server
  const ServerSync = async () => {
    let response;

    let lastUserLog = UserLogs.length === 0 ? "Empty" : UserLogs[UserLogs.length - 1].id;
    let lastMsg = Messages.length === 0 ? "Empty" : Messages[Messages.length - 1].id;

    try {
      response = await fetch("https://online-messaging-api.vercel.app/GetUpdates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          LatestMsgId: lastMsg,
          LActivityId: lastUserLog,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const result = await response.json();
      let UpdatedAct = result.ActivityLog;
      let UpdatedMsg = result.SentMessages;

      // console.log(UpdatedAct);
      // console.log(UpdatedMsg);

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

  // Return this if there is no activity yet :(
  const NoActivity = () => {
    return (
      <div className="text-sm tracking-wide text-slate-400">
        There is no activity yet, invite your friends!
      </div>
    );
  };

  // Component for individual activity
  const IndividualActivity = (log) => {
    return (
      <div className="font-Quicksand" key={log.id}>
        <div className="text-base font-medium mb-2 bg-slate-200 p-2 pl-4 pr-4 rounded-md">{log.msg}</div>
      </div>
    );
  };

  // The of activity created by the users
  const ListOfActivity = () => {
    return (
      <div className="flex flex-col">
        <div className="mb-4 bg-white p-4 h-full rounded-xl shadow-lg mr-6 flex flex-col">
          <div className="Activities">{`${UserLogs.length} Activities`}</div>
          <div className="w-full h-[1px] bg-slate-300 mb-4 mt-1" />
          <div className="mb-2 overflow-auto">
            {UserLogs.length === 0 ? <NoActivity /> : UserLogs.map(IndividualActivity)}
          </div>
        </div>
        <div className="SyncServer" onClick={ServerSync}>
          Sync with Server
        </div>
      </div>
    );
  };

  return <ListOfActivity />;
}
