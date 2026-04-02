import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  name: string;
  path?: string;
  active?: boolean;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-2 text-xs md:text-sm font-medium", className)}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
            {item.active || !item.path ? (
              <span className="text-foreground font-semibold" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link to={item.path} className="text-muted-foreground hover:text-primary transition-colors">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
