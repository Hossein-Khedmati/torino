import { axiosClient } from "@/services/client";
import { axiosAuth } from "./instance";

export async function fetchTours({ origin, destination, startDate, endDate }) {
  const res = await axiosClient.get("/tour");
  const data = res.data;

  return data.filter((tour) => {
    const originMatch = origin ? tour.origin.id === origin : true;
    const destMatch = destination ? tour.destination.id === destination : true;

    const dateMatch =
      startDate && endDate
        ? tour.startDate >= startDate && tour.startDate <= endDate
        : true;

    return originMatch && destMatch && dateMatch;
  });
}
export const fetchUser = async () => {
  const res = await axiosAuth.get("/user/profile");
  return res.data;
};

export const updateUserProfile = async (data) => {
  const res = await axiosAuth.put("/user/profile", data);
  return res.data;
};
export const basketGet = async () => {
  const res = await axiosAuth.get(`/basket`);
  return res.data;
};
export const basketPut = async (data) => {
  const res = await axiosAuth.put(`/basket/${data}`);
  return res.data;
};
export const orderPost = async (data) => {
  const res = await axiosAuth.post(`/order` , data);
  return res.data;
};