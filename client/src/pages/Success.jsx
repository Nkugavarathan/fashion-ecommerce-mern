import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { userRequest } from "../requestMethod"
import Confetti from "react-confetti"

const Success = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user.currentUser)

  const [order, setOrder] = useState(null)
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Extract orderId from URL query
  const query = new URLSearchParams(location.search)
  const orderIdFromURL = query.get("orderId")

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderIdFromURL) return

      try {
        const res = await userRequest.get(`/orders/${orderIdFromURL}`)
        setOrder(res.data)
      } catch (err) {
        console.error("Failed to fetch order:", err)
      }
    }

    fetchOrder()
  }, [orderIdFromURL])

  const handleDownloadPDF = () => {
    if (!order) {
      alert("Order not created yet!")
      return
    }

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    const primaryColor = [25, 118, 210]
    const secondaryColor = [76, 175, 80]
    const lightGray = [245, 245, 245]

    // --- Header ---
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, pageWidth, 60, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text("VARA FASHION SHOP", 20, 25)
    doc.setFontSize(20)
    doc.text("INVOICE", pageWidth - 70, 25)
    doc.setFontSize(10)
    doc.text(`Invoice #: ${order._id}`, pageWidth - 70, 35)
    doc.text(
      `Date: ${new Date(order.createdAt).toLocaleDateString()}`,
      pageWidth - 70,
      42
    )

    // --- Customer Info ---
    const infoStartY = 75
    doc.setFillColor(...lightGray)
    doc.roundedRect(14, infoStartY, 85, 45, 3, 3, "F")
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(12)
    doc.text("From:", 20, infoStartY + 8)
    doc.setFontSize(9)
    doc.text("VARA Shop", 20, infoStartY + 15)
    doc.text("No 10 HighLevel Road, Nugegoda", 20, infoStartY + 21)
    doc.text("Email: supportvara@.com", 20, infoStartY + 27)
    doc.text("Phone: 0775019192", 20, infoStartY + 33)

    doc.setFillColor(...lightGray)
    doc.roundedRect(pageWidth - 99, infoStartY, 85, 45, 3, 3, "F")
    doc.setFontSize(12)
    doc.text("Bill To:", pageWidth - 93, infoStartY + 8)
    doc.setFontSize(9)
    doc.text(order.address?.name || "Customer", pageWidth - 93, infoStartY + 15)
    doc.text(order.address?.email || "N/A", pageWidth - 93, infoStartY + 21)
    const addressLines = doc.splitTextToSize(
      order.address?.address || "Address not provided",
      70
    )
    doc.text(addressLines, pageWidth - 93, infoStartY + 33)

    // --- Product Table ---
    const tableStartY = infoStartY + 60
    const tableRows = order.products.map((item) => [
      item.title || "Product",
      item.quantity,
      `Rs ${item.price}`,
      `Rs ${(item.quantity * item.price).toFixed(2)}`,
    ])

    autoTable(doc, {
      startY: tableStartY,
      head: [["Product", "Quantity", "Price", "Total"]],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: primaryColor },
    })

    const finalY = doc.lastAutoTable.finalY + 10
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Total Amount:", pageWidth - 70, finalY)
    doc.setTextColor(...secondaryColor)
    doc.text(`Rs ${order.amount}`, pageWidth - 20, finalY, { align: "right" })
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(9)
    doc.text(
      `Payment Method: ${order.payment?.method || "Card"}`,
      pageWidth - 70,
      finalY + 10
    )

    // --- Footer ---
    const footerY = doc.internal.pageSize.getHeight() - 20
    doc.setFillColor(...lightGray)
    doc.rect(0, footerY, pageWidth, 20, "F")
    doc.setTextColor(100, 100, 100)
    doc.setFontSize(8)
    doc.text(
      "Thank you for shopping with VARA Fashion Shop!",
      pageWidth / 2,
      footerY + 8,
      { align: "center" }
    )
    doc.text(
      "For any inquiries, contact us at support@varashop.com",
      pageWidth / 2,
      footerY + 14,
      { align: "center" }
    )

    doc.save(`Invoice_${order._id}.pdf`)
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Confetti effect */}
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={200}
        gravity={0.3}
        recycle={true}
        wind={0.02}
      />

      {/* Order Info */}
      {order
        ? `🎉 Order has been created successfully! Your order number is ${order._id}.`
        : `✅ Payment successful! Your order is being prepared...`}

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          marginTop: 20,
          border: "none",
          backgroundColor: "teal",
          color: "white",
          borderRadius: 5,
          cursor: "pointer",
        }}
      >
        Go to Homepage
      </button>
      <button
        onClick={handleDownloadPDF}
        style={{
          padding: "10px 20px",
          marginTop: 10,
          border: "none",
          backgroundColor: "darkorange",
          color: "white",
          borderRadius: 5,
          cursor: "pointer",
        }}
      >
        Download Receipt
      </button>
    </div>
  )
}

export default Success
