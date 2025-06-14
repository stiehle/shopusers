const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client();
  client
    .setEndpoint("https://fra.cloud.appwrite.io/v1") // Dein Appwrite Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Dein Projekt-ID
    .setKey(process.env.APPWRITE_API_KEY); // Dein API-Schlüssel (Environment Variable)

  const users = new sdk.Users(client);

  // Das Event-Payload enthält Informationen über den neu erstellten Benutzer
  const user = req.payload;
  console.log("Received user payload:", user);
  const userId = users.$id; // Extrahiere die Benutzer-ID aus dem Payload
  console.log("User ID:", userId);

  // const userId = userId || req.query.userId; // Fallback auf userId aus der Query, falls nicht im Payload enthalten
  // const userId = userId;

  try {
    // Weise dem Benutzer das Label zu
    await users.updateLabels(userId, ["buyer01"]); // Ersetze 'dein_label_name'
    console.log(`Label 'dein_label_name' erfolgreich zu Benutzer ${userId} hinzugefügt.`);
    return res.json({ success: true, message: "Label added successfully" });
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Labels:", error);
    return res.json({ success: false, message: "Failed to add label", error: error.message }, 500);
  }
};
