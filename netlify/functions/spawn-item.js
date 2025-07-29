// netlify/functions/spawn-item.js
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
        body: JSON.stringify({ error: 'ต้องกรอก playerName และ itemName' }),
      };
    }

    // --- ตรงนี้จำลองการเรียก Roblox HttpService ---
    // คุณสามารถใช้ Webhook หรือระบบของคุณรับ HTTP นี้ใน Roblox

    console.log(`เสกของ ${itemName} ให้ ${playerName}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `เสกของ ${itemName} ให้ผู้เล่น ${playerName} แล้ว!`
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'เซิร์ฟเวอร์มีปัญหา' }),
    };
  }
};
