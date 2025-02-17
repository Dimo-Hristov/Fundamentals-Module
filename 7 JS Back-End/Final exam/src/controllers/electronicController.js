const router = require('express').Router();
const electronicService = require('../services/electronicService');
const { extractErrorMsgs } = require('../utils/errorHandler');
const { isAuth } = require('../middlewares/authMiddleare');

router.get('/create', isAuth, (req, res) => {
    res.render('electronic/create')
});

router.post('/create', isAuth, async (req, res) => {
    const eletronicData = req.body;

    try {
        const ownerId = req.user._id;
        eletronicData['owner'] = ownerId;
        await electronicService.addOffer(eletronicData);
        res.redirect('/electronics/catalog');

    } catch (error) {
        const errorMessages = extractErrorMsgs(error);
        res.status(404).render('electronic/create', { errorMessages, eletronicData });
    }
});

router.get('/catalog', async (req, res) => {

    try {
        const offers = await electronicService.getAllOffers().lean();
        const isEmpty = offers.length < 1;

        res.render('electronic/catalog', { offers, isEmpty })

    } catch (error) {
        const errorMessages = extractErrorMsgs(error);
        res.status(404).render('home', { errorMessages });
    }
});

router.get('/:offerId/details', async (req, res) => {

    try {
        const userId = req.user?._id;
        const offerId = req.params.offerId;
        const offer = await electronicService.getOneOfferPopulated(offerId).lean();
        const isOwner = offer.owner.toString() === userId;
        const hasPurchased = offer.buyingList.some(x => x.userId.toString() === userId);

        res.render('electronic/details', { offer, isOwner, hasPurchased });

    } catch (error) {
        const errorMessages = extractErrorMsgs(error);
        res.status(404).render('home', { errorMessages });
    }

});

router.get('/:offerId/buy', isAuth, async (req, res) => {

    try {
        const offerId = req.params.offerId;
        const userId = req.user?._id;

        const offer = await electronicService.getOneOffer(offerId).lean();
        const isOwner = offer.owner.toString() === userId;

        if (isOwner) {
            throw new Error('Creators cannot buy their own eletronics!')
        }

        await electronicService.buyEletronic(offerId, userId);
        res.redirect(`/electronics/${offerId}/details`)

    } catch (error) {
        const errorMessages = extractErrorMsgs(error);
        res.status(404).render('home', { errorMessages });
    }
});

router.get('/:offerId/edit', isAuth, async (req, res) => {
    const offerId = req.params.offerId;

    try {
        const userId = req.user._id;
        const offer = await electronicService.getOneOffer(offerId).lean();
        const isOwner = offer.owner.toString() === userId;

        if (isOwner) {
            return res.render('electronic/edit', { offer })
        }
        throw new Error('You dont have privileges to edit this offer');

    } catch (error) {
        const offer = await electronicService.getOneOffer(offerId).lean();
        const errorMessages = extractErrorMsgs(error);
        res.status(404).render('electronic/edit', { errorMessages, offer });
    }
});

router.post('/:offerId/edit', isAuth, async (req, res) => {
    const updatedData = req.body;


    try {
        const offerId = req.params.offerId;
        const userId = req.user._id;
        const offer = await electronicService.getOneOffer(offerId).lean();
        const isOwner = offer.owner.toString() === userId;

        if (isOwner) {
            await electronicService.updateOffer(offerId, updatedData);
            return res.redirect(`/electronics/${offerId}/details`);
        }

        throw new Error('You dont have privileges to edit this offer')

    } catch (error) {
        const errorMessages = extractErrorMsgs(error);
        res.status(404).render('electronic/edit', { errorMessages, offer: updatedData });
    }
});

router.get('/:offerId/delete', isAuth, async (req, res) => {

    try {
        const offerId = req.params.offerId;
        const userId = req.user._id
        const offer = await electronicService.getOneOffer(offerId).lean();
        const isOwner = offer.owner.toString() === userId;

        if (isOwner) {
            await electronicService.deleteOffer(offerId);
            return res.redirect('/electronics/catalog');
        }

        throw new Error('You dont have privileges to delete this offer');

    } catch (error) {
        const errorMessages = extractErrorMsgs(error);
        res.status(404).render('electronic/catalog', { errorMessages });
    }
});

router.get('/search', (req, res) => {
    res.render('electronic/search');
})

router.post('/search', async (req, res) => {

    try {
        const { name, type } = req.body;

        if (!name && !type) {
            return res.render('electronic/search', { isEmpty: true })
        }


        let query = {};

        if (name) {
            query.name = { $regex: new RegExp(name, 'i') };
        }

        if (type) {
            query.type = { $regex: new RegExp(type, 'i') };
        }


        const searchResult = await electronicService.search(query).lean();
        const isEmpty = searchResult.length < 1;


        res.render('electronic/search', { searchResult, isEmpty })

    } catch (error) {
        const errorMessages = extractErrorMsgs(error);
        res.status(404).render('electronic/search', { errorMessages });
    }
})


module.exports = router;