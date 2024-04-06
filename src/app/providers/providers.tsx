"use client";
import { Provider } from "react-redux";
import store from "../../shared/model/store";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
