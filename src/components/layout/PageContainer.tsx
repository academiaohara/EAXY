import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerWidth = "lesson" | "content" | "wide";

const widthClasses: Record<ContainerWidth, string> = {
  lesson: "max-w-lesson",
  content: "max-w-content",
  wide: "max-w-wide",
};

interface PageContainerProps {
  children: ReactNode;
  as?: "main" | "div" | "section";
  width?: ContainerWidth;
  className?: string;
}

export function PageContainer({
  children,
  as: Component = "main",
  width = "content",
  className,
}: PageContainerProps) {
  return (
    <Component
      className={cn(
        "page-container mx-auto w-full",
        widthClasses[width],
        className,
      )}
    >
      {children}
    </Component>
  );
}
