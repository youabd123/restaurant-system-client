import axiosClient from "./axiosClient";

export const getMenuItems = () => {
  return axiosClient.get("/menuitems");
};
