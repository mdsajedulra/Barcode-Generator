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

  const { categoryId } = useParams();

  // 🟢 Category বা Page পরিবর্তন হলে data load হবে
  useEffect(() => {
    setLoading(true);
    getProducts(pageNumber, Number(categoryId))
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, [pageNumber, categoryId]);

  const handlePageChange = (event: any) => {
    setPageNumber(Number(event.target.value));
  };

  if (loading) {
    return <p>Loading Product ..........</p>;
  }

  return (
    <>
      <h2 className="text-lg font-bold mb-2">BarCode Generator</h2>

      <div className="flex items-center gap-3 mb-4">
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
            onChange={handlePageChange}
            className="border border-gray-300 px-2 py-1 rounded w-20"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-[3mm] mt-[2mm] ml-[2mm]" ref={contentRef}>
        {products.map((p) => (
          <BarcodeGenerator key={p.id} barcode={p} />
        ))}
      </div>
    </>
  );
}

export default Barcode;
