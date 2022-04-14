import React, { createContext, useState } from "react";

export const FocusContext = createContext({
  isFocused: false,
  changeFocused: () => {throw new Error('setContext function must be overridden');}
});

export default function FocusProvider({ children }) {
  const [isFocused, setIsFocused] = useState(false);

  function changeFocused(status) {
    setIsFocused(status);
  }

  return(
    <FocusContext.Provider
      value={{
        isFocused,
        changeFocused: changeFocused
      }}
    >
      { children }
    </FocusContext.Provider>
  );
}