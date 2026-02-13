import { cn, getTechLogos } from "@/lib/utils";
import Image from "next/image";

export const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack);

  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "group relative flex items-center justify-center rounded-full bg-gray-200 p-2 dark:bg-gray-700",
            index >= 1 && "-ml-3",
          )}
        >
          <span className="absolute bottom-full mb-1 hidden rounded-md bg-gray-700 px-2 py-1 text-xs text-white shadow-md group-hover:flex">
            {tech}
          </span>
          <Image
            src={url}
            alt={tech}
            width={100}
            height={100}
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
};
