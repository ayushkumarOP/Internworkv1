const express = require('express');
const router = express.Router();
const Quotation = require('../models/Quotation.js');
const Product = require("../models/Product.js");
const pdfkit = require('pdfkit');
const cheerio = require('cheerio');
const fs = require('fs');

router.post('/quotation-request', async (req, res) => {
  try {
    const { products, total, billingDetails } = req.body;

    const newQuotation = new Quotation({
      products,
      total,
      billingDetails,
    });

    const savedQuotation = await newQuotation.save();
    res.status(201).json(savedQuotation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit quotation request' });
  }
});

router.get("/alldata", async (req, res) => {
  const query = req.query.new;
  try {
    const quotations = query
      ? await Quotation.find().sort({ _id: -1 }).limit(5)
      : await Quotation.find();
    res.status(200).json(quotations);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Quotation Status Approval
router.put('/:userId/update-status', async (req, res) => {
  
  const userId = req.params.userId;
  const { status } = req.body;
  console.log(req.body);
  try {
    const user = await Quotation.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.status !== status && (status === 'Approved' || status === 'Rejected')) {
      user.status = status;
      await user.save();
      res.json({ message: 'Status updated successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(err);
  }
});

// Delete a user by ID
router.delete('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log(req.params);

    // Find the user document by ID and delete it
    const deletedUser = await Quotation.findByIdAndDelete(userId);

    // Check if the user was found and deleted
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/:id/generate-pdf', async(req, res) => {
  try{
    const quotationId = req.params.id;
    const data = await Quotation.findById(quotationId);

    if (!data) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    console.log(data);


    const doc = new pdfkit();
    
    const pdfPath = `/Users/ayushkumar/Desktop/intern work/third_commit/pdf/quotation_${quotationId}.pdf`; // File path to save the PDF
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);


    doc.fontSize(20).text('Invoice', { align: 'center',underline: true });
    doc.moveDown();

    doc.font('Helvetica-Bold').fontSize(14).text(`Billing Details:`);
    doc.font('Helvetica');
    // doc.fontSize(14).text(`Billing Details:`);
    doc.fontSize(12).text(`Name: ${data.billingDetails.fullName}`);
    doc.text(`Email: ${data.billingDetails.email}`);
    doc.text(`Phone: ${data.billingDetails.phone}`);
    doc.text(`Address: ${data.billingDetails.address}`);
    doc.text(`Country: ${data.billingDetails.country}`);
    doc.moveDown(); doc.moveDown();

    doc.font('Helvetica-Bold').fontSize(14).text(`Order Details:`);
    doc.font('Helvetica');
    // doc.fontSize(14).text(`Order Details:`);
    doc.fontSize(12).text(`Order ID: ${data._id}`);
    doc.text(`Status: ${data.status}`);
    doc.text(`Total: $${data.total}`);
    doc.text(`Created At: ${data.createdAt}`);
    doc.moveDown(); doc.moveDown();


    doc.font('Helvetica-Bold').fontSize(14).text(`Products:`);
    doc.font('Helvetica');
    
    let index=0;
    // Fetch product details based on product IDs
    for (const product of data.products) {
      const productDetails = await Product.findById(product.productId);
      console.log(productDetails);
      doc.font('Helvetica-Bold');
      doc.fontSize(12).text(`Product ${index + 1}:`); index++;
      doc.font('Helvetica');
      doc.moveDown();
      if (productDetails) {
        const $ = cheerio.load(productDetails.description);
        let plainTextDescription = '';
        $('li').each((index, element) => {
          plainTextDescription += $(element).text() + '\n';
        });

        doc.fontSize(12).text(`Product ID: ${product.productId}`);
        doc.text(`Name: ${decodeURIComponent(productDetails.name)}`);
        doc.moveDown();
        doc.text(`Description:\n${plainTextDescription}`);
        doc.moveDown();
        doc.text(`Quantity: ${product.quantity}`);
        doc.moveDown();
      }
    }

    doc.end();

    writeStream.on('finish', () => {
      res.download(pdfPath, `quotation_${quotationId}.pdf`, (err) => {
        if (err) {
          console.error('Error downloading PDF:', err);
          res.status(500).json({ error: 'Error downloading PDF' });
        } else {
          fs.unlinkSync(pdfPath);
        }
      });
    });
  }
  catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Error generating PDF' });
  }
});


module.exports = router;