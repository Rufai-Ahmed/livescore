"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { FC, PropsWithChildren } from "react";
import { persistor, store } from "../public/utils/store";

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
