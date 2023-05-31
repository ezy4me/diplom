import { DefaultAPIInstance, ImageAPIInstance } from "./index";

export const FurnitureAPI = {
  getAllFurnitures() {
    const url = process.env.VUE_APP_FURNITURE_API_URL;
    return DefaultAPIInstance.get(url);
  },

  getOneFurniture(id) {
    const url = process.env.VUE_APP_FURNITURE_API_URL;
    const data = { id };
    return DefaultAPIInstance.get(url, { ...data });
  },

  create(name, price, count, colorId, image) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("count", count);
    formData.append("colorId", colorId);
    formData.append("image", image);

    const url = process.env.VUE_APP_FURNITURE_API_URL;
    return ImageAPIInstance.post(url, formData);
  },

  updateFurniture(id, name, price, count, colorId, image) {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("count", count);
    formData.append("colorId", colorId);
    formData.append("image", image);

    const url = process.env.VUE_APP_FURNITURE_API_URL;
    return ImageAPIInstance.put(url, formData);
  },

  deleteFurniture(id) {
    const url = process.env.VUE_APP_FURNITURE_API_URL + id;
    return DefaultAPIInstance.delete(url);
  },
};
