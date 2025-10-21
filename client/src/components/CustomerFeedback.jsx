import React, { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const feedbacks = [
  {
    username: "Anusha R.",
    text: "Vara Fashion has amazing quality dresses! The fabric feels premium, and the fit is perfect. Definitely shopping again!",
    stars: 5,
  },
  {
    username: "Kavi T.",
    text: "Loved the instant delivery! My order arrived within 3 days, perfectly packed. Great service overall.",
    stars: 4,
  },
  {
    username: "Rohan P.",
    text: "Trendy designs at affordable prices. Vara Fashion really gives value for money. Highly recommend!",
    stars: 5,
  },
  {
    username: "Meena S.",
    text: "Beautiful collection and very responsive support team. I even got a small discount on my first order!",
    stars: 4,
  },
  {
    username: "Tharun D.",
    text: "I’m impressed with their delivery speed and the quality. Got my outfit right on time for an event!",
    stars: 5,
  },
]

export default function CustomerFeedback() {
  useEffect(() => {
    const cardWrappers = gsap.utils.toArray(".card-wrapper")

    const scaleMax = gsap.utils.mapRange(1, cardWrappers.length - 1, 0.95, 1)

    const blockHeight = 300
    const time = 1

    gsap.set(cardWrappers, {
      y: (index) => 30 * index,
      transformOrigin: "center top",
    })

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: ".trigger",
        start: "top top",
        end: `${blockHeight * 5} top`,
        scrub: true,
      },
    })

    tl.from(".card-container", {
      y: () => blockHeight / 2,
      duration: 1,
    })

    tl.to(".card-wrapper:not(:first-child)", {
      yPercent: (i) => -100 * (i + 1),
      duration: time / 2,
      stagger: time,
    })

    tl.to(
      ".card-wrapper:not(:last-child)",
      {
        rotationX: -20,
        scale: (index) => scaleMax(index),
        stagger: { each: time },
      },
      "<"
    )

    ScrollTrigger.refresh()

    const end = tl.scrollTrigger.end
    ScrollTrigger.create({
      trigger: ".extra-trigger",
      start: "top top",
      end: () => end,
      pin: true,
    })
  }, [])

  return (
    <>
      <div className="trigger">
        <div className="hero bg-gradient-to-b from-rose-100 to-pink-200 h-screen w-full flex items-center justify-center">
          <h2 className="text-4xl font-bold text-gray-800">
            What Our Customers Say
          </h2>
        </div>

        <div className="extra-trigger">
          <div className="card-container">
            {feedbacks.map((f, index) => (
              <div className="card-wrapper" key={index}>
                <div className="card bg-white border border-gray-200 shadow-xl rounded-2xl p-6 w-4/5 mx-auto flex flex-col justify-between">
                  <div>
                    <p className="text-lg text-gray-700 italic mb-3">
                      “{f.text}”
                    </p>
                    <div className="flex space-x-1 mb-3">
                      {[...Array(f.stars)].map((_, i) => (
                        <span key={i} className="text-yellow-500 text-xl">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{f.username}</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section style={{ height: "400vh" }}></section>
    </>
  )
}
