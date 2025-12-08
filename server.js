const mongoose = require('mongoose');
const Product = require("./models/product");
const Order = require('./models/order');
const Partner = require("./models/partner"); // import model
const JoinTeam = require('./models/JoinTeam');
const Contact = require("./models/contact");  // ADD THIS WITH OTHER MODELS





mongoose.connect("mongodb+srv://fizatrading4_db_user:JQOplcITo1qtFy1p@cluster0.rtkzvgs.mongodb.net/?appName=Cluster0")
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

const express = require("express");
const app = express();
const path = require("path");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home
app.get("/", (req, res) => {
    res.render("index");
});

// Products Page - Fetch from DB
app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.render("product", { products });
});



// Route to insert ALL 9 products at once
app.get("/add-all-products", async (req, res) => {
    try {
        const products = [
            {
                name: "Handmade Recycled Box",
                price: 350,
                description: "Eco-friendly box made from recycled materials",
                image: "product1.jpg",
                category: "Recycled"
            },
            {
                name: "Recycled Notebook",
                price: 250,
                description: "Notebook made from 100% recycled paper.",
                image: "product2.jpg",
                category: "Paper"
            },
            {
                name: "Eco Shopping Bag",
                price: 500,
                description: "Reusable eco-friendly bag for daily use.",
                image: "product3.jpg",
                category: "Eco Bags"
            },
            {
                name: "Cardboard Lamp",
                price: 1200,
                description: "Handmade lamp crafted from recycled cardboard.",
                image: "product4.jpg",
                category: "Cardboard"
            },
            {
                name: "Paper Gift Basket",
                price: 450,
                description: "Beautiful handmade gift basket made using waste paper.",
                image: "product5.jpg",
                category: "Paper"
            },
            {
                name: "Eco-Friendly Pen Stand",
                price: 220,
                description: "Pen holder created from recycled materials.",
                image: "product6.jpg",
                category: "Recycled"
            },
            {
                name: "Waste Material Flower Pot",
                price: 600,
                description: "Decorative flower pot created using upcycled materials.",
                image: "product7.jpg",
                category: "Upcycled"
            },
            {
                name: "Cardboard Organizer",
                price: 550,
                description: "Multi-section organizer made from cardboard and waste materials.",
                image: "product8.jpg",
                category: "Cardboard"
            },
            {
                name: "Handmade Wall Art",
                price: 900,
                description: "Eco-art made using recycled waste items.",
                image: "product9.jpg",
                category: "Art"
            }
        ];

        await Product.insertMany(products);
        res.send("🎉 All 9 products added successfully!");
    } catch (err) {
        res.send("❌ Error adding products: " + err);
    }
});


// Other Pages
app.get("/partner", (req, res) => res.render("partner"));
app.get("/join-team", (req, res) => res.render("join-team"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/cart", (req, res) => res.render("cart"));
app.get('/thank-you', (req, res) => {
  res.render('thank-you'); // create view below
});





// Only save to DB — no email sending
app.post('/partner/submit', async (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      productType,
      productDescription,
      additionalMessage
    } = req.body;

    // basic validation
    if (!companyName || !contactPerson || !email || !phone || !productType || !productDescription) {
      return res.json({ ok: false, message: "Please fill all required fields." });
    }

    // save to DB
    await Partner.create({
      companyName,
      contactPerson,
      email,
      phone,
      productType,
      productDescription,
      additionalMessage
    });

    return res.json({ ok: true, message: "Application submitted successfully." });

  } catch (err) {
    console.error("Partner form error:", err);
    return res.json({ ok: false, message: "Server error. Try again." });
  }
});







//join team form submit route
app.post('/join-team/submit', async (req, res) => {
  try {
    const { fullName, phone, email, skills, experience, reason } = req.body;

    if (!fullName || !phone || !email || !skills || !reason) {
      return res.json({ ok: false, message: "Please fill all required fields." });
    }

    await JoinTeam.create({
      fullName,
      phone,
      email,
      skills,
      experience,
      reason
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Join team form error:", err);
    return res.json({ ok: false, message: "Server error!" });
  }
});



//contact form submit form
app.post("/contact/submit", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.json({ ok: false, message: "Please fill required fields" });
        }

        await Contact.create({ name, email, phone, message });

        return res.json({ ok: true, message: "Message sent successfully!" });

    } catch (err) {
        console.error("Contact form error:", err);
        return res.json({ ok: false, message: "Server error" });
    }
});



// Save an order
app.post('/checkout', async (req, res) => {
  try {
    const { items, subtotal, shipping = 0, total, customer, paymentMethod = 'COD' } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ ok: false, message: 'Cart is empty' });
    }

    // Basic validation for required fields
    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({ ok: false, message: 'Missing customer details' });
    }

    const order = new Order({
      items,
      subtotal,
      shipping,
      total,
      customer,
      paymentMethod
    });

    await order.save();

    // TODO: send email / admin notify later

    return res.json({ ok: true, orderId: order._id });
  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});





// Start Server
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on all network interfaces`);
    console.log(`Open on laptop: http://localhost:${PORT}`);
});
