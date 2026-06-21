const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // serves public/style.css at /style.css

// MongoDB Connection
// NOTE: same cluster/credentials as your other project, just a new database
// name (MobileStoreDB) so it doesn't mix with CollageDB. Swap this out for
// your own connection string if needed.
mongoose
  .connect(
    "mongodb+srv://arnavarya:arnav12345@0.hvcrl3y.mongodb.net/MobileStoreDB"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// Mobile Schema
const mobileSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
  },

  model: {
    type: String,
    required: true,
    trim: true,
  },

  ram: {
    type: Number,
    required: true,
    min: 1,
  },

  storage: {
    type: Number,
    required: true,
    min: 1,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Mobile Model
const Mobile = mongoose.model("Mobile", mobileSchema);

// Escape regex special characters so search input can't break the query
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Home Page
app.get("/", (req, res) => {
  res.render("home.ejs");
});

// Show All Mobiles (+ Search by Brand via ?brand=)
app.get("/getdata", async (req, res) => {
  try {
    const brand = req.query.brand ? req.query.brand.trim() : "";
    const filter = brand
      ? { brand: { $regex: escapeRegex(brand), $options: "i" } }
      : {};

    const allmobiles = await Mobile.find(filter).sort({ brand: 1, model: 1 });

    res.render("mobiles.ejs", { allmobiles, searchTerm: brand });
  } catch (error) {
    console.log(error);
    res.send("Error fetching mobiles");
  }
});

// Insert Form
app.get("/insertdata", (req, res) => {
  res.render("form.ejs");
});

// Create Mobile
app.post("/createdata", async (req, res) => {
  try {
    const { brand, model, ram, storage, price } = req.body;

    await Mobile.create({
      brand,
      model,
      ram,
      storage,
      price,
    });

    res.redirect("/getdata");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

// Delete Mobile
app.get("/delete/:mobileid", async (req, res) => {
  try {
    await Mobile.findByIdAndDelete(req.params.mobileid);
    res.redirect("/getdata");
  } catch (error) {
    console.log(error);
    res.send("Error deleting mobile");
  }
});

// Edit Form
app.get("/edit/:mobileid", async (req, res) => {
  try {
    const data = await Mobile.findById(req.params.mobileid);

    if (!data) {
      return res.send("Mobile not found");
    }

    res.render("edit.ejs", { data });
  } catch (error) {
    console.log(error);
    res.send("Error fetching mobile");
  }
});

// Update Mobile
app.post("/update/:mobileid", async (req, res) => {
  try {
    await Mobile.findByIdAndUpdate(req.params.mobileid, req.body, {
      new: true,
      runValidators: true,
    });

    res.redirect("/getdata");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

// Server
app.listen(3000, () => {
  console.log("Server running at port 3000");
});
