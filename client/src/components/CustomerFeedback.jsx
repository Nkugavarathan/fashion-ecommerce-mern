import { motion } from "framer-motion"

const feedbacks = [
  {
    name: "Aarav Patel",
    feedback: "Great quality dresses, delivered fast!",
    rating: 5,
  },
  {
    name: "Meera Sharma",
    feedback: "Affordable prices and trendy collection.",
    rating: 4,
  },
  {
    name: "Ravi Kumar",
    feedback: "Excellent customer support and fabric quality.",
    rating: 5,
  },
  {
    name: "Divya Nair",
    feedback: "Perfect sizing and neat packaging.",
    rating: 5,
  },
  {
    name: "Karan Singh",
    feedback: "Genuine products with great discounts.",
    rating: 4,
  },
]

export default function CustomerFeedback() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="feedback-section min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-bottom from-pink-50 to-white py-20">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-center text-teal-600 font-bold text-6xl mb-4">
          Customer Reviews
        </h2>
        <p className="text-gray-600 text-lg">
          Hear what our customers love about us
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {feedbacks.map((feedback, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6 hover:shadow-xl transition-shadow duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            variants={cardVariants}
          >
            {/* Rating Stars */}
            <div className="flex justify-center mb-4">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <span
                  key={starIndex}
                  className={`text-xl ${
                    starIndex < feedback.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Feedback Text */}
            <p className="text-gray-700 text-center italic mb-4 leading-relaxed">
              "{feedback.feedback}"
            </p>

            {/* Customer Name */}
            <div className="text-center">
              <p className="font-semibold text-gray-800">{feedback.name}</p>
              <p className="text-gray-500 text-sm">Verified Customer</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto px-4 text-center mt-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-pink-500 mb-2">10K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-pink-500 mb-2">4.8/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-pink-500 mb-2">24hr</div>
            <div className="text-gray-600">Fast Delivery</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-pink-500 mb-2">500+</div>
            <div className="text-gray-600">Products</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// import { useEffect } from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"

// gsap.registerPlugin(ScrollTrigger)

// const feedbacks = [
//   {
//     name: "Aarav Patel",
//     feedback:
//       "Great quality dresses, delivered fast! The fabric feels premium and the stitching is perfect. Will definitely shop again!",
//     rating: 5,
//   },
//   {
//     name: "Meera Sharma",
//     feedback:
//       "Affordable prices and trendy collection. Loved the summer dress collection!",
//     rating: 4,
//   },
//   {
//     name: "Ravi Kumar",
//     feedback:
//       "Excellent customer support and fabric quality. The return process was hassle-free.",
//     rating: 5,
//   },
//   {
//     name: "Divya Nair",
//     feedback:
//       "Perfect sizing and neat packaging. The clothes arrived exactly as shown in pictures.",
//     rating: 5,
//   },
//   {
//     name: "Karan Singh",
//     feedback:
//       "Genuine products with great discounts. Best online fashion store I've shopped from!",
//     rating: 4,
//   },
// ]

// export default function CustomerFeedback() {
//   useEffect(() => {
//     const cards = gsap.utils.toArray(".feedback-card")

//     // Set initial stacked position (like a deck of cards)
//     gsap.set(cards, {
//       y: (i) => i * 15, // Vertical offset for stacked look
//       x: (i) => i * 8, // Horizontal offset for realistic stack
//       rotationZ: (i) => (i - 2) * 0.5, // Slight rotation variation
//       scale: (i) => 1 - i * 0.03, // Gradually smaller cards behind
//       opacity: (i) => 1 - i * 0.15, // Gradually fade cards behind
//       transformOrigin: "center center",
//     })

//     // Create master timeline
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".feedback-section",
//         start: "top 70%",
//         end: "bottom 30%",
//         scrub: 1.5,
//         markers: false,
//       },
//     })

//     // Phase 1: Spread cards out (like fanning out a deck)
//     tl.to(
//       cards,
//       {
//         y: (i) => -i * 40, // Spread vertically
//         x: (i) => (i - 2) * 120, // Spread horizontally from center
//         rotationZ: (i) => (i - 2) * 2, // Slight fan rotation
//         scale: 1, // All cards same size
//         opacity: 1, // All cards fully visible
//         stagger: 0.1,
//         duration: 1.5,
//         ease: "back.out(1.2)",
//       },
//       "phase1"
//     )

//     // Phase 2: Bring cards to center and create overlapping carousel
//     tl.to(
//       cards,
//       {
//         x: (i) => (i - 2) * 60, // Bring closer together but still spread
//         y: 0, // Align vertically
//         rotationZ: (i) => (i - 2) * 8, // More pronounced rotation for 3D effect
//         zIndex: (i) => cards.length - i, // Reverse z-index for proper overlap
//         scale: (i) => 1 - Math.abs(i - 2) * 0.1, // Center cards larger, sides smaller
//         opacity: (i) => 1 - Math.abs(i - 2) * 0.3, // Center cards more visible
//         duration: 1.2,
//         ease: "power2.inOut",
//       },
//       "phase2+=0.5"
//     )

//     // Phase 3: Rotate through cards (carousel effect)
//     cards.forEach((_, index) => {
//       tl.to(
//         cards,
//         {
//           x: (i) => {
//             const newIndex = (i - index + cards.length) % cards.length
//             return (newIndex - 2) * 80
//           },
//           scale: (i) => {
//             const newIndex = (i - index + cards.length) % cards.length
//             return 1 - Math.abs(newIndex - 2) * 0.15
//           },
//           opacity: (i) => {
//             const newIndex = (i - index + cards.length) % cards.length
//             return 1 - Math.abs(newIndex - 2) * 0.4
//           },
//           rotationZ: (i) => {
//             const newIndex = (i - index + cards.length) % cards.length
//             return (newIndex - 2) * 6
//           },
//           zIndex: (i) => {
//             const newIndex = (i - index + cards.length) % cards.length
//             return cards.length - newIndex
//           },
//           duration: 0.8,
//           ease: "power2.inOut",
//         },
//         `phase3-${index}`
//       )
//     })

//     // Phase 4: Final stack and exit
//     tl.to(
//       cards,
//       {
//         x: 0,
//         y: (i) => i * 20,
//         rotationZ: 0,
//         scale: (i) => 1 - i * 0.04,
//         opacity: (i) => 1 - i * 0.2,
//         zIndex: (i) => i,
//         duration: 1,
//         ease: "power2.in",
//       },
//       "phase4"
//     )

//     // Add hover effects for interactive feel
//     cards.forEach((card) => {
//       card.addEventListener("mouseenter", () => {
//         gsap.to(card, {
//           scale: 1.05,
//           y: -10,
//           boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
//           duration: 0.3,
//           ease: "power2.out",
//         })
//       })

//       card.addEventListener("mouseleave", () => {
//         gsap.to(card, {
//           scale: 1,
//           y: 0,
//           boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//           duration: 0.3,
//           ease: "power2.out",
//         })
//       })
//     })

//     // Cleanup
//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
//       cards.forEach((card) => {
//         card.removeEventListener("mouseenter", () => {})
//         card.removeEventListener("mouseleave", () => {})
//       })
//     }
//   }, [])

//   return (
//     <section className="feedback-section min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-blue-50 relative overflow-hidden py-20">
//       {/* Title */}
//       <div className="text-center mb-20 z-10 px-4">
//         <h2 className="text-5xl font-bold text-gray-800 mb-6">
//           What Our Customers Say
//         </h2>
//         <p className="text-gray-600 text-xl max-w-2xl mx-auto">
//           Discover why thousands of fashion lovers choose VARA for their style
//           needs
//         </p>
//       </div>

//       {/* Cards Container */}
//       <div className="cards-container relative w-full max-w-6xl h-96 flex items-center justify-center mb-32">
//         {feedbacks.map((feedback, index) => (
//           <div
//             key={index}
//             className="feedback-card absolute w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 cursor-pointer backdrop-blur-sm"
//             style={{
//               backdropFilter: "blur(10px)",
//             }}
//           >
//             {/* Rating Stars */}
//             <div className="flex justify-center mb-6">
//               {Array.from({ length: 5 }).map((_, starIndex) => (
//                 <span
//                   key={starIndex}
//                   className={`text-2xl mx-1 ${
//                     starIndex < feedback.rating
//                       ? "text-yellow-400 drop-shadow-sm"
//                       : "text-gray-200"
//                   }`}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>

//             {/* Feedback Text */}
//             <p className="text-gray-700 text-center italic mb-6 text-lg leading-relaxed font-light">
//               "{feedback.feedback}"
//             </p>

//             {/* Customer Info */}
//             <div className="text-center border-t border-gray-100 pt-6">
//               <p className="font-semibold text-gray-800 text-lg mb-1">
//                 {feedback.name}
//               </p>
//               <div className="flex items-center justify-center space-x-2">
//                 <span className="text-green-500 text-sm">✓</span>
//                 <p className="text-gray-500 text-sm">Verified Customer</p>
//               </div>
//             </div>

//             {/* Decorative Elements */}
//             <div className="absolute top-4 right-4 text-4xl text-pink-100 opacity-60">
//               "
//             </div>
//             <div className="absolute bottom-4 left-4 text-4xl text-pink-100 opacity-60">
//               "
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto px-4 text-center">
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//           <div className="text-3xl font-bold text-pink-500 mb-2">10K+</div>
//           <div className="text-gray-600">Happy Customers</div>
//         </div>
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//           <div className="text-3xl font-bold text-pink-500 mb-2">4.8/5</div>
//           <div className="text-gray-600">Average Rating</div>
//         </div>
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//           <div className="text-3xl font-bold text-pink-500 mb-2">24hr</div>
//           <div className="text-gray-600">Fast Delivery</div>
//         </div>
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//           <div className="text-3xl font-bold text-pink-500 mb-2">500+</div>
//           <div className="text-gray-600">Products</div>
//         </div>
//       </div>

//       {/* Scroll Indicator
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
//         <p className="text-gray-500 text-sm mb-2">Scroll to discover more</p>
//         <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
//           <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
//         </div>
//       </div> */}
//     </section>
//   )
// }
