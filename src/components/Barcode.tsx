/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { getProducts } from "../api/getProduct";
import { BarcodeGenerator } from "./BarcodeGenerator";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";

function Barcode() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [productId, setProductId] = useState("");

  const { categoryId } = useParams();

  // 🟢 Initial Load (All products or category)
  useEffect(() => {
    loadProducts();
  }, [pageNumber, categoryId]);

  const loadProducts = (id?: number) => {
    setLoading(true);
    getProducts(pageNumber, Number(categoryId), id)
      .then((data) => {
        if (!Array.isArray(data)) {
          setProducts([data]);
        } else {
          setProducts(data);
        }
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = () => {
    if (!productId) {
      alert("Please enter a Product ID!");
      return;
    }
    loadProducts(Number(productId)); // 🔍 Only that product
  };

  if (loading) return <p>Loading Product ..........</p>;

  return (
    <>
      <h2 className="text-lg font-bold mb-2">BarCode Generator</h2>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={reactToPrintFn}
        >
          Print
        </button>

        <label className="flex items-center gap-2 text-sm">
          Page:
          <input
            type="number"
            value={pageNumber}
            onChange={(e) => setPageNumber(Number(e.target.value))}
            className="border border-gray-300 px-2 py-1 rounded w-20"
          />
        </label>

        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Enter Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="border border-gray-300 px-3 py-1 rounded w-40"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Search
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-1 gap-[3mm] mt-[3mm] ml-[3mm]"
        ref={contentRef}
      >
        {products.length > 0 ? (
          products.map((p) => <BarcodeGenerator key={p.id} barcode={p} />)
        ) : (
          <p>No products found</p>
        )}
      </div>
    </>
  );
}

export default Barcode;
