
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables, primarily for standalone script usage. Next.js loads .env automatically for its context.

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const projectId = process.env.FIREBASE_PROJECT_ID;

if (!admin.apps.length) {
  if (!serviceAccountPath) {
    console.error('Firebase Admin SDK Error: GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.');
    // Potentially throw an error or indicate that admin features will be unavailable
  } else if (!projectId) {
    console.error('Firebase Admin SDK Error: FIREBASE_PROJECT_ID environment variable is not set.');
    // Potentially throw an error
  }
  else {
    // Resolve path relative to project root if it starts with ./
    // process.cwd() gives the root directory from where the node process is started.
    const resolvedServiceAccountPath = serviceAccountPath.startsWith('./')
      ? path.resolve(process.cwd(), serviceAccountPath)
      : serviceAccountPath;

    try {
      // Check if the file exists before trying to read it
      if (!fs.existsSync(resolvedServiceAccountPath)) {
          console.warn(`Firebase Admin SDK Warning: Service account key file not found at ${resolvedServiceAccountPath}. 
          This is expected if running in an environment where credentials are provided via other means (e.g., GCP metadata service or JSON content in env var).
          Ensure GOOGLE_APPLICATION_CREDENTIALS points to a valid file path for local development if you intend to use a local key file.`);
          // Depending on the setup, you might not want to throw an error here,
          // as Firebase Admin SDK can be initialized by GOOGLE_APPLICATION_CREDENTIALS env var
          // holding the JSON content directly, or by Application Default Credentials in GCP.
          // For local dev with a file path, this indicates a problem.
      }
      
      // The Firebase Admin SDK can automatically pick up credentials if GOOGLE_APPLICATION_CREDENTIALS
      // is set to the path of the JSON file, OR if it contains the JSON content directly,
      // OR if running in a GCP environment with Application Default Credentials.
      // Explicitly reading and parsing the file is only one way and mainly for local file paths.
      // A more universal approach for `initializeApp` if GOOGLE_APPLICATION_CREDENTIALS is a path:
      const serviceAccount = JSON.parse(fs.readFileSync(resolvedServiceAccountPath, 'utf8'));
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${projectId}.firebaseio.com`,
        storageBucket: `${projectId}.appspot.com`
      });
      console.log('Firebase Admin SDK initialized successfully.');

    } catch (error: any) {
      console.error("Firebase Admin SDK initialization error:", error.message);
      if (error.code === 'ENOENT' && serviceAccountPath.startsWith('./')) {
         console.warn(`Could not find service account key at ${resolvedServiceAccountPath}. 
         Ensure the file exists at the project root and is named correctly, or GOOGLE_APPLICATION_CREDENTIALS is set appropriately for your environment. 
         Remember to add this file to .gitignore.`);
      } else if (error.message.includes("Invalid service account")) {
        console.error("The service account key file seems to be invalid. Please re-download it from the Firebase console.")
      }
      // Depending on strictness, might re-throw or have a fallback.
    }
  }
} else {
  // console.log('Firebase Admin SDK already initialized.');
}

// Export initialized services
// It's safer to export them this way to ensure they are accessed after potential initialization
export const getAdminAuth = () => admin.auth();
export const getAdminDb = () => admin.firestore();
export const getAdminStorage = () => admin.storage().bucket();
export const getAdminInstance = () => admin; // Export the admin instance itself if needed

// Direct exports might be attempted before initialization if module is top-level imported
// For safety, prefer using the getter functions or ensuring this module is imported
// only when admin features are needed and after environment is set up.
// However, for typical Next.js API route usage, direct export after init check is common.
export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
export const adminStorage = admin.storage().bucket();
