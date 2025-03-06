import React from "react";
import { Button } from "../ui/button";

const DOTS = "...";

// Simple utility to create a range of numbers [start..end]
function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => start + idx);
}

interface GetPaginationRangeProps {
  totalPages: number;
  currentPage: number;
  siblingCount?: number; // how many pages to show on each side of the current page
}

/**
 * Returns an array of page numbers and/or the string DOTS to be rendered
 * by the pagination component. No duplication of first/last pages,
 * and only shows ellipses if needed.
 */
function getPaginationRange({
  totalPages,
  currentPage,
  siblingCount = 1,
}: GetPaginationRangeProps): Array<number | string> {
  // This is the maximum size of the pagination component
  // before we start showing ellipses.
  const totalPageNumbers = siblingCount * 2 + 5;

  // 1) If the total number of pages is small, show all of them.
  if (totalPages <= totalPageNumbers) {
    return range(1, totalPages);
  }

  // 2) Calculate left and right sibling boundaries
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const paginationRange: Array<number | string> = [];

  // 3) Always show the first page
  paginationRange.push(1);

  // 4) Show left ellipses if we have a gap between page 1 and leftSiblingIndex
  // (i.e., if leftSiblingIndex is > 2, it means we’re skipping some pages)
  if (leftSiblingIndex > 2) {
    paginationRange.push(DOTS);
  }

  // 5) Show all pages between leftSiblingIndex and rightSiblingIndex
  // (but never repeating the very first or very last page)
  for (
    let i = Math.max(leftSiblingIndex, 2);
    i <= Math.min(rightSiblingIndex, totalPages - 1);
    i++
  ) {
    paginationRange.push(i);
  }

  // 6) Show right ellipses if we have a gap between rightSiblingIndex and totalPages
  // (i.e., if rightSiblingIndex < totalPages - 1, it means we’re skipping some pages)
  if (rightSiblingIndex < totalPages - 1) {
    paginationRange.push(DOTS);
  }

  // 7) Always show the last page
  paginationRange.push(totalPages);

  return paginationRange;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  limitPerPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalRecords,
  limitPerPage,
  onPageChange,
  siblingCount = 1,
}) => {
  const start = (currentPage - 1) * limitPerPage + 1;
  const end = Math.min(currentPage * limitPerPage, totalRecords);

  // Get the pages (and possible ellipses) to render
  const paginationRange = getPaginationRange({
    totalPages,
    currentPage,
    siblingCount,
  });

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const onNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between p-4">
      <span className="text-gray-700 text-sm">
        {start} à {end} sur {totalRecords} lignes
      </span>

      <div className="flex gap-1">
        {/* Previous button */}
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>

        {/* Page number buttons */}
        {paginationRange.map((page, idx) => {
          if (page === DOTS) {
            return (
              <Button key={idx} variant="outline" disabled>
                {DOTS}
              </Button>
            );
          }

          return (
            <Button
              key={page as number}
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </Button>
          );
        })}

        {/* Next button */}
        <Button
          variant="outline"
          onClick={onNext}
          disabled={currentPage === totalPages}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};
