const TelegramApi = require('node-telegram-bot-api');
const sequelize = require('./db');

const TOKEN = require('./config');

const bot = new TelegramApi(TOKEN, {polling: true});

bot.on('message', async msg => {
    console.log(msg)
    })

const start = async () => {

    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (e) {
        console.log('The connection with database is broken...', e);
    }

    bot.on("polling_error", (err) => console.log(err));

        bot.on('message', async (message) => {
            const {text, chat} = message;
            const {id: chatId} = chat;

            let response = '';

            try {
                const [rows] = await sequelize.query(`SELECT book FROM books t WHERE (t.*)::text LIKE '%${text}%'`);
                if (rows.length) {
                    response = rows.map(row => row.book).join("\n");
                } else {
                    response = 'Введіть автора, назву книги чи будь-якого іншого видання. Якщо я не знайду потрібної вам літератури, спробуйте конкретизувати запит або підіть у бібліотеку (м.Львів, вул.Драгоманова 5(17)). Можливо потрібна вам література є в іншому каталозі, якого я не знаю.';
                }
            } catch (error) {
                console.error(error.message);
                response = 'Не вдається знайти';
            } finally {
                if (response) {
                    bot.sendMessage(chatId, response);
                }
            }
        })
    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        bot.sendMessage(chatId, `${data}`);
        console.log(msg);
    })
}

start();
