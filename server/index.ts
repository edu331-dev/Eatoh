import express from "express";
import path    from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app       = express();
const PORT      = Number(process.env.PORT ?? 5000);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV === "production") {
  const staticDir = path.resolve(__dirname, "../dist/public");
  app.use(express.static(staticDir));
  app.get("*", (_req, res) => res.sendFile(path.join(staticDir, "index.html")));
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[server] Running on http://0.0.0.0:${PORT} (${process.env.NODE_ENV ?? "development"})`);
});