import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { saveLead } from "@/lib/firebase";
import { apiUrl } from "@/lib/api-config";
import { Loader2, ArrowRight, CheckCircle, User, Phone, Calendar, Sparkles, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile"),
  city: z.string().min(1, "Select your city"),
  timeline: z.string().min(1, "Select timeline"),
});

const TIMELINE_OPTIONS = [
  { value: "within-1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "1-3 months" },
  { value: "3-6-months", label: "3-6 months" },
  { value: "exploring", label: "Just exploring" },
];

export function HeroLeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
      city: "",
      timeline: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const leadData = {
        name: String(values.name),
        mobile: String(values.mobile),
        city: String(values.city),
        timeline: String(values.timeline),
      };

      const newLead = {
        ...leadData,
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
        status: "New",
      };

      const existingLeads = JSON.parse(
        localStorage.getItem("nesthome_leads") || "[]"
      );
      const updatedLeads = [newLead, ...existingLeads];
      localStorage.setItem("nesthome_leads", JSON.stringify(updatedLeads));

      fetch(apiUrl("api/leads"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.googleSheetsSynced) {
            console.log("Lead synced to Google Sheets");
          }
        })
        .catch((err) => console.warn("Backend sync warning:", err));

      try {
        const firebasePromise = saveLead(leadData);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Firebase timeout")), 3000)
        );
        await Promise.race([firebasePromise, timeoutPromise]);
      } catch (firebaseError) {
        console.warn("Firebase sync failed (data saved locally):", firebaseError);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      form.reset();

      toast({
        title: "Thank you!",
        description: "Thank you for reaching out. You're one step closer — we'll contact you shortly.",
      });
    } catch (error) {
      console.error("Submit error:", error);
      setIsSubmitting(false);
      toast({ title: "Error submitting", variant: "destructive" });
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="backdrop-blur-xl bg-white/90 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/50 p-6 sm:p-8 w-full max-w-[360px] sm:max-w-sm text-center mx-auto"
        data-testid="hero-form-success"
      >
        <div className="mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-[#2d5a4a] font-display">
            Thank You!
          </h3>
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">
            Thank you for reaching out. You're one step closer — we'll contact you shortly.
          </p>
        </div>
        <Button
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="mt-4 rounded-full border-[#2d5a4a] text-[#2d5a4a] hover:bg-[#2d5a4a] hover:text-white px-6"
          data-testid="hero-form-submit-another"
        >
          Submit Another Enquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="backdrop-blur-xl bg-white/95 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.2)] border border-white/40 p-6 sm:p-8 w-full max-w-[360px] sm:max-w-sm mx-auto relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#d4af37]/20 to-transparent rounded-full blur-2xl -mr-10 -mt-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#2d5a4a]/10 to-transparent rounded-full blur-xl -ml-8 -mb-8" />
      
      <div className="relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/10 text-[#b8962e] text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3 h-3" />
            Free Consultation
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#2d5a4a] font-display">
            Get Free Quote
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Takes less than 30 seconds
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="sm:col-span-1">
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Your Name"
                          className="h-12 pl-11 text-base bg-gray-50/80 border-gray-200/80 rounded-2xl focus:border-[#d4af37] focus:ring-[#d4af37]/20 focus:bg-white transition-all"
                          data-testid="hero-input-name"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs ml-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="sm:col-span-1">
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Mobile Number"
                          className="h-12 pl-11 text-base bg-gray-50/80 border-gray-200/80 rounded-2xl focus:border-[#d4af37] focus:ring-[#d4af37]/20 focus:bg-white transition-all"
                          data-testid="hero-input-mobile"
                          maxLength={10}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs ml-1" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger 
                        className="h-12 text-base bg-gray-50/80 border-gray-200/80 rounded-2xl focus:border-[#d4af37] focus:ring-[#d4af37]/20 focus:bg-white transition-all pl-4"
                        data-testid="hero-select-city"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <SelectValue placeholder="Your City" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Indore" className="rounded-lg">
                        Indore
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs ml-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger 
                        className="h-12 text-base bg-gray-50/80 border-gray-200/80 rounded-2xl focus:border-[#d4af37] focus:ring-[#d4af37]/20 focus:bg-white transition-all pl-4"
                        data-testid="hero-select-timeline"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <SelectValue placeholder="When do you plan to start?" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl">
                      {TIMELINE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="rounded-lg">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs ml-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-base font-bold bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#d4af37] hover:from-[#e5c158] hover:via-[#d4af37] hover:to-[#e5c158] text-[#1a3830] shadow-lg shadow-[#d4af37]/25 transition-all duration-300 rounded-2xl bg-[length:200%_100%] hover:bg-right"
              data-testid="hero-submit-button"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Get Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>

            <p className="text-xs text-gray-400 text-center">
              We'll call you to discuss your project
            </p>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
