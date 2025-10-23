// import { useEffect, useState } from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { useNavigate } from "react-router-dom"

// gsap.registerPlugin(ScrollTrigger)

// const newArrivals = [
//   {
//     id: 1,
//     name: "Celestial Silk Gown",
//     price: "Rs 8,999",
//     originalPrice: "Rs 12,999",
//     discount: "30% OFF",
//     image: "/newarrivals/clestel.jpg",
//     tag: "✨ JUST LAUNCHED",
//     colors: ["Midnight Blue", "Burgundy", "Emerald Green"],
//     description: "Handcrafted silk gown with celestial embroidery",
//     features: ["Pure Silk", "Hand Embroidered", "Limited Edition"],
//     rating: 4.9,
//     reviews: 127,
//   },
//   {
//     id: 2,
//     name: "Bohemian Sunset Maxi",
//     price: "Rs 3,499",
//     originalPrice: "Rs 4,999",
//     discount: "25% OFF",
//     image: "/newarrivals/bohimian.jpg",
//     tag: "🔥 TRENDING",
//     colors: ["Sunset Orange", "Ocean Blue", "Forest Green"],
//     description: "Flowey bohemian dress with sunset gradient patterns",
//     features: ["Breathable Cotton", "Ethnic Print", "Comfort Fit"],
//     rating: 4.8,
//     reviews: 89,
//   },
//   {
//     id: 3,
//     name: "Crystal Embellished Cocktail",
//     price: "Rs 6,799",
//     originalPrice: "Rs 8,499",
//     discount: "20% OFF",
//     image: "/newarrivals/crystal.jpg",
//     tag: "💎 PREMIUM",
//     colors: ["Black", "Navy Blue", "Ruby Red"],
//     description: "Sparkling cocktail dress with Swarovski crystals",
//     features: ["Swarovski Crystals", "Figure Hugging", "Party Ready"],
//     rating: 4.9,
//     reviews: 203,
//   },
//   {
//     id: 4,
//     name: "Floral Romance A-Line",
//     price: "Rs 2,999",
//     originalPrice: "Rs 3,999",
//     discount: "15% OFF",
//     image: "/newarrivals/floral.jpg",
//     tag: "🌺 SUMMER FAVORITE",
//     colors: ["Pink Blush", "Lavender", "Mint Green"],
//     description: "Floral print A-line dress for romantic occasions",
//     features: ["Premium Chiffon", "Floral Print", "A-Line Silhouette"],
//     rating: 4.7,
//     reviews: 156,
//   },
//   {
//     id: 5,
//     name: "Designer Saree Gown",
//     price: "Rs 7,499",
//     originalPrice: "Rs 9,999",
//     discount: "35% OFF",
//     image: "/newarrivals/saree.jpg",
//     tag: "🎯 EXCLUSIVE",
//     colors: ["Royal Purple", "Gold", "Silver Grey"],
//     description: "Fusion saree-gown with contemporary draping",
//     features: ["Designer Edition", "Fusion Wear", "Statement Piece"],
//     rating: 5.0,
//     reviews: 67,
//   },
// ]

// // Quick View Modal Component
// function QuickViewModal({ dress, onClose, onViewDetails }) {
//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="relative">
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white transition-colors"
//           >
//             ✕
//           </button>

//           <div className="grid md:grid-cols-2 gap-8 p-8">
//             {/* Image Section */}
//             <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 md:h-96 flex items-center justify-center">
//               <img src={dress.image} alt="Dress Image" />
//             </div>

//             {/* Details Section */}
//             <div className="space-y-6">
//               <div>
//                 <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
//                   {dress.discount}
//                 </span>
//                 <span className="bg-teal-800 text-white px-3 py-1 rounded-full text-xs font-semibold ml-2">
//                   {dress.tag}
//                 </span>
//               </div>

//               <h2 className="text-3xl font-bold text-gray-800">{dress.name}</h2>

//               <p className="text-gray-600 text-lg">{dress.description}</p>

//               <div className="flex flex-wrap gap-2">
//                 {dress.features.map((feature, idx) => (
//                   <span
//                     key={idx}
//                     className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium border border-teal-100"
//                   >
//                     {feature}
//                   </span>
//                 ))}
//               </div>

//               <div className="flex items-center gap-2">
//                 <span className="text-gray-600">Colors:</span>
//                 <div className="flex gap-2">
//                   {dress.colors.map((color, idx) => (
//                     <div
//                       key={idx}
//                       className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 border-2 border-white shadow-sm"
//                       title={color}
//                     ></div>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <span className="text-3xl font-bold text-teal-700">
//                     {dress.price}
//                   </span>
//                   <span className="text-lg text-gray-400 line-through">
//                     {dress.originalPrice}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <div className="flex text-yellow-400 text-lg">
//                     {"★".repeat(Math.floor(dress.rating))}
//                   </div>
//                   <span className="text-gray-500">({dress.reviews})</span>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <button className="flex-1 bg-gray-100 text-gray-800 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
//                   Add to Cart
//                 </button>
//                 <button
//                   onClick={() => onViewDetails(dress.id)}
//                   className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
//                 >
//                   View Full Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function NewArrivals() {
//   const navigate = useNavigate()
//   const [quickViewDress, setQuickViewDress] = useState(null)

//   useEffect(() => {
//     const cards = gsap.utils.toArray(".dress-card")

//     // Initial stacked position (like a fashion catalog)
//     gsap.set(cards, {
//       y: (i) => i * 25,
//       x: (i) => i * 12,
//       rotationZ: (i) => (i - 2) * 1.5,
//       scale: (i) => 1 - i * 0.04,
//       opacity: (i) => 1 - i * 0.2,
//       transformOrigin: "center center",
//     })

//     // Master timeline
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".new-arrivals-section",
//         start: "top 70%",
//         end: "bottom 20%",
//         scrub: 1.2,
//         markers: false,
//       },
//     })

