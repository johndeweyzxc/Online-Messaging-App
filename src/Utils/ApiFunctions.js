const ApiRequest = {
  InitiateJoin: async function (UserName) {
    let response;

    try {
      response = await fetch("https://online-messaging-api.vercel.app/Join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: UserName,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    return response;
  },
  SendMsg: async function (MessageVal, UserName) {
    let response;

    try {
      response = await fetch("https://online-messaging-api.vercel.app/SendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: UserName,
          MessageContent: MessageVal,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    return response;
  },
  SyncWithServer: async function (UserLogs, Messages) {
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

    return response;
  },
};

export default ApiRequest;
