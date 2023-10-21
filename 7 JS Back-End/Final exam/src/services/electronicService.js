const Electronic = require('../models/Electronic');

exports.addOffer = (eletronicData) => Electronic.create(eletronicData);

exports.getAllOffers = () => Electronic.find();

exports.getOneOffer = (offerId) => Electronic.findById(offerId)