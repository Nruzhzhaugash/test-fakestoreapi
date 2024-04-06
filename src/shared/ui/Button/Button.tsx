import classNames from "classnames";
import IButton from "./props";

export default function Buttob({ className, children, ...rest }: IButton) {
  return (
    <button
      className={classNames(className, "outline-none border-none")}
      {...rest}
    >
      {children}
    </button>
  );
}
