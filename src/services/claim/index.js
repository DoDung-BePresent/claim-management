import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const claimService = {
  async getClaimsForFinance() {
    try {
      const q = query(
        collection(db, "claims"),
        where("status", "in", ["Paid", "Approved"]),
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching claims:", error);
      throw new Error("Error fetching claims!");
    }
  },
  async updateClaimStatus(claimId, newStatus) {
    try {
      const claimRef = doc(db, "claims", claimId);
      await updateDoc(claimRef, { status: newStatus });
      console.log(`Claim ${claimId} updated to status: ${newStatus}`);
    } catch (error) {
      console.error("Error updating claim status:", error);
      throw new Error("Failed to update claim status");
    }
  },

  async getUserClaims(userId) {
    try {
      const q = query(collection(db, "claims"), where("staffId", "==", userId));

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw new Error("Failed to fetch claims");
    }
  },
  async createClaim(claimData) {
    try {
      const { projectDuration, ...rest } = claimData;
      const [startDate, endDate] = projectDuration;

      const docRef = await addDoc(collection(db, "claims"), {
        ...rest,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        createdAt: serverTimestamp(),
        status: "Pending",
      });

      return {
        id: docRef.id,
        ...rest,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        status: "Pending",
      };
    } catch (error) {
      throw new Error("Failed to create claim");
    }
  },
  async saveDraft(claimData) {
    try {
      const { projectDuration, ...rest } = claimData;
      const [startDate, endDate] = projectDuration;

      const docRef = await addDoc(collection(db, "claims"), {
        ...rest,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        createdAt: serverTimestamp(),
        status: "Draft",
      });

      return {
        id: docRef.id,
        ...rest,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        status: "Draft",
      };
    } catch (error) {
      throw new Error("Failed to save draft");
    }
  },
};
