const Discord = require('discord.js');
const Ytdl = require('ytdl-core');  
const Mapbot = new Discord.Client();
const token = 'NzQ1MDE1MjIxNjUwOTgwOTI0.Xzrnfg.Ms2KYyKxWrnxXAy8PAncCAUJawM'
const streamOptions = {seek:0, volume:1};
const puppeteer = require('puppeteer');

let estouPronto = false;
let connection;

async function robo(nik){
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
  
      page.setDefaultNavigationTimeout(0)
      nick = nik; 
      //const opgg = `https://br.op.gg/summoner/userName=$%7B${nick}%7D`;
      
      await page.goto(`https://br.op.gg/summoner/userName=$%7B${nick}%7D`,{
            waitUntil: 'load',
            timeout:0
      });
      
      resultado = await page.evaluate(() => {
            return $(".TierRank").html();
      });

      lp = await page.evaluate(() => {
            return $(".LeaguePoints").html();
      });
      
      lp = lp.replace("\n\t\t\t\t","");
      
      resultado = resultado +' ' + lp;

      await browser.close();
      return resultado;
}

Mapbot.on('ready', () => {
    console.log('To on!!');

});

Mapbot.on('message', message => {
let responseObject = {
    "!ta on?" : "Pai ta on!!",
    "!twitter" : "https://twitter.com/Maaalpe",
    "!lol" : "meu nick no lol é Mapeal"
};

if(responseObject[message.content]){
    message.channel.send(responseObject[message.content]);
}
});



//Mapbot.on('message', async (msg) => {
Mapbot.on('message',async(msg) => {
//musica
    if (msg.author.bot){
          return;
    }

    if (msg.content.toLowerCase().startsWith("!rank ")) {
      let nome = msg.content.replace('!rank ', '');
      console.log(nome);

      msg.channel.send("carregando...");
      tudo = await robo(nome);
      msg.channel.send(`O rank de ${nome} é: ${tudo}`);
      console.log(`O rank é : ${tudo}`)
}

if (msg.content === '!leave'){
      if (msg.member.voice.channel){ 
            msg.member.voice.channel.leave();
            estouPronto = false;
      } else {
            msg.channel.send('Você precisa estar conectado a um Canal de Voz!');
      }
}

})

    /*if (msg.content === '!join'){
          if (msg.member.voice.channel){  
            connection = await msg.member.voice.channel.join();

            estouPronto = true;
          } else {
                msg.channel.send('Você precisa estar conectado a um Canal de Voz!');
          }
    }

    else if (msg.content === '!leave'){
          if (msg.member.voice.channel){ 
                msg.member.voice.channel.leave();
                estouPronto = false;
          } else {
                msg.channel.send('Você precisa estar conectado a um Canal de Voz!');
          }
    }

    else if (msg.content.startsWith('!play ')){
          if (estouPronto){
                let oQueTocar = msg.content.replace('!play ', '');
                if (Ytdl.validateURL(oQueTocar)){
                      // Usamos a referência ao join(); aqui, para então dar play em algo.
                      connection.play(Ytdl(oQueTocar)); // e agora temos play() no lugar de playStream()
                } else {
                      msg.channel.send('O link não é válido!')
                }
          }
    }*/
//};
//});


Mapbot.login(token);







