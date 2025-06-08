import { Client, Account } from "appwrite";

export const client = new Client();

client.setEndpoint("https://fra.cloud.appwrite.io/v1").setProject("683de3de001dff5d5403"); // Replace with your project ID

export const account = new Account(client);
export { ID } from "appwrite";
