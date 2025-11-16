const bcrypt = require("bcrypt");
const pool = require("./db"); // ✅ same folder

(async () => {
  try {
    console.log("🔄 Connecting to DB and seeding admin...");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const result = await pool.query(
      `INSERT INTO users (email, password, role)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO NOTHING
       RETURNING *`,
      ["uk215797@gmail.com", hashedPassword, "admin"]
    );

    if (result.rowCount > 0) {
      console.log("✅ Admin account created:", result.rows[0].email);
    } else {
      console.log("ℹ️ Admin already exists, no changes made.");
    }
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
  } finally {
    process.exit();
  }
})();
