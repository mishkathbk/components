import React, { useEffect, useState } from 'react';
import DynamicAgGrid from '@/components/tables/DynamicAgGrid';
import { CustomerServicesApi } from '@/modules/sales/customer/services/CustomerServices';

const limit = 10;
const CustomerPage = () => {
    const [customerData, setCustomerData] = useState<any>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [search, setSearch] = useState<string>("");
    console.log("search::::",search)
    const [pageSize, setPageSize] = useState(10);

    const getCustomerApi = async (currentPage: number): Promise<any> => {
        const offset = (currentPage - 1) * limit;
        try {
            const response = await CustomerServicesApi.CustomerListPagination({
                "offset": offset,
                "limit": limit,
                "search": search,
                "isExpired": 0,
                "filterList": [
                ]
            }
            );
            console.log("customer response::::::", response);
            setCustomerData(response?.result || []);
            setPageSize(response?.responseDetails?.pageSize || 10)
            setTotalItems(response?.responseDetails?.totalCount || 0);

        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };
    useEffect(() => {
        getCustomerApi(currentPage);

    }, [currentPage,search]);
    console.log("customerData:::::", customerData)
    console.log("currentPage:::::::;", currentPage)

    const onPageChange = async (newPage: number) => {
        const totalPages = Math.ceil(totalItems / limit);
        if (newPage < 1 || newPage > totalPages) return;
        await getCustomerApi(newPage);
        console.log("newPage:::::::", newPage)
        setCurrentPage(newPage); // This MUST come after successful fetch
    };
    return (
        <div>
            <DynamicAgGrid rowData={customerData} pageSize={pageSize} currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={totalItems} onPageChange={onPageChange} setSearch={setSearch} />
        </div>
    );
};

export default CustomerPage;
