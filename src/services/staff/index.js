import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const staffService = {
  async getStaff() {
    try {
      const querySnapshot = await getDocs(collection(db, "staff"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting staff:", error);
      throw error;
    }
  },

  async addStaff(staffData) {
    try {
      const docRef = await addDoc(collection(db, "staff"), staffData);
      return { id: docRef.id, ...staffData };
    } catch (error) {
      console.error("Error adding staff:", error);
      throw error;
    }
  },

  async updateStaff(id, staffData) {
    try {
      const docRef = doc(db, "staff", id);
      await updateDoc(docRef, staffData);
      return { id, ...staffData };
    } catch (error) {
      console.error("Error updating staff:", error);
      throw error;
    }
  },

  async deleteStaff(id) {
    try {
      const docRef = doc(db, "staff", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting staff:", error);
      throw error;
    }
  }
};