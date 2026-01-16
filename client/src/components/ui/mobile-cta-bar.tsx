import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";

export function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-3 safe-area-bottom">
      <div className="max-w-lg mx-auto">
        <LeadForm trigger={
          <Button 
            className="w-full h-12 bg-gradient-to-r from-[#d4af37] to-[#e5c158] hover:from-[#c9a030] hover:to-[#d4af37] text-[#1a3830] font-bold text-sm shadow-md"
            data-testid="mobile-cta-quote"
          >
            <FileText className="w-4 h-4 mr-2" />
            Get Free Quote
          </Button>
        } />
      </div>
    </div>
  );
}
