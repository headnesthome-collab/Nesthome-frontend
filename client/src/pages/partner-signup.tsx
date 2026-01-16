import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/seo";

export default function PartnerSignup() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Received",
      description: "Thanks for your interest. Our team will review your profile and contact you.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-24 flex items-center justify-center">
      <SEO 
        title="Partner With Us" 
        description="Join Nesthome's network of verified contractors, architects, and material suppliers. Apply now to become a partner."
      />
      <div className="container px-4 md:px-6 max-w-lg">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold font-display">Partner with Nesthome</CardTitle>
            <CardDescription>
              Join our network of verified contractors and architects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" required placeholder="Construction Co." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Person</Label>
                <Input id="contact" required placeholder="Your Name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" required type="tel" placeholder="9876543210" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" required type="email" placeholder="partner@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input id="specialization" placeholder="e.g. Civil Contractor, Architect, Interior" />
              </div>

              <Button type="submit" className="w-full">Submit Application</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
