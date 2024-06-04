import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.astu.recipe",
  projectId: "665e9d22000cc6f0afbd",
  databaseId: "665e9db8000dba43300d",
  userCollectionId: "665e9dd1001212055411",
  feedCollectionId: "665ea0eb0017e7aa660d",
  storageId: "665ea55200227893d922",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
