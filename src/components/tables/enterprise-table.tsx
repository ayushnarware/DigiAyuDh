import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, Search, Download, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface TableAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  variant?: 'default' | 'destructive' | 'outline';
  requiresPermission?: string;
}

export interface EnterpriseTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  actions?: TableAction<T>[];
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  pageSize?: number;
  showSearch?: boolean;
  showBulkActions?: boolean;
  showExport?: boolean;
  showImport?: boolean;
  onSearch?: (query: string) => void;
  onExport?: () => void;
  onImport?: (file: File) => void;
  isSelectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export function EnterpriseTable<T extends { id: string }>({
  columns,
  data,
  actions,
  isLoading = false,
  isEmpty = false,
  emptyMessage = 'No data found',
  pageSize = 10,
  showSearch = true,
  showBulkActions = true,
  showExport = true,
  showImport = true,
  onSearch,
  onExport,
  onImport,
  isSelectable = true,
  onSelectionChange,
}: EnterpriseTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map((col) => col.key as string))
  );

  // Filter data
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((row) =>
      columns.some((col) => {
        const value = row[col.key];
        return value?.toString().toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [data, searchQuery, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      
      if (typeof aVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal);
      }
      
      return sortOrder === 'asc' 
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [filteredData, sortKey, sortOrder]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return sortedData.slice(startIdx, startIdx + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((row) => row.id)));
    }
  };

  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    onSearch?.(query);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport?.(file);
    }
  };

  return (
    <Card className="w-full">
      {/* Toolbar */}
      <div className="border-b border-border p-4 space-y-4">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search table..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          {showBulkActions && selectedRows.size > 0 && (
            <div className="text-sm text-muted-foreground">
              {selectedRows.size} row{selectedRows.size !== 1 ? 's' : ''} selected
            </div>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {showExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={onExport}
                className="gap-2"
              >
                <Download className="size-4" />
                Export
              </Button>
            )}
            {showImport && (
              <div>
                <input
                  type="file"
                  id="import-file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".csv,.xlsx"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('import-file')?.click()}
                  className="gap-2"
                >
                  <Upload className="size-4" />
                  Import
                </Button>
              </div>
            )}
            {showBulkActions && selectedRows.size > 0 && (
              <Button
                variant="destructive"
                size="sm"
                className="gap-2"
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            )}
          </div>
        </div>

        {/* Column Visibility */}
        <div className="flex flex-wrap gap-2 text-sm">
          {columns.map((col) => (
            <button
              key={col.key as string}
              onClick={() => {
                const newVisible = new Set(visibleColumns);
                if (newVisible.has(col.key as string)) {
                  newVisible.delete(col.key as string);
                } else {
                  newVisible.add(col.key as string);
                }
                setVisibleColumns(newVisible);
              }}
              className={`px-2 py-1 rounded text-xs font-medium transition ${
                visibleColumns.has(col.key as string)
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {isSelectable && (
                <th className="px-4 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border border-input"
                  />
                </th>
              )}
              {columns.map((col) => (
                visibleColumns.has(col.key as string) && (
                  <th
                    key={col.key as string}
                    className={`px-4 py-3 text-left font-semibold ${col.sortable ? 'cursor-pointer hover:bg-muted/70' : ''}`}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-2">
                      {col.label}
                      {col.sortable && (
                        <div>
                          {sortKey === col.key ? (
                            sortOrder === 'asc' ? (
                              <ChevronUp className="size-4" />
                            ) : (
                              <ChevronDown className="size-4" />
                            )
                          ) : (
                            <ChevronsUpDown className="size-4 text-muted-foreground" />
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                )
              ))}
              {actions && actions.length > 0 && (
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (isSelectable ? 1 : 0) + (actions ? 1 : 0)} className="p-8 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent" />
                  </div>
                </td>
              </tr>
            ) : isEmpty || paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (isSelectable ? 1 : 0) + (actions ? 1 : 0)} className="p-8 text-center text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={row.id} className="border-b border-border hover:bg-muted/50 transition">
                  {isSelectable && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        className="w-4 h-4 rounded border border-input"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    visibleColumns.has(col.key as string) && (
                      <td key={col.key as string} className="px-4 py-3">
                        {col.render ? col.render(row[col.key], row) : String(row[col.key] || '-')}
                      </td>
                    )
                  ))}
                  {actions && actions.length > 0 && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {actions.map((action) => (
                          <Button
                            key={action.label}
                            variant={action.variant || 'outline'}
                            size="sm"
                            onClick={() => action.onClick(row)}
                            className="gap-1"
                          >
                            {action.icon}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isEmpty && paginatedData.length > 0 && (
        <div className="border-t border-border p-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default EnterpriseTable;
