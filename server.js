const express = require("express");
const bodyParser = require("body-parser");
const showdown = require("showdown");
const fs = require("fs");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const converter = new showdown.Converter();
const template = (html, style) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Giovanni Keppelen</title>
        <style>${style}</style>
    </head>
    <body>
        ${html}
    </body>
    </html>
`;

const loadFile = (res, path) => {
  fs.readFile(`${__dirname}/${path}`, "utf8", (error, page) => {
    fs.readFile(`${__dirname}/style.css`, "utf8", (error, style) => {
      return res.send(template(converter.makeHtml(page), style));
    });
  });
};

app.get("/about", async (req, res) => {
  loadFile(res, "about/index.md");
});

app.get("/", (req, res) => {
  loadFile(res, "index.md");
});

app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});
