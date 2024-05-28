"use client";

import { createContext, ReactNode, useState } from "react";

type TabType = "rec" | "fol";

export const TabContext = createContext({
  tab: "rec",
  setTab: (value: TabType) => {},
});

interface TabProvider {
  children: ReactNode;
}

const TabProvider = ({ children }: TabProvider) => {
  const [tab, setTab] = useState<TabType>("rec");

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
};

export default TabProvider;
