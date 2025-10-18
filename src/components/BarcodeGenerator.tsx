/* eslint-disable @typescript-eslint/no-explicit-any */
import Barcode from "react-barcode";

export const BarcodeGenerator = ({ barcode }: { barcode: any }) => {
 
  return (
    <div>    
      <div        
        className="text-center border-black border m-5 rounded bg-white text-black w-50"
      >
        <p className="text-center">চরনিকেতন বইঘর</p>
        <p className="text-center">{barcode.name}</p>
        <p className="text-center -mb-3">৳ {barcode.price}</p>
        <Barcode lineColor="black" background="none" width={2.2} height={32} value={barcode.id} />
      </div>
    </div>
  );
};
