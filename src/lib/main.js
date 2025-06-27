// import { Client, Users } from "node-appwrite";
const { Client, Users, Account } = require("node-appwrite");

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

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers["x-appwrite-key"] ?? "");
  // .setKey(process.env.APPWRITE_TESTKEY); // Dein API-Schlüssel (Environment Variable)
  // .setKey(process.env.APPWRITE_API_KEY); // Dein API-Schlüssel (Environment Variable)

  const users = new Users(client);
  log("Users", users);

  try {
    const response = await users.list();
    // Log messages and errors to the Appwrite Console
    // These logs won't be seen by your end users
    log(`Total users: ${response.total} ${response.users.map((user) => user.name).join(", ")}`);
    // log("User IDs:", response.users.map((user) => user.$id).join(", "));
    log(
      "User IDs:",
      response.users.map((user) => {
        return {
          id: user.$id,
          name: user.name,
          email: user.email,
          label: user.labels ? user.labels.join(", ") : "No labels",
          registration: user.registration,
          status: user.status,
          prefs: user.prefs ? JSON.stringify(user.prefs) : "No preferences",
          phone: user.phone ? user.phone.number : "No phone number",
          phoneVerified: user.phone ? user.phone.verified : "Phone not verified",
          emailVerified: user.emailVerification ? "Email verified" : "Email not verified",
        };
      })
    );
  } catch (err) {
    error("Could not list users: " + err.message);
  }

  try {
    const allUsers = await users.list();

    allUsers.users.map((user) => {
      // user.labels.push(["buyer", "newUser"]);
      log(`User ID: ${user.$id}, Labels: ${user.labels.join(", ")}`);

      if (user.labels === null || user.labels.length === 0) {
        // user.labels = ["buyer", "newUser"];
        const newLabels = ["buyer", "newUser"];
        // user.labels.push(["buyer", "newUser"]); // Ensure at least one label exists
        users.updateLabels(user.$id, newLabels);
        log(`Updated User ID: ${user.$id}, New Labels: ${newLabels.join(", ")}`);
      }

      // return user;
      //  log(user);
    });

    // return res.json(allUsers);
    // log(res.json(allUsers));
    // If the user is not found, an error will be thrown
  } catch (err) {
    error("Could not get user: " + err.message);
  }

  // try {
  //   const user = new Users(client);

  //   const result2 = await user.get();

  //   log("result2:", result2);

  //   // log(`Logged in user: ${result.name} (${result.$id})`);
  // } catch (err) {
  //   error("Could not get logged user: " + err.message);
  // }

  // The req object contains the request data
  if (req.path === "/ping") {
    // Use res object to respond with text(), json(), or binary()
    // Don't forget to return a response!
    return res.text("Pong");
  }

  return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
};
