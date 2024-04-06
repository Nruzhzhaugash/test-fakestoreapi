"use client";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useAppSelector } from "@/shared/lib/reduxHooks";

const ListEditProductPage = () => {
  const {
    create: { products },
  } = useAppSelector((state) => state);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(({ id, title, price, description }) => (
            <TableRow key={id}>
              <TableCell>{title}</TableCell>
              <TableCell>{price}</TableCell>
              <TableCell>{description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListEditProductPage;
