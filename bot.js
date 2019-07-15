const Discord = require('discord.js'); // biblioteca do discord vc dever instalar para isso digite no console npm i discord.js --save
const client = new Discord.Client();
const fs = require('fs'); // biblioteca fs mesma coisa do de cima vc deverar instalar para isso digite no console npm i fs --save
const config = require("./config.json"); // Aqui irá pegar as coisas que está na sua config como o prefix e o token do bot


client.on("ready", () => {
    console.log('Bot iniciado com ' + client.users.size + ' usuários, em ' + client.channels.size + ' canais de ' + client.guilds.size + ' servidores.'); // Aqui mostra a quantidade de usuarios , canais e servidores que o bot está
    const activity = [
                        {name: `Satus do bot aqui vc colocar oque vc quiser `, type: 0 }]

    setInterval(function() {
        let random = Math.floor(Math.random() * activity.length)
        client.user.setPresence({game: activity[random]})
    }, 15000)
})


client.on('message', async message => {
  
  if (message.author.bot || message.channel.type == "DM") { // Aqui e para o bot não responder outros bot e não responde mensage no privado
    return;
} 

  if (!message.content.startsWith(config.prefix)) return    
    
  const args = message.content.slice(config.prefix.length).trim()
  .split(/ +/g)
  const command = args.shift().toLowerCase()
    
  fs.readdir('./commands', (err, files) => {
      if (err) console.log(err)
        
      let jsfile = files.filter(f => f.split('.').pop() === 'js')
      //console.log(jsfile)
      if (jsfile.length <= 0) {
          console.log('Comando não encontrado :c')
          return
      }
      jsfile.forEach((f) => {         
          let pull = require(`./commands/${f}`)
          //console.log(`${f} loaded`)
          if (pull.config.aliases.includes(command)) pull.run(client, message, args, config, ops)
        })
    }) 
})


client.login(config.token)
