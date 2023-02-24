export interface CreateUser {
  email: string;
  username: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Token {
  token: string
}
