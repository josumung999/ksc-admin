import { clientType } from "@/types/clientType";
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
import { useRouter, useSearchParams } from "next/navigation";

interface paginationLength {
  length: clientType[];
  searchParams?: any;
}
const DataPagination: React.FC<paginationLength> = ({ length }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the current page from searchParams or default to 1
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const updatePageQuery = (newPage: any) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams = {
      ...currentParams,
      page: newPage,
    };

    const queryString = new URLSearchParams(updatedParams).toString();
    return `/manage/clients?${queryString}`;
  };

  const previousPage = Math.max(currentPage - 1, 1);

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 && (
              <PaginationPrevious href={updatePageQuery(previousPage)} />
            )}
          </PaginationItem>

          <PaginationItem>
            {length ? (
              length.map((item, key) => (
                <PaginationLink
                  key={key}
                  href={updatePageQuery(item)} // Use updated query with the page number
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
            {length ? (
              currentPage < length.length && (
                <PaginationNext href={updatePageQuery(currentPage + 1)} />
              )
            ) : (
              <></>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DataPagination;
