import { cn, hexToRgba } from "@/lib/utils";
import { Button } from "../ui/button";
import { Category } from "@/lib/types";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

interface CategoryIconProps extends Category, Omit<React.HTMLAttributes<HTMLDivElement>, "color"> { }

export default function CategoryItem({ name, color, icon, type, className, ...props }: CategoryIconProps) {
  return (
    <Card className={cn("flex-row justify-start items-center gap-3 p-3 rounded-md", className)} {...props}>
      <div
        className="flex justify-center items-center size-9 rounded-lg"
        style={{
          backgroundColor: hexToRgba(color, 0.2),
          color: color
        }}
      >
        <DynamicIcon size={18} name={icon as IconName} />
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="text-sm font-medium">
          {name}
        </div>

        <Badge variant={"secondary"}>
          <span className="first-letter:uppercase">
            {type}
          </span>
        </Badge>
      </div>

    </Card>
  )
}