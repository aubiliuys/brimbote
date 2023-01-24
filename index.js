const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

const qrcode = require('qrcode-terminal');

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
client.on('message', message => {
	if(message.body === '.menu') {
		message.reply(`
*Termikasih sudah menggunakan BRIMBOT*
            
*(Tagall)*
Cmd:.tagall 
Menandai semua member. 

*(Sticker)*
Cmd:.s
mengubah foto/video menjadi sticker

*(Dall-E)*
Cmd:.img
Membuat gambar dari teks

*(ChatGPT)*
Cmd:.ai
Tanyakan apa saja kepada AI. 
`);
	}
});
client.on('message', async (msg) => {
    if(msg.body === '.tagall') {
        const chat = await msg.getChat();
        
        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
        }

        await chat.sendMessage(text, { mentions });
    }
});
client.on('message', async msg => {
    if(msg.body.startsWith('.s') && (msg.hasMedia))
    {const media = await msg.downloadMedia();
        // do something with the media data here
        client.sendMessage(msg.from, media, {sendMediaAsSticker: true});  
      }
});