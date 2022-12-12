import React from "react";

export default function About({ SelectedNav }) {
  return (
    <div className={`${SelectedNav === "About" ? "block" : "hidden"} font-Quicksand`}>
      <h1 className="text-4xl font-bold mb-4 phone:text-3xl sphone:text-2xl">Online Messaging App</h1>
      <div className="text-xl sphone:text-lg mb-4">Hello! Welcome to my online messaging app</div>
      <div className="text-lg sphone:text-base mb-4">
        This is the about page, if you want to navigate please click the nav button on the top left
        corner of the screen. The Messages page is where the individual message appear sent by users of
        this app. The Logs page is the information about the activity of each user such as if someone
        joined the group or sent a message. The Donate page is where you can donate to the creator of
        this site, any amount is appreciated.
      </div>
      <div className="text-lg sphone:text-base mb-4">
        The Sync with the Server is where you can fetch or get update from the server. When clicked it
        will send your latest messages or logs to the server and the server will respond with a new data.
        It is important that you click this if you want to see if there is new messages. The app does not
        use realtime communication or a web socket.
      </div>
      <div className="text-lg sphone:text-base pb-8">
        Online Messaging App is open source, you can check out the frontend source code{" "}
        <a
          href="https://github.com/johndeweyzxc/Online-Messaging-App"
          className="text-CoolBlue underline font-semibold"
          rel="noreferrer"
          target={"_blank"}
        >
          here
        </a>
        . The backend source code is also available{" "}
        <a
          href="https://github.com/johndeweyzxc/Online-Messaging-API"
          className="text-CoolBlue underline font-semibold"
          rel="noreferrer"
          target={"_blank"}
        >
          here
        </a>
        . I use Firebase hosting to host the frontend ui and Vercel to host the backend.
      </div>
    </div>
  );
}
