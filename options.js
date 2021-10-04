module.exports = {
    keyBoard: {
        reply_markup: JSON.stringify( {
            inline_keyboard: [
                [{text: '/about', callback_data: '/about'}, {text: '/search', callback_data: '/search'}],
                /*[{text: '/search', callback_data: '/search'}],*/
            ]
        })
    }
}

