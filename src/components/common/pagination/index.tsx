import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

interface paginationLength {
  totalPages: number;
}
const DataPagination: React.FC<paginationLength> = ({ totalPages }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get the current page from searchParams or default to 1
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const updatePageQuery = (newPage: any) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams = {
      ...currentParams,
      page: newPage,
    };

    const queryString = new URLSearchParams(updatedParams).toString();
    return `${pathname}?${queryString}`;
  };

  const previousPage = Math.max(currentPage - 1, 1);

  return (
    <div className="flex w-full justify-center">
      {totalPages && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {currentPage > 1 && (
                <PaginationPrevious href={updatePageQuery(previousPage)} />
              )}
            </PaginationItem>

            <PaginationItem>
              {totalPages ? (
                Array.from({ length: totalPages }, (_, key) => (
                  <PaginationLink
                    key={key}
                    href={updatePageQuery(key + 1)} // Use updated query with the page number
                  >
                    {key + 1}
                  </PaginationLink>
                ))
              ) : (
                <></>
              )}
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              {totalPages ? (
                currentPage < totalPages && (
                  <PaginationNext href={updatePageQuery(currentPage + 1)} />
                )
              ) : (
                <></>
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default DataPagination;
