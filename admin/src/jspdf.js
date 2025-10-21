import jsPDF from "jspdf"
import "jspdf-autotable"

export const handleDownloadPDF = () => {
  if (!order) return

  const doc = new jsPDF()

  // 🏪 Header
  doc.setFontSize(18)
  doc.text("VARA Shop", 14, 20)

  doc.setFontSize(12)
  doc.text(`Order ID: ${order._id}`, 14, 30)
  doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 14, 37)

  // 👤 Customer Info
  const userInfoY = 47
  doc.text("Customer Details:", 14, userInfoY)
  doc.setFontSize(11)
  doc.text(
    `Name: ${order.address?.name || order.userId?.username || "N/A"}`,
    14,
    userInfoY + 7
  )
  doc.text(
    `Email: ${order.address?.email || order.userId?.email || "N/A"}`,
    14,
    userInfoY + 14
  )
  doc.text(`Phone: ${order.address?.phone || "N/A"}`, 14, userInfoY + 21)
  doc.text(
    `Address: ${order.address?.address || order.address?.line1 || "N/A"}`,
    14,
    userInfoY + 28
  )

  // 🛒 Products Table
  const tableData = order.products.map((p) => [
    p.title || "Product",
    p.quantity ?? 1,
    `$${Number(p.price ?? 0).toFixed(2)}`,
    `$${Number((p.quantity ?? 1) * (p.price ?? 0)).toFixed(2)}`,
  ])

  doc.autoTable({
    startY: userInfoY + 40,
    head: [["Product", "Quantity", "Price", "Total"]],
    body: tableData,
    theme: "grid",
    styles: { fontSize: 11 },
    headStyles: { fillColor: [25, 118, 210] },
  })

  // 💰 Total Summary
  const finalY = doc.lastAutoTable.finalY + 10
  doc.setFontSize(13)
  doc.text(`Total Amount: $${Number(order.amount ?? 0).toFixed(2)}`, 14, finalY)
  doc.text(`Payment: ${order.payment?.method || "N/A"}`, 14, finalY + 7)
  doc.text(`Status: ${order.status}`, 14, finalY + 14)

  // 📄 Save file
  doc.save(`VARA_Order_${order._id}.pdf`)
}
