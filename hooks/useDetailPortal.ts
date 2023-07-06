import { ReactNode, ReactPortal, useState } from "react";
import { createPortal } from "react-dom";

export default function useDetailPortal() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [child, setChild] = useState<ReactNode>();
  const portalTargetElement = document.getElementById("detail-portal-target");

  function closePortal() {
    setIsVisible(false);
    setChild(undefined);
  }

  function openPortal(childToRender?: ReactNode): void {
    if (child) {
      closePortal();
    }

    if (childToRender) {
      setIsVisible(true);
      setChild(childToRender);
    }
  }

  function renderToPortal(): ReactPortal | null {
    if (!portalTargetElement) return null;
    if (!child) return null;

    return createPortal(child, portalTargetElement);
  }

  return { isVisible, openPortal, closePortal, renderToPortal };
}
