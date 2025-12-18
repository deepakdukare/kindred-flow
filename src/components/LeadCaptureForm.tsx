import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";

const LeadCaptureForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    companySize: "",
    industry: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://deepakdukare-n8n-free.hf.space/webhook/2125b178-8501-48d4-9bdc-a7b5bb690618/n8n-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            work_email: formData.email,
            company_name: formData.company,
            job_title: formData.jobTitle,
            company_size: formData.companySize,
            industry: formData.industry,
            message: formData.message,
            timestamp: new Date().toISOString(),
            source: window.location.origin,
          }),
        }
      );

      toast({
        title: "Thank you!",
        description: "We've received your information. Our team will reach out shortly.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        jobTitle: "",
        companySize: "",
        industry: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Ready to <span className="text-gradient">Automate Your Sales?</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Get started in minutes. No credit card required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  First Name *
                </label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                  className="bg-secondary border-border focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Last Name *
                </label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                  className="bg-secondary border-border focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Work Email *
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@company.com"
                className="bg-secondary border-border focus:border-primary"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Company Name *
                </label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Acme Inc."
                  className="bg-secondary border-border focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Job Title
                </label>
                <Input
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Sales Manager"
                  className="bg-secondary border-border focus:border-primary"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Company Size
                </label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Industry
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select industry</option>
                  <option value="saas">SaaS / Software</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="agency">Agency / Consulting</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about your sales challenges..."
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Get Started
                  <Send className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;
