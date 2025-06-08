import React, { useState } from "react";
import { client, account, ID } from "./lib/appwrite";
import { Databases } from "appwrite";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function login(email, password) {
    await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
  }

  async function listData() {
    const databases = new Databases(client);
    const result = await databases.listDocuments(
      "6841d9ab001d7232992b", // databaseId
      "6841da090002941f77e4", // collectionId
      [] // queries (optional)
    );

    console.log(result);
  }

  return (
    <div>
      <p>{loggedInUser ? `Logged in as ${loggedInUser.name}` : "Not logged in"}</p>

      <form>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

        <button type="button" onClick={() => login(email, password)}>
          Login
        </button>

        <button
          type="button"
          onClick={async () => {
            await account.create(ID.unique(), email, password, name);
            login(email, password);
          }}>
          Register
        </button>
        <button
          type="button"
          onClick={async () => {
            await listData();
          }}>
          Show Data
        </button>

        <button
          type="button"
          onClick={async () => {
            await account.deleteSession("current");
            setLoggedInUser(null);
          }}>
          Logout
        </button>
      </form>
    </div>
  );
};

export default App;
