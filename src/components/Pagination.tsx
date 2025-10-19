import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationDProps {
  meta: {
    totalPages: number;
    total: number;
  };
}

export function PaginationD({ meta }: PaginationDProps) {
  console.log(meta);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {[...Array(meta.totalPages)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink href="#">{i + 1}</PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
