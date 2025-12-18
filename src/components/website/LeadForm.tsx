import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle } from "lucide-react";
import { submitLead, LeadData } from "../../lib/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { GlassCard } from "../ui/GlassCard";
import { cn } from "../../lib/utils";

const leadSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    companyName: z.string().min(2, "Company name is required"),
    jobTitle: z.string().min(2, "Job title is required"),
    companySize: z.string().min(1, "Please select company size"),
    industry: z.string().min(1, "Please select industry"),
    message: z.string().optional(),
});

export const LeadForm = ({ id }: { id?: string }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<LeadData>({
        resolver: zodResolver(leadSchema),
    });

    const onSubmit = async (data: LeadData) => {
        setIsSubmitting(true);
        const success = await submitLead(data);
        setIsSubmitting(false);
        if (success) {
            setIsSuccess(true);
            form.reset();
        }
    };

    if (isSuccess) {
        return (
            <GlassCard className="max-w-2xl mx-auto text-center py-16">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-4">You're on the list!</h3>
                <p className="text-white/60 text-lg mb-8">
                    Our AI is already analyzing your request. Keep an eye on your inbox—we'll be in touch shortly.
                </p>
                <Button
                    variant="outline"
                    onClick={() => setIsSuccess(false)}
                    className="border-white/10 hover:bg-white/5"
                >
                    Send another response
                </Button>
            </GlassCard>
        );
    }

    return (
        <section id={id || "contact"} className="py-20 px-6">
            <div className="container max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                        See Cervoa in <span className="text-gradient-gold">Action</span>
                    </h2>
                    <p className="text-white/60 text-lg">
                        Fill out the form below to trigger the automation pipeline.
                    </p>
                </div>

                <GlassCard className="p-8 md:p-10">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Input
                                    placeholder="First Name"
                                    {...form.register("firstName")}
                                    className={cn("bg-white/5 border-white/10 text-white placeholder:text-white/40",
                                        form.formState.errors.firstName && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {form.formState.errors.firstName && (
                                    <p className="text-xs text-red-500 pl-1">{form.formState.errors.firstName.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Input
                                    placeholder="Last Name"
                                    {...form.register("lastName")}
                                    className={cn("bg-white/5 border-white/10 text-white placeholder:text-white/40",
                                        form.formState.errors.lastName && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {form.formState.errors.lastName && (
                                    <p className="text-xs text-red-500 pl-1">{form.formState.errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Work Email"
                                {...form.register("email")}
                                className={cn("bg-white/5 border-white/10 text-white placeholder:text-white/40",
                                    form.formState.errors.email && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {form.formState.errors.email && (
                                <p className="text-xs text-red-500 pl-1">{form.formState.errors.email.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Input
                                    placeholder="Company Name"
                                    {...form.register("companyName")}
                                    className={cn("bg-white/5 border-white/10 text-white placeholder:text-white/40",
                                        form.formState.errors.companyName && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {form.formState.errors.companyName && (
                                    <p className="text-xs text-red-500 pl-1">{form.formState.errors.companyName.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Input
                                    placeholder="Job Title"
                                    {...form.register("jobTitle")}
                                    className={cn("bg-white/5 border-white/10 text-white placeholder:text-white/40",
                                        form.formState.errors.jobTitle && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {form.formState.errors.jobTitle && (
                                    <p className="text-xs text-red-500 pl-1">{form.formState.errors.jobTitle.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Select onValueChange={(val) => form.setValue("companySize", val)}>
                                    <SelectTrigger className="bg-white/5 border-white/10 text-white/80">
                                        <SelectValue placeholder="Company Size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1-10">1-10 Employees</SelectItem>
                                        <SelectItem value="11-50">11-50 Employees</SelectItem>
                                        <SelectItem value="51-200">51-200 Employees</SelectItem>
                                        <SelectItem value="201-500">201-500 Employees</SelectItem>
                                        <SelectItem value="500+">500+ Employees</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.companySize && (
                                    <p className="text-xs text-red-500 pl-1">{form.formState.errors.companySize.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Select onValueChange={(val) => form.setValue("industry", val)}>
                                    <SelectTrigger className="bg-white/5 border-white/10 text-white/80">
                                        <SelectValue placeholder="Industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="technology">Technology/SaaS</SelectItem>
                                        <SelectItem value="finance">Finance</SelectItem>
                                        <SelectItem value="healthcare">Healthcare</SelectItem>
                                        <SelectItem value="retail">Retail/E-commerce</SelectItem>
                                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.industry && (
                                    <p className="text-xs text-red-500 pl-1">{form.formState.errors.industry.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Textarea
                                placeholder="Any specific challenges you're facing?"
                                {...form.register("message")}
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[100px]"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 text-lg rounded-xl shadow-[0_0_20px_-5px_rgba(245,158,11,0.4)] transition-all hover:scale-[1.01]"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Get Started"
                            )}
                        </Button>

                        <p className="text-center text-xs text-white/30 pt-4">
                            By submitting this form, you trigger the "Lead Discovery" n8n workflow.
                        </p>
                    </form>
                </GlassCard>
            </div>
        </section>
    );
};
