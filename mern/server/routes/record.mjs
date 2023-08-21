import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import addFundraiserSchema from "../schemas/add-fundraiser-schema.mjs";
import addReviewSchema from "../schemas/add-review-schema.mjs";
const router = express.Router();

// Get a list of all the fundraisers
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();

  results = results.sort((a, b) => b.overall_rating - a.overall_rating);

  res.send(results).status(200);
});

// Get a single fundraiser by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("records");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Create a new fundraiser.
router.post("/", async (req, res) => {
  const { error, value } = addFundraiserSchema.validate(req.body);

  if (error) {
    return res.send("Invalid Request");
  }

  let newFundraiser = {
    fundraiser_name: req.body.fundraiser_name,
    overall_rating: req.body.overall_rating,
    reviews: [
      {
        reviewer_name: req.body.reviewer_name,
        reviewer_email: req.body.reviewer_email,
        description: req.body.description,
        reviewer_date: req.body.reviewer_date,
        rating: req.body.overall_rating
      }
    ]
  };

  let collection = await db.collection("records");
  let result = await collection.insertOne(newFundraiser);
  res.send(result).status(204);
});

// Update a fundraiser by id.
router.patch("/:id", async (req, res) => {
  const { error, value } = addReviewSchema.validate(req.body);

  if (error) {
    return res.send("Invalid Request");
  }

  const query = { _id: new ObjectId(req.params.id) };

  const [newReview] = req.body.reviews.slice(-1);

  let collection = await db.collection("records");

  // Check for duplicate review postings
  let duplicateEmail = false;
  for await (let fundraiser of collection.find(query)) {
    duplicateEmail = fundraiser.reviews.some(review => review.reviewer_email === newReview.reviewer_email);
  }

  if (duplicateEmail) {
    res.status(500).send({error: 'Duplicate Email'});
  } else {
    const updates =  {
      $set: {
        fundraiser_name: req.body.fundraiser_name,
        overall_rating: setAverageRatingOfFundraiser(req.body),
        reviews: req.body.reviews
      }
    };

    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
  }

});

// Future Zach: Refactor this out of this file, create a Fundraiser class that will share common logic?
function setAverageRatingOfFundraiser(fundraiser) {
  if (fundraiser.reviews.length === 0) { // Future Zach: Can this case actually happen?
    return 0;
  }

  let sum = 0;

  fundraiser.reviews.forEach(review => {
    sum += parseInt(review.rating);
  })

  return sum / fundraiser.reviews.length;
}


export default router;
