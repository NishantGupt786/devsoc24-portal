import axios from "axios";

export default async function refreshToken() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
        {
          nallaData: "",
        },
        {
          withCredentials: true,
        }
      );
      console.log("Then: ", res);
    } catch (e) {
      console.log("Catch: ", e);
    }
  }
  