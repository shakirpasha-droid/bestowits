/**
 * Bestow IT Services - WhatsApp AI conversation notification
 * Vercel Serverless Function.
 *
 * Required Vercel environment variables:
 * WHATSAPP_ACCESS_TOKEN      = Meta WhatsApp Cloud API token
 * WHATSAPP_PHONE_NUMBER_ID   = Meta registered sender phone-number ID
 * WHATSAPP_RECIPIENT         = destination number in international format, digits only
 * WHATSAPP_GRAPH_VERSION     = Graph API version, e.g. the version shown in Meta's dashboard
 *
 * IMPORTANT: Never put the access token in frontend JavaScript or GitHub.
 */

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "POST only." });
  }

  var token = process.env.WHATSAPP_ACCESS_TOKEN;
  var phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  var recipient = process.env.WHATSAPP_RECIPIENT;
  var graphVersion = process.env.WHATSAPP_GRAPH_VERSION;

  if (!token || !phoneNumberId || !recipient || !graphVersion) {
    return res.status(503).json({
      success: false,
      configured: false,
      message: "WhatsApp notification service is not configured yet."
    });
  }

  var body = req.body || {};
  var summary = String(body.summary || "").trim();
  var transcript = String(body.transcript || "").trim();
  var reason = String(body.reason || "completed").trim();
  var page = String(body.page || "").trim();

  if (!summary && !transcript) {
    return res.status(400).json({
      success: false,
      message: "Conversation content is required."
    });
  }

  // Keep the internal notification compact enough for a WhatsApp text message.
  var maxTranscript = 3000;
  if (transcript.length > maxTranscript) {
    transcript = transcript.slice(-maxTranscript);
    transcript = "[Earlier messages omitted for length.]\\n" + transcript;
  }

  var text =
    "🔔 Bestow IT Services - AI Chat\\n\\n" +
    "A website AI conversation has been completed.\\n" +
    "Reason: " + reason + "\\n" +
    (page ? "Page: " + page + "\\n" : "") +
    "\\n" +
    "SUMMARY\\n" + summary + "\\n\\n" +
    "CONVERSATION\\n" + (transcript || "No transcript available.");

  var url = "https://graph.facebook.com/" +
    encodeURIComponent(graphVersion) + "/" +
    encodeURIComponent(phoneNumberId) + "/messages";

  try {
    var response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient,
        type: "text",
        text: {
          preview_url: false,
          body: text
        }
      })
    });

    var result = await response.json().catch(function () { return {}; });

    if (!response.ok) {
      console.error("WhatsApp API error:", response.status, result);
      return res.status(502).json({
        success: false,
        configured: true,
        message: "WhatsApp API rejected the notification.",
        details: result.error ? result.error.message : undefined
      });
    }

    return res.status(200).json({
      success: true,
      configured: true,
      message_id: result.messages && result.messages[0] ? result.messages[0].id : null
    });
  } catch (error) {
    console.error("WhatsApp notification error:", error);
    return res.status(500).json({
      success: false,
      configured: true,
      message: "Unable to reach WhatsApp API."
    });
  }
};
