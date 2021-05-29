import express from "express";
import helmet from "helmet";
import api from "./api";
import cors from "cors";
import path from "path";

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
