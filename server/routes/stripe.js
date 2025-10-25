// import "dotenv/config" // load .env into process.env
// import express from "express"
// import Stripe from "stripe"

// const router = express.Router()

// // secret stripe key
// const KEY = process.env.STRIPE_KEY
// const stripe = KEY ? Stripe(KEY) : null

// // POST /api/checkout/create-checkout-session
// // expects { items: [...], total } or fallback to total in body
// router.post("/create-checkout-session", async (req, res) => {
//   if (!stripe) {
//     console.error(
//       "Stripe secret key (STRIPE_KEY) is not configured on the server."
//     )
//     return res
//       .status(500)
//       .json({ message: "Stripe secret key not configured on server." })
//   }

//   try {
//     const { items, total } = req.body

//     // Build a single line item from total if detailed items/prices aren't provided.
//     // If you send detailed items (with name, unit_amount, quantity), you can map them here.
//     const line_items =
//       items && items.length
//         ? items.map((p) => ({
//             price_data: {
//               currency: "usd",
//               unit_amount: Math.round((Number(p.price) || 0) * 100),
//               product_data: {
//                 name: p.title || "Product",
//               },
//             },
//             quantity: p.quantity || 1,
//           }))
//         : [
//             {
//               price_data: {
//                 currency: "usd",
//                 unit_amount: Math.round((Number(total) || 0) * 100),
//                 product_data: {
//                   name: "Order Total",
//                 },
//               },
//               quantity: 1,
//             },
//           ]

//     const YOUR_DOMAIN = process.env.FRONTEND_URL || "http://localhost:5173"

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items,
//       success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${YOUR_DOMAIN}/cart`,
//     })

//     // For newer Stripe SDKs session.url is directly usable for redirect
//     return res.status(200).json({ url: session.url })
//   } catch (err) {
//     console.error("Stripe create session error:", err)
//     return res
//       .status(500)
//       .json({ error: "Failed to create Stripe session", details: err.message })
//   }
// })

// export default router
