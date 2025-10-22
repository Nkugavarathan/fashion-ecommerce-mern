import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout as logoutAction } from "../redux/userRedux"
import Badge from "@mui/material/Badge"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import SearchIcon from "@mui/icons-material/Search"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios"
import logo from "/images/logo.png"
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [acctOpen, setAcctOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const acctRef = useRef(null)

  const currentUser = useSelector((state) => state.user.currentUser)
  const quantity = useSelector((state) => state.cart.quantity)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (acctRef.current && !acctRef.current.contains(e.target)) {
        setAcctOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    dispatch(logoutAction())
    setAcctOpen(false)
    navigate("/")
  }

  const avatarSrc =
    currentUser?.image ||
    currentUser?.profileImage ||
    "https://i.pravatar.cc/150?img=3"

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all backdrop-blur-sm ${
        scrolled ? "bg-white/90 shadow-md" : "bg-gray-100/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
          <span className="text-teal-600 font-bold text-3xl md:text-4xl me-16">
            VARA FASHION
          </span>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 mx-6 hidden md:flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-teal-400 me-16">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none w-full px-2 py-1 text-lg "
          />
          <SearchIcon className="text-gray-500" />
        </div>

        {/* Right: Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-lg font-medium">
          <Link className="hover:text-teal-600" to="/">
            Home
          </Link>

          {currentUser ? (
            <div className="relative" ref={acctRef}>
              <button
                onClick={() => setAcctOpen(!acctOpen)}
                className="focus:outline-none"
              >
                <img
                  src={avatarSrc}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                />
              </button>
              {acctOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg flex flex-col">
                  <button
                    onClick={() => navigate("/profile")}
                    className="px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="hover:text-teal-600" to="/login">
              Login
            </Link>
          )}

          <Link to="/cart">
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlinedIcon className="text-gray-800" />
            </Badge>
          </Link>
        </div>

        {/* Mobile Hamburger + Search */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 focus-within:ring-2 focus-within:ring-teal-400">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none px-2 py-1 w-28 text-sm"
            />
            <SearchIcon className="text-gray-500" />
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md w-full">
          <div className="flex flex-col items-center px-6 py-4 space-y-3">
            <Link
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium hover:text-teal-600"
              to="/"
            >
              Home
            </Link>

            {currentUser ? (
              <>
                <Link
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-medium hover:text-teal-600"
                  to="/profile"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setMenuOpen(false)
                  }}
                  className="text-lg font-medium text-left hover:text-teal-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium hover:text-teal-600"
                to="/login"
              >
                Login
              </Link>
            )}

            <Link
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium hover:text-teal-600 flex items-center gap-2"
              to="/cart"
            >
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon className="text-gray-800" />
              </Badge>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

// import React, { useState, useEffect, useRef } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux"
// import { logout as logoutAction } from "../redux/userRedux"
// import Badge from "@mui/material/Badge"
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
// import SearchIcon from "@mui/icons-material/Search"
// import MenuIcon from "@mui/icons-material/Menu"
// import CloseIcon from "@mui/icons-material/Close"
// import axios from "axios"
// import logo from "/images/logo.png"

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [acctOpen, setAcctOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [searchResults, setSearchResults] = useState([])
//   const [showSearchModal, setShowSearchModal] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const acctRef = useRef(null)
//   const searchRef = useRef(null)

//   const currentUser = useSelector((state) => state.user.currentUser)
//   const quantity = useSelector((state) => state.cart.quantity)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 0)
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (acctRef.current && !acctRef.current.contains(e.target)) {
//         setAcctOpen(false)
//       }
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSearchModal(false)
//       }
//     }
//     document.addEventListener("click", handleClickOutside)
//     return () => document.removeEventListener("click", handleClickOutside)
//   }, [])

//   // Real-time search with debouncing
//   useEffect(() => {
//     if (searchQuery.trim().length > 2) {
//       setLoading(true)
//       const searchTimer = setTimeout(() => {
//         searchDresses(searchQuery)
//       }, 300) // 300ms debounce

//       return () => clearTimeout(searchTimer)
//     } else {
//       setSearchResults([])
//       setShowSearchModal(false)
//     }
//   }, [searchQuery])

//   const searchDresses = async (query) => {
//     try {
//       const response = await axios.get(
//         `/api/products/search?q=${encodeURIComponent(query)}`
//       )
//       setSearchResults(response.data)
//       setShowSearchModal(true)
//     } catch (error) {
//       console.error("Search error:", error)
//       // Fallback to client-side search if API fails
//       fallbackSearch(query)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Client-side fallback search
//   const fallbackSearch = async (query) => {
//     try {
//       const response = await axios.get("/api/products")
//       const allProducts = response.data

//       const filtered = allProducts.filter(
//         (product) =>
//           product.title?.toLowerCase().includes(query.toLowerCase()) ||
//           product.description?.toLowerCase().includes(query.toLowerCase()) ||
//           product.category?.toLowerCase().includes(query.toLowerCase())
//       )

//       setSearchResults(filtered.slice(0, 8)) // Limit to 8 results
//       setShowSearchModal(true)
//     } catch (error) {
//       console.error("Fallback search error:", error)
//       setSearchResults([])
//     }
//   }

//   const handleSearchSubmit = (e) => {
//     e.preventDefault()
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
//       setShowSearchModal(false)
//       setSearchQuery("")
//     }
//   }

//   const handleProductClick = (productId) => {
//     navigate(`/products/${productId}`)
//     setShowSearchModal(false)
//     setSearchQuery("")
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     dispatch(logoutAction())
//     setAcctOpen(false)
//     navigate("/")
//   }

//   const avatarSrc =
//     currentUser?.image ||
//     currentUser?.profileImage ||
//     "https://i.pravatar.cc/150?img=3"

//   return (
//     <nav
//       className={`fixed w-full top-0 left-0 z-50 transition-all backdrop-blur-sm ${
//         scrolled ? "bg-white/90 shadow-md" : "bg-gray-100/90"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex items-center justify-between">
//         {/* Left: Logo */}
//         <div className="flex items-center gap-2">
//           <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
//           <span className="text-teal-600 font-bold text-3xl md:text-4xl me-16">
//             VARA FASHION
//           </span>
//         </div>

//         {/* Center: Search Bar */}
//         <div
//           className="flex-1 mx-6 hidden md:flex items-center"
//           ref={searchRef}
//         >
//           <form onSubmit={handleSearchSubmit} className="flex-1 relative">
//             <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-teal-400 bg-white">
//               <input
//                 type="text"
//                 placeholder="Search dresses, categories..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="outline-none w-full px-2 py-1 text-lg"
//               />
//               <button type="submit">
//                 <SearchIcon className="text-gray-500 hover:text-teal-600 cursor-pointer" />
//               </button>
//             </div>

//             {/* Search Results Modal */}
//             {showSearchModal && (
//               <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
//                 <div className="p-4">
//                   {/* Loading State */}
//                   {loading && (
//                     <div className="flex justify-center py-4">
//                       <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
//                     </div>
//                   )}

//                   {/* Search Results */}
//                   {!loading && searchResults.length > 0 && (
//                     <div className="space-y-3">
//                       <h3 className="font-semibold text-gray-700 mb-3">
//                         Matching Dresses ({searchResults.length})
//                       </h3>
//                       {searchResults.map((product) => (
//                         <div
//                           key={product._id}
//                           onClick={() => handleProductClick(product._id)}
//                           className="flex items-center gap-4 p-3 hover:bg-teal-50 rounded-xl cursor-pointer transition-all duration-200 border border-transparent hover:border-teal-200"
//                         >
//                           <img
//                             src={
//                               product.image || "/images/placeholder-dress.jpg"
//                             }
//                             alt={product.title}
//                             className="w-16 h-16 object-cover rounded-lg"
//                           />
//                           <div className="flex-1">
//                             <h4 className="font-medium text-gray-800 line-clamp-1">
//                               {product.title}
//                             </h4>
//                             <p className="text-sm text-gray-600 line-clamp-1">
//                               {product.category}
//                             </p>
//                             <p className="text-teal-600 font-semibold">
//                               Rs {product.price}
//                             </p>
//                           </div>
//                           <div
//                             className={`px-2 py-1 rounded-full text-xs font-medium ${
//                               product.inStock
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-red-100 text-red-800"
//                             }`}
//                           >
//                             {product.inStock ? "In Stock" : "Out of Stock"}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* No Results */}
//                   {!loading && searchQuery && searchResults.length === 0 && (
//                     <div className="text-center py-6">
//                       <div className="text-gray-400 text-4xl mb-2">🔍</div>
//                       <p className="text-gray-600 font-medium">
//                         No dresses found
//                       </p>
//                       <p className="text-gray-500 text-sm">
//                         Try different keywords like "party", "casual", or
//                         "traditional"
//                       </p>
//                     </div>
//                   )}

//                   {/* View All Results */}
//                   {searchResults.length > 0 && (
//                     <div className="border-t pt-3 mt-3">
//                       <button
//                         onClick={handleSearchSubmit}
//                         className="w-full text-center text-teal-600 font-semibold py-2 hover:bg-teal-50 rounded-lg transition-colors"
//                       >
//                         View all {searchResults.length} results →
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </form>
//         </div>

//         {/* Right: Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6 text-lg font-medium">
//           <Link className="hover:text-teal-600" to="/">
//             Home
//           </Link>

//           {currentUser ? (
//             <div className="relative" ref={acctRef}>
//               <button
//                 onClick={() => setAcctOpen(!acctOpen)}
//                 className="focus:outline-none"
//               >
//                 <img
//                   src={avatarSrc}
//                   alt="Avatar"
//                   className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
//                 />
//               </button>
//               {acctOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg flex flex-col border border-gray-200">
//                   <button
//                     onClick={() => navigate("/profile")}
//                     className="px-4 py-2 text-left hover:bg-gray-100 rounded-t-lg"
//                   >
//                     Profile
//                   </button>
//                   <button
//                     onClick={handleLogout}
//                     className="px-4 py-2 text-left hover:bg-gray-100 rounded-b-lg"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link className="hover:text-teal-600" to="/login">
//               Login
//             </Link>
//           )}

//           <Link to="/cart">
//             <Badge badgeContent={quantity} color="primary">
//               <ShoppingCartOutlinedIcon className="text-gray-800 hover:text-teal-600 transition-colors" />
//             </Badge>
//           </Link>
//         </div>

//         {/* Mobile Hamburger + Search */}
//         <div className="flex items-center gap-3 md:hidden" ref={searchRef}>
//           <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 focus-within:ring-2 focus-within:ring-teal-400 bg-white">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="outline-none px-2 py-1 w-28 text-sm"
//             />
//             <SearchIcon className="text-gray-500" />
//           </div>
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="focus:outline-none"
//           >
//             {menuOpen ? <CloseIcon /> : <MenuIcon />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Search Modal */}
//       {showSearchModal && (
//         <div className="md:hidden fixed inset-0 bg-white z-50 pt-20">
//           <div className="p-4 border-b">
//             <div className="flex items-center gap-2">
//               <button onClick={() => setShowSearchModal(false)} className="p-2">
//                 <CloseIcon />
//               </button>
//               <div className="flex-1 flex items-center border border-gray-300 rounded-full px-4 py-2">
//                 <input
//                   type="text"
//                   placeholder="Search dresses..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="outline-none w-full px-2 py-1"
//                   autoFocus
//                 />
//                 <SearchIcon className="text-gray-500" />
//               </div>
//             </div>
//           </div>

//           <div className="p-4 max-h-[calc(100vh-120px)] overflow-y-auto">
//             {loading && (
//               <div className="flex justify-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
//               </div>
//             )}

//             {!loading && searchResults.length > 0 && (
//               <div className="space-y-4">
//                 <h3 className="font-semibold text-gray-700">
//                   Search Results ({searchResults.length})
//                 </h3>
//                 {searchResults.map((product) => (
//                   <div
//                     key={product._id}
//                     onClick={() => handleProductClick(product._id)}
//                     className="flex items-center gap-4 p-3 border border-gray-200 rounded-xl active:bg-teal-50"
//                   >
//                     <img
//                       src={product.image || "/images/placeholder-dress.jpg"}
//                       alt={product.title}
//                       className="w-20 h-20 object-cover rounded-lg"
//                     />
//                     <div className="flex-1">
//                       <h4 className="font-medium text-gray-800">
//                         {product.title}
//                       </h4>
//                       <p className="text-teal-600 font-semibold">
//                         Rs {product.price}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         {product.category}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {!loading && searchQuery && searchResults.length === 0 && (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 text-5xl mb-4">👗</div>
//                 <p className="text-gray-600 font-medium text-lg">
//                   No dresses found
//                 </p>
//                 <p className="text-gray-500">
//                   Try searching for "party wear", "casual", or "traditional"
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white shadow-md w-full">
//           <div className="flex flex-col items-center px-6 py-4 space-y-3">
//             <Link
//               onClick={() => setMenuOpen(false)}
//               className="text-lg font-medium hover:text-teal-600"
//               to="/"
//             >
//               Home
//             </Link>

//             {currentUser ? (
//               <>
//                 <Link
//                   onClick={() => setMenuOpen(false)}
//                   className="text-lg font-medium hover:text-teal-600"
//                   to="/profile"
//                 >
//                   Profile
//                 </Link>
//                 <button
//                   onClick={() => {
//                     handleLogout()
//                     setMenuOpen(false)
//                   }}
//                   className="text-lg font-medium text-left hover:text-teal-600"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link
//                 onClick={() => setMenuOpen(false)}
//                 className="text-lg font-medium hover:text-teal-600"
//                 to="/login"
//               >
//                 Login
//               </Link>
//             )}

//             <Link
//               onClick={() => setMenuOpen(false)}
//               className="text-lg font-medium hover:text-teal-600 flex items-center gap-2"
//               to="/cart"
//             >
//               <Badge badgeContent={quantity} color="primary">
//                 <ShoppingCartOutlinedIcon className="text-gray-800" />
//               </Badge>
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }
