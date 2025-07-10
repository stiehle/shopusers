import React, { useState } from "react";
import { client, account, ID } from "./lib/appwrite";
import { Databases, Permission, Role } from "appwrite";
import "./App.css";

// Import type models for Appwrite
import { type Models } from "appwrite";

interface data extends Models.Document {
  name: string;
  firstname: string;
  number: number;
  birthday: Date;
  street?: string;
  streetnumber?: string;
  city?: string;
  postalcode?: string;
  phonenumber?: string;
  userid: string;
}

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  async function login(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
  }

  async function listData() {
    setLoggedInUser(await account.get());

    const databases = new Databases(client);
    const response = await databases.listDocuments(
      "6841d9ab001d7232992b", // databaseId
      "6841da090002941f77e4", // collectionId
      [] // queries (optional)
    );
    const documents = response.documents as data[];

    console.log(documents, loggedInUser);
  }

  async function createUserDocument() {
    if (!loggedInUser) return;

    const databases = new Databases(client);
    await databases.createDocument(
      "6841d9ab001d7232992b", // databaseId
      "6841da090002941f77e4", // collectionId
      ID.unique(), // documentId
      {
        userid: `${loggedInUser.$id}`,
        name: `${loggedInUser.name}`,
        firstname: "Yes",
        birthday: new Date(),
        number: Math.floor(Math.random() * 1000),
        street: "Teststreet",
        streetnumber: "12-1",
        city: "Allmendingen",
        postalcode: "89604",
        phonenumber: "1234567890",
      } as data // document data
    );
  }

  async function upsertUserDocument() {
    if (!loggedInUser) return;

    const databases = new Databases(client);
    await databases.upsertDocument(
      "6841d9ab001d7232992b", // databaseId
      "6841da090002941f77e4", // collectionId
      "686fffbf001f2ba89352", // documentId (use a fixed ID for upsert)
      // ID.unique(), // documentId
      {
        userid: `${loggedInUser.$id}`,
        name: `${loggedInUser.name}`,
        firstname: "Upsert Yes",
        birthday: new Date(),
        number: Math.floor(Math.random() * 1000),
        street: "XTPowerstreet",
        streetnumber: "12-1",
        city: "Allmendingen",
        postalcode: "89604",
        phonenumber: "00001",
      } as data, // document data
      [
        Permission.read(Role.user(`${loggedInUser.$id}`)), // Only this user can read
        Permission.update(Role.user(`${loggedInUser.$id}`)), // Only this user can update
        Permission.delete(Role.user(`${loggedInUser.$id}`)), // Only this user can delete
      ]
    );
  }

  return (
    <div>
      <p>{loggedInUser ? `Logged in as ${loggedInUser.name} ID=${loggedInUser.$id}` : "Not logged in"}</p>

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
            await createUserDocument();
          }}>
          create Document
        </button>
        <button
          type="button"
          onClick={async () => {
            // await createUserDocument();
            await upsertUserDocument();
          }}>
          <i>upsert Document</i>
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
