module.exports = {
    orderBook: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Замовити', callback_data: 'Наразі ця опція не доступна, шукай))'}],
            ]
        })
    },
}
