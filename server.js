import express from "express";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;

const app = express();
app.use(cors());
 origin: "https://thewebbuilderrrrr.github.io"
}));
// Connect to PostgreSQL using your Render DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Create table if it doesn't exist
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS counter (
      id SERIAL PRIMARY KEY,
      count INTEGER NOT NULL
    );
  `);

  // Ensure there is exactly one row
  const result = await pool.query("SELECT * FROM counter;");
  if (result.rows.length === 0) {
    await pool.query("INSERT INTO counter (count) VALUES (0);");
  }
}

initDB();

// GET + increment counter
app.get("/counter", async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE counter SET count = count + 1 RETURNING count;"
    );
    res.json({ count: result.rows[0].count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
