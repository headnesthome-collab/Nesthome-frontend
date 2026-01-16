import { PROJECT_SNIPPETS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import image1 from "@assets/generated_images/completed_indian_bungalow.png";
import image2 from "@assets/generated_images/modern_indian_villa_exterior.png";
import image3 from "@assets/generated_images/elegant_duplex_home.png";

// Map IDs to imported images
const imageMap: Record<number, string> = {
  1: image1,
  2: image2,
  3: image3
};

export function ProjectSnippets() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Recent Projects</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Take a look at some of our recently completed homes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECT_SNIPPETS.map((project) => (
            <Card key={project.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={imageMap[project.id]} 
                  alt={project.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-slate-900 hover:bg-white">Verified</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-slate-600 font-medium mb-4">{project.description}</p>
                <div className="flex items-center justify-between text-sm text-slate-500 border-t pt-4">
                  <span>Completed on time</span>
                  <span>Indore</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
