// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { createClient } from "@supabase/supabase-js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// const supabase =
//   supabaseUrl && supabaseServiceRoleKey
//     ? createClient(supabaseUrl, supabaseServiceRoleKey)
//     : null;

// app.get("/", (req, res) => {
//   res.json({ ok: true, message: "Restaurant API is running" });
// });

// app.post("/api/orders", async (req, res) => {
//   try {
//     const {
//       customer_name,
//       phone,
//       address,
//       items,
//       subtotal,
//       delivery_fee,
//       total_amount,
//       status,
//     } = req.body;

//     if (!customer_name || !phone || !address || !items?.length) {
//       return res.status(400).json({ error: "Missing required order fields" });
//     }

//     if (!supabase) {
//       return res.status(500).json({
//         error: "Supabase is not configured on the server",
//       });
//     }

//     const { data, error } = await supabase
//       .from("orders")
//       .insert([
//         {
//           customer_name,
//           phone,
//           address,
//           items,
//           subtotal,
//           delivery_fee,
//           total_amount,
//           status: status || "new",
//         },
//       ])
//       .select()
//       .single();

//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     return res.status(201).json({
//       message: "Order created successfully",
//       order: data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message || "Internal server error",
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { createClient } from "@supabase/supabase-js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY
// );

// app.get("/", (req, res) => {
//   res.json({ ok: true, message: "Restaurant API is running" });
// });

// app.post("/api/orders", async (req, res) => {
//   try {
//     const {
//       customer_name,
//       phone,
//       address,
//       items,
//       subtotal,
//       delivery_fee,
//       total_amount,
//       status,
//     } = req.body;

//     if (!customer_name || !phone || !address || !items?.length) {
//       return res.status(400).json({ error: "Missing required order fields" });
//     }

//     const { data, error } = await supabase
//       .from("orders")
//       .insert([
//         {
//           customer_name,
//           phone,
//           address,
//           items,
//           subtotal,
//           delivery_fee,
//           total_amount,
//           status: status || "new",
//         },
//       ])
//       .select()
//       .single();

//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     return res.status(201).json({
//       message: "Order created successfully",
//       order: data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message || "Internal server error",
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { createClient } from "@supabase/supabase-js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // app.use(cors());
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );
// app.use(express.json());

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// const adminSecret = process.env.ADMIN_SECRET;

// const supabase =
//   supabaseUrl && supabaseServiceRoleKey
//     ? createClient(supabaseUrl, supabaseServiceRoleKey)
//     : null;

// function requireAdmin(req, res, next) {
//   const providedSecret = req.headers["x-admin-secret"];

//   if (!adminSecret || providedSecret !== adminSecret) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   next();
// }

// app.get("/", (req, res) => {
//   res.json({ ok: true, message: "Restaurant API is running" });
// });

// app.post("/api/orders", async (req, res) => {
//   try {
//     const {
//       customer_name,
//       phone,
//       address,
//       items,
//       subtotal,
//       delivery_fee,
//       total_amount,
//       status,
//     } = req.body;

//     if (!customer_name || !phone || !address || !items?.length) {
//       return res.status(400).json({ error: "Missing required order fields" });
//     }

//     if (!supabase) {
//       return res.status(500).json({
//         error: "Supabase is not configured on the server",
//       });
//     }

//     const { data, error } = await supabase
//       .from("orders")
//       .insert([
//         {
//           customer_name,
//           phone,
//           address,
//           items,
//           subtotal,
//           delivery_fee,
//           total_amount,
//           status: status || "new",
//         },
//       ])
//       .select()
//       .single();

//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     return res.status(201).json({
//       message: "Order created successfully",
//       order: data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message || "Internal server error",
//     });
//   }
// });

// app.get("/api/orders", requireAdmin, async (req, res) => {
//   try {
//     if (!supabase) {
//       return res.status(500).json({ error: "Supabase is not configured" });
//     }

//     const { data, error } = await supabase
//       .from("orders")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     return res.json({ orders: data || [] });
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message || "Could not fetch orders",
//     });
//   }
// });

// app.get("/api/orders/:id", async (req, res) => {
//   try {
//     if (!supabase) {
//       return res.status(500).json({ error: "Supabase is not configured" });
//     }

//     const { data, error } = await supabase
//       .from("orders")
//       .select("*")
//       .eq("id", req.params.id)
//       .single();

