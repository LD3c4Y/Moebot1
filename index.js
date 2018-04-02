//Versión 0.050

const Discord = require("discord.js");
const  client = new Discord.Client();
const config = require("./config.json");
const ytdl = require('ytdl-core');  
const search = require('youtube-search');

client.on("ready", () => {
    console.log(`My body is ready, conectado en ${client.guilds.size} servidores y  ${client.users.size} usuarios.`);
    client.user.setPresence( {
        status: "online",
        game: {
            name: `D3c4Y es mi sempai <3`,
            type: "PLAYING"
        }
     });
 });


var prefix = config.prefix; //variable



client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix)) return;
  if (message.author.bot) return;
  
  if (message.content.startsWith(prefix +"hola")) {
    message.channel.send("Hola que tal?");
  }

  if (message.content == 'Hice mierda todo') {
    message.channel.sendMessage ('Yo también.');
  }

  if (message.content == 'hice mierda todo') {
    message.channel.sendMessage ('Yo también.');
  }


  if (message.content.startsWith(prefix +"botinfo")){
    const embed = new Discord.RichEmbed() 
    .setTitle("Información del bot")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0x00AE86)
    .setDescription("Aquí se encuentra toda la información respecto al bot")
    .setFooter("Versión 0.050 (Developer version)", client.user.avatarURL)
    .setImage(message.author.avatarURL)
    .setThumbnail(message.author.avatarURL)
    .setTimestamp()
    .setURL("https://discordapp.com/oauth2/authorize?&client_id=408072718374928394&scope=bot")
    .addField("información principal", 
      'Programador: LD3c4Y\n'+
      'nombre: MoeBot\n'+
      'Versión del bot: 0.050 (Developer version)\n'+
      'Redes sociales:\n'+
      'Twitter: https://twitter.com/TrueD3C4Y \n Youtube: N/A \n Discord: D3c4Y#7716\n'+
      'Ayudantes:\n (No hay ppl, so sadddddessssttt)')
    .addField("Prefix", "Para el uso de comandos es necesario usar el prefix ';' ", true)
    .addBlankField(true)
    .addField("Campo vacío", "Ya veré que agrego con el tiempo xd", true);
    
    message.channel.send({embed});

}

//separador

const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
        
let permiso = message.member.hasPermission("ADMINISTRATOR");

//separador
if(command === 'kick' ){

    let user = message.mentions.users.first();
    let razon = args.slice(1).join(' ');
    
    if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
    if (!razon) return message.channel.send('Escriba una razón, `-kick @username [razón]`');
    if (!message.guild.member(user).kickable) return message.reply('Expulsar a ese usuario está fuera de mis posibilidades. Favor de subirme de nivel.');
     
    message.guild.member(user).kick(razon);
    message.channel.send(`**${user.username}**, fue echado del servidor, razón: ${razon}.`);

}
//separador

//separador

