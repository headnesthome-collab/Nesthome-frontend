import { MapPin } from "lucide-react";

export function CityAvailability() {
  return (
    <section className="py-12 bg-white border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-blue-50 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-primary flex-shrink-0">
              <MapPin className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Currently serving in Indore</h3>
              <p className="text-slate-600">We are expanding rapidly to other Tier-2 cities.</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Coming Soon To</p>
            <div className="flex gap-4 font-medium text-slate-700">
              <span>Bhopal</span>
              <span className="text-slate-300">•</span>
              <span>Ujjain</span>
              <span className="text-slate-300">•</span>
              <span>Dewas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
