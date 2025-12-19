import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button"; // Assuming standard shadcn button exists or we style basic buttons
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "Process", href: "#process" },
        { name: "Pricing", href: "#pricing" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-4 shadow-lg"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="text-2xl font-bold font-serif tracking-tight">
                    Cervoa<span className="text-primary">.</span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-white/80 hover:text-primary transition-colors text-sm font-medium"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* CTAs */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        to="/login"
                        className="text-sm font-medium text-white hover:text-primary transition-colors"
                    >
                        Login
                    </Link>
                    <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-full font-medium transition-all shadow-lg hover:shadow-primary/25 text-sm">
                        Get Started
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 animate-accordion-down">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-white/90 hover:text-primary py-2 text-lg font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="h-px bg-white/10 my-2" />
                    <Link
                        to="/login"
                        className="text-white/90 hover:text-primary py-2 text-lg font-medium"
                    >
                        Login
                    </Link>
                    <button className="bg-primary text-primary-foreground w-full py-3 rounded-lg font-bold">
                        Get Started
                    </button>
                </div>
            )}
        </nav>
    );
};
