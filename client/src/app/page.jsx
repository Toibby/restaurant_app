// "use client";

// import { useMemo, useState } from "react";
// import Navbar from "@/components/Navbar";
// import Hero from "@/components/Hero";
// import SectionTitle from "@/components/SectionTitle";
// import CategoryTabs from "@/components/CategoryTabs";
// import FoodCard from "@/components/FoodCard";
// import CartDrawer from "@/components/CartDrawer";
// import CheckoutModal from "@/components/CheckoutModal";
// import { categories, foodData } from "@/data/foodData";

// export default function Page() {
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [cartOpen, setCartOpen] = useState(false);
//   const [checkoutOpen, setCheckoutOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);

//   const filteredItems = useMemo(() => {
//     if (activeCategory === "All") return foodData;
//     return foodData.filter((item) => item.category === activeCategory);
//   }, [activeCategory]);

//   const specials = foodData.slice(0, 3);

//   function addToCart(item) {
//     setCartItems((prev) => {
//       const existing = prev.find((cartItem) => cartItem.id === item.id);

//       if (existing) {
//         return prev.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       }

//       return [...prev, { ...item, quantity: 1 }];
//     });

//     setCartOpen(true);
//   }

//   function increaseQuantity(id) {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   }

//   function decreaseQuantity(id) {
//     setCartItems((prev) =>
//       prev
//         .map((item) =>
//           item.id === id ? { ...item, quantity: item.quantity - 1 } : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   }

//   function removeItem(id) {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   }

//   function handleSuccessfulOrder() {
//     setCartItems([]);
//     setCheckoutOpen(false);
//     setCartOpen(false);
//   }

//   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <main>
//       <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
//       <Hero />

//       <section id="menu" className="container-shell py-14">
//         <SectionTitle
//           eyebrow="Curated Menu"
//           title="Browse our most loved meals"
//           text="A premium selection of dishes designed to make the interface feel rich, modern and highly visual."
//         />

//         <CategoryTabs
//           categories={categories}
//           activeCategory={activeCategory}
//           onChange={setActiveCategory}
//         />

//         <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//           {filteredItems.map((item) => (
//             <FoodCard key={item.id} item={item} onAdd={addToCart} />
//           ))}
//         </div>
//       </section>

//       <section id="specials" className="container-shell py-10">
//         <SectionTitle
//           eyebrow="Highlights"
//           title="Special picks that sell the brand"
//           text="These featured cards help the page feel premium and restaurant-focused."
//         />

//         <div className="grid gap-6 md:grid-cols-3">
//           {specials.map((item) => (
//             <div
//               key={item.id}
//               className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="h-56 w-full object-cover"
//               />
//               <div className="p-5">
//                 <p className="text-sm uppercase tracking-[0.2em] text-orange-400">
//                   {item.tag}
//                 </p>
//                 <h3 className="mt-2 text-2xl font-bold text-white">{item.name}</h3>
//                 <p className="mt-3 text-sm leading-6 text-slate-300">
//                   {item.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section id="about" className="container-shell py-14">
//         <div className="grid gap-8 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 md:grid-cols-2">
//           <div>
//             <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-400">
//               About SavoryBite
//             </p>
//             <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
//               Built to feel like a real premium restaurant brand
//             </h2>
//           </div>

//           <p className="text-slate-300 leading-8">
//             This interface focuses on beautiful presentation, product confidence,
//             smooth ordering flow and a strong visual hierarchy. It is clean enough
//             for a real launch and simple enough to extend with payments, order tracking,
//             admin management and authentication later.
//           </p>
//         </div>
//       </section>

//       <CartDrawer
//         isOpen={cartOpen}
//         items={cartItems}
//         onClose={() => setCartOpen(false)}
//         onIncrease={increaseQuantity}
//         onDecrease={decreaseQuantity}
//         onRemove={removeItem}
//         onCheckout={() => {
//           setCartOpen(false);
//           setCheckoutOpen(true);
//         }}
//       />

//       <CheckoutModal
//         isOpen={checkoutOpen}
//         onClose={() => setCheckoutOpen(false)}
//         items={cartItems}
//         onSuccessfulOrder={handleSuccessfulOrder}
//       />
//     </main>
//   );
// }


"use client";

import { useMemo, useState } from "react";
import {
  ShoppingBag,
  Star,
  Plus,
  Minus,
  X,
  Flame,
  Clock3,
  ArrowRight,
} from "lucide-react";

const categories = ["All", "Rice", "Grills", "Burgers", "Drinks", "Desserts"];

