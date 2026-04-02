import { Children, Fragment, isValidElement, useEffect, type ReactNode } from "react";

type Props = { children?: ReactNode };

export const HelmetProvider = ({ children }: Props) => <>{children}</>;

export const Helmet = ({ children }: Props) => {
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const managedNodes: HTMLElement[] = [];

    for (const child of Children.toArray(children)) {
      if (!isValidElement(child)) {
        continue;
      }

      const tag = typeof child.type === "string" ? child.type : "";
      const props = child.props as Record<string, unknown>;

      if (tag === "title") {
        document.title = String(props.children ?? "");
        continue;
      }

      if (!["meta", "link", "script"].includes(tag)) {
        continue;
      }

      const element = document.createElement(tag);
      for (const [key, value] of Object.entries(props)) {
        if (key === "children") {
          if (tag === "script") {
            element.textContent = String(value ?? "");
          }
          continue;
        }

        if (typeof value === "undefined" || value === null) {
          continue;
        }

        element.setAttribute(key, String(value));
      }

      element.setAttribute("data-helmet-fallback", "true");
      document.head.appendChild(element);
      managedNodes.push(element);
    }

    return () => {
      for (const element of managedNodes) {
        element.remove();
      }
    };
  }, [children]);

  return <Fragment />;
};
