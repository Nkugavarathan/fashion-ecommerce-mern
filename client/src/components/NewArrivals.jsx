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

// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { useNavigate } from "react-router-dom"

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
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white transition-colors"
//           >
//             ✕
//           </button>

//           <div className="grid md:grid-cols-2 gap-8 p-8">
//             <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 md:h-96 flex items-center justify-center">
//               <img src={dress.image} alt="Dress" />
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

// // Animation variants
// const cardVariants = {
//   hidden: {
//     y: 100,
//     opacity: 0,
//     scale: 0.9,
//   },
//   visible: {
//     y: 0,
//     opacity: 1,
//     scale: 1,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       damping: 15,
//       duration: 0.6,
//     },
//   },
// }

// export default function NewArrivals() {
//   const navigate = useNavigate()
//   const [quickViewDress, setQuickViewDress] = useState(null)

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
//       <section className="new-arrivals-section min-h-screen w-full bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden py-20">
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

//         {/* Cards */}
//         <div className="all-cards relative max-w-6xl mx-auto px-4">
//           {newArrivals.map((dress, index) => (
//             <motion.div
//               key={dress.id}
//               className={`sticky-card sticky-card-${
//                 index + 1
//               } w-full max-w-2xl mx-auto mb-8 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transform-gpu transition-all duration-300 hover:shadow-3xl`}
//               style={{
//                 position: "sticky",
//                 top: `${50 + index * 60}px`,
//                 zIndex: newArrivals.length - index,
//                 transform: `scale(${1 - index * 0.02})`,
//                 backdropFilter: "blur(20px)",
//               }}
//               variants={cardVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{
//                 once: true,
//                 margin: "-100px",
//               }}
//               whileHover={{
//                 y: -5,
//                 transition: { duration: 0.2 },
//               }}
//               onClick={(e) => handleCardClick(dress, e)}
//             >
//               <div className="flex flex-col md:flex-row">
//                 {/* Image */}
//                 <div
//                   className="md:w-2/5 h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden cursor-pointer"
//                   onClick={(e) => handleImageClick(dress.id, e)}
//                 >
//                   <div className="absolute top-4 left-4 z-20">
//                     <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
//                       {dress.discount}
//                     </span>
//                   </div>
//                   <div className="absolute top-4 right-4 z-20">
//                     <span className="bg-teal-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                       {dress.tag}
//                     </span>
//                   </div>
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
//                   <div className="w-full h-full flex items-center justify-center p-4">
//                     <img
//                       src={dress.image}
//                       alt={dress.name}
//                       className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
//                     />
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="md:w-3/5 p-6">
//                   <h3 className="text-2xl font-bold text-gray-800 mb-3">
//                     {dress.name}
//                   </h3>
//                   <p className="text-gray-600 mb-4 leading-relaxed">
//                     {dress.description}
//                   </p>

//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {dress.features.map((feature, idx) => (
//                       <span
//                         key={idx}
//                         className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium border border-teal-100"
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                   </div>

//                   <div className="flex items-center gap-3 mb-4">
//                     <span className="text-sm text-gray-500 font-medium">
//                       Colors:
//                     </span>
//                     <div className="flex gap-2">
//                       {dress.colors.map((color, idx) => (
//                         <div
//                           key={idx}
//                           className="w-5 h-5 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 border-2 border-white shadow-sm"
//                           title={color}
//                         ></div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <span className="text-2xl font-bold text-teal-700">
//                         {dress.price}
//                       </span>
//                       <span className="text-lg text-gray-400 line-through">
//                         {dress.originalPrice}
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       <div className="flex text-yellow-400">
//                         {"★".repeat(Math.floor(dress.rating))}
//                         <span className="text-gray-300">
//                           {"★".repeat(5 - Math.floor(dress.rating))}
//                         </span>
//                       </div>
//                       <span className="text-sm text-gray-500">
//                         ({dress.reviews})
//                       </span>
//                     </div>
//                   </div>

//                   <button
//                     onClick={(e) => handleQuickViewButton(dress, e)}
//                     className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
//                   >
//                     Quick View
//                   </button>
//                 </div>
//               </div>

//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-500/10 to-teal-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Stats */}
//         <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4 text-center">
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
