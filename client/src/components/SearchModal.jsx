import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { publicRequest } from "../requestMethod"

const PLACEHOLDER = "https://via.placeholder.com/96"

export default function SearchModal() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("click", onDoc)
    return () => document.removeEventListener("click", onDoc)
  }, [])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!query || query.trim().length < 2) {
      setResults([])
      setLoading(false)
      return
    }
    timerRef.current = setTimeout(() => {
      fetchResults(query.trim())
    }, 300)
    return () => clearTimeout(timerRef.current)
  }, [query])

  const fetchResults = async (q) => {
    setLoading(true)
    try {
      const res = await publicRequest.get(
        `/products/search?q=${encodeURIComponent(q)}`
      )
      setResults(res.data || [])
    } catch (err) {
      console.error("search error:", err)
      setResults([])
    } finally {
      setLoading(false)
      setOpen(true)
    }
  }

  return (
    <div ref={ref} className="relative w-full max-w-xl">
      <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="men, women, shirt, longwear, jacket, casual..."
          className="outline-none w-full text-sm md:text-base placeholder-gray-400"
        />
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>

      {open && (results.length > 0 || loading) && (
        <div className="absolute right-0 left-0 mt-2 bg-white rounded-lg shadow-lg z-50">
          <div className="max-h-80 overflow-auto">
            {loading && (
              <div className="p-4 text-sm text-gray-600">Searching...</div>
            )}
            {!loading && results.length === 0 && (
              <div className="p-4 text-sm text-gray-600">No products found</div>
            )}
            {!loading &&
              results.map((p) => {
                const title = p.title || p.name || "Unnamed product"
                const price =
                  typeof p.price === "number"
                    ? `$${p.price.toFixed(2)}`
                    : p.price || "—"
                const category =
                  (Array.isArray(p.categories) && p.categories.join(", ")) ||
                  p.category ||
                  p.gender ||
                  "—"
                return (
                  <Link
                    key={p._id || p.id || title}
                    to={`/product/${p._id || p.id}`}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-teal-50 transition-colors"
                    onClick={() => {
                      setOpen(false)
                      setQuery("")
                    }}
                  >
                    <img
                      src={p.image || p.img || PLACEHOLDER}
                      alt={title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 truncate">
                        {title}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {category}
                      </div>
                    </div>
                    <div className="text-sm text-teal-700 font-semibold">
                      Rs {price}
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}
