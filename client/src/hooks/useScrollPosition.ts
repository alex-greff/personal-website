import { useEffect, useState } from "react";
import * as Utilities from "@/utilities";

export default function useScrollPosition() {
  const [scrollTop, setScrollTop] = useState(
    !Utilities.isSSR ? window.pageYOffset : 0
  );

  useEffect(() => {
    const onScroll = (e: Event) => {
      setScrollTop(!Utilities.isSSR ? window.pageYOffset : 0);
    };

    if (!Utilities.isSSR) window.addEventListener("scroll", onScroll);

    return () => {
      if (!Utilities.isSSR) window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrollTop;
}
