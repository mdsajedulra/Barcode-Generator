// api/getCategories.ts
import axios from "axios";

export async function getCategories(pageNubmer: number) {
  const res = await axios.get(
    `${import.meta.env.VITE_WP_API_URL}/products/categories`,
    {
      headers: {
        Authorization:
          "Basic " +
          btoa(
            "ck_13b188c6e999cd73247d0fa3869a76eeef158e39:cs_8f95a3c4079ad81dd3ecd895d61f9cda6d77b153"
          ),
      },
      params: {
        per_page: 20, // ✅ একবারে 100 টা category আনবে
        page: pageNubmer, // পেজ নাম্বার
      },

    }
  );
  return {
    data: res.data,
   meta: {
    total: parseInt(res.headers["x-wp-total"] || "0", 10),
    totalPages: parseInt(res.headers["x-wp-totalpages"] || "0", 10),
   }
  };
}