const foodData = [
  {
    id: 1,
    name: "Smoky Jollof Supreme",
    category: "Rice",
    price: 4500,
    rating: 4.9,
    image:
      "/images/jollof.jpg",
    description: "Rich party jollof with grilled chicken and caramelized plantain.",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Peppered Turkey Grill",
    category: "Grills",
    price: 7800,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1200&q=80",
    description: "Tender spicy turkey platter with crisp fries and house dip.",
    tag: "Premium",
  },
  {
    id: 3,
    name: "Classic Angus Burger",
    category: "Burgers",
    price: 5900,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    description: "Juicy beef burger stacked with cheddar, lettuce and signature sauce.",
    tag: "Hot",
  },
  {
    id: 4,
    name: "Creamy Chicken Pasta",
    category: "Grills",
    price: 6200,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80",
    description: "Velvety pasta finished with seasoned chicken strips and herbs.",
    tag: "Chef Choice",
  },
  {
    id: 5,
    name: "Chapman Royale",
    category: "Drinks",
    price: 2500,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80",
    description: "A vibrant cold chapman with citrus notes and fruit garnish.",
    tag: "Refreshing",
  },
  {
    id: 6,
    name: "Molten Choco Cake",
    category: "Desserts",
    price: 3900,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
    description: "Warm soft-centered chocolate cake with a luxurious finish.",
    tag: "Sweet",
  },
  {
    id: 7,
    name: "Seafood Fried Rice",
    category: "Rice",
    price: 6900,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
    description: "Fragrant fried rice packed with prawns, vegetables and bold flavor.",
    tag: "New",
  },
  {
    id: 8,
    name: "BBQ Wings Basket",
    category: "Grills",
    price: 5200,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1200&q=80",
    description: "Sticky glazed wings with sesame finish and creamy ranch dip.",
    tag: "Popular",
  },
];

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function Page() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const filteredFoods = useMemo(() => {
    if (activeCategory === "All") return foodData;
    return foodData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = cart.length ? 1500 : 0;
  const total = subtotal + delivery;

  function addToCart(item) {
    setCart((prev) => {
      const found = prev.find((x) => x.id === item.id);
      if (found) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function increaseQty(id) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQty(id) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="container-shell topbar-inner">
          <div className="brand-wrap">
            <div className="brand-icon">S</div>
            <div>
              <h1 className="brand-name">Gracee Ville Kitchen N Events</h1>
              <p className="brand-sub">Premium Catering • Kitchen • Events</p>
            </div>
          </div>

          <nav className="desktop-nav">
            <a href="#menu">Menu</a>
            <a href="#specials">Specials</a>
            <a href="#about">About</a>
          </nav>

          <button className="cart-button" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={18} />
            <span>Cart</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <section className="hero-section container-shell">
        <div className="hero-copy">
          <div className="hero-chip">
            <Flame size={16} />
            Premium meals, modern ordering
          </div>

          <h2 className="hero-title">
            A restaurant that actually feels premium, Seamless ordering.
            {/* Memorable food. Beautifully served */}
          </h2>

          <p className="hero-text">
            From everyday meals to unforgettable events, 
            Gracee Ville Kitchen N Events brings premium taste, 
            elegant presentation, and seamless ordering together.
          </p>

          <div className="hero-actions">
            <a href="#menu" className="primary-btn">
              Explore Menu
              <ArrowRight size={18} />
            </a>

            <button className="secondary-btn" onClick={() => setCartOpen(true)}>
              Open Cart
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <Star size={16} />
              <div>
                <strong>4.9/5</strong>
                <span>Guest Satisfaction</span>
              </div>
            </div>
            <div className="stat-card">
              <Clock3 size={16} />
              <div>
                <strong>20 mins</strong>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"
              alt="Luxury plated food"
            />
          </div>

          <div className="floating-card">
            <span className="floating-label">Today’s Highlight</span>
            <h3>Gourmet Dining Selection</h3>
            <p>Bold flavor, perfect presentation, premium vibe.</p>
          </div>
        </div>
      </section>

      <section id="specials" className="container-shell section-space">
        <div className="section-head">
          <div>
            <p className="section-eyebrow">Chef’s Selection</p>
            <h3 className="section-title">Signature dishes curated for you</h3>
          </div>
        </div>

        <div className="special-grid">
          {foodData.slice(0, 3).map((item) => (
            <div className="special-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="special-card-body">
                <span className="mini-tag">{item.tag}</span>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="menu" className="container-shell section-space">
        <div className="section-head">
          <div>
            <p className="section-eyebrow">Our Menu</p>
            <h3 className="section-title">Explore our signature offerings</h3>
            <p className="section-text">
              Each dish is prepared with care, crafted to deliver both flavor and experience.
            </p>
          </div>
        </div>

        <div className="category-row">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category ? "category-pill active" : "category-pill"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="food-grid">
          {filteredFoods.map((item) => (
            <article className="food-card" key={item.id}>
              <div className="food-image-wrap">
                <img src={item.image} alt={item.name} />
                <span className="food-tag">{item.tag}</span>
              </div>

              <div className="food-body">
                <div className="food-top">
                  <div>
                    <h4>{item.name}</h4>
                    <p className="food-category">{item.category}</p>
                  </div>

                  <div className="rating-pill">
                    <Star size={13} fill="currentColor" />
                    {item.rating}
                  </div>
                </div>

                <p className="food-description">{item.description}</p>

                <div className="food-bottom">
                  <strong>{formatCurrency(item.price)}</strong>

                  <button className="add-btn" onClick={() => addToCart(item)}>
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="container-shell section-space bottom-space">
        <div className="about-box">
          <div>
            <p className="section-eyebrow">About</p>
            <h3 className="section-title">Built for a premium dining experience</h3>
          </div>

          <p className="about-text">
            Gracee Ville Kitchen N Events combines quality ingredients, refined preparation, 
            and a seamless digital experience to bring restaurant-level dining closer to you.
          </p>
        </div>
      </section>

      <div className={cartOpen ? "cart-overlay show" : "cart-overlay"} onClick={() => setCartOpen(false)} />

      <aside className={cartOpen ? "cart-drawer open" : "cart-drawer"}>
        <div className="cart-header">
          <div>
            <h3>Your Cart</h3>
            <p>{cartCount} item(s)</p>
          </div>

          <button className="icon-btn" onClick={() => setCartOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-state">
              <p>Your cart is empty</p>
              <span>Add meals to begin your order.</span>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <div className="cart-item-top">
                    <div>
                      <h4>{item.name}</h4>
                      <p>{formatCurrency(item.price)}</p>
                    </div>

                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      <X size={16} />
                    </button>
                  </div>

                  <div className="cart-item-bottom">
                    <div className="qty-box">
                      <button onClick={() => decreaseQty(item.id)}>
                        <Minus size={15} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)}>
                        <Plus size={15} />
                      </button>
                    </div>

                    <strong>{formatCurrency(item.price * item.quantity)}</strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>{formatCurrency(delivery)}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          {/* MAIN CHECKOUT */}
          <button
            className="checkout-btn"
            disabled={!cart.length}
            onClick={() => {
              setCartOpen(false);
              setCheckoutOpen(true);
            }}
          >
            Proceed to Checkout
          </button>

          {/* WHATSAPP BUTTON */}
          <a
            className="whatsapp-btn"
            href={`https://wa.me/2348023567823?text=${encodeURIComponent(
              `Hello, I want to place an order.

        Items:
        ${cart.map((item) => `${item.name} x ${item.quantity}`).join("\n")}

        Total: ${formatCurrency(total)}
        `
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Order via WhatsApp
          </a>
        </div>

        {/* <div className="cart-footer">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{formatCurrency(delivery)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <button
            className="checkout-btn"
            disabled={!cart.length}
            onClick={() => {
              setCartOpen(false);
              setCheckoutOpen(true);
            }}
          >
            Proceed to Checkout
          </button>
        </div> */}
      </aside>
      {checkoutOpen && (
        <>
          <div
            className="cart-overlay show"
            onClick={() => setCheckoutOpen(false)}
          />

          <div className="checkout-modal">
            <div className="checkout-box">
              <h2>Checkout</h2>

              <input placeholder="Full Name" id="name" />
              <input placeholder="Phone Number" id="phone" />
              <textarea placeholder="Delivery Address" id="address" />

              <button
                className="checkout-btn"
                onClick={async () => {
                  const payload = {
                    customer_name: document.getElementById("name").value,
                    phone: document.getElementById("phone").value,
                    address: document.getElementById("address").value,
                    items: cart,
                    subtotal,
                    delivery_fee: delivery,
                    total_amount: total,
                  };

                  try {
                    const res = await fetch(
                      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                      }
                    );

                    const data = await res.json();

                    if (!res.ok) throw new Error(data.error);

                    alert("Order placed successfully ✅");

                    setCart([]);
                    setCheckoutOpen(false);
                  } catch (err) {
                    alert("Order failed ❌");
                  }
                }}
              >
                Place Order
              </button>
              <a
                className="whatsapp-btn"
                href={`https://wa.me/2348000000000?text=${encodeURIComponent(
                  `Hello, I want to place an order.\n\nItems:\n${cart
                    .map((item) => `${item.name} x ${item.quantity}`)
                    .join("\n")}\n\nTotal: ${formatCurrency(total)}`
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Order via WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </main>
  );
}