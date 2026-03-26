import React from "react";

interface SmartWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function SmartWidget({ children, className = "", ...props }: SmartWidgetProps) {
    return (
        <div 
            className={`w-full bg-[#121212] rounded-[32px] p-6 sm:p-8 flex flex-col relative overflow-hidden shadow-xl ${className}`}
            {...props}
        >
            {/* Subtle gradient overlay for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
            
            {/* Inner Content */}
            <div className="relative z-10 w-full h-full flex flex-col">
                {children}
            </div>
        </div>
    );
}
