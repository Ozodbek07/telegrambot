TELEGRAM_BOT_TOKEN = "1424517838:AAEWnIIct1ezRD0jLdr7ow9NXM_4436Z_Q4";
const TeleBot = require("telebot");
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);
const chatIds = [];

const CronJob = require("cron").CronJob;
const job = new CronJob("* * * * * *", function(){
    console.log("Yuborildi!");
        chatIds.forEach((chatId) => {
            bot.sendMessage(chatId, "Salom");
        });
}, null, true);

bot.on("text", (msg) => msg.reply.text("Kelgan xabar: " + msg.text));

bot.on(["/start"], (msg) => {
    let chatId = msg.chat.id;
    if (!chatIds.includes(chatId)) {
        chatIds.push(chatId);
        msg.reply.text("Boshladik!");
        job.start();
    }
});
bot.on(["/stop"], (msg) => {
    let chatId = msg.chat.id;
    chatIds.pop(chatId);
});
bot.start();