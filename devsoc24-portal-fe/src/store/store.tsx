import { create } from "zustand";
import { type joinTeamModal } from "@/interfaces";

export const useJoinModalStore = create<joinTeamModal>((set) => ({
    showModal: "",
    setShowModal: (showModal: string) => set({ showModal }),
}));