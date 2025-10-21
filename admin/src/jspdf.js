import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

// Add autoTable to jsPDF prototype
jsPDF.autoTable = autoTable

export const handleDownloadPDF = (order) => {
  if (!order) {
    console.error("No order data provided to handleDownloadPDF")
    return
  }

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()

  // Colors
  const primaryColor = [25, 118, 210] // Blue
  const secondaryColor = [76, 175, 80] // Green
  const lightGray = [245, 245, 245]

  // 🏢 Header with Logo and Invoice Title
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, pageWidth, 60, "F")

  // Logo/Company Name
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.text("VARA FASHION SHOP", 20, 25)

  // Invoice Title
  doc.setFontSize(20)
  doc.text("INVOICE", pageWidth - 70, 25)

  // Invoice Details in Header
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`Invoice #: ${order._id || "N/A"}`, pageWidth - 70, 35)
  doc.text(
    `Date: ${
      order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"
    }`,
    pageWidth - 70,
    42
  )
  // doc.text(`Status: ${order.status || "N/A"}`, pageWidth - 70, 49)

  // 👤 Company & Customer Info Section
  const infoStartY = 75

  // Company Info Box
  doc.setFillColor(...lightGray)
  doc.roundedRect(14, infoStartY, 85, 45, 3, 3, "F")
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("From:", 20, infoStartY + 8)
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.text("VARA Shop", 20, infoStartY + 15)
  doc.text("No 18 Borelesgamuwa", 20, infoStartY + 21)
  doc.text("Borelesgamuwa", 20, infoStartY + 27)
  doc.text("Email: support@varashop.com", 20, infoStartY + 33)
  doc.text("Phone:0112223434", 20, infoStartY + 39)

  // Customer Info Box
  doc.setFillColor(...lightGray)
  doc.roundedRect(pageWidth - 99, infoStartY, 85, 45, 3, 3, "F")
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Bill To:", pageWidth - 93, infoStartY + 8)
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.text(
    order.address?.name || order.userId?.username || "Customer",
    pageWidth - 93,
    infoStartY + 15
  )
  doc.text(
    order.address?.email || order.userId?.email || "N/A",
    pageWidth - 93,
    infoStartY + 21
  )
  // doc.text(order.address?.phone || "N/A", pageWidth - 93, infoStartY + 27)
  const addressLines = doc.splitTextToSize(
    order.address?.address || order.address?.line1 || "Address not provided",
    70
  )
  doc.text(addressLines, pageWidth - 93, infoStartY + 33)

  // 🛒 Products Table
  const tableStartY = infoStartY + 60

  // Table Header
  doc.setFillColor(...primaryColor)
  doc.rect(14, tableStartY, pageWidth - 28, 8, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text("Product", 20, tableStartY + 5.5)
  doc.text("Quantity", 110, tableStartY + 5.5)
  doc.text("Price", 140, tableStartY + 5.5)
  doc.text("Total", pageWidth - 30, tableStartY + 5.5)

  // Table Data
  let currentY = tableStartY + 8
  const rowHeight = 12

  order.products?.forEach((product, index) => {
    const bgColor = index % 2 === 0 ? [255, 255, 255] : [250, 250, 250]
    doc.setFillColor(...bgColor)
    doc.rect(14, currentY, pageWidth - 28, rowHeight, "F")

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")

    // Product name (with word wrap)
    const productName =
      product.title ||
      product.productId?.title ||
      product.productId?.name ||
      "Product"
    const nameLines = doc.splitTextToSize(productName, 70)
    doc.text(nameLines, 20, currentY + 4)

    // Quantity
    doc.text(String(product.quantity ?? 1), 110, currentY + 4)

    // Price
    doc.text(`Rs ${Number(product.price ?? 0).toFixed(2)}`, 140, currentY + 4)

    // Total
    const itemTotal = (product.quantity ?? 1) * (product.price ?? 0)
    doc.text(`Rs ${itemTotal.toFixed(2)}`, pageWidth - 30, currentY + 4, {
      align: "right",
    })

    currentY += rowHeight
  })

  // If no products
  if (!order.products?.length) {
    doc.setFillColor(255, 255, 255)
    doc.rect(14, currentY, pageWidth - 28, rowHeight, "F")
    doc.setTextColor(100, 100, 100)
    doc.text("No products in this order", 20, currentY + 4)
    currentY += rowHeight
  }

  // 💰 Totals Section
  const totalsStartY = currentY + 15

  // Subtotal
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("Subtotal:", pageWidth - 70, totalsStartY)
  doc.text(
    `Rs ${Number(order.amount ?? 0).toFixed(2)}`,
    pageWidth - 20,
    totalsStartY,
    { align: "right" }
  )

  // Shipping (you can add this if available)
  // doc.text("Shipping:", pageWidth - 70, totalsStartY + 8)
  // doc.text("Rs 0.00", pageWidth - 20, totalsStartY + 8, { align: "right" })

  // Total
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Total Amount: ", pageWidth - 70, totalsStartY + 20)
  doc.setTextColor(...secondaryColor)
  doc.text(
    `Rs ${Number(order.amount ?? 0).toFixed(2)}`,
    pageWidth - 20,
    totalsStartY + 20,
    { align: "right" }
  )

  // Payment Method
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.text(
    `Payment Method: ${order.payment?.method || "N/A"}`,
    pageWidth - 70,
    totalsStartY + 30
  )

  // 🧾 Footer
  const footerY = doc.internal.pageSize.getHeight() - 20

  doc.setFillColor(...lightGray)
  doc.rect(0, footerY, pageWidth, 20, "F")

  doc.setTextColor(100, 100, 100)
  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
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

  // 📄 Save file
  doc.save(`Invoice_${order._id || "Unknown"}.pdf`)
}
