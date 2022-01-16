const Discord = require('discord.js');
const Ytdl = require('ytdl-core');  
const Mapbot = new Discord.Client();
//const token = 'NzQ1MDE1MjIxNjUwOTgwOTI0.Xzrnfg.Ms2KYyKxWrnxXAy8PAncCAUJawM'

let estouPronto = false;
let connection;

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

Mapbot.on('message', async (msg) => {
//musica
    if (msg.content === '!join'){
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
    }
});

//Mapbot.login(token);







