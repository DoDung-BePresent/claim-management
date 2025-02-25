import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

export const authService = {
  async login({ email, password }) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {
      throw new Error("Login failed. Please try again.");
    }
  },
  async register({ email, password, name }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        role: "claimer",
        avatar: "",
        department: "Not assigned",
      });

      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name,
        role: "claimer",
        avatar: "",
        department: "Not assigned",
      };
    } catch (error) {
      throw new Error("Registration failed. Please try again.");
    }
  },
  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error("Logout failed. Please try again.");
    }
  },
};
