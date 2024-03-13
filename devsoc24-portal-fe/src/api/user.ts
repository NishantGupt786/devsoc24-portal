import { type APIResponse } from "@/schemas/api";
import axios, { type AxiosError } from "axios";

export async function signup(email: string, password: string) {
  try {
    const { data } = await axios.post<APIResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/signup`,
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      },
    );
    return data;
  } catch (err) {
    // console.log(err);
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError;
      return error.response?.status ?? 500;
    }
    return 500;
  }
}
