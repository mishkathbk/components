import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
const tableData = [
  {
    no: "1",
    name: "unknown",
    salary: "$250.00",
    job: "unknown",
  },
  {
    no: "2",
    name: "unknown",
    salary: "$150.00",
    job: "unknown",
  },
  {
    no: "3",
    name: "unknown",
    salary: "$350.00",
    job: "unknown",
  },
  {
    no: "4",
    name: "unknown",
    salary: "$450.00",
    job: "unknown",
  },
  {
    no: "5",
    name: "unknown",
    salary: "$550.00",
    job: "unknown",
  },
  {
    no: "6",
    name: "unknown",
    salary: "$200.00",
    job: "unknown",
  },
  {
    no: "7",
    name: "unknown",
    salary: "$300.00",
    job: "unknown",
  },
];

export function NormalTable() {
  const totalSalary = tableData.reduce((acc, data) => {
    const amount = parseFloat(data.salary.replace(/[^0-9.-]+/g, ""));
    return acc + amount;
  }, 0);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">NO</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>JOB</TableHead>
          <TableHead className="text-right">SALARY</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((data) => (
          <TableRow key={data.no}>
            <TableCell className="font-medium">{data.no}</TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.job}</TableCell>
            <TableCell className="text-right">{data.salary}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>TOTAL</TableCell>
          <TableCell className="text-right">${totalSalary.toFixed(2)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
