"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import type { LGA } from "@/types/lga";
import Link from "next/link";
import { ADMIN_ROLES } from "@/lib/const";

interface LGATableProps {
  lgas: LGA[];
  userRole: string;
  onViewLGA: (lga: LGA) => void;
  onEditLGA: (lga: LGA) => void;
  onDeleteLGA: (lga: LGA) => void;
}

export function LGATable({
  lgas,
  userRole,
  onViewLGA,
  onEditLGA,
  onDeleteLGA,
}: LGATableProps) {
  const canEdit = ADMIN_ROLES.includes(userRole);
  const canDelete = ADMIN_ROLES.includes(userRole);

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lgas.map((lga) => (
            <TableRow key={lga.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{lga.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ID: {lga.id}
                  </div>
                </div>
              </TableCell>
              <TableCell>{lga.createdAt.split("T")[0]}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link
                        href={`/lgas/${lga.id}`}
                        className="flex items-center"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    {canEdit && (
                      <DropdownMenuItem onClick={() => onEditLGA(lga)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit LGA
                      </DropdownMenuItem>
                    )}
                    {canDelete && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDeleteLGA(lga)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete LGA
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