if(command === 'avatar'){

    let img = message.mentions.users.first()
    if (!img) {

        const embed = new Discord.RichEmbed()
        .setImage(`${message.author.avatarURL}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
        message.channel.send({ embed });

    } else if (img.avatarURL === null) {

        message.channel.sendMessage("El usuario ("+ img.username +") no tiene avatar!");

    } else {

        const embed = new Discord.RichEmbed()
        .setImage(`${img.avatarURL}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
        message.channel.send({ embed });

    };

}

//separador

if (command === 'ping') {

    let mensajes = Date.now() - message.createdTimestamp;
    let ping = Math.floor(message.client.ping);
    
    message.channel.send(":ping_pong: Pong!")
      .then(m => {

          m.edit(`:incoming_envelope: Ping Mensajes: \`${Math.floor(mensajes/100)} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);
      
      });
    
  }

  //separador

  if (command === 'userinfo') {

  let color = {
    "online": "#00c903",
    "idle": "#ff9a00",
    "dnd": "#ff0000",
    "offline": "#d8d8d8"
};
let estados = {
    "online": "En Línea",
    "idle": "Ausente",
    "dnd": "No molestar",
    "offline": "Desconectado/invisible"
};

let user = message.mentions.users.first();
if(!user) return message.reply(`¡Mencione a un usuario!`);

const embed = new Discord.RichEmbed()
  .setColor(color[user.presence.status])
  .addField(`Estado de ${user.username}`, `${estados[user.presence.status]}`)

message.channel.send({embed});
//separador
if(command === 'ban'){
    
    let user = message.mentions.users.first();
    let razon = args.slice(1).join(' ');

    if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
    if(!razon) return message.channel.send('Escriba un razón, `-ban @username [razón]`');
    if (!message.guild.member(user).bannable) return message.reply('Banear a ese usuario está fuera de mis posibilidades. ¡Necesito más maná!');
    

    message.guild.member(user).ban(razon);
    message.channel.send(`**${user.username}**, fue baneado del servidor, razón: ${razon}.`);

}
  }
//separador
if(command === 'server'){

    var server = message.guild;
  
    const embed = new Discord.RichEmbed()
    .setThumbnail(server.iconURL)
    .setAuthor(server.name, server.iconURL)
    .addField('ID', server.id, true)
    .addField('Region', server.region, true)
    .addField('Creado el', server.joinedAt.toDateString(), true)
    .addField('Dueño del Servidor', server.owner.user.username+'#'+server.owner.user.discriminator+' ('+server.owner.user.id +')', true)
    .addField('Miembros', server.memberCount, true)
    .addField('Roles', server.roles.size, true)
    .setColor(0x66b3ff)
    
   message.channel.send({ embed });

  }
//separador
if(command === 'user'){
    let userm = message.mentions.users.first()
    if(!userm){
      var user = message.author;
      
        const embed = new Discord.RichEmbed()
        .setThumbnail(user.avatarURL)
        .setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
        .addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
        .addField('ID', user.id, true)
        .addField('Estado', user.presence.status, true)
        .addField('Apodo', message.member.nickname, true)
        .addField('Cuenta Creada', user.createdAt.toDateString(), true)
        .addField('Fecha de Ingreso', message.member.joinedAt.toDateString())
        .addField('Roles', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
        .setColor(0x66b3ff)
        
       message.channel.send({ embed });
    }else{
      const embed = new Discord.RichEmbed()
      .setThumbnail(userm.avatarURL)
      .setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL)
      .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
      .addField('ID', userm.id, true)
      .addField('Estado', userm.presence.status, true)
      .addField('Cuenta Creada', userm.createdAt.toDateString(), true)
      .setColor(0x66b3ff)
      
     message.channel.send({ embed });
    }
    
  }


//separador
//separador

if (command === 'quiz') {

    if(!args) return message.channel.send('Agrege una pregunta para la encuesta.')
    
    const embed = new Discord.RichEmbed()
          .setAuthor('Pregunta:')
          .setDescription('**'+args+'**\n▔▔▔▔▔▔▔▔▔▔▔')
          .addField('Opcion 1', '1\u20e3 Si')
          .addField('Opcion 2', '2\u20e3 No')
          .setColor(0xff4d4d)
          .setTimestamp()
    
    message.channel.send({embed})
    .then(m => {
            m.react("1\u20e3");
            m.react("2\u20e3");
    
    });
    }
    //separador
    if (command === 'leave') { 
      let Canalvoz = message.member.voiceChannel;
      if (!Canalvoz) {
          message.channel.send('No estoy en un canal de voz. **¿Seguro que estoy dentro de uno?** :thinking:');
      } else {
          message.channel.send('Vale, ya me salgo.').then(() => {
          Canalvoz.leave();
          }).catch(error => message.channel.send(error));
      }   
  }
   
    //separador
     
    if(message.content.startsWith(prefix + 'changelog')){
    
      message.channel.send('**'+message.author.username+'**, Revisa tus mensajes privados.');
      message.author.send({embed: {
      color: 3447003,
      author: {
          name: client.user.username,
      },
      title: "Registro de versión | MoeBot",
      url: "https://discordapp.com/oauth2/authorize?&client_id=430118446261338112&scope=bot",
      description: "Esto es un breve registro de cambios realizados en el BOT.",
      fields: [{
          name: "Cambios más importantes:",
          value: "·Alto palo describir. salu2.\n"+
          "· \n"+
          "· \n"+
          "· \n"+
          "· \n"+
          "· \n"+
          "· \n"+
          "· \n"+
          "· \n"+
          "· \n"
      },
      ],
      timestamp: new Date(),
          footer: {
              icon_url: client.user.avatarURL,
              text: "Moe Bot v.0.050 (Developer version)"
          }   
      }
  });
}

//separador

if(message.content.startsWith(config.prefix + 'eval')){
  if(message.author.id !== '270644619165958162') return;
  try {
    var code = args;
    var evalued = eval(code);

    if (typeof evalued !== "string")
      evalued = require("util").inspect(evalued);

   message.channel.sendCode("x1", evalued);
  } catch(err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
  }
  
}

  //separador

  
  //separador

//separador

if (message.content === prefix +"guilds"){ 
    
  if(message.author.id !== config.IdOwner) return; 
      message.react('\u2705');
     
  message.channel.send("❯ Lista Servidores "+" ["+client.guilds.size+"] \n\n" + client.guilds.map(nom =>"** • "+ nom.name+ "** ").join(' \n'));
}

//separador


//separador
                                                                                            //comando help
                                                                                        //me gusta así esto
                                                                                    //así resalta más
                                                                                //es el comando más importante
                                                                            //lol
                                                                                    

                                                                            



 if(message.content.startsWith(prefix + 'help')){

  message.channel.send('**¡COMANDOS DE LA MEJOR WAIFU-BOT DE TODOS!**\n\n'+
'            :shield: **Administración** :shield:\n\n'+
                       '-> '+prefix+'ping            :: Comprueba la latencia del bot y de tus mensajes.\n'+
                      '-> '+prefix+'avatar <@user>  :: Muestra el avatar de un usuario.\n'+
                        '-> '+prefix+'user <@user>    :: Muestra información sobre un usuario mencioando.\n'+
                       '-> '+prefix+'server          :: Muestra información de un servidor determinado.\n'+
                       '-> '+prefix+'ban <@user>     :: Banear a un usuario del servidor incluye razon.\n'+
                     '-> '+prefix+'kick <@user>    :: Patear a un usuario del servidor incluye razon.\n\n'+
'       :file_folder: **Miscelanea** :file_folder:\n\n'+
                     '-> '+prefix+'botinfo         :: Muestra la información del bot.\n\n'+
                        '-> '+prefix+'userinfo <@user>:: Muestra el estado de un usuario.\n'+
                        '-> '+prefix+'changelog       :: Te muestra las novedades de las actualizaciones.\n'+
                       '-> '+prefix+'quiz[Mensaje]   :: Añade un formulario, ¿Qué? ¡Simple!\n'+
                       '-> '+prefix+'quiz[Mensaje]   :: Añade un formulario, ¿Qué? ¡Simple!\n'+
                      '-> '+prefix+'quiz[Mensaje]   :: Añade un formulario, ¿Qué? ¡Simple!\n'+
                      '-> '+prefix+'quiz[Mensaje]   :: Añade un formulario, ¿Qué? ¡Simple!\n\n'+
'      :musical_note: **Comandos para el bot de música** :musical_note:\n\n'+

                        '-> ' +prefix+'play           :: Reproduce música en un canal de audio. ¡Recuerda estar en uno antes de colocar este comando!\n'+
                        '-> ' +prefix+'join           :: Arrastra al bot a unirse a un canal de voz. Tú tienes el poder; ella (o él) es tu onii-chan.\n'+
                       '-> ' +prefix+'leave          :: Saca al bot del canal de audio. Shu shu.\n\n'+
                                       
                        '**Algún día añadiré más comandos...Y cuando eso suceda, Half life 3 será confirmado.\n')
  

}
    
//separador

client.on("guildMemberAdd", (member) => {
    console.log(`El héroe del tiempo:  ${member.user.username} , ha venido a salvarnos en ${member.guild.name}.`);
    var canal = client.channels.get('423245982386618381'); 
    canal.send(`${member.user}, Ha venido a salvarnos!`);
    
 });

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

let servidoresgrandes = client.guilds.filter(g => g.memberCount > 100);
const servernombres = client.guilds.map(g => g.name).join("\n");
const tags  =  client.users.map(u =>  `${u.username}#${u.discriminator}`).join(", ");
const serverpequeños = client.guilds.filter(g => g.memberCount < 10).map(g => g.name).join("\n");



//separador

if (message.content.startsWith(prefix + 'join')) {
    console.log(message.author.username + ' Ha usado ;join en ' + message.channel.name + ' servidor ' + message.guild.name);
    let Canalvoz = message.member.voiceChannel;
    if (!Canalvoz || Canalvoz.type !== 'voice') {
    message.channel.send('¡Necesitas unirte a un canal de voz primero!').catch(error => message.channel.send(error));
    }
     Canalvoz.leave()
     message.channel.send('Conectando...').then(m => {
          Canalvoz.join().then(() => {
               m.edit(':white_check_mark: | Conectado exitosamente.').catch(error => message.channel.send(error));
         }).catch(error => message.channel.send(error));
     }).catch(error => message.channel.send(error));
  };

  //separador

  if (message.content.startsWith(prefix + 'play')) {
    console.log(message.author.username + ' Ha usado p?play en ' + message.channel.name + ' servidor ' + message.guild.name);

    
     search(args, {
                 maxResults: 1,
                 key: 'AIzaSyDwzQKS-5BQq1jFOEtw6XTfU3BdNLts5f8'
             },(err, res) => {
            //Si hay error o no se encontraron resultado de la busqueda
            if (err) return message.channel.send("Algo salió mal...Trata de haber colocado todo en orden :thinking: ");
            if (!res[0]) return message.channel.send("Sin resultados.");
            
            //Obtiene el link de la busqueda
            let url  = res[0].link;
            
  
            let voiceChannel = message.member.voiceChannel;
            voiceChannel.leave();
            voiceChannel.join()
              .then(connection => {
                const url = ytdl(res[0].link, { filter : 'audioonly' });
                const dispatcher = connection.playStream(url);
              });
  
        message.channel.send('Reproduciendo ahora: '+ url);
        message.delete();
  })
  }
//separador

const sql = require("sqlite");
sql.open("./score.sqlite");

 sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    } else {
      let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
        message.reply(`**${curLevel}** Ha subido de nivel... ¡Creo que está por evolucionar!`);
      }
      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    });
  });

  if (message.content === config.prefix) return;

  if (message.content.startsWith(config.prefix + "level")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply(":no_entry_sign: **|** You dont have right now level, but your level are **0**.");
      message.reply(`Tu nivel actual es **${row.level}**`);
    });
  } else

  if (message.content.startsWith(config.prefix + "points")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply(" AAAAAH, ¡no tienes puntos! ;-; No hay problema, ¡escribe para ganar!");
      message.reply(`💻 **|** Tienes **${row.points}** puntos...Sigue spameando!`);
    });
  }

//separador
 
if (message.content.startsWith(prefix + 'skip')) {

if(message.server.owner.id == message.author.id || message.author.id == config.owner_id || config.admins.indexOf(message.author.id) != -1 || message.server.permissionsOf(message.author).hasPermission('MANAGE_SERVER')){
      let player = bot.voiceConnections.get('server', message.server);
      if(!player || !player.playing) return bot.sendMessage(message, 'El bot no está reproduciendo nada :c');
      player.stopPlaying()
      bot.sendMessage(message, 'Salto salto...');
    }else{
      bot.sendMessage(message, 'Solo el sempai puede tocar ahí :c');
    }
  }

//separador



//separador



//separador

}); //cierre

//acá ya no se agrega nada. Vuelve arriba.

client.login(process.env.BOT_TOKEN);
