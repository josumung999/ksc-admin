import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";

function AutoFormLabel({
  label,
  isRequired,
  className,
}: {
  label: string;
  isRequired: boolean;
  className?: string;
}) {
  return (
    <>
      <FormLabel className={cn(className)}>
        {label}
        {isRequired && <span className="text-red-500 dark:text-red-900"> *</span>}
      </FormLabel>
    </>
  );
}

export default AutoFormLabel;
