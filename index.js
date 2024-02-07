const express = require("express");

const app = express();

require("dotenv").config();
const cors = require("cors");

app.use(express.json());

const connectDB = require("./connectMongo");

connectDB();

import Team from "./models/TeamRegistration";
const ORIGIN = process.env.ORIGIN;

app.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("Hackaholics API is running");
});


app.post("/api/teamregi/register", async (req, res) => {
  try {
    const newSession = new Team({
      teamName: req.body.teamName,
      university: req.body.university,
      other: req.body.other,
      leaderName: req.body.leaderName,
      leaderYear: req.body.leaderYear,
      leaderWhatsapp: req.body.leaderWhatsapp,
      leaderEmail: req.body.leaderEmail,
      leaderNIC: req.body.leaderNIC,
      member1Name: req.body.member1Name,
      member1Year: req.body.member1Year,
      member1Whatsapp: req.body.member1Whatsapp,
      member1Email: req.body.member1Email,
      member1NIC: req.body.member1NIC,
      member2Name: req.body.member2Name,
      member2Year: req.body.member2Year,
      member2Whatsapp: req.body.member2Whatsapp,
      member2Email: req.body.member2Email,
      member2NIC: req.body.member2NIC,
    });
    await newSession.save();

    res.status(200).json({
      success: true,
      message: "Team Registered Successfully",
    });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});


// app.get("", async (req, res) => {
//   try {
//     const data = await BookModel.findById(req.params.id);

//     if (data) {
//       return res.status(200).json({
//         msg: "Ok",
//         data,
//       });
//     }

//     return res.status(404).json({
//       msg: "Not Found",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       msg: error.message,
//     });
//   }
// });


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
