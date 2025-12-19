import { useState } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { Loader2, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { startApolloSearch } from "../../lib/api";
import { PageHeader } from "../../components/dashboard/PageHeader";

export const SearchConfigurationView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const [formData, setFormData] = useState({
        industry: "SaaS",
        companySize: "100",
        location: "",
        jobTitles: "",
        leadLimit: 100
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Convert to payload formatting (snake_case and arrays)
        const payload = {
            industry: formData.industry,
            company_size: formData.companySize,
            location: formData.location,
            job_titles: formData.jobTitles.split(",").map(t => t.trim()).filter(t => t), // simple split by comma
            daily_limit: formData.leadLimit
        };

        const success = await startApolloSearch(payload);
        setIsLoading(false);

        if (success) {
            setIsSearching(true);
            // Simulate polling update
            setTimeout(() => {
                alert("Apollo Search triggered successfully! Check 'Leads & Clients' for results.");
            }, 1000);
        } else {
            alert("Failed to start lead search. Please try again.");
        }
    };



    return (
        <div className="space-y-8">
            <PageHeader
                subtitle="Search Configuration"
                helperText="Configure lead search parameters to find your perfect leads."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Configuration Form - Larger Section */}
                <div className="lg:col-span-2">
                    <GlassCard className="p-8">
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <Search className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Lead Search Configuration</h3>
                                <p className="text-sm text-white/50">Define your ideal customer profile (ICP)</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Industry Dropdown */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Industry</label>
                                <Select
                                    value={formData.industry}
                                    onValueChange={(val) => setFormData({ ...formData, industry: val })}
                                >
                                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                        <SelectValue placeholder="Select Industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SaaS">SaaS</SelectItem>
                                        <SelectItem value="B2B Services">B2B Services</SelectItem>
                                        <SelectItem value="FinTech">FinTech</SelectItem>
                                        <SelectItem value="HealthTech">HealthTech</SelectItem>
                                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Company Size Dropdown */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Company Size</label>
                                <Select
                                    value={formData.companySize}
                                    onValueChange={(val) => setFormData({ ...formData, companySize: val })}
                                >
                                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                        <SelectValue placeholder="Select Company Size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="100">100</SelectItem>
                                        <SelectItem value="500">500</SelectItem>
                                        <SelectItem value="1000">1000</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Location</label>
                                <Input
                                    placeholder="e.g. United States, London"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>

                            {/* Job Titles */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Job Titles (Comma separated)</label>
                                <Input
                                    placeholder="e.g. CEO, Founder, VP Sales"
                                    value={formData.jobTitles}
                                    onChange={(e) => setFormData({ ...formData, jobTitles: e.target.value })}
                                    required
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>

                            {/* Daily Lead Limit */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Daily Lead Limit</label>
                                <Input
                                    type="number"
                                    value={formData.leadLimit}
                                    onChange={(e) => setFormData({ ...formData, leadLimit: parseInt(e.target.value) || 0 })}
                                    required
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full font-bold py-6 text-lg bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20"
                                disabled={isLoading || isSearching}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Connecting...
                                    </>
                                ) : isSearching ? (
                                    "Search Running..."
                                ) : (
                                    "Start Search"
                                )}
                            </Button>

                            {isSearching && (
                                <div className="bg-white/5 p-4 rounded-lg space-y-2 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex items-center gap-2 text-sm text-green-400">
                                        <Loader2 className="w-3 h-3 animate-spin" /> Search running...
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-white/40">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> 29 qualified leads found
                                    </div>
                                </div>
                            )}
                        </form>
                    </GlassCard>
                </div>

                {/* Recent Lead Searches - Smaller Sidebar Section */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-lg font-bold px-1">Recent Searches</h3>
                    <div className="space-y-3">
                        {[
                            { date: "Just now", criteria: "SaaS • CEO • US", status: "In Progress", results: "-" },
                            { date: "2 hours ago", criteria: "FinTech • Founder • London", status: "Completed", results: "142 Leads" },
                            { date: "Yesterday", criteria: "B2B Services • VP Sales • US", status: "Completed", results: "89 Leads" },
                        ].map((search, i) => (
                            <GlassCard key={i} className="p-4 space-y-2">
                                <div className="flex justify-between items-start">
                                    <p className="font-bold text-sm text-white">{search.criteria}</p>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${search.status === "In Progress" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-green-500/10 text-green-400 border-green-500/20"}`}>
                                        {search.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-end text-xs text-white/40">
                                    <span>{search.date}</span>
                                    <span>{search.results}</span>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
