const express = require("express");

const app = express();

require("dotenv").config();
const cors = require("cors");

app.use(express.json());

const connectDB = require("./connectMongo");

connectDB();

// const BookModel = require("./models/book.model");
// const Team = require("./models/TeamRegistration");
// const redis = require('./redis')

import Team from "./models/TeamRegistration";
const ORIGIN = process.env.ORIGIN;

app.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


// const deleteKeys = async (pattern) => {
//   const keys = await redis.keys(`${pattern}::*`)
//   console.log(keys)
//   if (keys.length > 0) {
//     redis.del(keys)
//   }
// }

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

// app.get("/api/v1/books", async (req, res) => {
//   const { limit = 5, orderBy = "name", sortBy = "asc", keyword } = req.query;
//   let page = +req.query?.page;

//   if (!page || page <= 0) page = 1;

//   const skip = (page - 1) * + limit;

//   const query = {};

//   if (keyword) query.name = { $regex: keyword, $options: "i" };

//   const key = `Book::${JSON.stringify({query, page, limit, orderBy, sortBy})}`
//   let response = null
//   try {
//     const cache = await redis.get(key)
//     if (cache) {
//       response = JSON.parse(cache)
//     } else {
//       const data = await BookModel.find(query)
//       .skip(skip)
//       .limit(limit)
//       .sort({ [orderBy]: sortBy });
//       const totalItems = await BookModel.countDocuments(query);

//       response = {
//         msg: "Ok",
//         data,
//         totalItems,
//         totalPages: Math.ceil(totalItems / limit),
//         limit: +limit,
//         currentPage: page,
//       }

//       redis.setex(key, 600, JSON.stringify(response))
//     }
    
//     return res.status(200).json(response);
//   } catch (error) {
//     return res.status(500).json({
//       msg: error.message,
//     });
//   }
// });

// app.get("/api/v1/books/:id", async (req, res) => {
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

// app.post("/api/v1/books", async (req, res) => {
//   try {
//     const { name, author, price, description } = req.body;
//     const book = new BookModel({
//       name,
//       author,
//       price,
//       description,
//     });
//     const data = await book.save();
//     deleteKeys('Book')
//     return res.status(200).json({
//       msg: "Ok",
//       data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       msg: error.message,
//     });
//   }
// });

// app.put("/api/v1/books/:id", async (req, res) => {
//   try {
//     const { name, author, price, description } = req.body;
//     const { id } = req.params;

//     const data = await BookModel.findByIdAndUpdate(
//       id,
//       {
//         name,
//         author,
//         price,
//         description,
//       },
//       { new: true }
//     );
//     deleteKeys('Book')
//     return res.status(200).json({
//       msg: "Ok",
//       data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       msg: error.message,
//     });
//   }
// });

// app.delete("/api/v1/books/:id", async (req, res) => {
//   try {
//     await BookModel.findByIdAndDelete(req.params.id);
//     deleteKeys('Book')
//     return res.status(200).json({
//       msg: "Ok",
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