//     if (error) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     return res.json({ order: data });
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message || "Could not fetch order",
//     });
//   }
// });

// app.patch("/api/orders/:id/status", requireAdmin, async (req, res) => {
//   try {
//     if (!supabase) {
//       return res.status(500).json({ error: "Supabase is not configured" });
//     }

//     const allowedStatuses = [
//       "new",
//       "confirmed",
//       "preparing",
//       "out_for_delivery",
//       "delivered",
//       "cancelled",
//     ];

//     const { status } = req.body;

//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).json({ error: "Invalid status" });
//     }

//     const { data, error } = await supabase
//       .from("orders")
//       .update({ status })
//       .eq("id", req.params.id)
//       .select()
//       .single();

//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     return res.json({
//       message: "Order status updated successfully",
//       order: data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message || "Could not update order status",
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });




// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import rateLimit from "express-rate-limit";
// import { z } from "zod";
// import { createClient } from "@supabase/supabase-js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "https://graceevillekitchen.vercel.app",
// ];

// app.use(
//   cors({
//     origin(origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }
//       return callback(new Error("Not allowed by CORS"));
//     },
//     methods: ["GET", "POST", "PATCH"],
//     allowedHeaders: ["Content-Type", "x-admin-secret"],
//   })
// );

// app.use(express.json({ limit: "1mb" }));
// app.disable("x-powered-by");

// app.use((req, res, next) => {
//   const startedAt = Date.now();

//   res.on("finish", () => {
//     console.log(
//       `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - startedAt}ms`
//     );
//   });

//   next();
// });

// const orderLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 40,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: { error: "Too many requests, please try again later." },
// });

// const adminLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 150,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: { error: "Too many admin requests, please try again later." },
// });

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// const adminSecret = process.env.ADMIN_SECRET;

// const supabase =
//   supabaseUrl && supabaseServiceRoleKey
//     ? createClient(supabaseUrl, supabaseServiceRoleKey)
//     : null;

// const orderSchema = z.object({
//   customer_name: z.string().trim().min(2, "Customer name is required"),
//   phone: z.string().trim().min(7, "Phone number is required"),
//   address: z.string().trim().min(5, "Address is required"),
//   items: z
//     .array(
//       z.object({
//         id: z.union([z.string(), z.number()]).optional(),
//         name: z.string().trim().min(1, "Item name is required"),
//         quantity: z.number().int().min(1, "Quantity must be at least 1"),
//         price: z.number().min(0, "Price cannot be negative"),
//       })
//     )
//     .min(1, "At least one item is required"),
//   subtotal: z.number().min(0, "Subtotal cannot be negative"),
//   delivery_fee: z.number().min(0, "Delivery fee cannot be negative"),
//   total_amount: z.number().min(0, "Total amount cannot be negative"),
//   status: z
//     .enum([
//       "new",
//       "confirmed",
//       "preparing",
//       "out_for_delivery",
//       "delivered",
//       "cancelled",
//     ])
//     .optional(),
// });

// function requireAdmin(req, res, next) {
//   const providedSecret = req.headers["x-admin-secret"];

//   if (!adminSecret || providedSecret !== adminSecret) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   next();
// }

// app.get("/", (req, res) => {
//   res.json({ ok: true, message: "Restaurant API is running" });
// });

// app.get("/api/health", async (req, res) => {
//   try {
//     if (!supabase) {
//       return res.status(500).json({
//         ok: false,
//         database: false,
//         error: "Supabase is not configured",
//       });
//     }

//     const { error } = await supabase.from("orders").select("id").limit(1);

//     if (error) {
//       return res.status(500).json({
//         ok: false,
//         database: false,
//         error: error.message,
//       });
//     }

