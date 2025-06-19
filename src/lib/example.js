const sdk = require("node-appwrite");

const client = new sdk.Client().setEndpoint("https://[YOUR_APPWRITE_ENDPOINT]/v1").setProject("[YOUR_PROJECT_ID]").setKey("[YOUR_API_KEY]");

const users = new sdk.Users(client);

const userId = "[USER_ID]";
const labelToAdd = "new_feature_access";

async function addLabelToUser(userId, label) {
  try {
    const user = await users.get(userId);
    const currentLabels = user.labels || []; // Aktuelle Labels abrufen

    if (!currentLabels.includes(label)) {
      // Nur hinzufügen, wenn es noch nicht existiert
      const updatedLabels = [...currentLabels, label];
      const response = await users.updateLabels(userId, updatedLabels);
      console.log("Labels aktualisiert:", response);
    } else {
      console.log("Label bereits vorhanden.");
    }
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Labels:", error);
  }
}

addLabelToUser(userId, labelToAdd);
