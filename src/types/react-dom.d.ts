declare module "react-dom" {
  export * from "react-dom/client";
  export const createPortal: (children: React.ReactNode, container: Element | DocumentFragment) => React.ReactPortal;
}

declare module "react-dom/client" {
  import type { Root } from "react-dom/client";
  export function createRoot(container: Element | null): Root;
}
