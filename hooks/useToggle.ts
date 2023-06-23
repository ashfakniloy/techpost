import { useState, useRef, useEffect } from "react";

function useToggle() {
  const [toggle, setToggle] = useState(false);
  const node = useRef<HTMLDivElement>(null);

  const clickOutside = (e: MouseEvent) => {
    if (node?.current?.contains(e.target as Node)) {
      return;
    }
    setToggle(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return { toggle, setToggle, node };
}

export default useToggle;
