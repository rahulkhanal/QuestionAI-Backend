const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyB-YrLg2-Sm0mqmGOJyO9VUkZrSGdUBwcU");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const app = express();

const model = genAI.getGenerativeModel({ model: "gemini-pro" });
app.use(bodyParser.json());

app.use(cors());
app.post("/prompt", async (req, resp) => {
  try {
    let { prompt, body } = req.body;
    let result, question;
    if (body) {
      question = `forget my all prompt. I will give you some paragraphs of content. you just have a look and i will ask you question related to them later which you need to answer me. remember just answer based on the paragraph. you are not allowed to make your onw answer. if answer is not found there in paragraph just say some invalid response. paragraph goes like this remember it: ${body}`;
    } else {
      question = `Based on above content what is answer. ${prompt}`;
    }
    result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();
    resp.json(text);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("conntected..");
});
