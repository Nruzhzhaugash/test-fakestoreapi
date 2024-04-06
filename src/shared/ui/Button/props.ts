import { ButtonHTMLAttributes, ReactNode } from "react";

export default interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string;
  className?: string;
}