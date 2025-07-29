exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { playerName, itemName } = JSON.parse(event.body || '{}');

    if (!playerName || !itemName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'กรุณาระบุ playerName และ itemName' }),
      };
    }

    // 🔥 ส่งคำสั่งไปที่ Roblox ผ่าน webhook
    const webhookUrl = 'https://your-roblox-api-webhook.url'; // <-- ใส่ URL จาก Roblox HttpService

    const axios = require('axios');
    await axios.post(webhookUrl, {
      playerName,
      itemName
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `คำสั่งเสก ${itemName} ให้ ${playerName} ถูกส่งไปยัง Roblox แล้ว`
      })
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'เซิร์ฟเวอร์ Netlify มีปัญหา' }),
    };
  }
};
