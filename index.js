const Discord = require('discord.js');
const Ytdl = require('ytdl-core');  
const Mapbot = new Discord.Client();
const token = 'COLOQUE O TOKEN DISCORD AQUI'
const streamOptions = {seek:0, volume:1};
const puppeteer = require('puppeteer');

let estouPronto = false;
let connection;

let listadecornos = ["neutro"];

async function robo(nik){
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
  
      page.setDefaultNavigationTimeout(0)
      nick = nik; 
      //const opgg = `https://br.op.gg/summoner/userName=$%7B${nick}%7D`;
      
      await page.goto(`https://www.leagueofgraphs.com/pt/summoner/br/${nick}`,{
            waitUntil: 'load',
            timeout:0
      });
      
      resultado = await page.evaluate(() => {
            return $(".leagueTier").html();
      });

      lp = await page.evaluate(() => {
            return $(".leaguePoints").html();
      });
      
      resultado = resultado.replace("\n                                    ","");
      resultado = resultado.replace("                                                                    ","");
      
      resultado = resultado +' com ' + lp + ' pdl';

      await browser.close();
      return resultado;
}

async function roblist(){
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
  
      page.setDefaultNavigationTimeout(0)
      listaResul = ['neutro'];

      for (var i = 1; i < listadecornos.length; i++){
            nick = listadecornos[i];
            
            await page.goto(`https://www.leagueofgraphs.com/pt/summoner/br/${nick}`,{
                  waitUntil: 'load',
                  timeout:0
            });
      
            resultado = await page.evaluate(() => {
                  return $(".leagueTier").html();
            });

            lp = await page.evaluate(() => {
                  return $(".leaguePoints").html();
            });
      
            resultado = resultado.replace("\n                                    ","");
            resultado = resultado.replace("                                                                    ","");
      
            resultado = resultado +' com ' + lp + ' pdl';
            console.log(resultado);
            
            listaResul.push(resultado);
            
            //});

      }
      await browser.close();
      return listaResul;
}


Mapbot.on('ready', () => {
    console.log('To on!!');

});

Mapbot.on('message', message => {
let responseObject = {
    "?ta on?" : "ta on!!",
    "?twitter" : "https://twitter.com/Maaalpe",
    "?lol" : "meu nick no lol é Mapeal"
};

if(responseObject[message.content]){
    message.channel.send(responseObject[message.content]);
}
});



Mapbot.on('message',async(msg) => {
    if (msg.author.bot){
          return;
    }

else if (msg.content.toLowerCase().startsWith("?rank ")) {
      let nome = msg.content.toLowerCase().replace('?rank ', '');
      if (nome != ''){

      msg.channel.send("carregando...");
      tudo = await robo(nome);
      msg.channel.send(`O rank de ${nome} é: ${tudo}`);


}else{
      msg.channel.send('Coloque um nome valido!');

}
}

else if (msg.content.toLowerCase().startsWith("?add ")){
      let corno = msg.content.toLowerCase().replace('?add ', '');
      listadecornos.push(corno);
      msg.channel.send('jogador adicionado com sucesso!!!');
      console.log(listadecornos);

}
else if (msg.content.toLowerCase().startsWith("?remove ")){
      let cornoFora = msg.content.toLowerCase().replace('?remove ', '');
      var indice = listadecornos.indexOf(cornoFora);

      if (indice == 0){
            msg.channel.send('jogador nao adicionado a lista.');
            
      }else{
            while(indice >=0){
                  listadecornos.splice(indice,1);
                  indice = listadecornos.indexOf(cornoFora);
            }
            msg.channel.send('Corno retirado com sucesso!!!');
            console.log(listadecornos);
}
}
else if (msg.content.toLowerCase().startsWith('?all')){
            msg.channel.send('Carregando...');
            allt = await roblist();
            for (var i = 1; i < allt.length; i++){
                  msg.channel.send(`O rank de ${listadecornos[i]} é: ${allt[i]}`);
            }
}

else if  (msg.content === '?leave'){
      if (msg.member.voice.channel){ 
            msg.member.voice.channel.leave();
            estouPronto = false;
      } else {
            msg.channel.send('Você precisa estar conectado a um Canal de Voz!');
      }
}


})


Mapbot.login(token);







