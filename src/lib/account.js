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
  log("Account", account);
  const sessions = await account.getSession("current");
  log("Sessions:", sessions);
  // const result = await account.createAnonymousSession();
  // log("Anonymous Session Created:", result);

  // try {
  //   const result = await account.createAnonymousSession();
  //   const user = await account.get(); // Get the current user information

  //   log("User Info:", user);
  //   log("Anonymous Session Created:", result);

  //   // Log messages and errors to the Appwrite Console
  // } catch (err) {
  //   error("Could not list users: " + err.message);
  // }
};
