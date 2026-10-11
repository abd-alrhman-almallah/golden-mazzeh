// What the UI is allowed to see about a user (never the password data)
export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
}

// What is stored locally for each registered user
export interface StoredUser extends AuthUser {
  passwordSalt: string;
  passwordHash: string;
  createdAt: string;
}

export interface LoginInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
}