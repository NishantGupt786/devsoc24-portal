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

export interface userProps {
  data: {
    id: string;
    first_name: string;
    last_name: string;
    reg_no: string;
    email: string;
    phone: string;
    college: string;
    city: string;
    state: string;
    gender: string;
    role: string;
    team_id: string;
  };
  message: string;
  status: string;
}

interface userStore {
  user: userProps;
  setUser: (setUser: userProps) => void;
}

export const useUserStore = create<userStore>((set) => ({
  user: {
    data: {
      id: "",
      first_name: "",
      last_name: "",
      reg_no: "",
      email: "",
      phone: "",
      college: "",
      city: "",
      state: "",
      gender: "",
      role: "",
      team_id: "",
    },
    message: "",
    status: "",
  },
  setUser: (userData: userProps) =>
    set((state) => ({
      ...state,
      user: userData,
    })),
}));
