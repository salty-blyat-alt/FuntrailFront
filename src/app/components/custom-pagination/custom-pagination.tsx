import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";

const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}) => {
  const paginate = (current: number, max: number) => {
    if (!current || !max) return null;

    let prev = current === 1 ? null : current - 1;
    let next = current === max ? null : current + 1;
    let items = [1];

    if (current === 1 && max === 1) return { current, prev, next, items };
    if (current > 4) items.push("…");

    let r = 2;
    let r1 = current - r;
    let r2 = current + r;

    for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) {
      items.push(i);
    }

    if (r2 + 1 < max) items.push("…");
    if (r2 < max) items.push(max);

    return { current, prev, next, items };
  };

  const paginationData = paginate(currentPage, totalPages);
  

  if (!paginationData) return null;

  return (
    <>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {paginationData.prev !== null && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(paginationData.prev);
                  }}
                />
              </PaginationItem>
            )}

            {paginationData.items.map((item, index) => (
              <PaginationItem key={index}>
                {item === "…" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(item);
                    }}
                    isActive={currentPage === item}
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {paginationData.next !== null && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(paginationData.next);
                  }}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default CustomPagination;
