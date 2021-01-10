import { useEffect, useState } from "react";

// A key value used to fix hydration issues in the build version of Gatsby
// https://github.com/gatsbyjs/gatsby/issues/14601
// https://github.com/gatsbyjs/gatsby/discussions/17914
export default function useHydrationFixer(prefix = "") {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const key = (isClient) ? `${prefix}client` : `${prefix}server`;
  return key;
}