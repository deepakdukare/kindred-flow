import { ReactNode } from "react";
import { GlassCard } from "../ui/GlassCard";

interface PageHeaderProps {
    title?: string;
    subtitle: string;
    helperText?: string;
    children?: ReactNode;
}

export const PageHeader = ({
    title,
    subtitle,
    helperText,
    children
}: PageHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-8">
            <div>
                {title && <h1 className="text-sm font-bold text-primary tracking-wide uppercase mb-1">{title}</h1>}
                <h2 className="text-3xl font-bold text-white mb-2">{subtitle}</h2>
                {helperText && (
                    <p className="text-white/50 text-sm max-w-xl">{helperText}</p>
                )}
            </div>
            {children && (
                <div className="flex items-center gap-3">
                    {children}
                </div>
            )}
        </div>
    );
};
