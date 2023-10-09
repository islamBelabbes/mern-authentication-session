import { privetRoute } from "../helpers/axios";

export const getCurrentUser = async (param) => {
  try {
    const data = await privetRoute.get("/user/me", {
      withCredentials: true,
      isChecking: true,
    });
    return data;
  } catch (err) {
    throw err;
  }
};
export const getAllUsers = async () => {
  try {
    const data = await privetRoute.get("/users", {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    throw err;
  }
};
