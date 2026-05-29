import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

let count = 0;

app.get("/counter", (req, res) => {
  count++;
  res.json({ count });
});

app.listen(3000, () => {
  console.log("Counter backend running on port 3000");
});