//     // Phase 1: Fashion Show Entrance
//     tl.to(
//       cards,
//       {
//         y: (i) => -i * 60,
//         x: (i) => (i - 2) * 150,
//         rotationZ: (i) => (i - 2) * 8,
//         scale: 1,
//         opacity: 1,
//         stagger: 0.15,
//         duration: 1.8,
//         ease: "back.out(1.4)",
//       },
//       "entrance"
//     )

//     // Phase 2: Fashion Carousel
//     tl.to(
//       cards,
//       {
//         x: (i) => (i - 2) * 120,
//         y: 0,
//         rotationZ: (i) => (i - 2) * 12,
//         scale: (i) => 1 - Math.abs(i - 2) * 0.15,
//         opacity: (i) => 1 - Math.abs(i - 2) * 0.3,
//         zIndex: (i) => cards.length - i,
//         duration: 1.5,
//         ease: "power2.inOut",
//       },
//       "carousel+=0.3"
//     )

//     // Phase 3: Rotating Showcase
//     cards.forEach((_, index) => {
//       tl.to(
//         cards,
//         {
//           x: (i) => {
//             const newIndex = (i - index + cards.length) % cards.length
//             return (newIndex - 2) * 100
//           },
//           scale: (i) => {
//             const newIndex = (i - index + cards.length) % cards.length
//             return 1 - Math.abs(newIndex - 2) * 0.2
//           },
//           opacity: (i) => {
//             const newIndex = (i - index + cards.length) % cards.length
//             return 1 - Math.abs(newIndex - 2) * 0.4
//           },
//           rotationZ: (i) => {
//             const newIndex = (i - index + cards.length) % cards.length
//             return (newIndex - 2) * 10
//           },
//           zIndex: (i) => {
//             const newIndex = (i - index + cards.length) % cards.length
//             return cards.length - newIndex
//           },
//           duration: 0.9,
//           ease: "power2.inOut",
//         },
//         `showcase-${index}`
//       )
//     })

//     // Phase 4: Final Elegant Stack
//     tl.to(
//       cards,
//       {
//         x: 0,
//         y: (i) => i * 30,
//         rotationZ: 0,
//         scale: (i) => 1 - i * 0.05,
//         opacity: (i) => 1 - i * 0.25,
//         zIndex: (i) => i,
//         duration: 1.2,
//         ease: "power2.in",
//       },
//       "final"
//     )

//     // Hover effects for premium feel
//     cards.forEach((card) => {
//       card.addEventListener("mouseenter", () => {
//         gsap.to(card, {
//           scale: 1.08,
//           y: -15,
//           rotationZ: 0,
//           boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
//           duration: 0.4,
//           ease: "power2.out",
//         })

//         // Highlight product details
//         const details = card.querySelector(".product-details")
//         gsap.to(details, {
//           opacity: 1,
//           y: 0,
//           duration: 0.3,
//         })
//       })

//       card.addEventListener("mouseleave", () => {
//         gsap.to(card, {
//           scale: 1,
//           y: 0,
//           rotationZ: gsap.getProperty(card, "rotationZ"),
//           boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
//           duration: 0.4,
//           ease: "power2.out",
//         })
//       })
//     })

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
//     }
//   }, [])

//   // Click handlers
//   const handleCardClick = (dress, event) => {
//     event.stopPropagation()
//     setQuickViewDress(dress)
//   }

//   const handleImageClick = (dressId, event) => {
//     event.stopPropagation()
//     navigate(`/dress/${dressId}`)
//   }

//   const handleQuickViewClose = () => {
//     setQuickViewDress(null)
//   }

//   const handleViewDetails = (dressId) => {
//     navigate(`/dress/${dressId}`)
//     setQuickViewDress(null)
//   }

//   const handleQuickViewButton = (dress, event) => {
//     event.stopPropagation()
//     setQuickViewDress(dress)
//   }

//   return (
//     <>
//       <section className="new-arrivals-section min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden py-20">
//         {/* Premium Header */}
//         <div className="text-center mb-16 z-10 px-4">
//           <div className="inline-block mb-4">
//             <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wider">
//               NEW COLLECTION
//             </span>
//           </div>
//           <h2 className="text-6xl font-bold text-teal-700 mb-6">
//             Just Arrived
//           </h2>
//           <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
//             Discover our latest designer dresses that are turning heads and
//             setting trends
//           </p>
//         </div>

//         {/* Fashion Cards Container */}
//         <div className="cards-container relative w-full max-w-7xl h-[600px] flex items-center justify-center mb-20">
//           {newArrivals.map((dress, index) => (
//             <div
//               key={dress.id}
//               className="dress-card absolute w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transform-gpu"
//               style={{
//                 backdropFilter: "blur(20px)",
//               }}
//               onClick={(e) => handleCardClick(dress, e)}
//             >
//               {/* Discount Badge */}
//               <div className="absolute top-4 left-4 z-20">
//                 <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
//                   {dress.discount}
//                 </span>
//               </div>

//               {/* Tag */}
//               <div className="absolute top-4 right-4 z-20">
//                 <span className="bg-teal-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                   {dress.tag}
//                 </span>
//               </div>

//               {/* Dress Image - Click goes to product page */}
//               <div
//                 className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden cursor-pointer"
//                 onClick={(e) => handleImageClick(dress.id, e)}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>

//                 <div className="w-full h-full flex items-center justify-center text-gray-400">
//                   <img src={dress.image} alt="Dress Image" />
//                 </div>
//               </div>

//               {/* Product Details */}
//               <div className="p-6 product-details opacity-95">
//                 {/* Dress Name */}
//                 <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
//                   {dress.name}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                   {dress.description}
//                 </p>

