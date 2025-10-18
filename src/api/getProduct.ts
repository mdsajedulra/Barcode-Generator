import axios from "axios";

export const getProducts = async ( page: number) => {
  try {
    const params = {
        per_page: 100,
        page,
    }
    // if(categoryId) params.category = categoryId;
    const res = await axios.get(
      "https://boighar.charniketon.com/wp-json/wc/v3/products",
      {
        headers: {
          Authorization:
            "Basic " + btoa("ck_13b188c6e999cd73247d0fa3869a76eeef158e39:cs_8f95a3c4079ad81dd3ecd895d61f9cda6d77b153"),
        },
        params
      }
    );
    return res.data; // ✅ return করতে হবে
  } catch (err) {
    console.error("Error fetching products:", err);
    return []; // error হলে empty array return করো
  }
};
