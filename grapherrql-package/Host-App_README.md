# **Integration of GraphErrQL at Host App**

## **Overview**

GraphErrQL is a package (_grapherrql_) designed for deployment as a middleware endpoint to an existing GraphQL based Host App. After setup is complete, the following are key points of function

- Host app will open a **SSE** (_Server-Sent-Events_) server, ready to accept client connection requests to the **_'\<host_app>:\<server_port>/events'_** endpoint
- Navigating to **_'\<host_app>:\<server_port>/grapherrql'_** will cause '_grapherrql_' frontend files to be served to browser
- Upon initial browser rendering, **GraphErrQL** will initiate a new SSE client connection and will immediately receive any cached GraphQL queries from the Host App server. These will be logged to the main page "Live Mode" of **GraphErrQL**
- Any future GraphQL queries made on the Host App client will be forwarded over the SSE connection and logged on GraphErrQL **live**, prior to proceeding with processing on the Host App. Results will then be copied to GraphErrQL on its way back to the Host App client.

### Compatibility

- Current initial release is designed only for Express-based Host Apps capable of including the 'extensions' option on the local GraphQL server. Iterating to allow for Apollo Host App integration is a focus point and we would love help! This is likely to have most of the answers: https://dev.to/seancwalsh/how-to-write-graphql-middleware-node-apollo-server-express-2h87

## Install Package

```
npm i grapherrql
```

## **Setup SSE Server**

### Create Stores for SSE Events and Clients

```
let SSE_Events = []
let SSE_Clients = []
```

### Add Event Handler

The Event Handler will accept new SSE connections from clients (in our case just one, GraphErrQL), making them persistent via special HTTP headers. Sends new client all current events upon startup. Saves client info.

```
function eventsHandler(req, res, next) {
  const headers = {
    "Content-Type": "text/event-stream",
    "Connection": "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);
  const data = `data: ${JSON.stringify(SSE_Events)}\n\n`;
  console.log(`SENDING DATA TO NEW CLIENT: ${data}`);
  res.write(data);

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  console.log(`CLIENT ADDED`);
  SSE_Clients.push(newClient);
  req.on('close', () => {
    console.log(`${clientId} | CONN CLOSED`);
    SSE_Clients = SSE_Clients.filter((client) => client.id !== clientId);
  });
}
```

### Add SSE-required Encoding

```
app.use(express.json());
app.use(express.urlencoded({extended: false}));
```

## Add GraphQL Middleware to Capture Queries

Called when _/graphql_ receives new request from Host App client, prior to GraphQL processing. Adds the query to those saved, then sends it to any open SSE clients.

```
const addQueryMiddleware = (req, res, next) => {
  const newQuery = req.body;
  SSE_Events.push(newQuery);
  sendEventToClients(newQuery);
  next();
};
```

## Add Function to Send Event to Clients

```
const sendEventToClients = (newEvent) => {
  SSE_Clients.forEach((client) =>
  client.res.write(`data: ${JSON.stringify(newEvent)}\n\n`)
  );
};
```

## Define GraphQL Extensions Callback

This attaches to the GraphQLHTTP server and runs after Query is processed into result. We use it to store that result and forward it to SSE clients

```
const extensions = ({
  result,
}) => {
  SSE_Events.push(result);
  sendEventToClients(result);
}
```

## Add SSE Endpoint

Request to this URL from GraphErrQL will result in established SSE connection by invoking the Event Handler. The Path to the Host App endpoint will be injected into GraphErrQL html file as a Cookie and used to start the client connection.

```
app.get('/events', eventsHandler);
const HOST_APP_SSE_PATH = '<host_app>:<server_port>/events';
```

## Add GraphQL Endpoint

This will serve Queries from Host App clients. Note the middleware to copy/forward the query to GraphErrQL and the included _extensions_ option

```
app.use(
  '/graphql',
  addQueryMiddleware,
  graphqlHTTP((req) => {
    return {
      schema: schema,
      graphiql: false,
      customFormatErrorFn: (error) => {
        SSE_Events.push(error);
        sendEventToClients(error);
        return error;
      },
      extensions
    };
  })
);
```

## Add GraphErrQL Module/Endpoint

Require the package:

```
import * as graphErr from 'grapherrql';
```

This is the endpoint that will actually render GraphErrQL in the browser:

```
app.use(express.static(graphErr.directoryPath));
app.get('/grapherrql', function (req, res) {
    let data = fs.readFileSync(graphErr.defaultFilePath, 'utf8');
    res.send(data.replace('<param1_replace>', HOST_APP_SSE_PATH));
});
```

# Using GraphErrQL on your Host App

1. Start your Host App server.
2. Open two browser terminals to;
    - **Host App frontend**: from here you will use the Host App, generating Queries/Mutations
    - **<host_app>:<server_port>/grapherrql**: This launches GraphErrQL, allowing you to test new Queries or capture queries Live from the Host App
