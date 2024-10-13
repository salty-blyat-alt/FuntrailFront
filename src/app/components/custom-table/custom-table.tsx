"use client";

import { MoreHorizontal } from "lucide-react";
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
  loading?: boolean; // New loading prop
}

export default function CustomTable({
  data,
  subtitle,
  title,
  onEdit,
  onDelete,
  headers,
  loading = false, // Default to false
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
              {headers.map(({ key, label, hidden }) => (
                <TableHead key={key} className={hidden ? "hidden" : ""}>
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={headers.length} className="text-center">
                  Loading data...
                </TableCell>
              </TableRow>
            ) : data && data.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  {headers.map(({ key, hidden }) => (
                    <TableCell key={key} className={hidden ? "hidden" : ""}>
                      {key === "actions" ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onEdit?.(item)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete?.(item)}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : Array.isArray(item[key]) ? (
                        // If the field is an array, display badges
                        <div className="flex gap-2">
                          {item[key].map((value: string) => (
                            <Badge key={value} variant="outline">
                              {value}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        item[key]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length} className="text-center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {/* Optionally add pagination or other footer content here */}
      </CardFooter>
    </Card>
  );
}
