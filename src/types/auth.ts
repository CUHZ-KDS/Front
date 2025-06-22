export interface UserType {
  memberType: string;
  nickname: string;
}

export interface AuthType {
  accessToken: string;
  refreshToken: string;
  member: UserType;
}

export interface AuthApiType {
  code: string;
  message: string;
  data: AuthType;
}
