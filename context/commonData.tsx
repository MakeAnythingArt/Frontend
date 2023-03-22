import React, { createContext, useState } from 'react';

const CommonDataContext: any = createContext<any>({});

const CommonDataProvider = (props: any) => {
  const [blueprintData, setBlueprintData] = useState<any>();

  return (
    <CommonDataContext.Provider value={{ blueprintData, setBlueprintData }}>
      {props.children}
    </CommonDataContext.Provider>
  );
};

export { CommonDataProvider, CommonDataContext };
