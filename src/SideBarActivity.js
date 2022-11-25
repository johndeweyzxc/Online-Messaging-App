import React from "react";
import "./Style/activity.css";
import { GrClose } from "react-icons/gr";

function SideBarActivity({ UserLogs, setUserLogs, setMessages, Messages, OpenNav, setOpenNav }) {
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

  return (
    <div
      className={`h-screen w-screen absolute hidden tablet:flex 
       ${OpenNav ? "z-10" : "z-0 "}`}
    >
      <div
        className={`bg-white shadow-2xl border-r-[1px] border-solid 
        border-slate-400 transition-all duration-300 ease-in-out
        ${OpenNav ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end m-2">
            <GrClose className="text-4xl" onClick={() => setOpenNav(false)} />
          </div>

          <div className="bg-white p-2 rounded-xl h-auto">
            <div className="Activities">{`${UserLogs.length} Activities`}</div>
            <div className="w-full h-[1px] bg-slate-300 mb-4 mt-1" />

            <div className="min-h-[28rem] max-h-[28rem] overflow-auto">
              {UserLogs.length === 0 ? <NoActivity /> : UserLogs.map(IndividualActivity)}
            </div>
          </div>

          <div className="SyncServer" onClick={ServerSync}>
            Sync with Server
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarActivity;
