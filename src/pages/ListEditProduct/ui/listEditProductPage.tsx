"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Link from "next/link";
import { useAppSelector } from "@/shared/lib/reduxHooks";

const ListEditProductPage = () => {
  const createProducts = useAppSelector((state) => state.create.products);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {createProducts.map(({ id, title, price, description }) => (
            <TableRow key={id}>
              <TableCell>{title}</TableCell>
              <TableCell>{price}</TableCell>
              <TableCell>{description}</TableCell>
              <TableCell>
                <Link
                  href={`/updateproduct/${id}`}
                  className="hover:underline text-md"
                >
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListEditProductPage;
