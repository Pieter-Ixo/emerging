import { ReactNode, useState } from "react";
import { createRoot } from "react-dom/client";

const childState = {
  child: null as ReactNode,
  setChild: (a: ReactNode) => {
    childState.child = a;
  },
};

export default function useDetailPortal() {
  const portalTargetElement = document.getElementById("detail-portal-target");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function closePortal() {
    if (!portalTargetElement) return;
    portalTargetElement.innerHTML = "";
    setIsVisible(false);
  }

  function openPortal(childToRender: ReactNode): void {
    if (!portalTargetElement) return;
    closePortal();

    createRoot(portalTargetElement).render(childToRender);
    setIsVisible(true);
  }

  return { isVisible, openPortal, closePortal };
}
