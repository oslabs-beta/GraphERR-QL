import { createContext, useState } from 'react';

export const GraphContext = createContext();

export const GraphContextProvider = (props) => {
  const [info, setInfo] = useState({
    uri: '',
    body: '',
    response: '',
  });

  return <GraphContext.Provider value={[info, setInfo]}>{props.children}</GraphContext.Provider>;
};