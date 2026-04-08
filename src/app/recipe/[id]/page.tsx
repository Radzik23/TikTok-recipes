import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, ChefHat, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sztuczne dane (na razie wyświetlamy to samo niezależnie od tego, co klikniemy)
const RECIPE_DATA = {
  title: "Spaghetti Bolognese z TikToka",
  time: "20 min",
  difficulty: "Łatwe",
  image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=800&auto=format&fit=crop",
  ingredients: [
    "200g makaronu spaghetti",
    "300g mięsa mielonego wołowego",
    "1 średnia cebula",
    "2 ząbki czosnku",
    "Puszka krojonych pomidorów (400g)",
    "Sól, pieprz, suszone oregano",
    "Łyżka oliwy z oliwek",
    "Tarty parmezan do posypania"
  ],
  steps: [
    "Ugotuj makaron al dente w osolonej wodzie. Koniecznie zachowaj pół szklanki wody z gotowania do sosu.",
    "Na rozgrzanej oliwie zeszklij drobno posiekaną cebulę, a pod koniec dodaj przeciśnięty przez praskę czosnek.",
    "Dodaj mięso mielone na patelnię. Smaż na średnim ogniu, aż całkowicie zmieni kolor na brązowy.",
    "Wlej pomidory z puszki, dodaj przyprawy. Zmniejsz ogień i duś pod przykryciem przez około 15 minut.",
    "Połącz sos z ugotowanym makaronem na patelni. Dodaj odrobinę wody z makaronu, aby sos stał się jedwabisty i dobrze oblepił kluski."
  ]
};

// W Next.js 15 parametry to Promise, więc musimy użyć async/await
export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    // Używamy ujemnych marginesów (-mx-4 -mt-4), żeby zignorować padding z layoutu 
    // i rozciągnąć zdjęcie na samą górę i boki ekranu
    <div className="flex flex-col pb-6 -mx-4 -mt-4">
      
      {/* Zdjęcie w tle i przyciski akcji na nim */}
      <div className="relative h-64 w-full">
        <Image
          src={RECIPE_DATA.image}
          alt={RECIPE_DATA.title}
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
          <h1 className="text-[26px] font-bold leading-tight mb-4 tracking-tight">{RECIPE_DATA.title}</h1>
          <div className="flex gap-5 text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5"><Clock size={18} className="text-[#4A5D4E]" /> {RECIPE_DATA.time}</span>
            <span className="flex items-center gap-1.5"><ChefHat size={18} className="text-[#4A5D4E]" /> {RECIPE_DATA.difficulty}</span>
          </div>
        </div>

        {/* Sekcja: Składniki */}
        <div>
          <div className="flex justify-between items-end mb-5">
            <h2 className="text-xl font-bold tracking-tight">Składniki</h2>
            <span className="text-xs text-muted-foreground font-medium">Dla 2 osób</span>
          </div>
          <ul className="space-y-3.5">
            {RECIPE_DATA.ingredients.map((item, idx) => (
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
            {RECIPE_DATA.steps.map((step, idx) => (
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