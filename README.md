<h1>Online Messaging App</h1>

Online Messaging App is similar to messaging platforms, a user can send and receive messages from around the world. You can visit the app at https://online-messaging-fe4ec.web.app the page would not render properly on phone size devices, responsive design is currently under development.

<h3>How to run?</h3>

```
$npm start
```

<h3>Deployment</h3>

1. I use firebase to host the front end, you need to install the firebase tools.

```
$npm install -g firebase-tools
```

2. Cd into the directory and build the app

```
$npm run build
```

3. Initialize firebase

```
$firebase init
```

4. Deploy

```
$firebase deploy
```

<h3>Rest API Backend</h3>
I use vercel to host the backend api you can check the source code here https://github.com/johndeweyzxc/Online-Messaging-API

<h3>Additional notes</h3>

Vercel does not support web sockets so I was not able to utilize a realtime data from the server.
