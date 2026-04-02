import { unitsConfig } from "./units.config";

export type NavigationItem = {
  label: string;
  path: string;
  children?: NavigationItem[];
};

export const navigationConfig: NavigationItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Leadership", path: "/leadership" },
  { label: "Capabilities", path: "/capabilities" },
  { label: "Infrastructure", path: "/infrastructure" },
  { label: "Industries", path: "/industries" },
  {
    label: "Our Units",
    path: "/units",
    children: [{ label: "All Units", path: "/units" }, ...unitsConfig.map((unit) => ({ label: unit.name, path: `/units/${unit.id}` }))],
  },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export const quickLinksConfig = navigationConfig.filter((item) => item.label !== "Home");
