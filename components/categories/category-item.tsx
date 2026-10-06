import { cn, hexToRgba } from "@/lib/utils";
import { Category } from "@/lib/types";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import EditCategoryButton from "./buttons/edit-category-button";
import DeleteCategoryButton from "./buttons/delete-category-button ";

interface CategoryIconProps extends Category, Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "id"> { }

export default function CategoryItem({ id, name, color, icon, type, className, ...props }: CategoryIconProps) {
  return (
    <Card className={cn("flex-row justify-start items-center gap-3 p-3 rounded-md group", className)} {...props}>
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
        <div className="text-sm font-medium min-h-[1.5em]">
          {name}
        </div>

        <Badge variant={"secondary"}>
          <span className="first-letter:uppercase">
            {type}
          </span>
        </Badge>
      </div>

      {
        id !== "preview" && (
          <div className="ml-auto opacity-0 group-hover:opacity-100 duration-200">
            <EditCategoryButton category={{ id, name, color, icon, type }}></EditCategoryButton>

            <DeleteCategoryButton category={{ id, name, color, icon, type }}></DeleteCategoryButton>
          </div>
        )
      }

    </Card>
  )
}