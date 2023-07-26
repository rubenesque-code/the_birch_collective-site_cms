import { useState } from "react";

export const useFocused = () => {
  const [isFocused, setIsFocused] = useState(false);

  return [
    isFocused,
    {
      setIsFocused,
      focusHandlers: {
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
      },
    },
  ] as const;
};
