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
};

export default ApiRequest;
