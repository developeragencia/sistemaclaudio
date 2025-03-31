import { cn } from "@/lib/utils";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-3",
  lg: "w-12 h-12 border-4",
};

const LoadingSpinner = ({
  size = "md",
  className,
  ...props
}: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-primary border-t-transparent",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="sr-only">Carregando...</span>
    </div>
  );
};

export default LoadingSpinner; 