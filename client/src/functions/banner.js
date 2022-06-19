import axios from "axios";

export const createBanner = async (banner, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/banner`, banner, {
    headers: { authtoken },
  });

export const getBanners = async () =>
  await axios.get(`${process.env.REACT_APP_API}/banners`);

export const getBanner = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${id}`);

export const removeBanner = async (id, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/banner/${id}`, {
    headers: { authtoken },
  });

export const updateBanner = async (id, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/banner/${id}`, product, {
    headers: { authtoken },
  });
