"use client";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./store";
import { useRef } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const storeRef = useRef<AppStore>();

  if(!storeRef.current) {
    storeRef.current = makeStore()
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
