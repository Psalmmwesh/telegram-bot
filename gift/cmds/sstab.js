const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); 

module.exports = {
    config: {
        name: "sstab",
        author: "Gifted Tecg",
        description: "Take a screenshot of a webpage or Google search results",
        category: "ᴛᴏᴏʟs",
        usage: ".sstab <url>\n or\n/screenshot -g <text>",
        usePrefix: true
    },

    onStart: async function({ bot, chatId, args, msg }) {
        const p = '/'; 

        if (args.length === 0) {
            bot.sendMessage(chatId, `Invalid input⚠️\nPlease use:\n${p}sstab <url> \nor\n${p}sstab  <link>.`);
            return;
        }

        let url;
        if (args[0] === '-g') {
            if (args.length < 2) {
                bot.sendMessage(chatId, `Invalid text input after -g tag⚠️\nPlease use:\n${p}sstab YourLink`);
                return;
            }
            const query = args.slice(1).join('+');
            url = `https://www.google.com/search?q=${query}&tbm=isch`;
        } else {
            url = args[0];
            if (!url.match(/^https?:\/\/.+$/)) {
                url = `https://${url}`;
            }
        }

        const apiURL = `https://api.maher-zubair.tech/misc/sstab?url=${url}`;

        try {
            const res = await fetch(apiURL);
            if (!res.ok) {
                bot.sendMessage(chatId, `API not responding. Please try again later.`);
                return;
            }

            bot.sendPhoto(chatId, apiURL, { caption: "Here is the screenshot." });
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, 'An error occurred while processing the command.');
        }
    }
};
