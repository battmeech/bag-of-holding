import { createContext, FC, ReactNode, useContext, useState } from "react";

export type View = "quest" | "item";

type ViewProviderValue = {
  view: View;
  changeView: (view: View) => void;
};

const ViewContext = createContext<ViewProviderValue>({
  view: "item",
  changeView: () => {},
});

export const ViewProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [view, changeView] = useState<View>("item");

  const value: ViewProviderValue = {
    view,
    changeView,
  };

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
};

export const useViewProvider = () => useContext(ViewContext);
