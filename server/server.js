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

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { z } from "zod";
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

const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

const orderSchema = z.object({
  customer_name: z.string().trim().min(2, "Customer name is required"),
  phone: z.string().trim().min(7, "Phone number is required"),
  address: z.string().trim().min(5, "Address is required"),
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
  status: z
    .enum([
      "new",
      "confirmed",
      "preparing",
      "out_for_delivery",
      "delivered",
      "cancelled",
    ])
    .optional(),
});

function requireAdmin(req, res, next) {
  const providedSecret = req.headers["x-admin-secret"];

  if (!adminSecret || providedSecret !== adminSecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
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
      items,
      subtotal,
      delivery_fee,
      total_amount,
      status,
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
          items: normalizedItems,
          subtotal,
          delivery_fee,
          total_amount,
          status: status || "new",
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

      const allowedStatuses = [
        "new",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ];

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