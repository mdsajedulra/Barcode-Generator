import { getCategories } from "@/api/getCategory";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Link } from "react-router-dom";

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

interface CategoryType {
  id: number;
  name: string;
  count: number;
}

function Category() {
  const [Category, setCategory] = useState<CategoryType[]>([]);
  const [meta, setMeta] = useState<{ totalPages: number }>({ totalPages: 0 });
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setloading] = useState<boolean>(true);
  console.log(pageNumber);
  useEffect(() => {
    setloading(true);
    getCategories(pageNumber).then((data) => {
      console.log("All categories:", data);
      setCategory(data.data as CategoryType[]);
      setMeta((data.meta as { totalPages: number }) ?? { totalPages: 0 });
      setloading(false);
    });
    console.log(Category);
  }, [pageNumber]);
  if(loading){
    return <p>loading...</p>
  }
  return (
    <>
    <div className="text-4xl">Category</div>
      <Table>
        {/* <TableCaption>All Category table</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.L no</TableHead>
            <TableHead>Category Id</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead className="text-right">
              Total Book Of this Category
            </TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Category.map((c, i) => (
            <TableRow key={i}>
              <TableCell className="text-left">{i + 1}</TableCell>
              <TableCell className="text-left">{c?.id}</TableCell>
              <TableCell className="text-left">{c?.name}</TableCell>
              <TableCell className="text-left">{c?.count}</TableCell>
              <TableCell className="text-left">
                <Link to={`/${c?.id}`} target="_blank">View</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* pagination  */}
      <div className="mb-10"></div>
      <Pagination>
      <PaginationContent>
         <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        {[...Array(meta.totalPages)].map((_, i) => (
          <PaginationItem>
          <PaginationLink  isActive={pageNumber === i + 1}  onClick={()=>setPageNumber(i+1)}>
            {i+1}
          </PaginationLink>
        </PaginationItem>
        ))}
              
        <PaginationItem >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </>
  );
}

export default Category;
