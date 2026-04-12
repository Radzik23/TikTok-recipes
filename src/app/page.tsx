import Image from "next/image";
import Link from "next/link";
import { Heart, Search, Menu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRecipes } from "@/actions/recipe";

const FILTERS = ["Wszystkie", "Obiad", "Desery", "Szybkie"];

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <div className="flex flex-col gap-6 pt-2 pb-6">
      
      {/* Górny pasek z ikonkami (imitacja) */}
      <div className="flex justify-between items-center px-2 text-muted-foreground">
        <Menu size={20} className="cursor-pointer hover:text-foreground" />
        <span className="font-semibold text-foreground text-sm tracking-wide">Moja Książka Kucharska</span>
        <Search size={20} className="cursor-pointer hover:text-foreground" />
      </div>

      {/* Nagłówek i filtry */}
      <div>
        <h1 className="text-2xl font-bold mb-4 px-2 tracking-tight">Dzisiejsze Inspiracje</h1>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-2">
          {FILTERS.map((filter, index) => (
            <Badge 
              key={filter} 
              variant={index === 0 ? "default" : "secondary"}
              className={`rounded-full px-4 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                index === 0 ? "bg-[#4A5D4E] hover:bg-[#3a4a3d] text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      {/* Lista przepisów */}
      <div className="flex flex-col gap-5 px-2">
        {recipes.length === 0 ? (
          <Card className="rounded-3xl border border-dashed border-muted-foreground/20 bg-muted/30 shadow-none">
            <CardContent className="p-8 text-center">
              <h2 className="text-lg font-semibold mb-2">Brak przepisów</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Dodaj pierwszy przepis z TikToka, aby zobaczyć go na liście.
              </p>
              <Link
                href="/add"
                className="inline-flex items-center justify-center rounded-full bg-[#4A5D4E] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#3a4a3d]"
              >
                Dodaj przepis
              </Link>
            </CardContent>
          </Card>
        ) : (
          recipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow rounded-3xl bg-card">
            <div className="relative h-52 w-full">
              <Image 
                src={recipe.image || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1200&auto=format&fit=crop"} 
                alt={recipe.title} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h2 className="font-bold text-lg leading-tight line-clamp-2 pr-4">
                  {recipe.title}
                </h2>
                <Heart size={22} className="text-muted-foreground hover:text-red-500 cursor-pointer shrink-0 mt-0.5 transition-colors" />
              </div>
              
              <div className="flex justify-between items-end mt-2">
                <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                  {recipe.time || "Brak czasu"} • {recipe.difficulty || "Brak poziomu"}
                </p>
                {/* Przycisk przejścia do szczegółów */}
                <Link href={`/recipe/${recipe.id}`}>
                  <button className="bg-[#4A5D4E] hover:bg-[#3a4a3d] transition-colors text-white rounded-full text-xs font-semibold px-5 py-2.5">
                    Zrób to!
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))
        )}
      </div>

    </div>
  );
}