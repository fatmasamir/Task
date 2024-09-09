import callServer from "@/assets/scripts/callServer/callServer";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
const toast = useToast();
export const UseProducts = defineStore("Products", () => {
  let Products = ref([]);
  let LoadingView = ref(false);
  //Get Products
  async function getProducts() {
    const response = await callServer({
      url: "products",
    });
    if (response.ok) {
      response.json().then((data) => {
        Products.value = data.products;
        console.log("Bloges.value", Products.value);
      });
    } else {
      toast.error("Has Error");
    }
  }

  //Delete Products
  async function DeleteProduct(id) {
    const response = await callServer({
      url: `products/${id}`,
      method: "DELETE",
    });
    if (response.ok) {
      response.json().then((data) => {
        Products.value = Products.value.filter((e) => e.id !== id);
        toast.success("Successfully ...");
      });
    } else {
      toast.error("Has Error");
    }
  }
  //Add Product
  async function AddProduct(data) {
    const response = await callServer({
      url: `products/add`,
      method: "POST",
      type: "",
      data,
    });
    if (response.ok) {
      response.json().then((data) => {
        Products.value.unshift(data);
        toast.success("Successfully ...");
      });
    } else {
      toast.error("Has Error");
    }
  }
  //Update Product
  async function UpdateProduct(id, data) {
    const response = await callServer({
      url: `products/${id}`,
      method: "PUT",
      type: "",
      data,
    });
    if (response.ok) {
      response.json().then((data) => {
        const index = Products.value.findIndex((item) => {
          return data.id === item.id;
        });
        Products.value.splice(index, 1, data);
        toast.success("Successfully ...");
      });
    } else {
      toast.error("Has Error");
    }
  }
  return {
    getProducts,
    DeleteProduct,
    AddProduct,
    Products,
    UpdateProduct,
  };
});
