const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accesoryManager = require('../managers/accesoryManager');

router.get('/create', (req, res) => {
    res.render('cube/create')
});

router.post('/create', async (req, res) => {
    const { name,
        description,
        imageUrl,
        difficultyLevel, } = req.body;

    await cubeManager.create(
        {
            name,
            description,
            imageUrl,
            difficultyLevel: Number(difficultyLevel),
            owner: req.user._id
        }
    );


    res.redirect('/')
});

router.get('/:cubeId/details', async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeManager.find(cubeId).lean()

    console.log(cube);

    if (!cube) {
        return res.redirect('404')
    }

    res.render('cube/details', { cube });
});

router.get('/:cubeId/attach-accesory', async (req, res) => {
    const cube = await cubeManager.find(req.params.cubeId).lean();
    const accesories = await accesoryManager.getAvailable(cube.accersories).lean();

    const hasAccesories = accesories.length > 0

    res.render('accesory/attach', { cube, accesories, hasAccesories })
});

router.post('/:cubeId/attach-accesory', async (req, res) => {
    const { accesory } = req.body;
    const cubeId = req.params.cubeId;

    await cubeManager.attachAccesory(cubeId, accesory);

    res.redirect(`/cubes/${cubeId}/attach-accesory`)
});

router.get('/:cubeId/delete', async (req, res) => {
    const cube = await cubeManager.find(req.params.cubeId).lean();

    res.render('cube/delete', { cube });
});

router.post('/:cubeId/delete', async (req, res) => {
    await cubeManager.delete(req.params.cubeId);

    res.redirect('/')
});

router.get('/:cubeId/edit', async (req, res) => {
    const cube = await cubeManager.find(req.params.cubeId).lean();

    const options = getViewOptionsValue(cube.difficultyLevel)

    res.render('cube/edit', { cube, options });
});

function getViewOptionsValue(difficultyLevel) {
    const titles = [
        'Very Easy',
        'Easy',
        'Medium (Standard 3x3)',
        'Intermediate',
        'Expert',
        'Hardcore',
    ]

    const options = titles.map((title, index) => ({
        title: `${index + 1} - ${title}`,
        value: index + 1,
        selected: Number(difficultyLevel) === index + 1
    }));

    return options;

}

router.post('/:cubeId/edit', async (req, res) => {
    const cubeData = req.body;
    const cubeId = req.params.cubeId;




    await cubeManager.update(cubeId, cubeData);

    res.redirect(`/cubes/${cubeId}/details`);
})


module.exports = router;