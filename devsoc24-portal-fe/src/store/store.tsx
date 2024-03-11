import { create } from "zustand";
import { type userProps, type joinTeamModal, type teamDataProps } from "@/interfaces";

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
  setTeam: (setTeam: boolean) => void;
}

export const useTeamStore = create<teamStore>((set) => ({
  team: false,
  setTeam: (team: boolean) => set({ team }),
}));

interface leaderStore {
  isLeader: boolean;
  setIsLeader: (isLeader: boolean) => void;
}

export const useLeaderStore = create<leaderStore>((set) => ({
  isLeader: false,
  setIsLeader: (isLeader: boolean) => set({ isLeader }),
}));

interface teamEditStore {
  edit: boolean;
  setEdit: (setTeam: boolean) => void;
}

export const useTeamEditStore = create<teamEditStore>((set) => ({
  edit: false,
  setEdit: (edit: boolean) => set({ edit }),
}));

interface userStore {
  user: userProps;
  setUser: (setUser: userProps) => void;
}

export const useUserStore = create<userStore>((set) => ({
  user: {
    is_leader: false,
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
      is_leader: false,
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

interface teamDataStore {
  teamData: teamDataProps;
  setTeamData: (setTeamData: teamDataProps) => void;
}

export const useTeamDataStore = create<teamDataStore>((set) => ({
  teamData: {
    message: "",
    status: "",
    team: {
      team_name: "",
      team_code: "",
      leader_id: "",
      round: 0,
      users: [{ name: "", reg_no: "", id: "" }],
      idea: {
        title: "",
        description: "",
        track: "",
        github_link: "",
        figma_link: "",
        others: "",
      },
      project: {
        name: "",
        description: "",
        track: "",
        github_link: "",
        figma_link: "",
        others: "",
      },
    },
  },
  setTeamData: (teamDataTemp: teamDataProps) =>
    set((state) => ({
      ...state,
      teamData: teamDataTemp,
    })),
}));
