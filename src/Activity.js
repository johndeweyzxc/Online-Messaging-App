import React from "react";

export default function Activity({
  UserLogs,
  setUserLogs,
  setMessages,
  Messages,
}) {
  console.log(UserLogs);
  console.log(Messages);

  // Sync data from the server
  const ServerSync = async () => {
    let response;

    let lastUserLog =
      UserLogs.length === 0 ? "Empty" : UserLogs[UserLogs.length - 1].id;
    let lastMsg =
      Messages.length === 0 ? "Empty" : Messages[Messages.length - 1].id;

    try {
      response = await fetch("http://localhost:4000/GetUpdates", {
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

      UpdatedAct = UpdatedAct === undefined ? [] : UpdatedAct;
      UpdatedMsg = UpdatedMsg === undefined ? [] : UpdatedMsg;

      setUserLogs((prev) => {
        return [...UpdatedAct, ...prev];
      });
      setMessages((prev) => {
        return [...prev, ...UpdatedMsg];
      });
    }
  };

  // Return this if there is no activity yet :(
  const NoActivity = () => {
    return (
      <div className='text-sm tracking-wide text-slate-400'>
        There is no activity yet, invite your friends!
      </div>
    );
  };

  // Component for individual activity
  const IndividualActivity = (log) => {
    return (
      <div className='font-Quicksand' key={log.id}>
        <div className='text-base font-medium mb-2 bg-slate-200 p-2 pl-4 pr-4 rounded-md'>
          {log.msg}
        </div>
      </div>
    );
  };

  // The of activity created by the users
  const ListOfActivity = () => {
    return (
      <div className='flex flex-col'>
        <div className='mb-4 bg-white p-4 h-full rounded-xl shadow-lg mr-6 flex flex-col'>
          <div
            className='
            text-xl font-semibold tracking-wide text-red-500 text-center
            '
          >{`${UserLogs.length} Activities`}</div>
          <div className='w-full h-[1px] bg-slate-300 mb-4 mt-1' />
          <div className='mb-2 overflow-auto'>
            {UserLogs.length === 0 ? (
              <NoActivity />
            ) : (
              UserLogs.map(IndividualActivity)
            )}
          </div>
        </div>
        <div
          className='
            p-2 pl-16 pr-16 mr-6 bg-green-500 text-white rounded-xl shadow-lg
            text-lg tracking-wide font-semibold cursor-pointer border-2 border-solid 
            border-green-500 hover:bg-green-600 hover:border-green-600
            transition-all ease-in text-center whitespace-nowrap'
          onClick={ServerSync}
        >
          Sync with Server
        </div>
      </div>
    );
  };

  return <ListOfActivity />;
}
