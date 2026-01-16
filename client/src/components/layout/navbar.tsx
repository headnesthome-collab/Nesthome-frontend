import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@assets/2025-12-06_15.09.24_1765015104415.jpg";
import { LeadForm } from "@/components/forms/lead-form";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container flex h-16 sm:h-18 items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/">
            <span className="flex items-center gap-2 sm:gap-3 cursor-pointer">
              <img src={logo} alt="Nesthome Logo" className="h-10 sm:h-12 md:h-14 w-auto object-contain" />
              <div className="hidden sm:block">
                <h1 className="font-display text-lg sm:text-xl font-bold text-[#2d5a4a] leading-tight">Nesthome</h1>
                <p className="text-[10px] sm:text-xs text-[#d4af37] font-medium">Build Your Dream</p>
              </div>
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={cn(
                  "text-sm font-medium transition-all duration-300 cursor-pointer relative py-2",
                  location === link.href
                    ? "text-[#2d5a4a] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#d4af37]"
                    : "text-gray-600 hover:text-[#2d5a4a]"
                )}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a 
            href="tel:+917470404685" 
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2d5a4a] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#d4af37]" />
            <span className="hidden lg:inline">+91 7470404685</span>
          </a>
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <Link href="/partner-signup">
            <span className="text-sm font-medium text-gray-600 hover:text-[#2d5a4a] transition-colors cursor-pointer">
              Partner
            </span>
          </Link>
          <Button 
            size="sm" 
            onClick={() => setIsLeadFormOpen(true)}
            className="bg-[#2d5a4a] hover:bg-[#1f3a2c] text-white px-6"
          >
            Let's Build
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-1 sm:gap-2">
          <a 
            href="tel:+917470404685" 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2d5a4a]/10 hover:bg-[#2d5a4a]/20 transition-colors"
            aria-label="Call us"
          >
            <Phone className="w-4 h-4 text-[#2d5a4a]" />
          </a>
          <Button 
            onClick={() => setIsLeadFormOpen(true)}
            className="bg-[#d4af37] hover:bg-[#e5c158] text-[#2d5a4a] font-semibold text-xs px-3 h-10 min-h-[40px]"
          >
            Let's Build
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#2d5a4a] h-10 w-10 min-h-[40px] min-w-[40px]">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#2d5a4a] text-white border-none w-[300px]">
              <div className="flex flex-col h-full pt-8">
                <div className="flex items-center gap-3 mb-10">
                  <img src={logo} alt="Nesthome Logo" className="h-14 w-auto object-contain bg-white rounded-lg p-2" />
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">Nesthome</h2>
                    <p className="text-xs text-[#d4af37]">Build Your Dream</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <span
                        className={cn(
                          "block py-3 px-4 text-lg font-medium transition-colors rounded-lg cursor-pointer",
                          location === link.href
                            ? "bg-white/10 text-[#d4af37]"
                            : "text-white/90 hover:bg-white/5 hover:text-white"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </span>
                    </Link>
                  ))}
                  <Link href="/partner-signup">
                    <span 
                      className="block py-3 px-4 text-lg font-medium text-white/90 hover:bg-white/5 hover:text-white rounded-lg cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Partner with us
                    </span>
                  </Link>
                </div>

                <div className="mt-auto pb-8">
                  <div className="border-t border-white/20 pt-6 mb-6">
                    <a 
                      href="tel:+917470404685" 
                      className="flex items-center gap-3 text-white/90 hover:text-white transition-colors mb-3"
                    >
                      <Phone className="w-5 h-5 text-[#d4af37]" />
                      <span>+91 7470404685</span>
                    </a>
                  </div>
                  <Button 
                    className="w-full bg-[#d4af37] hover:bg-[#e5c158] text-[#2d5a4a] font-semibold py-6"
                    onClick={() => {
                      setIsOpen(false);
                      setIsLeadFormOpen(true);
                    }}
                  >
                    Let's Build
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <LeadForm open={isLeadFormOpen} onOpenChange={setIsLeadFormOpen} />
    </nav>
  );
}
