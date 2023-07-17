import { ReactNode, useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import DetailPortalContext from "@/context/detailPortalContext";

/**
 * This hook renders another React root into the element with the id `#detail-portal-target`.
 * It means that selectors and contexts are not reachable from within the child. Provide all
 * needed data to the portal child through the props.
 */
export default function useDetailPortal(originKey: string): {
  isVisible: boolean;
  openPortal: (childToRender: ReactNode) => void;
  closePortal: () => void;
} {
  const portalTargetElement = document.getElementById("detail-portal-target");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { key, setKey } = useContext(DetailPortalContext);

  useEffect(() => {
    setIsVisible(key === originKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  function closePortal() {
    if (!portalTargetElement) return;
    portalTargetElement.innerHTML = "";
    setKey(null);
    setIsVisible(false);
  }

  function openPortal(childToRender: ReactNode): void {
    if (!portalTargetElement) return;
    closePortal();

    createRoot(portalTargetElement).render(childToRender);
    setKey(originKey);
    setIsVisible(true);
  }

  return {
    isVisible,
    openPortal,
    closePortal,
  };
}
