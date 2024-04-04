import classNames from "classnames";
import { InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className, ...rest }: IInput) {
  return (
    <input
      className={classNames(
        className,
        "bg-transparent w-full outline-0 border-0"
      )}
      {...rest}
    />
  );
}
