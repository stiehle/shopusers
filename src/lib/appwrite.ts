import { Client, Databases, Account } from "appwrite";

export const client: Client = new Client();

client.setEndpoint("https://fra.cloud.appwrite.io/v1").setProject("683de3de001dff5d5403"); // Replace with your project ID

export const account: Account = new Account(client);
export const databases: Databases = new Databases(client);
export { ID } from "appwrite";
