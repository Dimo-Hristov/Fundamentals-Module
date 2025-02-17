const mongoose = require('mongoose');

const Cat = require('./models/Cat')

async function connectDb() {
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('Database connected....');


    //virtual function
    // cats.forEach(cat => cat.greet());

    //virtual property
    // cats.forEach(cat => console.log(cat.info));

    //static request
    // const result = await Cat.giveMeCats();
    // console.log(result);

    // CRUD OPERATIONS

    // Read

    // const cats = await Cat.find({ age: 21 })
    // const cat = await Cat.findById('651536a71711eb8377f46edf')
    //FindOne takes the first match !
    // const cat = await Cat.findOne({ breed: 'Pes' })
    // console.log(cat);

    // Create

    // First method
    // const newCat = new Cat({
    //     name: 'Ceko',
    //     age: 45,
    //     breed: 'Aloha'
    // });
    // await newCat.save()

    // Second method
    // const newCat = await Cat.create({
    //     name: 'Ivan',
    //     age: 111,
    //     breed: 'hoho'
    // })

    // Update

    //  method 1
    // const ceko = await Cat.findOne({ name: 'Ceko' })
    // ceko.age = 555;
    // await ceko.save()
    // console.log(ceko);

    // Native mongoDb update, method 2
    // updates the first match!
    // await Cat.updateOne({ name: 'Ceko' }, { $set: { age: 47 } });

    // Mongoose extension , method 3
    // await Cat.findByIdAndUpdate('651536ca1fd1f62fb2d4de5d', { $set: { breed: 'kotka' } });

    // Delete

    // Method 1
    // delete the first match!!!
    // await Cat.deleteOne({ name: 'Gosho' })

    //Method 2
    await Cat.findByIdAndDelete('651536a71711eb8377f46edf');


}
connectDb();