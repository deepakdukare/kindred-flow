import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard = ({ children, className, hoverEffect = false }: GlassCardProps) => {
    return (
        <div
            className={cn(
                "glass-card rounded-xl p-6 transition-all duration-300",
                hoverEffect && "hover:bg-white/10 hover:scale-[1.02]",
                className
            )}
        >
            {children}
        </div>
    );
};
