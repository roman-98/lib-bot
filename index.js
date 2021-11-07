const TelegramApi = require('node-telegram-bot-api');
const sequelize = require('./db');
const TOKEN = require('./config');
const {orderBook} = require('./options')

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

    bot.on('message', async (payload) => {
        const {text, chat} = payload;
        const {id: chatId} = chat;

        const BOOKS_PER_MESSAGE = 1;
        let messages = [];

        try {

            const query = `SELECT book FROM books t WHERE (t.*)::text LIKE '%${text}%'`;
            let [rows] = await sequelize.query(query);

            while(rows.length) {
                const chunk = rows.splice(0, BOOKS_PER_MESSAGE); // [1] Chunk rows that came from db to N items by reducing it using splice
                const books = chunk.map(row => row.book);        // [2] Then that chunk to array of book names using map
                const message = books.join("\n");                // [3] Convert chunk of book names to message by joining by some logic in our case with newline symbol
                messages.push(message);                          // [4] Push it to messages array
            }

        }
        catch (error) {
            console.error(error.message);
        }
        finally {
            if (!messages.length) {
                bot.sendMessage(chatId, 'Введи автора, назву книги чи будь-якого іншого видання. Якщо я не знайду потрібної Тобі літератури, спробуй конкретизувати запит або піди у бібліотеку (м.Львів, вул.Драгоманова 5(17)). Можливо потрібна Тобі література є в іншому каталозі, якого я не знаю.');
                //return;
            }
            messages.forEach(message =>
                bot.sendMessage(chatId, message, /*orderBook*/)); // [5] Finally iterate that array and send
        }
    });

    /*bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        bot.sendMessage(chatId, `${data}`);
        console.log(msg);
    })*/
}

start();
