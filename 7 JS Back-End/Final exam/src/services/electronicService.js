const Electronic = require('../models/Electronic');

exports.addOffer = (eletronicData) => Electronic.create(eletronicData);

exports.getAllOffers = () => Electronic.find();

exports.getOneOfferPopulated = (offerId) => Electronic.findById(offerId)

exports.getOneOffer = (offerId) => Electronic.findById(offerId).populate();

exports.buyEletronic = (offerId, userId) => Electronic.findByIdAndUpdate(offerId, { $push: { 'buyingList': { userId } } });

exports.updateOffer = (offerId, updatedData) => Electronic.findByIdAndUpdate(offerId, updatedData, { runValidators: true });

exports.deleteOffer = (offerId) => Electronic.findByIdAndDelete(offerId);

exports.search = (query) => Electronic.find(query);