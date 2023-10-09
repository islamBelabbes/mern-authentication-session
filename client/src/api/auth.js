import { publicRoute } from "../helpers/axios";
export const login = async (formData) => {
  try {
    const data = await publicRoute.post("/auth/login", formData, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    throw err;
  }
};
export const signUp = async (formData) => {
  try {
    const data = await publicRoute.post("/auth/signup", formData);
    return data;
  } catch (err) {
    throw err;
  }
};
export const signOut = async () => {
  try {
    const data = await publicRoute.delete("/auth/logout", {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    throw err;
  }
};
