import React from "react";

import "../Styles/activities.css";

export default function ActivityLogs({ SelectedNav, UserLogs }) {
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
        <div className="IndividualActivity">{log.msg}</div>
      </div>
    );
  };

  return (
    <div className={`h-full w-full overflow-y-auto ${SelectedNav === "Logs" ? "block" : "hidden"}`}>
      {UserLogs.length === 0 ? <NoActivity /> : UserLogs.map(IndividualActivity)}
    </div>
  );
}
