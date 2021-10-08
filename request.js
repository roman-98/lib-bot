const sequelize = require('./db');
//const {DataTypes, INTEGER} = require('sequelize');

const books = sequelize.define('books', {
   // id: {type: DataTypes.INTEGER}
/*    book:findOne({where: {text, like: '%Археологічні нотатки%'}}).then ( books => {
            if(!books) return;
            console.log(books.book, books.id);
        }).catch(err => console.log(err)),*/
})
module.exports = books;

//SELECT book FROM books t WHERE (t.*)::text LIKE '%Археологічні нотатки%'
/*
User.findAll({raw:true}).then(users=>{
    console.log(users);
}).catch(err=>console.log(err));*/


/*
User.findByPk(2)
    .then(user=>{
        if(!user) return; // если пользователь не найден
        console.log(user.name);
    }).catch(err=>console.log(err));


User.findOne({where: {name: "Tom"}})
    .then(user=>{
        if(!user) return;
        console.log(user.name, user.age);
    }).catch(err=>console.log(err));*/
