import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ChefHat, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRecipeById } from "@/actions/recipe";

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

// W Next.js 15 parametry to Promise, więc musimy użyć async/await
export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  const ingredients = toStringArray(recipe.ingredients);
  const steps = toStringArray(recipe.steps);
  const imageUrl =
    recipe.image ||
    "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1200&auto=format&fit=crop";

  return (
    // Używamy ujemnych marginesów (-mx-4 -mt-4), żeby zignorować padding z layoutu 
    // i rozciągnąć zdjęcie na samą górę i boki ekranu
    <div className="flex flex-col pb-6 -mx-4 -mt-4">
      
      {/* Zdjęcie w tle i przyciski akcji na nim */}
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
        />
        {/* Ciemny gradient na górze, żeby białe ikonki były lepiej widoczne */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent"></div>
        
        {/* Przycisk Powrotu */}
        <Link href="/" className="absolute top-6 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        
        {/* Przycisk Edycji (na zdjęciu) */}
        <div className="absolute top-6 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors cursor-pointer">
          <PenLine size={20} />
        </div>
      </div>

      {/* Kontener z treścią nachodzący na zdjęcie */}
      <div className="px-5 pt-6 bg-background rounded-t-[32px] -mt-8 relative z-10 flex flex-col gap-8 shadow-[0_-8px_15px_rgba(0,0,0,0.05)]">
        
        {/* Nagłówek: Tagi, Tytuł i Czas */}
        <div>
          <div className="flex gap-2 mb-3">
             <span className="bg-muted text-[10px] font-bold px-2.5 py-1 rounded-md text-muted-foreground tracking-wider">TIKTOK EDITION</span>
             <span className="bg-muted text-[10px] font-bold px-2.5 py-1 rounded-md text-muted-foreground tracking-wider">ITALIAN</span>
          </div>
          <h1 className="text-[26px] font-bold leading-tight mb-4 tracking-tight">{recipe.title}</h1>
          <div className="flex gap-5 text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5"><Clock size={18} className="text-[#4A5D4E]" /> {recipe.time || "Brak czasu"}</span>
            <span className="flex items-center gap-1.5"><ChefHat size={18} className="text-[#4A5D4E]" /> {recipe.difficulty || "Brak poziomu"}</span>
          </div>
        </div>

        {/* Sekcja: Składniki */}
        <div>
          <div className="flex justify-between items-end mb-5">
            <h2 className="text-xl font-bold tracking-tight">Składniki</h2>
            <span className="text-xs text-muted-foreground font-medium">Dla 2 osób</span>
          </div>
          <ul className="space-y-3.5">
            {ingredients.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3.5 text-[15px] leading-snug">
                <div className="w-2 h-2 bg-[#4A5D4E] rounded-full mt-1.5 shrink-0"></div>
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sekcja: Kroki przygotowania */}
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-5">Przygotowanie</h2>
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-5">
                <span className="text-4xl font-black text-muted-foreground/30 shrink-0 leading-none mt-1">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="text-[15px] leading-relaxed text-foreground/90">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dodatkowy przycisk edycji na dole */}
        <div className="flex justify-center mt-2 mb-6">
           <Button variant="secondary" className="rounded-full text-sm px-6 h-12 bg-muted hover:bg-muted/80 text-foreground font-semibold">
             <PenLine size={16} className="mr-2" /> Edytuj ten przepis
           </Button>
        </div>

      </div>
    </div>
  );
}