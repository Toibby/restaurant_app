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

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Restaurant API is running" });
});

app.post("/api/orders", async (req, res) => {
  try {
    const {
      customer_name,
      phone,
      address,
      items,
      subtotal,
      delivery_fee,
      total_amount,
      status,
    } = req.body;

    if (!customer_name || !phone || !address || !items?.length) {
      return res.status(400).json({ error: "Missing required order fields" });
    }

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          customer_name,
          phone,
          address,
          items,
          subtotal,
          delivery_fee,
          total_amount,
          status: status || "new",
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({
      message: "Order created successfully",
      order: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});