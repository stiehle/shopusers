const sdk = require("node-appwrite");

// const { Client, Databases } = require('node-appwrite');

// This Appwrite function will be executed every time your function is triggered
module.exports = async ({ req, res, log, error }) => {
  // export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service

  // The code defines an asynchronous default export function, designed to be used as a serverless function or API endpoint,
  // likely within an Appwrite Cloud Function environment.
  // It receives an object containing `req`, `res`, `log`, and `error`—these represent the request and response objects,
  // as well as logging utilities provided by the platform.

  const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers["x-appwrite-key"] ?? "")
    .setSession(""); // The user session to authenticate with

  const account = new sdk.Account(client);

  const result = await account.create(
    sdk.ID.unique(),
    "hallo@example.com", // email
    "testtest123", // password
    "Hallo Hallo" // name (optional))
  );

  const user = await account.get();
  log("User ID:, User Name:", user.$id, user.name); // Log the user ID for reference

  log("User Created:", result);
  return result;
};
