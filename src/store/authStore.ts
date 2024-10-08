import { Store, registerInDevtools } from "pullstate";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  isAdmin: boolean;
}

// Define the type for the AuthStore
interface AuthStoreType {
  isLoggedIn: boolean;
  initialized: boolean;
  user: any | null;
}

const token: any = Cookies.get("token");
const decoded: any = jwt.decode(token);
const userinfo = { ...decoded, token: token };

export const AuthStore = new Store<AuthStoreType>({
  isLoggedIn: userinfo ? true : false,
  initialized: false,
  user: userinfo ? userinfo : null,
});

export const adminSignIn = async (
  email: string,
  password: string,
): Promise<{ user: User | null; error?: any }> => {
  try {
    const { data } = await axios.post("/api/v1/auth/signin", {
      email,
      password,
    });

    AuthStore.update((store) => {
      store.user = {
        ...(jwt.decode(data?.data?.token) as object),
        token: data?.data?.token,
      };
      store.isLoggedIn = data?.data?.token ? true : false;
    });
    Cookies.set("token", data.data.token);

    return { user: data };
  } catch (e) {
    return { user: null, error: e };
  }
};

export const adminSignup = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  middleName: string,
  token: string,
): Promise<{ user: User | null; error?: any }> => {
  try {
    const { data } = await axios.post(
      "/api/v1/auth/signup",
      {
        email,
        password,
        name,
        firstName,
        lastName,
        middleName,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    return { user: data };
  } catch (e) {
    return { user: null, error: e };
  }
};

export const signOut = async (): Promise<{ user: null; error?: any }> => {
  try {
    AuthStore.update((store) => {
      store.user = null;
      store.isLoggedIn = false;
    });
    Cookies.remove("token");
    return { user: null };
  } catch (e) {
    return { user: null, error: e }; // Include both user and error properties
  }
};
