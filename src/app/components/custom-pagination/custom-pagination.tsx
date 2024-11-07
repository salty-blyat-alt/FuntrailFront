
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
  onPageChange: (newPage: number|string) => void;
}) => {
  const paginate = (current: number, max: number) => {
    if (!current || !max) return null;

    const prev = current === 1 ? null : current - 1;
    const next = current === max ? null : current + 1;
    const items: (number | string)[] = [1]; 

    if (current === 1 && max === 1) return { current, prev, next, items };
    if (current > 4) items.push("…");

    const r = 2;
    const r1 = current - r;
    const r2 = current + r;

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
                    if (paginationData.prev !== null) {
                      onPageChange(paginationData.prev); // Now safe, as prev is guaranteed to be a number
                    }
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
                    if (paginationData.next !== null) {
                    onPageChange(paginationData.next);
                    }
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
