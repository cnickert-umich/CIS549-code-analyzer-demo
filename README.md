## Requirements
Download [https://nodejs.org/en/download] (Node & npm)

## Available Scripts

In the project directory, you can run:

### `npm install`
Installs all of the dependencies required to start the server.

### `npm start`
Runs the server in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## APIs

After the server has been started, you can call various APIs.

### `POST` /parser/js
Description: Generates a parse tree for each JavaScript file within the given extention folder

application/form-data<br />
body:<br />
    extName (String)<br />

### `POST` /upload/js
Description: Uploads JavaScript files into a folder hosted on the server.

application/form-data<br />
body:<br />
    jsFiles (.js files)<br />
    extName (String)<br />

