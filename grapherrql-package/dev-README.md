# Integration of GraphErrQL into LOCAL HOST APP for Development

## Pre-reqs

- LOCAL TESTING Host App must currently use Express and 'graphqlHTTP' from the "express-graphql" package. No existing support for Apollo-based Host Apps.
- LOCAL TESTING Host App should live under top-level project repo "GRAPHERR-QL". It should live in separate directory WITHIN 'grapherrql-package', which holds our project source code. Example file structure for development:
  GRAPHERR-QL/
  ./grapherrql-package
  ./src (GraphErrQL files)
  ./(HOST APP USED FOR TESTING)

If you are using a provided Host App repo (ie hackernews-clone), use 'git clone (host-app-repo-name)' while within '/grapherrql-package'directory. When you make pushes up to GraphErr-QL after this, the cloned host-app repo will not be included, It will only live locally.
<br/>
<br/>

## Add Endpoint for Accessing GraphErrQL by pointing to static files in grapherrql-package

In Host App 'server.js' (or wherever your backend is defined)

- Follow the integration directions in 'Host-App_README.md', with the following changes/additions:
  - **do not 'npm i grapherrql' since you will be pointing to the package locally, rather than via node_modules**

```
const path = require('path');
```

Change the mounting endpoint to serve local files rather than via node_modules;
change:

```
app.use(express.static(graphErr.directoryPath));
app.get('/grapherrql', function (req, res) {
    let data = fs.readFileSync(graphErr.defaultFilePath, 'utf8');
    res.send(data.replace('<param1_replace>', HOST_APP_SSE_PATH));
});
```

to

```
app.use(express.static('../../build'));
app.get('/grapherrql', function (req, res) {
  let data = fs.readFileSync(path.resolve('../../build/index.html'), 'utf8');
  res.send(data.replace('<param1_replace>', HOST_APP_SSE_PATH));
});
```

## Using GraphErrQL with local Host App

1. Navigate to GRAPHERR-QL/grapherrql-package and run 'npm run build' to build the front-end code of our App. IF 'build/' already exists, delete it first so you replace it with your latest front-end changes
2. Navigate to your local Host App directory and start the server.
3. Open two browser terminals to;
   - **Host App frontend**: from here you will use the Host App, generating Queries/Mutations
   - **<host_app>:<server_port>/grapherrql**: This launches GraphErrQL, allowing you to test new Queries or capture queries Live from the Host App

<br />
<br />

## Making Changes to GraphErrQL Source Code

1. Navigate to descriptive feature branch from within **/grapherrql-package**
2. Make desired feature changes
3. Delete existing **/build** folder, generate new on with 'npm run build'
4. Test changes with local Host App, capturing screenshots of updated functionality/styling and lack of errors if all works
5. On success, navigate to **/grapherrql-package/package.json** and update 'version' (either minor or major number change). Version **must** be incremented to allow for package update.
6. Save, commit, and run "npm publish" from within **/grapherrql-package**. Ensure publishing is successful and confirm version change on npm.
7. Checkout /dev, 'git fetch --prune', then merge latest code with your feature branch.
8. After resolving any merge conflicts, push from your feature branch to origin/<feature_branch>
9. Submit PR, obtain approval, land, profit!
