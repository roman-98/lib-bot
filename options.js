module.exports = {
    keyBoard: {
        reply_markup: JSON.stringify( {
            inline_keyboard: [
                [{text: '/about', callback_data: '/about'}, {text: '/help', callback_data: '/help'}],
                [{text: '/search', callback_data: '/search'}],
            ]
        })
    }
}

