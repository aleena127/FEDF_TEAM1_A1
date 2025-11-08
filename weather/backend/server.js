import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

//CRITICAL CHANGE: Configure CORS to ONLY allow your deployed frontend URL 
app.use(cors({
    origin: ['http://localhost:3000', 'https://fedf-project-frontend.onrender.com']
}));

app.use(express.json());

const DB_FILE = "./db.json";

// Always read fresh data
function readUsers() {
  try {
    const data = fs.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(data);
    return parsed.users || [];
  } catch (err) {
    console.error("Error reading db.json:", err);
    return [];
  }
}

// Always save correctly
function saveUsers(users) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users }, null, 2));
}

// 🟢 SIGNUP
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const existing = users.find((u) => u.username === username);
  if (existing) {
    return res.json({ success: false, message: "Username already exists" });
  }

  users.push({ username, password });
  saveUsers(users);

  console.log("✅ New user added:", username);
  res.json({ success: true, message: "Signup successful! Please log in." });
});

// 🟢 LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  console.log("🔍 Trying login:", username, password);
  console.log("📜 Current DB users:", users);

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    console.log("✅ Login success for:", username);
    res.json({ success: true, message: "Login successful!" });
  } else {
    console.log("❌ Invalid credentials");
    res.json({ success: false, message: "Invalid credentials" });
  }
});

// 🟢 Forgot password
app.post("/forgot-password", (req, res) => {
  const { username } = req.body;
  const users = readUsers();

  const user = users.find((u) => u.username === username);
  if (user) {
    res.json({
      success: true,
      message: "Password reset link sent to your email (mock).",
    });
  } else {
    res.json({ success: false, message: "Username not found" });
  }
});

// 🟢 Test route
app.get("/", (req, res) => {
  res.send("✅ Server is running properly!");
});

const PORT = process.env.PORT || 5000;

// Start the server using the dynamic PORT variable
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
