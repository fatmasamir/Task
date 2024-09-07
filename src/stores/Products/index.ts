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
        console.log("Bloges.value", Products.value);
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
      data,
    });
    if (response.ok) {
      response.json().then((data) => {
        console.log("response ====", data);
        Products.value.unshift(data);
        console.log(Products.value);
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
      data,
    });
    if (response.ok) {
      response.json().then((data) => {
        // Products.value = Products.value.find((e) => {
        //   if (e.id == id) {
        //     e.title = data.title;
        //     e.description = data.description;
        //     e.price = data.price;
        //     console.log("data ===", e);
        //     return e;
        //   }
        // });
        const index = Products.value.findIndex((item) => {
          return data.id === item.id;
        });
        console.log("index====", index);
        Products.value.splice(index, 1, data);
        console.log("Products.value====", Products.value);
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
