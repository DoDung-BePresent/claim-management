import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const projectService = {
  async getProjects() {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting projects:", error);
      throw error;
    }
  },

  async createProject(projectData) {
    try {
      const docRef = await addDoc(collection(db, "projects"), projectData);
      return { id: docRef.id, ...projectData };
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },

  async updateProject(id, projectData) {
    try {
      const docRef = doc(db, "projects", id);
      await updateDoc(docRef, projectData);
      return { id, ...projectData };
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },

  async deleteProject(id) {
    try {
      const docRef = doc(db, "projects", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  }
};