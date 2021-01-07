import { useEffect, useState } from "react"

export default function useScrollPosition() {
  const [scrollTop, setScrollTop] = useState(window.pageYOffset);

  useEffect(() => {
    const onScroll = (e: Event) => {
      setScrollTop(window.pageYOffset);
    }

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrollTop;
}