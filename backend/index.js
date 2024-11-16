import express from "express";
import rootRouter from "./routes/index.js";
import cors from "cors";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log("Server started on http://localhost:" + port);
});
