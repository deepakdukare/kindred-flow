import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { LayoutDashboard, FileText, MessageSquare, CreditCard, FolderOpen, Share2, LogOut, Menu, Users, Calendar, Settings, Search, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export const DashboardLayout = () => {
    const location = useLocation();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard, href: "/app" },
        { name: "Leads & Clients", icon: Users, href: "/app/leads" },
        { name: "Search Configuration", icon: Search, href: "/app/search-config" },
        { name: "Campaigns", icon: Share2, href: "/app/campaigns" },
        { name: "Meetings", icon: Calendar, href: "/app/meetings" },
        { name: "Proposals", icon: FileText, href: "/app/proposals" },
        { name: "Payments", icon: CreditCard, href: "/app/payments" },
        { name: "Delivery", icon: FolderOpen, href: "/app/deliverables" },
        { name: "Analytics", icon: LayoutDashboard, href: "/app/analytics" },
        { name: "Settings", icon: Settings, href: "/app/settings" },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 flex flex-col",
                isMobileOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-2xl font-serif font-bold">Cervoa<span className="text-primary">.</span></h2>
                </div>

                <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
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

                <div className="p-4 border-t border-white/10 mt-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-3 p-2 w-full hover:bg-white/5 rounded-lg transition-colors text-left outline-none group">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center font-bold text-xs text-white">
                                    DD
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-bold text-white truncate">Deepak Dukare</p>
                                    <p className="text-xs text-white/50 truncate">Admin</p>
                                </div>
                                <ChevronUp className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-card border-white/10">
                            <DropdownMenuItem asChild className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer">
                                <Link to="/" className="w-full flex items-center gap-2">
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
                {/* Mobile Header */}
                <header className="lg:hidden p-4 border-b border-white/10 flex items-center justify-between bg-card text-foreground">
                    <span className="font-bold">Dashboard</span>
                    <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
                        <Menu className="w-6 h-6" />
                    </button>
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
