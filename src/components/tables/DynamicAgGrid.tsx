import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi, GridReadyEvent, IRowNode } from "ag-grid-community";

import { AllCommunityModule, ModuleRegistry, CsvExportModule } from "ag-grid-community";
// import { ExcelExportModule } from 'ag-grid-enterprise';
import { DropdownMultiSelect } from "../dropdowns/DropdownMultiSelect";
import { NormalSelect } from "../selects/NormalSelect";
import { FaEye } from "react-icons/fa";
import CustomerViewModal from "../modal/CustomerViewModal";
// import { DropdownMultiSelect } from "../dropdowns/DropdownMultiSelect";

ModuleRegistry.registerModules([AllCommunityModule, CsvExportModule]);

type Props = {
  rowData: any[];
  columnDefs?: ColDef[];
  title?: string;
  pagination?: boolean;
  pageSize: number;
  pageSizeList?: number[];
  totalItems: number;
  onPageChange: (page: number) => void;
  currentPage: number
  setCurrentPage: (value: number) => void
  setSearch: (value: string) => void
}

const DynamicAgGrid = ({
  rowData,
  columnDefs,
  title = "Data Grid",
  pagination = true,
  pageSize,
  // pageSizeList = [3, 5],
  totalItems,
  onPageChange,
  currentPage,
  setCurrentPage,
  setSearch
}:
  // onEdit,
  // onDelete,
  Props) => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [viewDetails, setViewDetails] = useState<any>();

  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    setRows(rowData);
  }, [rowData]);
  const [filterText, setFilterText] = useState("");
  const totalPages = Math.ceil(totalItems / pageSize);
  const onDelete = (data: any) => {
    const DeletedArray = rows.filter((items) => items.No != data.No);
    setRows(DeletedArray);
  };
  const ActionCellRenderer = (props: any) => {
    return (
      <div className="flex gap-[1rem] items-center justify-between">
        <button
          onClick={() => {
            setIsOpen(!isOpen)
            setViewDetails(props.data)
          }}
          className="px-2 py-0.5  rounded  text-sm"
        >
          <FaEye className="text-gray-600 hover:text-blue-600 cursor-pointer" />
        </button>
        <button
          onClick={() => onDelete(props.data)}
          className="px-2 py-0.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    );
  };

  const StatusCellEditor = (props: any) => {
    const [value, setValue] = useState(props.value);

    // This will be shown when editing
    return (
      <NormalSelect
        options={["approved", "reject", "pending"]}
        value={value}
        setValue={setValue}
      // onChange={(newValue) => setValue(newValue)}
      />
    );
  };
  const columnStyle = (params: any) => {
    const classes: string[] = ["!flex", "items-center"];
    return classes.join(' ');
  };
  const allColumnDefs = useMemo(() => {
    return (
      columnDefs ||
      (rows?.length > 0
        ? [
          ...Object.keys(rows[0]).map((key) => {
            if (key === "status") {
              return ({
                field: key,
                headerName: key,
                cellRenderer: StatusCellEditor,
                cellEditor: StatusCellEditor,
                editable: true,
              })
            }
            else
              // console.log("key::::", key)
              return ({
                field: key,
                headerName: key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase()),
                hide: false,
              })
          }),
          {
            field: "actions",
            headerName: "Actions",
            cellRenderer: ActionCellRenderer,
            pinned: "right" as "right",
            sortable: false,
            filter: false,
            width: 200,
            hide: false,
          },
        ]
        : [])
    );
  }, [rows, columnDefs]);

  const [selected, setSelected] = useState<string[]>([]);

  const dropDownArray = useMemo(
    () =>
      allColumnDefs
        .map((item) => item.headerName)
        .filter(
          (name): name is string => name !== undefined && name !== "Actions"
        ),
    [allColumnDefs]
  );

  useEffect(() => {
    if (dropDownArray.length > 0) {
      setSelected(dropDownArray); // or filter/drop "Actions" again if needed
    }
  }, [dropDownArray]);


  // Filter columns based on selected headers
  const visibleColumnDefs = useMemo(() => {
    return allColumnDefs.filter((col) => {
      if (col.headerName === "Actions") return true;
      return selected.includes(col.headerName || "");
    });
  }, [allColumnDefs, selected]);

  const defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ["contains"],
      suppressAndOrCondition: true,
      suppressFilterOptions: true,
      debounceMs: 300,
    },
    cellClass: columnStyle,
    // cellClass: "!flex item-center",
    // cellRenderer: 'agCheckboxCellRenderer',
    // cellEditor: 'agCheckboxCellEditor',
    editable: false,
  };
  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };
  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    // Initialize grid to correct page
    // params.api.paginationGoToPage(currentPage - 1);
  };
  // useEffect(() => {
  //   if (gridApi) {
  //     gridApi.paginationGoToPage(currentPage - 1);
  //   }
  // }, [currentPage, gridApi]);

  // const doesRowMatchFilter = (node: IRowNode) => {
  //   if (!filterText || !node.data) return true;

  //   const row = node.data;
  //   return Object.entries(row).some(([key, value]) => {
  //     // Skip boolean values
  //     if (typeof value === 'boolean') return false;

  //     // Skip the search if the value is null or undefined
  //     if (value == null) return false;

  //     // Convert to string and check for match
  //     return String(value).toLowerCase().includes(filterText.toLowerCase());
  //   });
  // };

  const handleQuickFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value)
    // setFilterText(value);
    // gridApi?.onFilterChanged();
  };

  const exportExcel = () => {
    gridApi?.exportDataAsExcel({
      fileName: 'export.xlsx'
    })
  }
  const exportAsCsv = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        fileName: `${title.replace(/\s+/g, '_')}_export.csv`,
        processCellCallback: (params) => {
          return params.value;
        }
      });
    }
  };
  // const getRowStyle = (params: any) => {
  //   console.log(" row style params:::", params)
  // };
  return (
    <>
      <CustomerViewModal viewDetails={viewDetails} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full">
        <div className="bg-white rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-medium text-gray-800">{title}</h2>
            <a href="/customer-add" className="px-[0.8rem] py-[0.5rem] text-[0.9rem] font-medium text-accoreBlue rounded-sm border-2">
              + Add Customer
            </a>
          </div>

          <div className="mb-4 flex  gap-[2rem] w-full">
            <input
              type="text"
              placeholder="Search..."
              onChange={handleQuickFilter}
              className="w-[80%] px-4 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />
            {dropDownArray && (
              <DropdownMultiSelect
                title="view"
                dataArray={dropDownArray}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            <div>
              <button onClick={() => exportAsCsv()} className="h-full cursor-pointer px-[0.5rem] text-gray-600 rounded-lg border-2">
                Export as Excel
              </button>
            </div>
          </div>

          {rows ? <div>
            <div className="ag-theme-alpine" style={{ width: "100%" }}>
              <AgGridReact
                rowData={rows}
                columnDefs={visibleColumnDefs}
                defaultColDef={defaultColDef}
                // pagination={pagination}
                paginationAutoPageSize
                // paginationPageSize={10}
                // paginationPageSizeSelector={pageSizeList}
                onGridReady={onGridReady}
                domLayout="autoHeight"
                animateRows={true}
              // isExternalFilterPresent={() => true}
              // doesExternalFilterPass={doesRowMatchFilter}
              // onPaginationChanged={() => {
              //   if (gridApi && pagination) {
              //     setCurrentPage(gridApi.paginationGetCurrentPage() + 1);
              //   }
              // }}
              />
            </div>
            {pagination && (
              <div className="flex justify-between items-center mt-4">
                <div>
                  Showing page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
                  >
                    First
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
                  >
                    Last
                  </button>
                </div>
              </div>
            )}
          </div> : <div className="flex justify-center items-center h-full w-full">Loading....</div>}
        </div>
      </div>
    </>
  );
};

export default DynamicAgGrid;
