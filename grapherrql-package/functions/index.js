const fs = require('fs');
const path = require('path');
//Store GraphQL Queries as they arrive from HostApp client. Any stored will be sent to GraphERRQL clients when they come up.
let SSE_Events = [];
let SSE_Clients = [];


const serveGrapherrql = (serverPort) => {
  const eventsURI = `http://localhost:${serverPort}/events`;
  return (req, res) => {
    let data = fs.readFileSync(path.resolve('../../build/index.html'), 'utf8');
    res.send(data.replace('<param1_replace>', eventsURI));
  };
};
//Accept new SSE (Server-Sent-Events) connections from clients, makes them persistent via special HTTP headers. Sends new client all current queries upon startup. Subsequent queries will be added and forwarded by 'addQueryMiddleware'. Saves client info. Can server multiple clients simultaneously, but GraphERRQL is currently only one.
const eventsHandler = (req, res, next) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
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
};

//Send the provided new Query (or Query response) to all currently open SSE Clients
const sendEventToClients = (newEvent) => {
  console.log('inside sendEventtoClient');
  SSE_Clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(newEvent)}\n\n`)
  );
};

//This attaches to the GraphQLHTTP server and runs AFTER Query is processed into result. We us it to store that result and forward it to SSE clients
const extensions = ({ result }) => {
  console.log('result: ', result);
  SSE_Events.push(result);
  sendEventToClients(result);
};
//this is how we capture errors from graphqlHTTP and send them to grapherrql through SSE (the 'result' obj in graphqlHTTP remains undefined if an error is emmitted which is why we created functionality where we had access to the error obj being thrown from graphqlHTTP)
const customFormatErrorFn = (error) => {
  console.log('inside customError');
  SSE_Events.push(error);
  sendEventToClients(error);
  return error;
};

const grapherrql = (gqlHTTP, graphqlSchema) => {
  console.log('inside MW');
  const schema = graphqlSchema;

  const executeGQL = (req, res, next) => {
    console.log('inside execute GQL');
    //this was the old addQueryMiddleware functionality:
    //Called when '/graphql' receives new request from HostApp client, prior to GraphQL processing. Adds the query to those saved, then sends it to any open SSE clients.
    const newQuery = req.body;
    SSE_Events.push(newQuery);
    sendEventToClients(newQuery);
    console.log('inside addQueryMiddleware !!!');

    const executeFunc = (cb, ...args) => {
      cb(...args);
    };

    const newGqlHTTP = gqlHTTP({
      schema: schema,
      graphiql: false,
      customFormatErrorFn: (error) => {
        console.log('inside customError');
        SSE_Events.push(error);
        sendEventToClients(error);
        return error;
      },
      extensions,
    });

    executeFunc(newGqlHTTP, req, res, next);
  };

  return async function grapherrqlMiddleware(req, res, next) {
    console.log('inside closure function');
    executeGQL(req, res, next);
  };
};

module.exports = {
  grapherrql,
  eventsHandler,
  serveGrapherrql,
};
