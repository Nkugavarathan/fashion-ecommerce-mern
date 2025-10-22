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
        <h2 className="text-center text-teal-600 font-bold text-5xl mb-10 ">
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
            <div className="text-3xl font-bold text-teal-500 mb-2">10K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-teal-500 mb-2">4.8/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-teal-500 mb-2">24hr</div>
            <div className="text-gray-600">Fast Delivery</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-teal-500 mb-2">500+</div>
            <div className="text-gray-600">Products</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
