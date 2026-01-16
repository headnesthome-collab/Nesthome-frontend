import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { saveLead } from "@/lib/firebase";
import { apiUrl } from "@/lib/api-config";

const CITIES = [
  "Indore",
];

const TIMELINE_OPTIONS = [
  { value: "within-1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "1-3 months" },
  { value: "3-6-months", label: "3-6 months" },
  { value: "exploring", label: "Just exploring" },
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  mobile: z.string()
    .min(10, "Mobile must be at least 10 digits")
    .max(15, "Mobile number too long")
    .regex(/^[0-9\s\-\+\(\)]+$/, "Please enter a valid mobile number"),
  city: z.string().min(1, "Please select your city"),
  timeline: z.string().min(1, "Please select when you plan to start"),
});

interface LeadFormProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function LeadForm({ trigger, open, onOpenChange }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const show = open !== undefined ? open : isOpen;
  const setShow = onOpenChange || setIsOpen;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      mobile: "",
      city: "",
      timeline: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("FORM SUBMIT TRIGGERED");
    setIsSubmitting(true);
    
    try {
      const leadData = {
        name: String(values.name || "N/A"),
        mobile: String(values.mobile || "N/A"),
        city: String(values.city || "N/A"),
        timeline: String(values.timeline || "N/A"),
      };

      const newLead = {
        ...leadData,
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
        status: "New"
      };
      
      const existingLeads = JSON.parse(localStorage.getItem("nesthome_leads") || "[]");
      const updatedLeads = [newLead, ...existingLeads];
      localStorage.setItem("nesthome_leads", JSON.stringify(updatedLeads));
      console.log("✅ LEAD SAVED TO LOCALSTORAGE:", updatedLeads);
      
      fetch(apiUrl("api/leads"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead)
      }).then(res => res.json())
        .then(data => {
          if (data.googleSheetsSynced) {
            console.log("✅ LEAD SYNCED TO GOOGLE SHEETS");
          } else {
            console.log("⚠️ Google Sheets sync pending");
          }
        })
        .catch(err => console.warn("Backend sync warning:", err));
      
      try {
        const firebasePromise = saveLead(leadData);
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Firebase timeout")), 3000)
        );
        
        await Promise.race([firebasePromise, timeoutPromise]);
        console.log("✅ LEAD ALSO SAVED TO FIREBASE");
      } catch (firebaseError) {
        console.warn("Firebase sync failed (data saved locally):", firebaseError);
      }
      
      setIsSubmitting(false);
      setShow(false);
      form.reset();
      
      toast({
        title: "Thank You!",
        description: "Thank you for reaching out. You're one step closer — we'll contact you shortly.",
      });
    } catch (error) {
      console.error("Submit error:", error);
      setIsSubmitting(false);
      toast({ title: "Error submitting" });
    }
  }

  return (
    <Dialog open={show} onOpenChange={setShow}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Get Your Free Quote</DialogTitle>
          <DialogDescription className="text-center text-sm">
            Takes less than 30 seconds
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your name" 
                      {...field} 
                      data-testid="input-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="9876543210" 
                      type="tel" 
                      {...field} 
                      data-testid="input-mobile"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-city">
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CITIES.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When do you plan to start?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-timeline">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TIMELINE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full text-base h-12 bg-gradient-to-r from-[#d4af37] to-[#e5c158] hover:from-[#c9a030] hover:to-[#d4af37] text-[#1a3830] font-bold" 
              disabled={isSubmitting}
              data-testid="button-submit-lead"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Get Free Quote"
              )}
            </Button>
            
            <p className="text-xs text-center text-gray-500">
              We'll call you to discuss your project
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
