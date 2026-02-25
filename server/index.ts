import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT ?? 5000);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// In development, proxy to Vite dev server
if (process.env.NODE_ENV === "development") {
  console.log("[server] Development mode - Vite dev server should run separately on port 5173");
  console.log("[server] Or run: npx vite --port 5173");
  
  // Optional: Serve a simple message with link to Vite
  app.get("/", (_req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Eatoh - Dev Mode</title></head>
        <body style="font-family: sans-serif; padding: 40px; text-align: center;">
          <h1>🍽️ Eatoh Development Server</h1>
          <p>The API server is running on port ${PORT}</p>
          <p>Please run Vite dev server separately:</p>
          <code style="background: #f4f4f4; padding: 10px; border-radius: 4px;">
            npx vite --port 5173
          </code>
          <p>Then open <a href="http://localhost:5173">http://localhost:5173</a></p>
        </body>
      </html>
    `);
  });
} else {
  // Production mode - serve static files
  const staticDir = path.resolve(__dirname, "../dist/public");
  app.use(express.static(staticDir));
  app.get("*", (_req, res) => res.sendFile(path.join(staticDir, "index.html")));
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[server] Running on http://0.0.0.0:${PORT} (${process.env.NODE_ENV ?? "development"})`);
});