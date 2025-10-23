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
    image: "/images/bohimian.jpg",
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
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white transition-colors"
          >
            ✕
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 md:h-96 flex items-center justify-center">
              <img src={dress.image} alt="Dress Image" />
            </div>

            {/* Details Section */}
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
    const cards = gsap.utils.toArray(".dress-card")

    // Initial stacked position (like a fashion catalog)
    gsap.set(cards, {
      y: (i) => i * 25,
      x: (i) => i * 12,
      rotationZ: (i) => (i - 2) * 1.5,
      scale: (i) => 1 - i * 0.04,
      opacity: (i) => 1 - i * 0.2,
      transformOrigin: "center center",
    })

    // Master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".new-arrivals-section",
        start: "top 70%",
        end: "bottom 20%",
        scrub: 1.2,
        markers: false,
      },
    })

    // Phase 1: Fashion Show Entrance
    tl.to(
      cards,
      {
        y: (i) => -i * 60,
        x: (i) => (i - 2) * 150,
        rotationZ: (i) => (i - 2) * 8,
        scale: 1,
        opacity: 1,
        stagger: 0.15,
        duration: 1.8,
        ease: "back.out(1.4)",
      },
      "entrance"
    )

    // Phase 2: Fashion Carousel
    tl.to(
      cards,
      {
        x: (i) => (i - 2) * 120,
        y: 0,
        rotationZ: (i) => (i - 2) * 12,
        scale: (i) => 1 - Math.abs(i - 2) * 0.15,
        opacity: (i) => 1 - Math.abs(i - 2) * 0.3,
        zIndex: (i) => cards.length - i,
        duration: 1.5,
        ease: "power2.inOut",
      },
      "carousel+=0.3"
    )

    // Phase 3: Rotating Showcase
    cards.forEach((_, index) => {
      tl.to(
        cards,
        {
          x: (i) => {
            const newIndex = (i - index + cards.length) % cards.length
            return (newIndex - 2) * 100
          },
          scale: (i) => {
            const newIndex = (i - index + cards.length) % cards.length
            return 1 - Math.abs(newIndex - 2) * 0.2
          },
          opacity: (i) => {
            const newIndex = (i - index + cards.length) % cards.length
            return 1 - Math.abs(newIndex - 2) * 0.4
          },
          rotationZ: (i) => {
            const newIndex = (i - index + cards.length) % cards.length
            return (newIndex - 2) * 10
          },
          zIndex: (i) => {
            const newIndex = (i - index + cards.length) % cards.length
            return cards.length - newIndex
          },
          duration: 0.9,
          ease: "power2.inOut",
        },
        `showcase-${index}`
      )
    })

    // Phase 4: Final Elegant Stack
    tl.to(
      cards,
      {
        x: 0,
        y: (i) => i * 30,
        rotationZ: 0,
        scale: (i) => 1 - i * 0.05,
        opacity: (i) => 1 - i * 0.25,
        zIndex: (i) => i,
        duration: 1.2,
        ease: "power2.in",
      },
      "final"
    )

    // Hover effects for premium feel
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.08,
          y: -15,
          rotationZ: 0,
          boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
          duration: 0.4,
          ease: "power2.out",
        })

        // Highlight product details
        const details = card.querySelector(".product-details")
        gsap.to(details, {
          opacity: 1,
          y: 0,
          duration: 0.3,
        })
      })

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          rotationZ: gsap.getProperty(card, "rotationZ"),
          boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
          duration: 0.4,
          ease: "power2.out",
        })
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Click handlers
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
      <section className="new-arrivals-section min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden py-20">
        {/* Premium Header */}
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

        {/* Fashion Cards Container */}
        <div className="cards-container relative w-full max-w-7xl h-[600px] flex items-center justify-center mb-20">
          {newArrivals.map((dress, index) => (
            <div
              key={dress.id}
              className="dress-card absolute w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transform-gpu"
              style={{
                backdropFilter: "blur(20px)",
              }}
              onClick={(e) => handleCardClick(dress, e)}
            >
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                  {dress.discount}
                </span>
              </div>

              {/* Tag */}
              <div className="absolute top-4 right-4 z-20">
                <span className="bg-teal-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {dress.tag}
                </span>
              </div>

              {/* Dress Image - Click goes to product page */}
              <div
                className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden cursor-pointer"
                onClick={(e) => handleImageClick(dress.id, e)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>

                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <img src={dress.image} alt="Dress Image" />
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 product-details opacity-95">
                {/* Dress Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {dress.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {dress.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {dress.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-teal-50 text-teal-700 px-2 py-1 rounded text-xs font-medium border border-teal-100"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Colors */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-gray-500">Colors:</span>
                  <div className="flex gap-1">
                    {dress.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-500"
                        title={color}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Price & Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-teal-700">
                      {dress.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {dress.originalPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400">
                      {"★".repeat(Math.floor(dress.rating))}
                      <span className="text-gray-300">
                        {"★".repeat(5 - Math.floor(dress.rating))}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      ({dress.reviews})
                    </span>
                  </div>
                </div>

                {/* CTA Button - Opens Quick View */}
                <button
                  onClick={(e) => handleQuickViewButton(dress, e)}
                  className="w-full mt-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Quick View
                </button>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-500/10 to-teal-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4 text-center">
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

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-gray-500 text-sm mb-2 font-medium">
            Explore More Designs
          </p>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-teal-500 to-teal-600 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div> */}
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
