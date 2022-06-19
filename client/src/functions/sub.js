import axios from "axios";

export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: { authtoken },
  });

export const updateSub = async (slug, Sub, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, Sub, {
    headers: { authtoken },
  });

export const createSub = async (Sub, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, Sub, {
    headers: { authtoken },
  });
