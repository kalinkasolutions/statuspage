import express from "express";
import helmet from "helmet";
import api from "./api";
import cors from "cors";
import fs from "fs";
import path from "path";
import config from "./config";

const files = fs.readdirSync(path.join(__dirname, "../build/static/js"));
files.forEach((file) => {
  if (file.endsWith(".js")) {
    const filecontent = fs.readFileSync(
      path.join(__dirname, "../build/static/js", file),
      "utf-8"
    );
    if (filecontent.indexOf("http://localhost:3000") > -1) {
      fs.writeFileSync(
        path.join(__dirname, "../build/static/js", file),
        filecontent.split("http://localhost:3000").join(config().url)
      );
    }
  }
});

const app = express();
app.use(helmet());
app.use(cors());

const PORT = 3000;

app.use("/", api);
app.use(express.static(path.join(__dirname, "../build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "/index.html"));
});

app.listen(PORT, () => console.log(`server started at ${PORT}`));
