import { Alert } from "react-native";
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

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email.trim(),
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email.trim(),
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(
      email.trim(),
      password
    );
    console.log("Appwrite", email, password);
    return session;
  } catch (error) {
    Alert.alert("Error", error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentAccount) throw Error;

    return user.documents[0];
  } catch (error) {
    throw new Error(error);
    console.log(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log("get File Preview", error);
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  // re-construct the file in a way which appwrite accepts
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    //  Then appWrite will give you a url

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    console.log("upload File", error);

    throw new Error(error);
  }
};

export const postFeed = async (form) => {
  const minutes = parseInt(form.minutes, 10);
  const calory = parseInt(form.calory, 10);
  console.log(form);
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);
    // We used "Promised.all()" because we don't need to resolve each one after another, instead we want to start uploading both files at the same time

    // After you upload the video on appwrite storage and the appwrite gave you the url of thumbnail and video, store the urls on the database

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.feedCollectionId,
      ID.unique(),
      {
        category: form.category,
        title: form.title,
        description: form.description,
        minutes: minutes,
        calory: calory,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    console.log("postFeed", error);
    throw new Error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.feedCollectionId,
      [Query.orderDesc("$createdAt")] // sort by date
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllBreakfastPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.feedCollectionId,
      [Query.orderDesc("$createdAt"), Query.equal("category", "Breakfast")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};


export const getAllLunchPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.feedCollectionId,
      [Query.orderDesc("$createdAt"), Query.equal("category", "Lunch")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllDinnerPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.feedCollectionId,
      [Query.orderDesc("$createdAt"), Query.equal("category", "Dinner")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};
