import { useState } from 'react';
import { Search, ChevronUp, ChevronDown, Download, Upload } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Card, CardContent, CardHeader, CardTitle } from './card';

export interface ColumnDef<T> {
  accessorKey: keyof T;
  header: string;
  cell?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  searchable?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  title?: string;
  onRowClick?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onSearch?: (query: string) => void;
  actions?: React.ReactNode;
  enableSearch?: boolean;
  enableFilter?: boolean;
  enableSort?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  loading?: boolean;
  emptyState?: React.ReactNode;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  title,
  onRowClick,
  onEdit,
  onDelete,
  onSearch,
  actions,
  enableSearch = true,
  enableFilter = true,
  enableSort = true,
  enablePagination = true,
  pageSize = 10,
  loading = false,
  emptyState,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search
  let filteredData = data;
  if (searchQuery) {
    filteredData = data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }

  // Sort data
  if (sortConfig) {
    filteredData = [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;
      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }

  // Paginate
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    onSearch?.(query);
  };

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return prev.direction === 'asc'
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {/* Header Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {enableSearch && (
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          )}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="size-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="size-4" />
              Import
            </Button>
            {actions}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={String(column.accessorKey)}
                    className={column.width ? `w-${column.width}` : ''}
                  >
                    {enableSort && column.sortable !== false ? (
                      <button
                        onClick={() => handleSort(column.accessorKey)}
                        className="inline-flex items-center gap-1 hover:text-foreground"
                      >
                        {column.header}
                        {sortConfig?.key === column.accessorKey ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUp className="size-4" />
                          ) : (
                            <ChevronDown className="size-4" />
                          )
                        ) : (
                          <ChevronDown className="size-4 opacity-30" />
                        )}
                      </button>
                    ) : (
                      column.header
                    )}
                  </TableHead>
                ))}
                {(onEdit || onDelete) && (
                  <TableHead className="w-20 text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="text-center py-12">
                    {emptyState || (
                      <div className="text-muted-foreground">
                        <p className="text-sm">No data found</p>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, idx) => (
                  <TableRow
                    key={row.id || idx}
                    onClick={() => onRowClick?.(row)}
                    className={onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''}
                  >
                    {columns.map((column) => (
                      <TableCell key={String(column.accessorKey)}>
                        {column.cell
                          ? column.cell(row[column.accessorKey], row)
                          : String(row[column.accessorKey])}
                      </TableCell>
                    ))}
                    {(onEdit || onDelete) && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {onEdit && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEdit(row);
                              }}
                            >
                              Edit
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(row);
                              }}
                            >
                              Delete
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {enablePagination && totalPages > 1 && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of{' '}
              {filteredData.length} results
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
