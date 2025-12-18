import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { LayoutDashboard, FileText, MessageSquare, CreditCard, FolderOpen, Share2, LogOut, Menu } from "lucide-react";
import { useState } from "react";

export const DashboardLayout = () => {
    const location = useLocation();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navItems = [
        { name: "Overview", icon: LayoutDashboard, href: "/app" },
        { name: "Deliverables", icon: FolderOpen, href: "/app/deliverables" },
        { name: "Proposals", icon: FileText, href: "/app/proposals" },
        { name: "Payments", icon: CreditCard, href: "/app/payments" },
        { name: "Messages", icon: MessageSquare, href: "/app/messages" },
        { name: "Social", icon: Share2, href: "/app/social" },
        { name: "Analytics", icon: LayoutDashboard, href: "/app/analytics" },
    ];

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 lg:static",
                isMobileOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-2xl font-serif font-bold">Cervoa<span className="text-primary">.</span></h2>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto border-t border-white/10 absolute bottom-0 w-full">
                    <button className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white w-full text-sm font-medium">
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="lg:hidden p-4 border-b border-white/10 flex items-center justify-between bg-card text-foreground">
                    <span className="font-bold">Dashboard</span>
                    <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                {/* Header Desktop (optional, simple profile) */}
                <header className="hidden lg:flex p-6 justify-end items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold">Deepak Dukare</p>
                            <p className="text-xs text-white/50">Admin</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-amber-600" />
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </div>
    );
};
