import { CircleAlert } from "lucide-react";
import * as React from "react";

interface EmptyPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
}

export function EmptyPlaceholder({
  className,
  children,
  height,
  ...props
}: EmptyPlaceholderProps) {
  return (
    <div
      className={`animate-in fade-in-50 flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center
      ${height ? height : "min-h-[400px]"}
      ${className}`}
      {...props}
    >
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

interface EmptyPlaceholderIconProps extends React.SVGProps<SVGSVGElement> {}

EmptyPlaceholder.Icon = function EmptyPlaceHolderIcon({
  className,
}: EmptyPlaceholderIconProps) {
  return (
    <div className="bg-muted flex h-32 w-32 items-center justify-center rounded-full">
      <CircleAlert className={`h-24 w-24 ${className}`} />
    </div>
  );
};

interface EmptyPlacholderTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
  className,
  ...props
}: EmptyPlacholderTitleProps) {
  return (
    <h2 className={`mt-6 text-xl font-semibold ${className}`} {...props} />
  );
};

interface EmptyPlacholderDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
  className,
  ...props
}: EmptyPlacholderDescriptionProps) {
  return (
    <p
      className={`text-muted-foreground mb-8 mt-2 text-center text-sm font-normal leading-6 ${className}`}
      {...props}
    />
  );
};
