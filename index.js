import express from "express";
const port = process.env.PORT || 3003;
import helmet from "helmet";
import cors from "cors";
import reload from "reload";
import path from "path";

import { connectToDatabase } from "./lib/db.js";

const app = express();
app.use(cors());
app.use(helmet());
const __dirname = path.resolve();
// app.use(express.json()); // Parses json, multi-part (file), url-encoded

let publicDir = path.join(__dirname, "public");

app.get("/", (req, res, next) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/:id", async (req, res, next) => {
  const { db } = await connectToDatabase();

  if (req.params.id === "about") {
    return next();
  }

  if (req.params.id === "api" && req.method === "GET") {
    const dbData = await db.collection("Customers").find().toArray();
    const data = await res.json(dbData);
  }
});

app.get("/about", (req, res) => {
  console.log("here");
  res.send("<h1 style=color:red;margin:10>Hello</h1>");
  // res.send("Api working from Server");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// // Reload code here
// reload(app)
//   .then(function (reloadReturned) {
//     // reloadReturned is documented in the returns API in the README

//     // Reload started, start web server
//     // server.listen(app.get("port"), function () {
//     //   console.log("Web server listening on port " + app.get("port"));
//     // });
//   })
//   .catch(function (err) {
//     console.error(
//       "Reload could not start, could not start server/sample app",
//       err
//     );
//   });
