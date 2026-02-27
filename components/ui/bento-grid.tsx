import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className || ""
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    onClick,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <motion.div
            whileHover={{ scale: 0.98, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                "row-span-1 rounded-2xl group/bento transition duration-200 shadow-input dark:shadow-none p-6 dark:bg-zinc-900 bg-white border border-transparent dark:border-white/[0.2] justify-between flex flex-col space-y-4 cursor-pointer overflow-hidden relative",
                className || ""
            )}
        >
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200 relative z-10">
                {icon}
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </motion.div>
    );
};
