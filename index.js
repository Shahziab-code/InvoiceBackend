const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./db.js");
const InvoiceModel = require("./invoiceModel.js");

const app = express();
const port = process.env.PORT || 4000;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
// .then(() => {
//   console.log("Database connection established");



app.get("/api/invoices", async (req, res) => {
  try {
    const invoiceListItems = await InvoiceModel.find({}, "name saleInvoice posId customerNtn date");
    res.json(invoiceListItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/post", async (req, res) => {
  try {
 
    const newInvoice = new InvoiceModel({
      name: req.body.name,
      address: req.body.address,
      ntnno: req.body.ntnno,
      email: req.body.email,
      phone: req.body.phone,
      saleInvoice: req.body.saleInvoice,
      invoiceNo: req.body.invoiceNo,
      posId: req.body.posId,
      customerNtn: req.body.customerNtn,
      user: req.body.user,
      date: req.body.date,
      sNo: req.body.sNo,
      item: req.body.item,
      qty: req.body.qty,
      price: req.body.price,
      gstp: req.body.gstp,
      gstAmt: req.body.gstAmt,
      disc: req.body.disc,
      total: req.body.total,
      subTotal: req.body.subTotal,
      subTotalNo: req.body.subTotalNo,
      totalGst: req.body.totalGst,
      totalGstNo: req.body.totalGstNo,
      grossAmount: req.body.grossAmount,
      grossAmountNo: req.body.grossAmountNo,
      totalDiscount: req.body.totalDiscount,
      totalDiscountNo: req.body.totalDiscountNo,
      fbrFree: req.body.fbrFree,
      fbrFreeNo: req.body.fbrFreeNo,
      netBill: req.body.netBill,
      cash: req.body.cash,
      cashNo: req.body.cashNo,
      fbrInv: req.body.fbrInv,
      gstInclude: req.body.gstInclude,
      software: req.body.software,
      mobile: req.body.mobile,
    });
    await newInvoice.save();
    res.json({ message: "Data posted successfully!", newInvoice });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
