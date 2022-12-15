export interface ICredentials {
  email?: string | null;
  password?: string | null;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
}

export interface INewUser {
  name?: string | null;
  email?: string | null;
  password?: string | null;
}
