import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

// Robust path resolution for both dev (tsx) and prod (bundled CJS)
const isProd = process.env.NODE_ENV === "production";
// In AI Studio, the dist folder is always in the project root
const staticPath = path.join(process.cwd(), "dist");

let stripe: Stripe | null = null;

function getStripe() {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      console.warn("STRIPE_SECRET_KEY is missing. Stripe integration will not work.");
      return null;
    }
    stripe = new Stripe(key);
  }
  return stripe;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Stripe Checkout Session
  app.post("/api/create-checkout-session", async (req, res) => {
    const s = getStripe();
    if (!s) {
      return res.status(500).json({ error: "Stripe is not configured" });
    }

    try {
      const { items, successUrl, cancelUrl } = req.body;

      const session = await s.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item: any) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              images: item.img ? [item.img] : [],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      res.json({ id: session.id, url: session.url });
    } catch (err: any) {
      console.error("Stripe Session Error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Get Stripe Session Details
  app.get("/api/get-checkout-session/:sessionId", async (req, res) => {
    const s = getStripe();
    if (!s) {
      return res.status(500).json({ error: "Stripe is not configured" });
    }

    try {
      const session = await s.checkout.sessions.retrieve(req.params.sessionId, {
        expand: ['line_items', 'line_items.data.price.product'],
      });
      res.json(session);
    } catch (err: any) {
      console.error("Stripe Retrieve Error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(staticPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
