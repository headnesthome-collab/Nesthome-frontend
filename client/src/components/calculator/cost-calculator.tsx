import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Home, Building2, Sparkles, Star, Crown, ArrowRight, RotateCcw, CheckCircle2, IndianRupee } from "lucide-react";

interface CostEstimate {
  totalCost: number;
  minCost: number;
  maxCost: number;
  builtUpArea: number;
  costPerSqft: number;
}

const CONSTRUCTION_RATES = {
  standard: { 
    min: 1400, 
    max: 1800, 
    label: "Standard", 
    description: "Quality construction with essential finishes",
    icon: Home,
    color: "from-gray-400 to-gray-500",
    includes: ["Branded cement (Ultratech/ACC)", "ISI-marked steel", "Standard tiles & fittings", "Basic electrical & plumbing"]
  },
  premium: { 
    min: 1800, 
    max: 2500, 
    label: "Premium", 
    description: "Premium materials & modern finishes",
    icon: Star,
    color: "from-blue-400 to-blue-600",
    includes: ["Premium cement & steel", "Vitrified tiles & modern fittings", "Modular electrical switches", "Quality bathroom fixtures"]
  },
  luxury: { 
    min: 2500, 
    max: 3500, 
    label: "Luxury", 
    description: "Top-tier materials & designer finishes",
    icon: Crown,
    color: "from-[#d4af37] to-[#b8962e]",
    includes: ["Top-brand materials throughout", "Italian marble/wooden flooring", "Designer fixtures & fittings", "Smart home provisions"]
  }
};

const FLOOR_MULTIPLIERS: Record<string, number> = {
  "G": 1,
  "G+1": 1.85,
  "G+2": 2.7,
  "G+3": 3.5
};

