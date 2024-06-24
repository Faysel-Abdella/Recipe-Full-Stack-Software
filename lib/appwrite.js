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
  // This object contains the necessary configuration for the Appwrite SDK
  endpoint: "https://cloud.appwrite.io/v1",
  // The endpoint of the Appwrite server
  platform: "com.astu.recipe",
  // The platform or bundle ID of the application
  projectId: "665e9d22000cc6f0afbd",
  // The ID of the Appwrite project
  databaseId: "665e9db8000dba43300d",
  // The ID of the Appwrite database
  userCollectionId: "665e9dd1001212055411",
  // The ID of the user collection in the database
  feedCollectionId: "665ea0eb0017e7aa660d",
  // The ID of the feed collection in the database
  storageId: "665ea55200227893d922",
  // The ID of the Appwrite storage
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Set the Appwrite endpoint
  .setProject(appwriteConfig.projectId)  // Set the Appwrite project ID
  .setPlatform(appwriteConfig.platform);  // Set the application platform or bundle ID

// Create instances of various Appwrite services
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Function to create a new user
export const createUser = async (email, password, username) => {
  try {
    // Create a new Appwrite account
    const newAccount = await account.create(
      ID.unique(),
      email.trim(),
      password,
      username
    );

    // If the account creation is unsuccessful, throw an error
    if (!newAccount) throw Error;

    // Get the avatar URL for the user
    const avatarUrl = avatars.getInitials(username);

    // Sign in the newly created user
    await signIn(email, password);

    // Create a new user document in the Appwrite database
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

    // Return the newly created user document
    return newUser;
  } catch (error) {
    // If an error occurs, throw a new error with the error message
    throw new Error(error);
  }
};

// Function to sign in a user
export const signIn = async (email, password) => {
  try {
    // Create an email-password session for the user
    const session = await account.createEmailPasswordSession(
      email.trim(),
      password
    );

    // Return the session object
    return session;
  } catch (error) {
    Alert.alert("Error", error);
    console.log("signIn", error);
    // throw new Error(error);
  }
};

// Function to get the currently signed-in user
export const getCurrentUser = async () => {
  try {
    // Get the current Appwrite account
    const currentAccount = await account.get();

    // If the current account is not found, throw an error
    if (!currentAccount) throw Error;

    // Retrieve the user document from the database based on the account ID
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    // If the user document is not found, throw an error
    if (!currentAccount) throw Error;

    // Return the user document
    return user.documents[0];
  } catch (error) {
    // If an error occurs, throw a new error with the error message and log the error
    throw new Error(error);
    console.log(error);
  }
};

// Function to get the file preview URL
export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    // Determine the appropriate file preview URL based on the file type
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
      // If the file type is invalid, throw an error
      throw new Error("Invalid file type");
    }

    // If the file URL is not found, throw an error
    if (!fileUrl) throw Error;

    // Return the file preview URL
    return fileUrl;
  } catch (error) {
    console.log("get File Preview", error);
    throw new Error(error);
  }
};

// Function to upload a file
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
    // Upload the file to Appwrite storage
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    //  Then appWrite will give you a url

    // Get the file preview URL
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    // Return the file preview URL
    return fileUrl;
  } catch (error) {
    // If an error occurs, log the error and throw a new error with the error messag
    console.log("upload File", error);

    throw new Error(error);
  }
};

// Function to post a new feed
export const postFeed = async (form) => {
  // Convert the minutes and calory values to integers
  const minutes = parseInt(form.minutes, 10);
  const calory = parseInt(form.calory, 10);

  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);
    // We used "Promised.all()" because we don't need to resolve each one after another, instead we want to start uploading both files at the same time

    // After you upload the video on appwrite storage and the appwrite gave you the url of thumbnail and video, store the urls on the database

    // Create a new feed document in the Appwrite database
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

    // Return the newly created feed document
    return newPost;
  } catch (error) {
    // If an error occurs, log the error and throw a new error with the error message
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
// Function to get all the posts
export const getAllBreakfastPosts = async () => {
  try {
    // Retrieve all the feed documents from the database, sorted by descending creation date
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.feedCollectionId,
      [Query.orderDesc("$createdAt"), Query.equal("category", "Breakfast")]
    );

    //return posts
    return posts.documents;
  } catch (error) {
    // If an error occurs, throw a new error with the error message
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

    //return posts
    return posts.documents;
  } catch (error) {
    // If an error occurs, throw a new error with the error message
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

    //return posts
    return posts.documents;
  } catch (error) {
    // If an error occurs, throw a new error with the error message
    
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    // If an error occurs, throw a new error with the error message
    throw new Error(error);
  }
};