//                 {/* Features */}
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {dress.features.map((feature, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-teal-50 text-teal-700 px-2 py-1 rounded text-xs font-medium border border-teal-100"
//                     >
//                       {feature}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Colors */}
//                 <div className="flex items-center gap-2 mb-4">
//                   <span className="text-xs text-gray-500">Colors:</span>
//                   <div className="flex gap-1">
//                     {dress.colors.map((color, idx) => (
//                       <div
//                         key={idx}
//                         className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-500"
//                         title={color}
//                       ></div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Price & Rating */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <span className="text-2xl font-bold text-teal-700">
//                       {dress.price}
//                     </span>
//                     <span className="text-sm text-gray-400 line-through">
//                       {dress.originalPrice}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-1">
//                     <div className="flex text-yellow-400">
//                       {"★".repeat(Math.floor(dress.rating))}
//                       <span className="text-gray-300">
//                         {"★".repeat(5 - Math.floor(dress.rating))}
//                       </span>
//                     </div>
//                     <span className="text-xs text-gray-500">
//                       ({dress.reviews})
//                     </span>
//                   </div>
//                 </div>

//                 {/* CTA Button - Opens Quick View */}
//                 <button
//                   onClick={(e) => handleQuickViewButton(dress, e)}
//                   className="w-full mt-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
//                 >
//                   Quick View
//                 </button>
//               </div>

//               {/* Glow Effect */}
//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-500/10 to-teal-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
//             </div>
//           ))}
//         </div>

//         {/* Stats Bar */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4 text-center">
//           <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
//             <div className="text-2xl font-bold text-teal-600 mb-2">50+</div>
//             <div className="text-gray-600 font-medium">New Designs</div>
//           </div>
//           <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
//             <div className="text-2xl font-bold text-teal-600 mb-2">24H</div>
//             <div className="text-gray-600 font-medium">Express Delivery</div>
//           </div>
//           <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
//             <div className="text-2xl font-bold text-teal-600 mb-2">4.9★</div>
//             <div className="text-gray-600 font-medium">Customer Rating</div>
//           </div>
//           <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
//             <div className="text-2xl font-bold text-teal-600 mb-2">100%</div>
//             <div className="text-gray-600 font-medium">Quality Guarantee</div>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
//           <p className="text-gray-500 text-sm mb-2 font-medium">
//             Explore More Designs
//           </p>
//           <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-gradient-to-b from-teal-500 to-teal-600 rounded-full mt-2 animate-bounce"></div>
//           </div>
//         </div> */}
//       </section>

//       {/* Quick View Modal */}
//       {quickViewDress && (
//         <QuickViewModal
//           dress={quickViewDress}
//           onClose={handleQuickViewClose}
//           onViewDetails={handleViewDetails}
//         />
//       )}
//     </>
//   )
// }

// import React, { useEffect, useRef } from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"

// import { useNavigate } from "react-router-dom"

// gsap.registerPlugin(ScrollTrigger)

// const CARDS = [
//   {
//     id: 1,
//     title: "Celestial Silk Gown",
//     subtitle: "Handcrafted • Limited edition",
//     price: "Rs 8,999",
//     img: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=60",
//   },
//   {
//     id: 2,
//     title: "Bohemian Sunset Maxi",
//     subtitle: "Flowy • Breathable cotton",
//     price: "Rs 3,499",
//     img: "https://images.unsplash.com/photo-1520975910095-22b6f3612f64?auto=format&fit=crop&w=900&q=60",
//   },
//   {
//     id: 3,
//     title: "Crystal Embellished Cocktail",
//     subtitle: "Sparkle-ready • Party piece",
//     price: "Rs 6,799",
//     img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=60",
//   },
//   {
//     id: 4,
//     title: "Floral Romance A-Line",
//     subtitle: "Romantic • Lightweight chiffon",
//     price: "Rs 2,999",
//     img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=60",
//   },
// ]

// export default function CardStack() {
//   const containerRef = useRef(null)

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const panels = gsap.utils.toArray(".cs-panel")

//       // ensure panels stacked visually with correct z-index
//       panels.forEach((p, i) => {
//         p.style.zIndex = String(panels.length - i)
//       })

//       panels.forEach((panel, i) => {
//         const inner = panel.querySelector(".cs-card")

//         // small initial state so they animate into place
//         gsap.set(inner, {
//           scale: 1,
//           y: 40,
//           boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//         })

//         // pin each panel, animate the card to "stack" look while pinned
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: panel,
//             start: "top top",
//             end: "+=80%", // how long this card stays pinned
//             pin: true,
//             pinSpacing: false,
//             scrub: 0.8,
//             anticipatePin: 1,
//           },
//         })

//         // As user scrolls while panel is pinned:
//         // - card translates up slightly
//         // - card scales down a bit to give stacked depth
//         // - shadow increases for separation
//         tl.to(
//           inner,
//           {
//             y: -12,
//             scale: 0.96,
//             boxShadow: "0 30px 60px rgba(2,6,23,0.12)",
//             duration: 1,
//             ease: "power2.out",
//           },
//           0
//         )

//         // if not the last card, nudge the next panel's card up a bit so it peeks in
//         if (i < panels.length - 1) {
//           const nextInner = panels[i + 1].querySelector(".cs-card")
//           tl.to(
//             nextInner,
//             {
//               y: 80,
//               scale: 1.02,
//               opacity: 0.98,
//               duration: 1,
//               ease: "power2.out",
//             },
//             0
//           )
//         }
//       })
//     }, containerRef)

//     return () => ctx.revert()
//   }, [])

//   return (
//     <div
//       ref={containerRef}
//       className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
//     >
//       <div className="max-w-3xl mx-auto py-24">
//         <header className="text-center mb-12">
//           <span className="inline-block bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
//             NEW COLLECTION
//           </span>
//           <h1 className="mt-6 text-4xl font-extrabold text-teal-800">
//             Just Arrived
//           </h1>
//           <p className="mt-3 text-gray-600">
//             Scroll to reveal our stacked card showcase.
//           </p>
//         </header>

//         {/* Panels: each panel pins and creates stacking effect */}
//         <div className="flex flex-col gap-12">
//           {CARDS.map((c, idx) => (
//             <section
//               key={c.id}
//               className="cs-panel h-[70vh] flex items-center justify-center"
//               aria-hidden={false}
//             >
//               <article
//                 className="cs-card w-full max-w-md bg-white rounded-3xl overflow-hidden transform-gpu"
//                 style={{ willChange: "transform, box-shadow" }}
//               >
//                 <div className="h-64 w-full overflow-hidden">
//                   <img
//                     src={c.img}
//                     alt={c.title}
//                     className="w-full h-full object-cover"
//                     draggable="false"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <h2 className="text-xl font-bold text-gray-800">{c.title}</h2>
//                   <p className="mt-2 text-sm text-gray-500">{c.subtitle}</p>
//                   <div className="mt-4 flex items-center justify-between">
//                     <div className="text-teal-600 font-semibold">{c.price}</div>
//                     <button className="bg-teal-600 text-white text-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition">
//                       View
//                     </button>
//                   </div>
//                 </div>
//               </article>
//             </section>
//           ))}
//         </div>

//         <footer className="mt-28 text-center text-sm text-gray-500">
//           Tip: slow scroll to see the stacking animation.
//         </footer>
//       </div>
//     </div>
//   )
// }

// import "./newarrival.css"
// import { useEffect, useRef } from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { useNavigate } from "react-router-dom"
// import { useState } from "react"
// gsap.registerPlugin(ScrollTrigger)

// const newArrivals = [
//   {
//     id: 1,
//     name: "Celestial Silk Gown",
//     price: "Rs 8,999",
//     originalPrice: "Rs 12,999",
//     discount: "30% OFF",
//     image: "/newarrivals/clestel.jpg",
//     tag: "✨ JUST LAUNCHED",
//     colors: ["Midnight Blue", "Burgundy", "Emerald Green"],
//     description: "Handcrafted silk gown with celestial embroidery",
//     features: ["Pure Silk", "Hand Embroidered", "Limited Edition"],
//     rating: 4.9,
//     reviews: 127,
//   },
//   {
//     id: 2,
//     name: "Bohemian Sunset Maxi",
//     price: "Rs 3,499",
//     originalPrice: "Rs 4,999",
//     discount: "25% OFF",
//     image: "/newarrivals/bohimian.jpg",
//     tag: "🔥 TRENDING",
//     colors: ["Sunset Orange", "Ocean Blue", "Forest Green"],
//     description: "Flowey bohemian dress with sunset gradient patterns",
//     features: ["Breathable Cotton", "Ethnic Print", "Comfort Fit"],
//     rating: 4.8,
//     reviews: 89,
//   },
//   {
//     id: 3,
//     name: "Crystal Embellished Cocktail",
//     price: "Rs 6,799",
//     originalPrice: "Rs 8,499",
//     discount: "20% OFF",
//     image: "/newarrivals/crystal.jpg",
//     tag: "💎 PREMIUM",
//     colors: ["Black", "Navy Blue", "Ruby Red"],
//     description: "Sparkling cocktail dress with Swarovski crystals",
//     features: ["Swarovski Crystals", "Figure Hugging", "Party Ready"],
//     rating: 4.9,
//     reviews: 203,
//   },
//   {
//     id: 4,
//     name: "Floral Romance A-Line",
//     price: "Rs 2,999",
//     originalPrice: "Rs 3,999",
//     discount: "15% OFF",
//     image: "/newarrivals/floral.jpg",
//     tag: "🌺 SUMMER FAVORITE",
//     colors: ["Pink Blush", "Lavender", "Mint Green"],
//     description: "Floral print A-line dress for romantic occasions",
//     features: ["Premium Chiffon", "Floral Print", "A-Line Silhouette"],
//     rating: 4.7,
//     reviews: 156,
//   },
// ]

// // Quick View Modal Component
// function QuickViewModal({ dress, onClose, onViewDetails }) {
//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="relative">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white transition-colors"
//           >
//             ✕
//           </button>

//           <div className="grid md:grid-cols-2 gap-8 p-8">
//             <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 md:h-96 flex items-center justify-center">
//               <img src={dress.image} alt="Dress Image" />
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
//                   {dress.discount}
//                 </span>
//                 <span className="bg-teal-800 text-white px-3 py-1 rounded-full text-xs font-semibold ml-2">
//                   {dress.tag}
//                 </span>
//               </div>

//               <h2 className="text-3xl font-bold text-gray-800">{dress.name}</h2>

//               <p className="text-gray-600 text-lg">{dress.description}</p>

//               <div className="flex flex-wrap gap-2">
//                 {dress.features.map((feature, idx) => (
//                   <span
//                     key={idx}
//                     className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium border border-teal-100"
//                   >
//                     {feature}
//                   </span>
//                 ))}
//               </div>

//               <div className="flex items-center gap-2">
//                 <span className="text-gray-600">Colors:</span>
//                 <div className="flex gap-2">
//                   {dress.colors.map((color, idx) => (
//                     <div
//                       key={idx}
//                       className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 border-2 border-white shadow-sm"
//                       title={color}
//                     ></div>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <span className="text-3xl font-bold text-teal-700">
//                     {dress.price}
//                   </span>
//                   <span className="text-lg text-gray-400 line-through">
//                     {dress.originalPrice}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <div className="flex text-yellow-400 text-lg">
//                     {"★".repeat(Math.floor(dress.rating))}
//                   </div>
//                   <span className="text-gray-500">({dress.reviews})</span>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <button className="flex-1 bg-gray-100 text-gray-800 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
//                   Add to Cart
//                 </button>
//                 <button
//                   onClick={() => onViewDetails(dress.id)}
//                   className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
//                 >
//                   View Full Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function NewArrivals() {
//   const navigate = useNavigate()
//   const [quickViewDress, setQuickViewDress] = useState(null)
//   const sectionRef = useRef(null)

//   useEffect(() => {
//     // Initialize GSAP ScrollTrigger for layered pinning
//     const panels = gsap.utils.toArray(".panel-wrapper")

//     panels.forEach((panel, i) => {
//       ScrollTrigger.create({
//         trigger: panel,
//         start: "top top",
//         pin: true,
//         pinSpacing: false,
//         scrub: true,
//       })
//     })

//     // Optional: Add snap scrolling
//     ScrollTrigger.create({
//       snap: 1 / panels.length,
//     })

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
//     }
//   }, [])

//   const handleQuickView = (dress, e) => {
//     e.stopPropagation()
//     setQuickViewDress(dress)
//   }

//   const handleViewDetails = (dressId) => {
//     navigate(`/dress/${dressId}`)
//     setQuickViewDress(null)
//   }

//   const handleQuickViewClose = () => {
//     setQuickViewDress(null)
//   }

//   return (
//     <div className="new-arrivals-layered" ref={sectionRef}>
//       {/* Introduction Panel */}
//       <div className="description-panel panel blue">
//         <div className="text-center">
//           <h1 className="text-6xl font-bold text-white mb-6">New Arrivals</h1>
//           <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
//             Discover our latest collection of exclusive designer dresses. Scroll
//             to explore each stunning piece in detail.
//           </p>
//           <div className="scroll-down text-white/80">
//             Scroll down
//             <div className="arrow">↓</div>
//           </div>
//         </div>
//       </div>

//       {/* Product Panels */}
//       {newArrivals.map((dress, index) => (
//         <div key={dress.id} className="panel-wrapper">
//           <section className={`panel panel-${index + 1}`}>
//             <div className="panel-content">
//               <div className="grid md:grid-cols-2 gap-8 items-center">
//                 {/* Image Section */}
//                 <div className="image-section">
//                   <div className="relative">
//                     <div className="absolute top-4 left-4 z-20">
//                       <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
//                         {dress.discount}
//                       </span>
//                     </div>
//                     <div className="absolute top-4 right-4 z-20">
//                       <span className="bg-teal-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                         {dress.tag}
//                       </span>
//                     </div>
//                     <img
//                       src={dress.image}
//                       alt={dress.name}
//                       className="w-full h-80 object-cover rounded-2xl shadow-2xl"
//                     />
//                   </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="content-section">
//                   <h2 className="text-4xl font-bold text-gray-800 mb-4">
//                     {dress.name}
//                   </h2>

//                   <p className="text-gray-600 text-lg mb-6 leading-relaxed">
//                     {dress.description}
//                   </p>

//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {dress.features.map((feature, idx) => (
//                       <span
//                         key={idx}
//                         className="bg-teal-50 text-teal-700 px-3 py-2 rounded-full text-sm font-medium border border-teal-100"
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                   </div>

//                   <div className="flex items-center gap-3 mb-6">
//                     <span className="text-gray-600 font-medium">Colors:</span>
//                     <div className="flex gap-2">
//                       {dress.colors.map((color, idx) => (
//                         <div
//                           key={idx}
//                           className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 border-2 border-white shadow-sm"
//                           title={color}
//                         ></div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between mb-6">
//                     <div className="flex items-center gap-4">
//                       <span className="text-3xl font-bold text-teal-700">
//                         {dress.price}
//                       </span>
//                       <span className="text-lg text-gray-400 line-through">
//                         {dress.originalPrice}
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       <div className="flex text-yellow-400 text-lg">
//                         {"★".repeat(Math.floor(dress.rating))}
//                       </div>
//                       <span className="text-gray-500">({dress.reviews})</span>
//                     </div>
//                   </div>

//                   <div className="flex gap-4">
//                     <button
//                       onClick={(e) => handleQuickView(dress, e)}
//                       className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
//                     >
//                       Quick View
//                     </button>
//                     <button
//                       onClick={() => handleViewDetails(dress.id)}
//                       className="flex-1 bg-white text-teal-600 border-2 border-teal-600 py-4 rounded-xl font-semibold hover:bg-teal-50 transition-all duration-300"
//                     >
//                       Full Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       ))}

//       {/* Quick View Modal */}
//       {quickViewDress && (
//         <QuickViewModal
//           dress={quickViewDress}
//           onClose={handleQuickViewClose}
//           onViewDetails={handleViewDetails}
//         />
//       )}

//       <style jsx>{`
//         .new-arrivals-layered {
//           font-family: sans-serif;
//           margin: 0 auto;
//           padding: 0 2em;
//           background: black;
//           display: flex;
//           max-width: 1200px;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//         }

//         .description-panel {
//           border: 1em solid white;
//           background: linear-gradient(135deg, #0f766e, #14b8a6);
//           min-height: 250px;
//           width: 100%;
//           padding: 3rem;
//           display: flex;
//           justify-content: center;
//           border-radius: 16px;
//           align-items: center;
//           margin-bottom: 2rem;
//         }

//         .panel {
//           border: 1em solid white;
//           background-color: white;
//           min-height: 250px;
//           width: 100%;
//           padding: 2.5rem;
//           display: flex;
//           justify-content: center;
//           border-radius: 16px;
//           align-items: center;
//           margin-bottom: 2rem;
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
//         }

//         .panel.panel-1 {
//           transform: rotate(3deg);
//           background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
//         }

//         .panel.panel-2 {
//           transform: rotate(-3deg);
//           background: linear-gradient(135deg, #f0fdf4, #dcfce7);
//         }

//         .panel.panel-3 {
//           transform: rotate(2deg);
//           background: linear-gradient(135deg, #fef7ff, #f3e8ff);
//         }

//         .panel.panel-4 {
//           transform: rotate(-2deg);
//           background: linear-gradient(135deg, #fefce8, #fef9c3);
//         }

//         .panel-wrapper {
//           min-height: 350px;
//           width: 89%;
//           margin: 0;
//         }

//         .scroll-down {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 1.1rem;
//           opacity: 0.9;
//         }

//         .arrow {
//           animation: bounce 2s infinite;
//           font-size: 1.5rem;
//         }

//         @keyframes bounce {
//           0%,
//           20%,
//           50%,
//           80%,
//           100% {
//             transform: translateY(0);
//           }
//           40% {
//             transform: translateY(-10px);
//           }
//           60% {
//             transform: translateY(-5px);
//           }
//         }

//         .panel-content {
//           width: 100%;
//           max-width: 1000px;
//         }

//         .image-section img {
//           border: 8px solid white;
//           box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
//         }

//         @media (max-width: 768px) {
//           .new-arrivals-layered {
//             padding: 0 1em;
//           }

//           .panel {
//             padding: 1.5rem;
//           }

//           .description-panel {
//             padding: 2rem;
//           }

//           .panel.panel-1,
//           .panel.panel-2,
//           .panel.panel-3,
//           .panel.panel-4 {
//             transform: none;
//           }
//         }
//       `}</style>
//     </div>
//   )
// }

// import { useEffect, useState } from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { useNavigate } from "react-router-dom"

// gsap.registerPlugin(ScrollTrigger)

// const newArrivals = [
//   {
//     id: 1,
//     name: "Celestial Silk Gown",
//     price: "Rs 8,999",
//     originalPrice: "Rs 12,999",
//     discount: "30% OFF",
//     image: "/newarrivals/clestel.jpg",
//     tag: "✨ JUST LAUNCHED",
//     colors: ["Midnight Blue", "Burgundy", "Emerald Green"],
//     description: "Handcrafted silk gown with celestial embroidery",
//     features: ["Pure Silk", "Hand Embroidered", "Limited Edition"],
//     rating: 4.9,
//     reviews: 127,
//   },
//   {
//     id: 2,
//     name: "Bohemian Sunset Maxi",
//     price: "Rs 3,499",
//     originalPrice: "Rs 4,999",
//     discount: "25% OFF",
//     image: "/newarrivals/bohimian.jpg",
//     tag: "🔥 TRENDING",
//     colors: ["Sunset Orange", "Ocean Blue", "Forest Green"],
//     description: "Flowey bohemian dress with sunset gradient patterns",
//     features: ["Breathable Cotton", "Ethnic Print", "Comfort Fit"],
//     rating: 4.8,
//     reviews: 89,
//   },
//   {
//     id: 3,
//     name: "Crystal Embellished Cocktail",
//     price: "Rs 6,799",
//     originalPrice: "Rs 8,499",
//     discount: "20% OFF",
//     image: "/newarrivals/crystal.jpg",
//     tag: "💎 PREMIUM",
//     colors: ["Black", "Navy Blue", "Ruby Red"],
//     description: "Sparkling cocktail dress with Swarovski crystals",
//     features: ["Swarovski Crystals", "Figure Hugging", "Party Ready"],
//     rating: 4.9,
//     reviews: 203,
//   },
//   {
//     id: 4,
//     name: "Floral Romance A-Line",
//     price: "Rs 2,999",
//     originalPrice: "Rs 3,999",
//     discount: "15% OFF",
//     image: "/newarrivals/floral.jpg",
//     tag: "🌺 SUMMER FAVORITE",
//     colors: ["Pink Blush", "Lavender", "Mint Green"],
//     description: "Floral print A-line dress for romantic occasions",
//     features: ["Premium Chiffon", "Floral Print", "A-Line Silhouette"],
//     rating: 4.7,
//     reviews: 156,
//   },
//   {
//     id: 5,
//     name: "Designer Saree Gown",
//     price: "Rs 7,499",
//     originalPrice: "Rs 9,999",
//     discount: "35% OFF",
//     image: "/newarrivals/saree.jpg",
//     tag: "🎯 EXCLUSIVE",
//     colors: ["Royal Purple", "Gold", "Silver Grey"],
//     description: "Fusion saree-gown with contemporary draping",
//     features: ["Designer Edition", "Fusion Wear", "Statement Piece"],
//     rating: 5.0,
//     reviews: 67,
//   },
// ]

// // ------------------------ Quick View Modal --------------------------
// function QuickViewModal({ dress, onClose, onViewDetails }) {
//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white transition-colors"
//         >
//           ✕
//         </button>

//         <div className="grid md:grid-cols-2 gap-8 p-8">
//           <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 md:h-96 flex items-center justify-center">
//             <img src={dress.image} alt="Dress Image" />
//           </div>

//           <div className="space-y-6">
//             <div>
//               <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
//                 {dress.discount}
//               </span>
//               <span className="bg-teal-800 text-white px-3 py-1 rounded-full text-xs font-semibold ml-2">
//                 {dress.tag}
//               </span>
//             </div>

//             <h2 className="text-3xl font-bold text-gray-800">{dress.name}</h2>
//             <p className="text-gray-600 text-lg">{dress.description}</p>

//             <div className="flex flex-wrap gap-2">
//               {dress.features.map((feature, idx) => (
//                 <span
//                   key={idx}
//                   className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium border border-teal-100"
//                 >
//                   {feature}
//                 </span>
//               ))}
//             </div>

//             <div className="flex items-center gap-2">
//               <span className="text-gray-600">Colors:</span>
//               <div className="flex gap-2">
//                 {dress.colors.map((color, idx) => (
//                   <div
//                     key={idx}
//                     className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 border-2 border-white shadow-sm"
//                     title={color}
//                   ></div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <span className="text-3xl font-bold text-teal-700">
//                   {dress.price}
//                 </span>
//                 <span className="text-lg text-gray-400 line-through">
//                   {dress.originalPrice}
//                 </span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <div className="flex text-yellow-400 text-lg">
//                   {"★".repeat(Math.floor(dress.rating))}
//                 </div>
//                 <span className="text-gray-500">({dress.reviews})</span>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <button className="flex-1 bg-gray-100 text-gray-800 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
//                 Add to Cart
//               </button>
//               <button
//                 onClick={() => onViewDetails(dress.id)}
//                 className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
//               >
//                 View Full Details
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ------------------------ Main Component --------------------------
// export default function NewArrivals() {
//   const navigate = useNavigate()
//   const [quickViewDress, setQuickViewDress] = useState(null)

//   useEffect(() => {
//     const cards = gsap.utils.toArray(".sticky-card")

//     cards.forEach((card, index) => {
//       gsap.fromTo(
//         card,
//         { y: 100, opacity: 0, scale: 0.9 },
//         {
//           y: 0,
//           opacity: 1,
//           scale: 1,
//           duration: 0.6,
//           delay: index * 0.1,
//           ease: "back.out(1.2)",
//           scrollTrigger: {
//             trigger: card,
//             start: "top 90%",
//             toggleActions: "play none none reverse",
//           },
//         }
//       )
//     })

//     return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
//   }, [])

//   const handleCardClick = (dress, event) => {
//     event.stopPropagation()
//     setQuickViewDress(dress)
//   }

//   const handleImageClick = (dressId, event) => {
//     event.stopPropagation()
//     navigate(`/dress/${dressId}`)
//   }

//   const handleQuickViewClose = () => setQuickViewDress(null)

//   const handleViewDetails = (dressId) => {
//     navigate(`/dress/${dressId}`)
//     setQuickViewDress(null)
//   }

//   const handleQuickViewButton = (dress, event) => {
//     event.stopPropagation()
//     setQuickViewDress(dress)
//   }

//   return (
//     <>
//       <section className="min-h-screen w-full bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-20 relative overflow-hidden">
//         {/* Header */}
//         <div className="text-center mb-16 z-10 px-4">
//           <div className="inline-block mb-4">
//             <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wider">
//               NEW COLLECTION
//             </span>
//           </div>
//           <h2 className="text-6xl font-bold text-teal-700 mb-6">
//             Just Arrived
//           </h2>
//           <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
//             Discover our latest designer dresses that are turning heads and
//             setting trends
//           </p>
//         </div>

//         {/* Sticky Cards */}
//         <div
//           className="relative max-w-6xl mx-auto px-4"
//           style={{ height: `${newArrivals.length * 120}vh` }}
//         >
//           <div className="sticky top-0">
//             {newArrivals.map((dress, index) => (
//               <div
//                 key={dress.id}
//                 className={`sticky-card bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transform-gpu transition-all duration-300 hover:shadow-3xl mb-8`}
//                 style={{
//                   position: "sticky",
//                   top: `${index * 6}rem`,
//                   zIndex: newArrivals.length - index,
//                   transform: `scale(${1 - index * 0.02})`,
//                 }}
//                 onClick={(e) => handleCardClick(dress, e)}
//               >
//                 <div className="flex flex-col md:flex-row">
//                   <div
//                     className="md:w-2/5 h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden cursor-pointer"
//                     onClick={(e) => handleImageClick(dress.id, e)}
//                   >
//                     <div className="absolute top-4 left-4 z-20">
//                       <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
//                         {dress.discount}
//                       </span>
//                     </div>
//                     <div className="absolute top-4 right-4 z-20">
//                       <span className="bg-teal-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                         {dress.tag}
//                       </span>
//                     </div>
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
//                     <div className="w-full h-full flex items-center justify-center p-4">
//                       <img
//                         src={dress.image}
//                         alt={dress.name}
//                         className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
//                       />
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="md:w-3/5 p-6">
//                     <h3 className="text-2xl font-bold text-gray-800 mb-3">
//                       {dress.name}
//                     </h3>
//                     <p className="text-gray-600 mb-4 leading-relaxed">
//                       {dress.description}
//                     </p>
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {dress.features.map((feature, idx) => (
//                         <span
//                           key={idx}
//                           className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium border border-teal-100"
//                         >
//                           {feature}
//                         </span>
//                       ))}
//                     </div>

//                     <div className="flex items-center gap-3 mb-4">
//                       <span className="text-sm text-gray-500 font-medium">
//                         Colors:
//                       </span>
//                       <div className="flex gap-2">
//                         {dress.colors.map((color, idx) => (
//                           <div
//                             key={idx}
//                             className="w-5 h-5 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 border-2 border-white shadow-sm"
//                             title={color}
//                           ></div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center gap-3">
//                         <span className="text-2xl font-bold text-teal-700">
//                           {dress.price}
//                         </span>
//                         <span className="text-lg text-gray-400 line-through">
//                           {dress.originalPrice}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="flex text-yellow-400">
//                           {"★".repeat(Math.floor(dress.rating))}
//                           <span className="text-gray-300">
//                             {"★".repeat(5 - Math.floor(dress.rating))}
//                           </span>
//                         </div>
//                         <span className="text-sm text-gray-500">
//                           ({dress.reviews})
//                         </span>
//                       </div>
//                     </div>

//                     <button
//                       onClick={(e) => handleQuickViewButton(dress, e)}
//                       className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
//                     >
//                       Quick View
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Stats Bar */}
//         <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4 text-center">
//           {[
//             ["50+", "New Designs"],
//             ["24H", "Express Delivery"],
//             ["4.9★", "Customer Rating"],
//             ["100%", "Quality Guarantee"],
//           ].map(([num, text]) => (
//             <div
//               key={text}
//               className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
//             >
//               <div className="text-2xl font-bold text-teal-600 mb-2">{num}</div>
//               <div className="text-gray-600 font-medium">{text}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {quickViewDress && (
//         <QuickViewModal
//           dress={quickViewDress}
//           onClose={handleQuickViewClose}
//           onViewDetails={handleViewDetails}
//         />
//       )}
//     </>
//   )
// }

/// full work old

/*



*/

import { useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useNavigate } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

const newArrivals = [
  {
    id: 1,
    name: "Celestial Silk Gown",
    price: "Rs 8,999",
    originalPrice: "Rs 12,999",
    discount: "30% OFF",
    image: "/newarrivals/clestel.jpg",
    tag: "✨ JUST LAUNCHED",
    colors: ["Midnight Blue", "Burgundy", "Emerald Green"],
    description: "Handcrafted silk gown with celestial embroidery",
    features: ["Pure Silk", "Hand Embroidered", "Limited Edition"],
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 2,
    name: "Bohemian Sunset Maxi",
    price: "Rs 3,499",
    originalPrice: "Rs 4,999",
    discount: "25% OFF",
    image: "/newarrivals/bohimian.jpg",
    tag: "🔥 TRENDING",
    colors: ["Sunset Orange", "Ocean Blue", "Forest Green"],
    description: "Flowey bohemian dress with sunset gradient patterns",
    features: ["Breathable Cotton", "Ethnic Print", "Comfort Fit"],
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    name: "Crystal Embellished Cocktail",
    price: "Rs 6,799",
    originalPrice: "Rs 8,499",
    discount: "20% OFF",
    image: "/newarrivals/crystal.jpg",
    tag: "💎 PREMIUM",
    colors: ["Black", "Navy Blue", "Ruby Red"],
    description: "Sparkling cocktail dress with Swarovski crystals",
    features: ["Swarovski Crystals", "Figure Hugging", "Party Ready"],
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 4,
    name: "Floral Romance A-Line",
    price: "Rs 2,999",
    originalPrice: "Rs 3,999",
    discount: "15% OFF",
    image: "/newarrivals/floral.jpg",
    tag: "🌺 SUMMER FAVORITE",
    colors: ["Pink Blush", "Lavender", "Mint Green"],
    description: "Floral print A-line dress for romantic occasions",
    features: ["Premium Chiffon", "Floral Print", "A-Line Silhouette"],
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 5,
    name: "Designer Saree Gown",
    price: "Rs 7,499",
    originalPrice: "Rs 9,999",
    discount: "35% OFF",
    image: "/newarrivals/saree.jpg",
    tag: "🎯 EXCLUSIVE",
    colors: ["Royal Purple", "Gold", "Silver Grey"],
    description: "Fusion saree-gown with contemporary draping",
    features: ["Designer Edition", "Fusion Wear", "Statement Piece"],
    rating: 5.0,
    reviews: 67,
  },
]

// Quick View Modal Component
function QuickViewModal({ dress, onClose, onViewDetails }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white transition-colors"
          >
            ✕
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 md:h-96 flex items-center justify-center">
              <img src={dress.image} alt="Dress" />
            </div>

            <div className="space-y-6">
              <div>
                <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                  {dress.discount}
                </span>
                <span className="bg-teal-800 text-white px-3 py-1 rounded-full text-xs font-semibold ml-2">
                  {dress.tag}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-800">{dress.name}</h2>
              <p className="text-gray-600 text-lg">{dress.description}</p>

              <div className="flex flex-wrap gap-2">
                {dress.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium border border-teal-100"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600">Colors:</span>
                <div className="flex gap-2">
                  {dress.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 border-2 border-white shadow-sm"
                      title={color}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-teal-700">
                    {dress.price}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {dress.originalPrice}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400 text-lg">
                    {"★".repeat(Math.floor(dress.rating))}
                  </div>
                  <span className="text-gray-500">({dress.reviews})</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-gray-100 text-gray-800 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                  Add to Cart
                </button>
                <button
                  onClick={() => onViewDetails(dress.id)}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  View Full Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NewArrivals() {
  const navigate = useNavigate()
  const [quickViewDress, setQuickViewDress] = useState(null)

  useEffect(() => {
    const cards = gsap.utils.toArray(".sticky-card")
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleCardClick = (dress, event) => {
    event.stopPropagation()
    setQuickViewDress(dress)
  }

  const handleImageClick = (dressId, event) => {
    event.stopPropagation()
    navigate(`/dress/${dressId}`)
  }

  const handleQuickViewClose = () => {
    setQuickViewDress(null)
  }

  const handleViewDetails = (dressId) => {
    navigate(`/dress/${dressId}`)
    setQuickViewDress(null)
  }

  const handleQuickViewButton = (dress, event) => {
    event.stopPropagation()
    setQuickViewDress(dress)
  }

  return (
    <>
      <section className="new-arrivals-section min-h-screen w-full bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden py-20">
        {/* Header */}
        <div className="text-center mb-16 z-10 px-4">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wider">
              NEW COLLECTION
            </span>
          </div>
          <h2 className="text-6xl font-bold text-teal-700 mb-6">
            Just Arrived
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Discover our latest designer dresses that are turning heads and
            setting trends
          </p>
        </div>

        {/* Cards */}
        <div className="all-cards relative max-w-6xl mx-auto px-4">
          {newArrivals.map((dress, index) => (
            <div
              key={dress.id}
              className={`sticky-card sticky-card-${
                index + 1
              } w-full max-w-2xl mx-auto mb-8 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transform-gpu transition-all duration-300 hover:shadow-3xl`}
              style={{
                position: "sticky",
                top: `${50 + index * 60}px`,
                zIndex: newArrivals.length - index,
                transform: `scale(${1 - index * 0.02})`,
                backdropFilter: "blur(20px)",
              }}
              onClick={(e) => handleCardClick(dress, e)}
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div
                  className="md:w-2/5 h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden cursor-pointer"
                  onClick={(e) => handleImageClick(dress.id, e)}
                >
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                      {dress.discount}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-teal-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {dress.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src={dress.image}
                      alt={dress.name}
                      className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-3/5 p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {dress.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {dress.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {dress.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium border border-teal-100"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-gray-500 font-medium">
                      Colors:
                    </span>
                    <div className="flex gap-2">
                      {dress.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-5 h-5 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 border-2 border-white shadow-sm"
                          title={color}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-teal-700">
                        {dress.price}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {dress.originalPrice}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {"★".repeat(Math.floor(dress.rating))}
                        <span className="text-gray-300">
                          {"★".repeat(5 - Math.floor(dress.rating))}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({dress.reviews})
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleQuickViewButton(dress, e)}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-500/10 to-teal-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="text-2xl font-bold text-teal-600 mb-2">50+</div>
            <div className="text-gray-600 font-medium">New Designs</div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="text-2xl font-bold text-teal-600 mb-2">24H</div>
            <div className="text-gray-600 font-medium">Express Delivery</div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="text-2xl font-bold text-teal-600 mb-2">4.9★</div>
            <div className="text-gray-600 font-medium">Customer Rating</div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="text-2xl font-bold text-teal-600 mb-2">100%</div>
            <div className="text-gray-600 font-medium">Quality Guarantee</div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewDress && (
        <QuickViewModal
          dress={quickViewDress}
          onClose={handleQuickViewClose}
          onViewDetails={handleViewDetails}
        />
      )}
    </>
  )
}
