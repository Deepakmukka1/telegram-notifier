const { Telegraf } = require("telegraf");
const axios = require("axios");
function getCurrentDate() {
  var separator = "-";
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  return `${date}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${year}`;
}
const bot = new Telegraf("1687166742:AAH1RPf5__c1BqasAxwOg0gHobe9ZFGqsbY");
bot.command("start", (ctx) => {
  const { first_name } = ctx.update.message.from;
  const { last_name } = ctx.update.message.from;
  ctx.telegram.sendMessage(
    ctx.chat.id,
    `👋 Hello there ! Welcome ${first_name} ${last_name || ''} `,
    requestPhoneKeyboard
  );
});
const requestPhoneKeyboard = {
  reply_markup: {
    one_time_keyboard: true,
    keyboard: [
      [
        {
          text: "Check slots 💉",
          one_time_keyboard: true,
        },
      ],
    ],
  },
};

bot.hears("Check slots 💉", (ctx) => {
  ctx.telegram.sendMessage(ctx.message.chat.id, ` 📍 Enter your pincode `);
});
bot.on("text", (ctx) => {
  const pinCode = ctx.update.message.text;
  configs = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
    },
  };

  axios
    .get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${getCurrentDate()}`,
      configs
    )
    .then(function (response) {

      const { sessions } = response.data;
      if (sessions.length == 0) ctx.reply(" ❌ No vaccine sessions today");
      else {
        let finalData="";
        sessions.map((data) => {
          const {
            name,
            address,
            block_name,
            pincode,
            from,
            to,
            fee_type,
            available_capacity_dose1,
            available_capacity_dose2,
            available_capacity,
            min_age_limit,
            vaccine,
          } = data;
          finalData += `Center name : ${name || "No data"}\nCenter address : ${
            address || "No data"
          }\nBlock name : ${block_name || "No data"}\nPincode: ${
            pincode || "No data"
          }\nAvailable from : ${from || "No data"}\nAvailable to : ${
            to || "No data"
          }\nFee type : ${fee_type || "No data"}\nAge limit : ${
            min_age_limit || "No data"
          }\nVaccine type :${
            vaccine || "No data"
          }\nAvailable amount of Dose 1 : ${
            available_capacity_dose1 || "No data"
          }\nAvailable amount of Dose 2 : ${
            available_capacity_dose2 || "No data"
          }\nTotal capacity avialble : ${available_capacity || "No data"}\n\n`;
        });
        ctx.reply(finalData);
      }

    })
    .catch(function (error) {

      console.log(error);
    });
});
bot.launch();
