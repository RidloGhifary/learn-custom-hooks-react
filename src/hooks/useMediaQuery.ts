import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handelChange = (e: any) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handelChange);

    return () => {
      mediaQuery.removeEventListener("change", handelChange);
    };
  }, [query]);

  return matches;
};
