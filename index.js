const TelegramApi = require('node-telegram-bot-api');
const {keyBoard} = require('./options');
const sequelize = require('./db');

const TOKEN = '1080884640:AAGEU_eNkThOcc0AzlGOpUaMbD_m2O7z-xs'

const bot = new TelegramApi(TOKEN, {polling: true})

const start = async () => {

    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log('The connection with database is broken...', e)
    }

    bot.setMyCommands( [
        {command: '/start', description: 'Початкове вітання'},
        {command: '/search', description: 'Перейти до пошуку'},
        {command: '/about', description: 'інформація про мене, або для чого мене створили'},
//    {command: '/info', description: ''},
        {command: '/help', description: 'Очистити'},
    ])

    bot.on("polling_error", (err) => console.log(err));

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        console.log(msg)

        try {
            if (text === '/start') {
                return bot.sendMessage(chatId, `Дякую, що ти обрав саме мене. Я спробую знайти твою книжку. Але перш ніж перейти до пошуку, пропоную тобі ознайомитися зі мною та моїми можливостями))`, keyBoard);
            }
            if (text === '/search') {
                bot.sendMessage(chatId, "Введи назву чи автора. Якщо не пам'ятаєш, напиши приблизно, а я спробую знайти!");
                bot.on('message', (ctx) => {
                    const text = ctx.text
                    const log = sequelize.query("SELECT book FROM books t WHERE (t.*)::text LIKE '%"+ text +"%'") .then( (result) => {
                        console.log(result,log);
                    }) .catch( (err)  => {
                        console.log(err);
                    })
                })
            }
            if (text === '/about') {
                return bot.sendMessage(chatId, `Ідея створити мене була в 2020 році. Моїм засновником і творцем є Стрипа Роман (https://www.linkedin.com/in/roman-strypa-b4623a205/). Він був студентом ЛНУ та системним адміністратором наукової бібліотеки. Моїм завданням є простий пошук книг. Тобто ти пишеш назву книжки або ж якесь інше значення, наприклад автора, місце видання тощо, і я повертаю тобі підібрані книжки. Цей проєкт є волонтерським та орієнтований на студентів, а також всіх, хто користується Телеграмом і відвідує бібліотеку ЛНУ Франка. Сподіваюсь мені вдасться допомогти тобі з пошуком літератури./search`);
            }
            if (text === '/help') {
                //return bot.sendMessage(chatId, '')
            }
        } catch (e) {
            return bot.sendMessage(chatId, 'ERROR');
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
