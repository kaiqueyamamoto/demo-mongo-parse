const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/parser", (req, res, next) => {
  const { parse_data } = req.body;

  let people = []
  parse_data.forEach((item) => {
    people.push({
      count: item.count,
      actual_title: item.actual_title,
      actual_title_normalized: item.actual_title_normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    })
  })

  return res.status(200).json({
    people_titles: people,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
