import axios from "axios";

export interface CardProps {
  title: string;
  cardImage: string;
  cardContent: string;
  cardDesc: string;
  buttonDetails: Array<{
    text: string;
    showModal: boolean;
    modalType?: string;
    routeTo?: string;
  }>;
}

export interface joinTeamModal {
  showModal: string | undefined;
  setShowModal: (showModal: string) => void;
}

export const refresh = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
      {
        nallaData: "",
      },
      {
        withCredentials: true,
      },
    );
  } catch (e) {
    if (axios.isAxiosError(e)) {
      switch (e.response?.status) {
        case 401:
          try {
            await refresh();
          } catch (e) {
            console.log("REFESH: ", e);
          }
        default:
          console.log(e);
      }
    }
  }
};

export interface userProps {
  is_leader: boolean;
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
    is_leader: boolean;
  };
  message: string;
  status: string;
}

export interface teamDataUserProps {
  name: string;
  reg_no: string;
  id: string;
}

export interface teamDataProps {
  message?: string;
  status?: string;
  team?: {
    team_name: string;
    team_code: string;
    leader_id: string;
    round: 0;
    users: teamDataUserProps[];
    idea: {
      title: string;
      description: string;
      track: string;
      github_link: string;
      figma_link: string;
      others: string;
    };
    project: {
      name: string;
      description: string;
      track: string;
      github_link: string;
      figma_link: string;
      others: string;
    };
  };
}
