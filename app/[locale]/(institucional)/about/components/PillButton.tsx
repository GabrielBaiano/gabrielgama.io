import React from "react";

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "glass" | "solid" | "outline";
    children: React.ReactNode;
}

export function PillButton({ variant = "glass", children, className = "", ...props }: PillButtonProps) {
    const baseClasses = "rounded-full px-5 py-2 text-[15px] font-medium tracking-tight transition-all duration-300 flex items-center justify-center gap-1.5 shrink-0";
    
    let variantClasses = "";
    if (variant === "glass") {
        variantClasses = "bg-white/15 text-white hover:bg-white/20 active:bg-white/25 backdrop-blur-sm";
    } else if (variant === "solid") {
        variantClasses = "bg-white text-stone-900 hover:bg-stone-200 active:bg-stone-300 shadow-sm";
    } else if (variant === "outline") {
        variantClasses = "border border-white/20 text-white hover:bg-white/10 active:bg-white/15";
    }

    return (
        <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
            {children}
        </button>
    );
}
