exports.handler = async function(event, context) {
  const { playerName, itemName } = JSON.parse(event.body || '{}');

  if (!playerName || !itemName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'กรอกชื่อผู้เล่นและชื่อไอเท็มให้ครบ' })
    };
  }

  try {
    const response = await fetch('https://webhook-url.roblox-game.com/spawn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerName, itemName })
    });

    if (!response.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'ส่งคำสั่งไป Roblox ไม่สำเร็จ' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `เสก ${itemName} ให้ ${playerName} สำเร็จ` })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'เกิดข้อผิดพลาดภายใน: ' + error.message })
    };
  }
};
