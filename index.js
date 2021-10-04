const TelegramApi = require('node-telegram-bot-api');
const {keyBoard} = require('./options');
const sequelize = require('./db');


const TOKEN = 'token'
//import {TOKEN} from './config.js'

const bot = new TelegramApi(TOKEN, {polling: true})

const start = async () => {

    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log('The connection is broken...', e)
    }

/*    connection.query(sql, function(err, results) {
        if(err) console.log(err);
        console.log(results);
    });

    connection.end();*/

    bot.setMyCommands( [
        {command: '/start', description: 'Початкове вітання'},
        {command: '/search', description: 'Перейти до пошуку'},
        {command: '/about', description: 'інформація про мене, або для чого мене створили'},
//    {command: '/info', description: ''},
        {command: '/clear', description: 'Очистити'},
    ])

    bot.on('message',msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
//    bot.sendMessage(chatId, `Ти написав мені ${text}`)
        console.log(msg)

        try {
            if (text === '/start') {
                return bot.sendMessage(chatId, `Дякую, що ти обрав саме мене. Я спробую знайти твою книжку. Але перш ніж перейти до пошуку, пропоную тобі ознайомитися зі мною та моїми можливостями))`, keyBoard);
            }
            if (text === '/search') {
              //  const BookController = require('./controller/BookController')
                return bot.sendMessage(chatId, 'in the process of development... please wait /about')
            }
            if (text === '/about') {
                return bot.sendMessage(chatId, `Ідея створити мене була в 2020 році. Моїм засновником і творцем є Стрипа Роман (https://www.linkedin.com/in/roman-strypa-b4623a205/). Він був студентом ЛНУ та системним адміністратором наукової бібліотеки. Моїм завданням є простий пошук книг. Тобто ти пишеш назву книжки або ж якесь інше значення, наприклад автора, місце видання тощо, і я повертаю тобі підібрані книжки. Цей проект є волонтерським та орієнтований на студентів, а також всіх, хто користується Телеграмом і відвідує бібліотеку ЛНУ Франка. Сподіваюсь мені вдасться допомогти тобі з пошуком літератури./search`);
            }
            if (text === '/clear') {
                //   return bot.deleteMessage(chatId, messages.delete())
            } else {
                bot.sendMessage(chatId, 'Я тебе не розумію./search')
            }
        } catch (e) {
            return bot.sendMessage(chatId, 'ERROR')
        }
    })
    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        bot.sendMessage(chatId, `${data}`)
        console.log(msg)
    })

}

start()