import Barcode from "react-barcode";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function BarcodeGenerator({ barcode }: { barcode: any }) {
  return (
    <div className="w-[38mm] h-[25mm] border border-black flex flex-col justify-center items-center overflow-hidden p-[2mm] box-border">
      <div className="text-[8px] font-medium text-center leading-tight w-full text-ellipsis whitespace-nowrap">
        {barcode.name}
      </div>
      <p className="text-sm">৳ {barcode.price}</p>
      <Barcode
        lineColor="black"
        background="none"
        marginTop={0}
        marginBottom={0}
        marginLeft={1}
        marginRight={1}
        width={2.2}
        height={28}
        value={barcode.id}
      />

    </div>
  );
}