//     return res.json({
//       ok: true,
//       database: true,
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error) {
//     console.error("Health check error:", error);
//     return res.status(500).json({
//       ok: false,
//       database: false,
//       error: error.message || "Health check failed",
//     });
//   }
// });

// app.post("/api/orders", orderLimiter, async (req, res) => {
//   try {
//     const parsed = orderSchema.safeParse(req.body);

//     if (!parsed.success) {
//       return res.status(400).json({
//         error: "Invalid order data",
//         details: parsed.error.flatten(),
//       });
//     }

//     if (!supabase) {
//       return res.status(500).json({
//         error: "Supabase is not configured on the server",
//       });
//     }

//     const {
//       customer_name,
//       phone,
//       address,
//       items,
//       subtotal,
//       delivery_fee,
//       total_amount,
//       status,
//     } = parsed.data;

//     const normalizedItems = items.map((item) => ({
//       id: item.id ?? null,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price,
//     }));

//     const { data, error } = await supabase
//       .from("orders")
//       .insert([
//         {
//           customer_name,
//           phone,
//           address,
//           items: normalizedItems,
//           subtotal,
//           delivery_fee,
//           total_amount,
//           status: status || "new",
//         },
//       ])
//       .select()
//       .single();

//     if (error) {
//       console.error("Create order supabase error:", error);
//       return res.status(500).json({ error: error.message });
//     }

//     return res.status(201).json({
//       message: "Order created successfully",
//       order: data,
//     });
//   } catch (error) {
//     console.error("Create order error:", error);
//     return res.status(500).json({
//       error: error.message || "Internal server error",
//     });
//   }
// });

// app.get("/api/orders", adminLimiter, requireAdmin, async (req, res) => {
//   try {
//     if (!supabase) {
//       return res.status(500).json({ error: "Supabase is not configured" });
//     }

//     const page = Math.max(Number(req.query.page || 1), 1);
//     const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
//     const status = req.query.status ? String(req.query.status) : "";
//     const from = (page - 1) * limit;
//     const to = from + limit - 1;

//     let query = supabase
//       .from("orders")
//       .select("*", { count: "exact" })
//       .order("created_at", { ascending: false });

//     if (status) {
//       query = query.eq("status", status);
//     }

//     const { data, error, count } = await query.range(from, to);

//     if (error) {
//       console.error("Fetch orders supabase error:", error);
//       return res.status(500).json({ error: error.message });
//     }

//     return res.json({
//       orders: data || [],
//       pagination: {
//         page,
//         limit,
//         total: count || 0,
//         totalPages: count ? Math.ceil(count / limit) : 0,
//         hasNextPage: count ? page * limit < count : false,
//         hasPrevPage: page > 1,
//       },
//     });
//   } catch (error) {
//     console.error("Fetch orders error:", error);
//     return res.status(500).json({
//       error: error.message || "Could not fetch orders",
//     });
//   }
// });

// app.get("/api/orders/:id", async (req, res) => {
//   try {
//     if (!supabase) {
//       return res.status(500).json({ error: "Supabase is not configured" });
//     }

//     const { data, error } = await supabase
//       .from("orders")
//       .select("*")
//       .eq("id", req.params.id)
//       .single();

//     if (error) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     return res.json({ order: data });
//   } catch (error) {
//     console.error("Fetch single order error:", error);
//     return res.status(500).json({
//       error: error.message || "Could not fetch order",
//     });
//   }
// });

// app.patch(
//   "/api/orders/:id/status",
//   adminLimiter,
//   requireAdmin,
//   async (req, res) => {
//     try {
//       if (!supabase) {
//         return res.status(500).json({ error: "Supabase is not configured" });
//       }

//       const allowedStatuses = [
//         "new",
//         "confirmed",
//         "preparing",
//         "out_for_delivery",
//         "delivered",
//         "cancelled",
//       ];

//       const { status } = req.body;

//       if (!allowedStatuses.includes(status)) {
//         return res.status(400).json({ error: "Invalid status" });
//       }

//       const { data, error } = await supabase
//         .from("orders")
//         .update({ status })
//         .eq("id", req.params.id)
//         .select()
//         .single();

//       if (error) {
//         console.error("Update status supabase error:", error);
//         return res.status(500).json({ error: error.message });
//       }

//       return res.json({
//         message: "Order status updated successfully",
//         order: data,
//       });
//     } catch (error) {
//       console.error("Update order status error:", error);
//       return res.status(500).json({
//         error: error.message || "Could not update order status",
//       });
//     }
//   }
// );

// app.use((req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });

// app.use((err, req, res, next) => {
//   console.error("Unhandled express error:", err);

//   if (err.message === "Not allowed by CORS") {
//     return res.status(403).json({ error: "CORS blocked this origin" });
//   }

//   return res.status(500).json({
//     error: "Internal server error",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import axios from "axios";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://graceevillekitchen.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "x-admin-secret"],
  })
);

