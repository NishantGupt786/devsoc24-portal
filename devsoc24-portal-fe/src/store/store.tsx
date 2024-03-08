import { create } from "zustand";
import { type joinTeamModal } from "@/interfaces";

export const useJoinModalStore = create<joinTeamModal>((set) => ({
  showModal: "",
  setShowModal: (showModal: string) => set({ showModal }),
}));

interface ideaStore {
  idea: number;
  setIdea: (setIdea: number) => void;
}

export const useIdeaStore = create<ideaStore>((set) => ({
  idea: 0,
  setIdea: (idea: number) => set({ idea }),
}));

interface teamStore {
  team: boolean;
  setTeam: (setIdea: boolean) => void;
}

export const useTeamStore = create<teamStore>((set) => ({
  team: false,
  setTeam: (team: boolean) => set({ team }),
}));
