const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  productType: { type: String, required: true },
  productDescription: { type: String, required: true },
  additionalMessage: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Partner', PartnerSchema);
