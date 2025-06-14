import { Client, Users } from "node-appwrite";

export default async function (req, res) {
  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1") // Dein Appwrite Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Dein Projekt-ID
    .setKey(process.env.APPWRITE_API_KEY); // Dein API-Schlüssel (Environment Variable)

  const users = new Users(client);

  // Das Event-Payload enthält Informationen über den neu erstellten Benutzer
  const user = req.payload;
  const userId = user.$id;

  try {
    // Weise dem Benutzer das Label zu
    await users.updateLabels(userId, ["buyer01"]); // Ersetze 'dein_label_name'
    console.log(`Label 'dein_label_name' erfolgreich zu Benutzer ${userId} hinzugefügt.`);
    return res.json({ success: true, message: "Label added successfully" });
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Labels:", error);
    return res.json({ success: false, message: "Failed to add label", error: error.message }, 500);
  }
}
