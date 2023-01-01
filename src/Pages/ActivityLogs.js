import React from "react";

export default function ActivityLogs({ SelectedNav, UserLogs }) {
  // Return this if there is no activity yet :(
  const NoActivity = () => {
    return <div className="text-sm tracking-wide">There is no activity yet, invite your friends!</div>;
  };

  // Component for individual activity
  const IndividualActivity = (log) => {
    return (
      <div className="font-Nacelle tracking-wide" key={log.id}>
        <div className="text-base font-medium mb-2 rounded-md whitespace-nowrap">{log.msg}</div>
      </div>
    );
  };

  return (
    <div className={`h-full w-full overflow-y-auto ${SelectedNav === "Logs" ? "block" : "hidden"}`}>
      {UserLogs.length === 0 ? <NoActivity /> : UserLogs.map(IndividualActivity)}
    </div>
  );
}
