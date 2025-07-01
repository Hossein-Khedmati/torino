import { axiosClient } from "@/client";


export async function fetchTours({ origin, destination, date }) {
  const res = await axiosClient.get("/tour");
  const data = res.data;

  return data.filter((tour) => {
    const originMatch = origin ? tour.origin.id === origin : true;
    const destMatch = destination ? tour.destination.id === destination : true;
    const dateMatch = date ? tour.startDate.startsWith(date) : true;
    return originMatch && destMatch && dateMatch;
  });
}
