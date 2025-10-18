/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { getProducts } from "../api/getProduct";
import { BarcodeGenerator } from "./BarcodeGenerator";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";


function Barcode() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts(2)
      .then((data) => setProducts(data))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(products);


  const [number, setNumber] = useState('');

  const handleNameChange = (event:any) => {
    setNumber(event.target.value);
      getProducts(Number(event.target.value))
      .then((data) => setProducts(data))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (event:any) => {
    event.preventDefault(); // Prevent default form submission
    console.log('Submitted Name:', name);
    // You can now use the 'name' value for further processing
  };


  if (loading) {
    return <p>Loading Product ..........</p>;
  }
  return (
    <>
      <h2>BarCode Generator</h2>
      <button className="text-white" onClick={reactToPrintFn}>
        Print
      </button>
      <div></div>
      <form onSubmit={handleSubmit}>
        <label>
          Input Page Number
          <input type="number" value={number} onChange={handleNameChange} />
        </label>
        <button className="text-white" type="submit">Submit</button>
        <p>Current Page Number: {number}</p>
      </form>
      <div className={`grid grid-cols-4`} ref={contentRef}>
        {products.map((p) => (
          //   <li key={p.id}>{p.id}</li>
          <BarcodeGenerator key={p.id} barcode={p} />
        ))}
      </div>
    </>
  );
}

export default Barcode;
