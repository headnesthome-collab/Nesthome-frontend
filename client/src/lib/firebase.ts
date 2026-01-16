import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove, update } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";

// Firebase Configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: `https://${import.meta.env.VITE_FIREBASE_PROJECT_ID}-default-rtdb.asia-southeast1.firebasedatabase.app`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app: any;
let database: any;
let auth: any;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  auth = getAuth(app);
  
  // Sign in anonymously for demo
  signInAnonymously(auth).catch(err => console.log("Auth error:", err));
  console.log("✅ Firebase Initialized");
} catch (error) {
  console.warn("Firebase initialization warning:", error);
}

export interface Lead {
  id: string;
  name: string;
  mobile: string;
  city: string;
  timeline: string;
  submittedAt: string;
  status: string;
}

// Save lead to Firebase
export const saveLead = async (leadData: Omit<Lead, 'id' | 'submittedAt' | 'status'>): Promise<string> => {
  try {
    if (!database) throw new Error("Firebase not initialized");
    
    const leadsRef = ref(database, "leads");
    const newLead = {
      ...leadData,
      submittedAt: new Date().toISOString(),
      status: "New"
    };
    
    const result = await push(leadsRef, newLead);
    console.log("✅ Lead saved to Firebase:", result.key);
    
    // Also sync to Google Sheets if available
    const fullLead: Lead = {
      id: result.key || crypto.randomUUID(),
      ...newLead
    };
    syncToGoogleSheets(fullLead);
    
    return result.key || "";
  } catch (error) {
    console.error("Error saving lead:", error);
    throw error;
  }
};

// Get all leads from Firebase
export const getLeads = (callback: (leads: (Lead & { firebaseId: string })[]) => void) => {
  try {
    if (!database) {
      callback([]);
      return;
    }
    
    const leadsRef = ref(database, "leads");
    
    const unsubscribe = onValue(leadsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const leadsArray = Object.entries(data).map(([key, value]: [string, any]) => ({
          firebaseId: key,
          id: key,
          ...value
        }));
        callback(leadsArray);
      } else {
        callback([]);
      }
    }, (error) => {
      console.error("Error getting leads:", error);
      callback([]);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error("Error in getLeads:", error);
    callback([]);
  }
};

// Delete lead from Firebase
export const deleteLead = async (firebaseId: string): Promise<void> => {
  try {
    if (!database) throw new Error("Firebase not initialized");
    const leadRef = ref(database, `leads/${firebaseId}`);
    await remove(leadRef);
    console.log("✅ Lead deleted from Firebase");
  } catch (error) {
    console.error("Error deleting lead:", error);
    throw error;
  }
};

// Update lead status in Firebase
export const updateLeadStatus = async (firebaseId: string, status: string): Promise<void> => {
  try {
    if (!database) throw new Error("Firebase not initialized");
    const leadRef = ref(database, `leads/${firebaseId}`);
    await update(leadRef, { status });
    console.log("✅ Lead status updated");
  } catch (error) {
    console.error("Error updating lead:", error);
    throw error;
  }
};

// Sync to Google Sheets
export const syncToGoogleSheets = async (lead: Lead) => {
  try {
    // This sends data to a Google Apps Script webhook that inserts into Google Sheets
    // You'll set this up separately
    const webhookUrl = localStorage.getItem("google_sheets_webhook");
    
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        body: JSON.stringify(lead)
      });
      console.log("✅ Synced to Google Sheets");
    }
  } catch (error) {
    console.error("Google Sheets sync warning:", error);
    // Don't fail if Google Sheets sync fails
  }
};
