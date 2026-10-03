module.exports = function handler(req, res) {
  res.status(200).json({
    service: "Bestow IT Services WhatsApp notification",
    status: "online",
    configured: Boolean(
      process.env.WHATSAPP_ACCESS_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID &&
      process.env.WHATSAPP_RECIPIENT &&
      process.env.WHATSAPP_GRAPH_VERSION
    )
  });
};
