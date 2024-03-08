export interface APIResponse {
  message: string;
  status: string;
  data?: unknown;
}

export interface LoginResponse {
  profile_complete: boolean;
  verified: boolean;
}
