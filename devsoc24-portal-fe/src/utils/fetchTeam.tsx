import { teamDataProps } from "@/interfaces";
import axios from "axios";
import router from "next/router";


export const FetchTeam = async (setTeamData: unknown, setTeam:unknown) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/team`,
      {
        withCredentials: true,
      },
    );
    setTeamData(response.data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      switch (e.response?.status) {
        case 401:
          router.push("/login");
          break;
        case 417:
          setTeam(true);
          console.log("no team");
          break;
        case 200:
          setTeam(true);
          break;
        default:
          console.log(e);
          break;
      }
    }
  }
};