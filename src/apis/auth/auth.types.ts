export type LoginRequest = {
  oauth2Id: string;
};

export type LoginResponse = {
  token: string;
  isNewUser: boolean;
};
