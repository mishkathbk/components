import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DropdownSearch } from "../dropdowns/DropdownSearch"
import { DropdownSearchForGrid } from "../dropdowns/DropdownSearchForGrid"

const detailsOptions = [
    {
        details: "detail1",
        unit: "unit1",
        rate: 520,
    },
    {
        details: "detail2",
        unit: "unit2",
        rate: 10,
    },
    {
        details: "detail3",
        unit: "unit3",
        rate: 30,
    },
    {
        details: "detail4",
        unit: "unit4",
        rate: 40,
    },
    {
        details: "detail5",
        unit: "unit5",
        rate: 5,
    },
]

export type Payment = {
    id: string
    details: string
    unit: string
    quantity: number
    rate: number
    amount: number
    discountPercentage: number // Changed from discount to discountPercentage
    total: number
    itemDetailsText?: string
}

const detailsArray = detailsOptions.map(item => item.details);

export function RowGrid() {
    const [tableData, setTableData] = React.useState<Payment[]>([
        {
            id: crypto.randomUUID(),
            details: "",
            unit: "",
            quantity: 1,
            rate: 0,
            amount: 0,
            discountPercentage: 0, // Initialize as 0%
            total: 0,
        }
    ])

    const [otherCharges, setOtherCharges] = React.useState(0)
    const [overallDiscountPercentage, setOverallDiscountPercentage] = React.useState(0) // Changed to percentage

    const addNewRow = () => {
        setTableData(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                details: "",
                unit: "",
                quantity: 1,
                rate: 0,
                amount: 0,
                discountPercentage: 0,
                total: 0,
            }
        ])
    }

    // Format number to always show 2 decimal places
    const formatNumber = (num: number) => {
        return num.toFixed(2)
    }

    // Parse input value to number with 2 decimal places
    const parseInput = (value: string) => {
        // Allow only numbers and single decimal point
        const sanitized = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
        // Convert to number and format to 2 decimal places
        const num = parseFloat(sanitized) || 0
        return parseFloat(num.toFixed(2))
    }

    // Calculate discount amount from percentage
    const calculateDiscountAmount = (amount: number, percentage: number) => {
        return amount * (percentage / 100)
    }

    // Calculate summary values
    const subtotal = tableData.reduce((sum, row) => sum + (row.amount || 0), 0)
    const totalDiscountAmount = tableData.reduce((sum, row) => sum + calculateDiscountAmount(row.amount, row.discountPercentage), 0)
    const totalAmount = subtotal - totalDiscountAmount - calculateDiscountAmount(subtotal, overallDiscountPercentage) + otherCharges

    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: "#",
            header: "#",
            cell: ({ row }) => {
                const rowIndex = row.index;
                return (
                    <div className="flex items-start">{rowIndex + 1}</div>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "details",
            header: "Item Details",
            cell: ({ row }) => {
                const rowIndex = row.index;
                return (
                    <div className="flex flex-col gap-1">
                        <DropdownSearchForGrid
                            placeholder="item name"
                            selected={tableData[rowIndex].details}
                            searchData={detailsArray}
                            onSelect={(selectedLabel) => {
                                const selectedDetail = detailsOptions.find(
                                    (d) => d.details === selectedLabel
                                );
                                setTableData((prev) => {
                                    const updated = [...prev];
                                    const rowData = updated[rowIndex];

                                    const quantity = rowData.quantity || 0;
                                    const rate = selectedDetail?.rate ?? 0;
                                    const amount = quantity * rate;
                                    const discountAmount = calculateDiscountAmount(amount, rowData.discountPercentage);

                                    updated[rowIndex] = {
                                        ...rowData,
                                        details: selectedLabel,
                                        unit: selectedDetail?.unit ?? "",
                                        rate,
                                        amount: parseFloat(amount.toFixed(2)),
                                        total: parseFloat((amount - discountAmount).toFixed(2)),
                                    };
                                    return updated;
                                });
                            }}
                        />
                        <textarea
                            placeholder="item details"
                            className="border rounded px-2 py-1"
                            rows={2}
                            value={tableData[rowIndex].itemDetailsText || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                setTableData((prev) => {
                                    const updated = [...prev];
                                    updated[rowIndex] = {
                                        ...updated[rowIndex],
                                        itemDetailsText: value,
                                    };
                                    return updated;
                                });
                            }}
                        />
                    </div>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },

        {
            accessorKey: "unit",
            header: "Unit",
            cell: ({ row }) => {
                const rowIndex = row.index;
                return <div className="border min-h-8 rounded-sm flex items-center pl-3">{tableData[rowIndex].unit || "-"}</div>;
            },
        },
        {
            header: "Quantity",
            accessorKey: "quantity",
            cell: ({ row }) => {
                const rowIndex = row.index;
                return (
                    <input
                        type="number"
                        min={1}
                        className="w-20 min-h-8 border px-1"
                        value={tableData[rowIndex].quantity}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            setTableData((prev) => {
                                const updated = [...prev];
                                const rowData = updated[rowIndex];

                                const quantity = value;
                                const rate = rowData.rate || 0;
                                const amount = quantity * rate;
                                const discountAmount = calculateDiscountAmount(amount, rowData.discountPercentage);

                                updated[rowIndex] = {
                                    ...rowData,
                                    quantity,
                                    amount: parseFloat(amount.toFixed(2)),
                                    total: parseFloat((amount - discountAmount).toFixed(2)),
                                };

                                return updated;
                            });
                        }}
                    />
                );
            },
        },
        {
            accessorKey: "rate",
            header: "Rate",
            cell: ({ row }) => {
                const rowIndex = row.index;
                const [inputValue, setInputValue] = React.useState(
                    tableData[rowIndex].rate.toString(),
                )

                React.useEffect(() => {
                    setInputValue(tableData[rowIndex].rate.toFixed(2));
                }, [tableData[rowIndex].rate]);

                return (
                    <input
                        type="text"
                        inputMode="decimal"
                        className="w-20 min-h-8 border px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                        onBlur={() => {
                            const parsedValue = parseInput(inputValue);
                            setTableData((prev) => {
                                const updated = [...prev];
                                const rowData = updated[rowIndex];
                                const rate = parsedValue;
                                const quantity = rowData.quantity || 0;
                                const amount = quantity * rate;
                                const discountAmount = calculateDiscountAmount(amount, rowData.discountPercentage);

                                updated[rowIndex] = {
                                    ...rowData,
                                    rate,
                                    amount: parseFloat(amount.toFixed(2)),
                                    total: parseFloat((amount - discountAmount).toFixed(2)),
                                };

                                return updated;
                            });
                        }}
                    />
                );
            },
        },
        {
            accessorKey: "amount",
            header: () => <div className="text-left">Amount</div>,
            cell: ({ row }) => {
                const rowIndex = row.index;
                return <div className="min-h-8">{formatNumber(tableData[rowIndex].amount)}</div>;
            },
        },
        {
            header: "Discount %",
            accessorKey: "discountPercentage",
            cell: ({ row }) => {
                const rowIndex = row.index;
                return (
                    <div className="flex items-center">
                        <input
                            type="text"
                            inputMode="decimal"
                            className="w-16 min-h-8 border px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={tableData[rowIndex].discountPercentage}
                            onChange={(e) => {
                                // Limit percentage to 0-100
                                let value = Math.min(100, Math.max(0, parseInput(e.target.value)));
                                if (isNaN(value)) value = 0;

                                setTableData((prev) => {
                                    const updated = [...prev];
                                    const rowData = updated[rowIndex];
                                    const discountPercentage = value;
                                    const discountAmount = calculateDiscountAmount(rowData.amount, discountPercentage);

                                    updated[rowIndex] = {
                                        ...rowData,
                                        discountPercentage,
                                        total: parseFloat((rowData.amount - discountAmount).toFixed(2)),
                                    };

                                    return updated;
                                });
                            }}
                        />
                        <span className="ml-1">%</span>
                    </div>
                );
            },
        },
        {
            header: "Total",
            accessorKey: "total",
            cell: ({ row }) => {
                return <span className="min-h-8">{formatNumber(row.original.total)}</span>;
            },
        },
        {
            id: "delete",
            header: "",
            cell: ({ row }) => {
                const rowIndex = row.index;
                if (tableData.length === 1) return null; // hide delete button if only one row
                return (
                    <div
                        onClick={() => {
                            setTableData((prev) => prev.filter((_, i) => i !== rowIndex));
                        }}
                        className="rounded-full border-2 border-red-500 size-5 flex justify-center items-center cursor-pointer"
                    >
                        <p className=" flex justify-center items-center text-red-500">-</p>
                    </div>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
    ];

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: tableData,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="align-baseline ">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex my-4">
                <Button onClick={addNewRow} variant="outline">
                    + Add Item
                </Button>
            </div>

            {/* Summary Section */}
            <div className="border-t rounded-md p-4 mt-4">
                <div className="grid grid-cols-2 gap-4 max-w-md ml-auto">
                    <div className="text-right font-medium">Sub Total:</div>
                    <div className="text-right">{formatNumber(subtotal)}</div>

                    <div className="text-right font-medium">Total Discount:</div>
                    <div className="text-right">{formatNumber(totalDiscountAmount)}</div>

                    <div className="text-right font-medium">Overall Discount:</div>
                    <div className="text-right">
                        <div className="flex items-center justify-end">
                            <input
                                type="text"
                                inputMode="decimal"
                                className="w-16 border px-1 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={overallDiscountPercentage}
                                onChange={(e) => {
                                    // Limit percentage to 0-100
                                    let value = Math.min(100, Math.max(0, parseInput(e.target.value)));
                                    if (isNaN(value)) value = 0;
                                    setOverallDiscountPercentage(value)
                                }}
                            />
                            <span className="ml-1">%</span>
                        </div>
                    </div>

                    <div className="text-right font-medium">Other Charges:</div>
                    <div className="text-right">
                        <input
                            type="text"
                            inputMode="decimal"
                            className="w-20 border px-1 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={otherCharges.toFixed(2)}
                            onChange={(e) => setOtherCharges(parseInput(e.target.value))}
                        />
                    </div>

                    <div className="text-right font-bold border-t pt-2">Total Amount:</div>
                    <div className="text-right font-bold border-t pt-2">{formatNumber(totalAmount)}</div>
                </div>
            </div>
        </div>
    )
}