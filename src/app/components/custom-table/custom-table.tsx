"use client";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Badge } from "../ui/badge";
import Image from "next/image"; // Import Image component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
// eslint-disable-next-line no-use-before-define
export type ANY = any;

export interface DataProps {
  id: string | number;
  [key: string]: ANY;
}

export interface HeaderProps {
  key: keyof DataProps | "actions";
  label: string;
  hidden?: boolean;
}

export interface CustomTableProps {
  data?: ANY;
  title: string;
  subtitle?: string;
  onEdit?: (item: ANY) => void;
  onDelete?: (item: ANY) => void;
  headers: HeaderProps[];
  loading?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  perPage?: number;
  havePagination?: boolean;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export default function CustomTable({
  data,
  subtitle,
  title,
  onEdit,
  onDelete,
  headers,
  loading = false,
  currentPage = 1,
  totalPages = 1,
  perPage = 10,
  onPerPageChange,
  onPageChange,
  totalItems = 1,
  havePagination,
}: CustomTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) =>
                !header.hidden ? (
                  <TableCell key={header.key} className="text-center  ">
                    {header.label}
                  </TableCell>
                ) : null
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: DataProps, index: number) => (
              <TableRow key={item.id || index}>
                {headers.map((header) =>
                  !header.hidden ? (
                    <TableCell className="text-center" key={header.key}>
                      {header.key === "rooms" ? (
                        <div className="flex justify-center gap-1">
                          {item.rooms && Array.isArray(item.rooms) ? (
                            item.rooms.map(
                              (room: string, roomIndex: number) => (
                                <Badge key={roomIndex} className="mr-1">
                                  {room}
                                </Badge>
                              )
                            )
                          ) : (
                            <span>No rooms available</span>
                          )}
                        </div>
                      ) : (
                        item[header.key] ?? "-"
                      )}
                    </TableCell>
                  ) : null
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {havePagination && (
        <CardFooter className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {(currentPage - 1) * perPage + 1}-
              {Math.min(currentPage * perPage, totalItems)}
            </strong>{" "}
            of <strong>{totalItems}</strong> items
          </div>
          <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1} // Disable if on the first page
            >
              <ChevronLeft />
            </Button>
            <Select
              value={perPage.toString()}
              onValueChange={(value) => onPerPageChange(Number(value))} // Handle per-page change
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder={perPage.toString()} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="25">25</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