export function CostCalculator({ onGetQuote }: { onGetQuote?: (data: { plotSize: string; floors: string; quality: string; estimate: string }) => void }) {
  const [plotSize, setPlotSize] = useState("");
  const [floors, setFloors] = useState("");
  const [quality, setQuality] = useState("");
  const [estimate, setEstimate] = useState<CostEstimate | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculateCost = () => {
    if (!plotSize || !floors || !quality) return;

    const plotSqft = parseInt(plotSize);
    const floorMultiplier = FLOOR_MULTIPLIERS[floors] || 1;
    const rates = CONSTRUCTION_RATES[quality as keyof typeof CONSTRUCTION_RATES];

    const builtUpArea = Math.round(plotSqft * floorMultiplier * 0.7);
    const minCost = builtUpArea * rates.min;
    const maxCost = builtUpArea * rates.max;
    const avgCost = (minCost + maxCost) / 2;

    setEstimate({
      totalCost: avgCost,
      minCost,
      maxCost,
      builtUpArea,
      costPerSqft: (rates.min + rates.max) / 2
    });
    setShowResult(true);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleGetQuote = () => {
    if (onGetQuote && estimate) {
      onGetQuote({
        plotSize,
        floors,
        quality,
        estimate: `${formatCurrency(estimate.minCost)} - ${formatCurrency(estimate.maxCost)}`
      });
    }
  };

  const resetCalculator = () => {
    setShowResult(false);
    setEstimate(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto" data-testid="cost-calculator">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Visual */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Decorative Background */}
            <div className="absolute -top-8 -left-8 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#2d5a4a]/10 rounded-full blur-3xl" />
            
            {/* Main Visual Card */}
            <div className="relative bg-gradient-to-br from-[#2d5a4a] to-[#1f3a2c] rounded-3xl p-8 text-white overflow-hidden">
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              <div className="relative z-10">
                {/* Calculator Icon */}
                <div className="w-16 h-16 bg-[#d4af37] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Calculator className="w-8 h-8 text-[#2d5a4a]" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">Instant Cost Estimate</h3>
                <p className="text-white/70 mb-8 leading-relaxed">
                  Get an accurate construction cost estimate for your dream home in just 30 seconds. No signup required.
                </p>
                
                {/* Trust Points */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-2xl font-bold text-[#d4af37]">Free</p>
                    <p className="text-white/60 text-sm">No Hidden Charges</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-2xl font-bold text-[#d4af37]">Instant</p>
                    <p className="text-white/60 text-sm">Results in Seconds</p>
                  </div>
                </div>
                
                {/* Features */}
                <div className="mt-8 space-y-3">
                  {[
                    "Accurate cost breakdowns",
                    "Includes all construction phases",
                    "Customized for your requirements"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Calculator Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2d5a4a] to-[#3d7a6a] px-6 py-5 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d4af37] rounded-xl flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-[#2d5a4a]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Instant Cost Calculator</h3>
                  <p className="text-white/70 text-sm">Get estimate in 30 seconds</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Plot Size Input */}
                    <div className="space-y-2">
                      <Label htmlFor="plotSize" className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2">
                        <span className="w-5 h-5 sm:w-6 sm:h-6 bg-[#2d5a4a]/10 rounded-full flex items-center justify-center text-xs font-bold text-[#2d5a4a]">1</span>
                        Plot Size
                      </Label>
                      <div className="relative">
                        <Input
                          id="plotSize"
                          type="number"
                          placeholder="Enter your plot area"
                          value={plotSize}
                          onChange={(e) => setPlotSize(e.target.value)}
                          className="h-12 sm:h-14 text-base sm:text-lg pl-4 pr-16 border-2 border-gray-200 focus:border-[#2d5a4a] focus:ring-[#2d5a4a] rounded-xl"
                          data-testid="input-plot-size"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base font-medium">sq.ft</span>
                      </div>
                    </div>

                    {/* Number of Floors */}
                    <div className="space-y-2">
                      <Label className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2">
                        <span className="w-5 h-5 sm:w-6 sm:h-6 bg-[#2d5a4a]/10 rounded-full flex items-center justify-center text-xs font-bold text-[#2d5a4a]">2</span>
                        Number of Floors
                      </Label>
                      <Select value={floors} onValueChange={setFloors}>
                        <SelectTrigger className="h-12 sm:h-14 text-base sm:text-lg border-2 border-gray-200 focus:border-[#2d5a4a] rounded-xl" data-testid="select-floors">
                          <SelectValue placeholder="Select floors" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="G">
                            <div className="flex items-center gap-3 py-1">
                              <Home className="h-5 w-5 text-[#2d5a4a]" /> 
                              <span>Ground Floor Only</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="G+1">
                            <div className="flex items-center gap-3 py-1">
                              <Building2 className="h-5 w-5 text-[#2d5a4a]" /> 
                              <span>G + 1 Floor</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="G+2">
                            <div className="flex items-center gap-3 py-1">
                              <Building2 className="h-5 w-5 text-[#2d5a4a]" /> 
                              <span>G + 2 Floors</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="G+3">
                            <div className="flex items-center gap-3 py-1">
                              <Building2 className="h-5 w-5 text-[#2d5a4a]" /> 
                              <span>G + 3 Floors</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Construction Quality */}
                    <div className="space-y-2 sm:space-y-3">
                      <Label className="text-sm sm:text-base font-semibold text-gray-700 flex items-center gap-2">
                        <span className="w-5 h-5 sm:w-6 sm:h-6 bg-[#2d5a4a]/10 rounded-full flex items-center justify-center text-xs font-bold text-[#2d5a4a]">3</span>
                        Construction Quality
                      </Label>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {Object.entries(CONSTRUCTION_RATES).map(([key, value]) => {
                          const Icon = value.icon;
                          const isSelected = quality === key;
                          return (
                            <motion.button
                              key={key}
                              type="button"
                              onClick={() => setQuality(key)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative p-2.5 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all text-center sm:text-left overflow-hidden ${
                                isSelected 
                                  ? 'border-[#2d5a4a] bg-[#2d5a4a] text-white shadow-lg' 
                                  : 'border-gray-200 hover:border-[#2d5a4a]/50 bg-white'
                              }`}
                              data-testid={`button-quality-${key}`}
                            >
                              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-1.5 sm:mb-3 mx-auto sm:mx-0 ${
                                isSelected ? 'bg-white/20' : `bg-gradient-to-br ${value.color}`
                              }`}>
                                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isSelected ? 'text-white' : 'text-white'}`} />
                              </div>
                              <p className={`font-bold text-xs sm:text-base ${isSelected ? 'text-white' : 'text-gray-800'}`}>{value.label}</p>
                              <p className={`text-[10px] sm:text-xs mt-0.5 sm:mt-1 ${isSelected ? 'text-white/70' : 'text-gray-500'} hidden sm:block`}>
                                ₹{value.min.toLocaleString()} - ₹{value.max.toLocaleString()}/sqft
                              </p>
                            </motion.button>
                          );
                        })}
                      </div>
                      
                      {/* Quality Helper Text */}
                      <AnimatePresence mode="wait">
                        {quality && (
                          <motion.div
                            key={quality}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                            data-testid="quality-helper-text"
                          >
                            <p className="text-xs font-semibold text-[#2d5a4a] mb-2">
                              {CONSTRUCTION_RATES[quality as keyof typeof CONSTRUCTION_RATES].label} includes:
                            </p>
                            <div className="grid grid-cols-2 gap-1.5">
                              {CONSTRUCTION_RATES[quality as keyof typeof CONSTRUCTION_RATES].includes.map((item, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3 h-3 text-[#d4af37] flex-shrink-0" />
                                  <span className="text-[11px] text-gray-600">{item}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Calculate Button */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Button 
                        onClick={calculateCost}
                        disabled={!plotSize || !floors || !quality}
                        className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold bg-gradient-to-r from-[#d4af37] to-[#e5c158] hover:from-[#e5c158] hover:to-[#d4af37] text-[#1a3830] shadow-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        data-testid="button-calculate"
                      >
                        Calculate My Cost
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : estimate && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                    {/* Main Estimate */}
                    <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-[#2d5a4a] to-[#1f3a2c] rounded-xl sm:rounded-2xl text-white">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                        <IndianRupee className="w-6 h-6 sm:w-7 sm:h-7 text-[#2d5a4a]" />
                      </div>
                      <p className="text-white/70 text-xs sm:text-sm mb-1 sm:mb-2">Estimated Construction Cost</p>
                      <motion.p 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-xl sm:text-3xl md:text-4xl font-bold text-[#d4af37]" 
                        data-testid="text-estimate-range"
                      >
                        {formatCurrency(estimate.minCost)} - {formatCurrency(estimate.maxCost)}
                      </motion.p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                      <div className="p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl border border-gray-200">
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#2d5a4a]/10 rounded-lg flex items-center justify-center">
                            <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#2d5a4a]" />
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">Built-up Area</p>
                        <p className="text-base sm:text-xl font-bold text-[#2d5a4a]">{estimate.builtUpArea.toLocaleString()} <span className="text-xs sm:text-sm font-normal">sq.ft</span></p>
                      </div>
                      <div className="p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl border border-gray-200">
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#2d5a4a]/10 rounded-lg flex items-center justify-center">
                            <IndianRupee className="w-3 h-3 sm:w-4 sm:h-4 text-[#2d5a4a]" />
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">Rate per sq.ft</p>
                        <p className="text-base sm:text-xl font-bold text-[#2d5a4a]">₹{estimate.costPerSqft.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Includes List */}
                    <div className="p-3 sm:p-4 bg-[#d4af37]/10 rounded-lg sm:rounded-xl border border-[#d4af37]/30">
                      <p className="font-semibold text-[#2d5a4a] text-sm sm:text-base mb-2 sm:mb-3">This estimate includes:</p>
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                        {[
                          "Complete construction",
                          "Electrical & plumbing",
                          "Flooring & painting",
                          "Doors & windows"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-1.5 sm:gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2d5a4a] flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-600">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 sm:gap-3">
                      <Button 
                        variant="outline" 
                        onClick={resetCalculator}
                        className="flex-1 h-11 sm:h-12 text-sm sm:text-base border-2 border-gray-200 hover:border-[#2d5a4a] rounded-lg sm:rounded-xl"
                        data-testid="button-recalculate"
                      >
                        <RotateCcw className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Recalculate
                      </Button>
                      <Button 
                        onClick={handleGetQuote}
                        className="flex-1 h-11 sm:h-12 text-sm sm:text-base bg-gradient-to-r from-[#d4af37] to-[#e5c158] hover:from-[#e5c158] hover:to-[#d4af37] text-[#1a3830] font-bold rounded-lg sm:rounded-xl shadow-lg"
                        data-testid="button-get-quote"
                      >
                        Get Quote
                        <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                    </div>

                    <p className="text-xs text-center text-gray-400">
                      Our expert will provide an exact quote based on your specific requirements
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