app.use(express.json({ limit: "1mb" }));
app.disable("x-powered-by");

app.use((req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    console.log(
      `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - startedAt}ms`
    );
  });

  next();
});

const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many admin requests, please try again later." },
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminSecret = process.env.ADMIN_SECRET;
const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
const paystackCallbackUrl = process.env.PAYSTACK_CALLBACK_URL;

const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

const paystackClient = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${paystackSecretKey}`,
    "Content-Type": "application/json",
  },
});

const allowedStatuses = [
  "new",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const orderSchema = z.object({
  customer_name: z.string().trim().min(2, "Customer name is required"),
  phone: z.string().trim().min(7, "Phone number is required"),
  address: z.string().trim().min(5, "Address is required"),
  email: z.string().trim().email("A valid email is required"),
  items: z
    .array(
      z.object({
        id: z.union([z.string(), z.number()]).optional(),
        name: z.string().trim().min(1, "Item name is required"),
        quantity: z.number().int().min(1, "Quantity must be at least 1"),
        price: z.number().min(0, "Price cannot be negative"),
      })
    )
    .min(1, "At least one item is required"),
  subtotal: z.number().min(0, "Subtotal cannot be negative"),
  delivery_fee: z.number().min(0, "Delivery fee cannot be negative"),
  total_amount: z.number().min(0, "Total amount cannot be negative"),
});

function requireAdmin(req, res, next) {
  const providedSecret = req.headers["x-admin-secret"];

  if (!adminSecret || providedSecret !== adminSecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

function toKobo(amount) {
  return Math.round(Number(amount || 0) * 100);
}

function makeReference() {
  return `GV_${Date.now()}_${crypto.randomBytes(6).toString("hex")}`;
}

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Restaurant API is running" });
});

app.get("/api/health", async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({
        ok: false,
        database: false,
        error: "Supabase is not configured",
      });
    }

    const { error } = await supabase.from("orders").select("id").limit(1);

    if (error) {
      return res.status(500).json({
        ok: false,
        database: false,
        error: error.message,
      });
    }

    return res.json({
      ok: true,
      database: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check error:", error);
    return res.status(500).json({
      ok: false,
      database: false,
      error: error.message || "Health check failed",
    });
  }
});

/**
 * Direct unpaid order creation route
 * Keep this route for fallback/manual ordering if needed.
 */
app.post("/api/orders", orderLimiter, async (req, res) => {
  try {
    const parsed = orderSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid order data",
        details: parsed.error.flatten(),
      });
    }

    if (!supabase) {
      return res.status(500).json({
        error: "Supabase is not configured on the server",
      });
    }

    const {
      customer_name,
      phone,
      address,
      email,
      items,
      subtotal,
      delivery_fee,
      total_amount,
    } = parsed.data;

    const normalizedItems = items.map((item) => ({
      id: item.id ?? null,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          customer_name,
          phone,
          address,
          email,
          items: normalizedItems,
          subtotal,
          delivery_fee,
          total_amount,
          payment_status: "unpaid",
          payment_reference: null,
          status: "new",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Create order supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({
      message: "Order created successfully",
      order: data,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
});

/**
 * Paystack initialize route
 */
app.post("/api/payments/initialize", orderLimiter, async (req, res) => {
  try {
    const parsed = orderSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid order data",
        details: parsed.error.flatten(),
      });
    }

    if (!paystackSecretKey) {
      return res.status(500).json({ error: "Paystack is not configured" });
    }

    const payload = parsed.data;
    const reference = makeReference();

    const metadata = {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: payload.customer_name,
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: payload.phone,
        },
        {
          display_name: "Address",
          variable_name: "address",
          value: payload.address,
        },
      ],
      order_payload: payload,
    };

    const { data } = await paystackClient.post("/transaction/initialize", {
      email: payload.email,
      amount: toKobo(payload.total_amount),
      reference,
      callback_url: paystackCallbackUrl,
      metadata,
      currency: "NGN",
    });

    if (!data?.status || !data?.data?.authorization_url) {
      return res.status(500).json({
        error: "Could not initialize payment",
      });
    }

    return res.json({
      message: "Payment initialized successfully",
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
      access_code: data.data.access_code,
    });
  } catch (error) {
    console.error("Initialize payment error:", error?.response?.data || error);
    return res.status(500).json({
      error:
        error?.response?.data?.message ||
        error.message ||
        "Could not initialize payment",
    });
  }
});

/**
 * Paystack verify route
 * Verifies payment and creates the order if successful and not already created
 */
app.get("/api/payments/verify/:reference", async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: "Supabase is not configured" });
    }

    if (!paystackSecretKey) {
      return res.status(500).json({ error: "Paystack is not configured" });
    }

    const { reference } = req.params;

    const verifyResponse = await paystackClient.get(
      `/transaction/verify/${reference}`
    );

    const verifyData = verifyResponse.data?.data;

    if (!verifyResponse.data?.status || !verifyData) {
      return res.status(400).json({ error: "Could not verify transaction" });
    }

    if (verifyData.status !== "success") {
      return res.status(400).json({
        error: `Payment not successful. Current status: ${verifyData.status}`,
      });
    }

    const { data: existingOrder, error: existingOrderError } = await supabase
      .from("orders")
      .select("*")
      .eq("payment_reference", reference)
      .maybeSingle();

    if (existingOrderError) {
      console.error("Check existing order error:", existingOrderError);
      return res.status(500).json({ error: existingOrderError.message });
    }

    if (existingOrder) {
      return res.json({
        message: "Payment verified successfully",
        order: existingOrder,
        alreadyExists: true,
      });
    }

    const metadata = verifyData.metadata || {};
    const payload = metadata.order_payload;

    if (!payload) {
      return res.status(400).json({
        error: "Missing order payload in payment metadata",
      });
    }

    const parsed = orderSchema.safeParse(payload);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Stored order payload is invalid",
        details: parsed.error.flatten(),
      });
    }

    const normalizedItems = parsed.data.items.map((item) => ({
      id: item.id ?? null,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const { data: order, error: insertError } = await supabase
      .from("orders")
      .insert([
        {
          customer_name: parsed.data.customer_name,
          phone: parsed.data.phone,
          address: parsed.data.address,
          email: parsed.data.email,
          items: normalizedItems,
          subtotal: parsed.data.subtotal,
          delivery_fee: parsed.data.delivery_fee,
          total_amount: parsed.data.total_amount,
          payment_status: "paid",
          payment_reference: reference,
          status: "new",
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error("Create paid order error:", insertError);
      return res.status(500).json({ error: insertError.message });
    }

    return res.json({
      message: "Payment verified successfully",
      order,
      alreadyExists: false,
    });
  } catch (error) {
    console.error("Verify payment error:", error?.response?.data || error);
    return res.status(500).json({
      error:
        error?.response?.data?.message ||
        error.message ||
        "Could not verify payment",
    });
  }
});

/**
 * Optional webhook placeholder
 * You can activate full webhook verification later.
 */
app.post("/api/payments/webhook", async (req, res) => {
  return res.sendStatus(200);
});

app.get("/api/orders", adminLimiter, requireAdmin, async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: "Supabase is not configured" });
    }

    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
    const status = req.query.status ? String(req.query.status) : "";
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("orders")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error("Fetch orders supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.json({
      orders: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: count ? Math.ceil(count / limit) : 0,
        hasNextPage: count ? page * limit < count : false,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return res.status(500).json({
      error: error.message || "Could not fetch orders",
    });
  }
});

app.get("/api/orders/:id", async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: "Supabase is not configured" });
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.json({ order: data });
  } catch (error) {
    console.error("Fetch single order error:", error);
    return res.status(500).json({
      error: error.message || "Could not fetch order",
    });
  }
});

app.patch(
  "/api/orders/:id/status",
  adminLimiter,
  requireAdmin,
  async (req, res) => {
    try {
      if (!supabase) {
        return res.status(500).json({ error: "Supabase is not configured" });
      }

      const { status } = req.body;

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const { data, error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", req.params.id)
        .select()
        .single();

      if (error) {
        console.error("Update status supabase error:", error);
        return res.status(500).json({ error: error.message });
      }

      return res.json({
        message: "Order status updated successfully",
        order: data,
      });
    } catch (error) {
      console.error("Update order status error:", error);
      return res.status(500).json({
        error: error.message || "Could not update order status",
      });
    }
  }
);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled express error:", err);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS blocked this origin" });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});