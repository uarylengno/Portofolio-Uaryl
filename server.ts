// ============================================================
// IMPORT
// ============================================================
import "dotenv/config"; // membaca ADMIN_PASSWORD dari file .env (harus paling atas)

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

import { contentRouter } from "./contentApi"; // API untuk data & admin

// ============================================================
// SERVER
// ============================================================
async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API konten & admin (harus dipasang SEBELUM Vite / file statis)
  app.use("/api", contentRouter);

  // Mode development: Vite menyajikan halaman
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Mode production: sajikan hasil build di folder dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();