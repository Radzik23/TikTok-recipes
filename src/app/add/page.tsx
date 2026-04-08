"use client";

import { useState } from "react";
import { Wand2, Link as LinkIcon, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddRecipe() {
  // Stany przechowujące link i informację, czy aplikacja "myśli"
  const [url, setUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Funkcja odpalana po kliknięciu przycisku
  const handleGenerate = () => {
    if (!url) return;
    setIsGenerating(true);
    
    // W przyszłości tu wyślemy link do naszego API z AI.
    // Na razie symulujemy 3 sekundy ładowania i wyłączamy.
    setTimeout(() => {
      setIsGenerating(false);
      setUrl(""); // Czyścimy pole po "sukcesie"
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center pt-8 pb-6 px-4 min-h-[80vh]">
      
      {/* Nagłówek */}
      <h1 className="text-[22px] font-bold mb-10 tracking-tight">Dodaj Przepis</h1>

      {/* Ikona dekoracyjna (Magiczna Różdżka) */}
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-10 shadow-sm border border-muted-foreground/10">
        <Wand2 size={32} className="text-muted-foreground" />
      </div>

      {/* Formularz */}
      <div className="w-full space-y-8 flex flex-col items-center">
        
        {/* Pole tekstowe z ikonką w środku */}
        <div className="w-full space-y-2.5">
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">
            Link do wideo
          </label>
          <div className="relative">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="url"
              placeholder="Wklej tutaj link do TikToka..."
              className="pl-11 h-14 rounded-2xl bg-muted/40 border-muted-foreground/20 text-[15px] focus-visible:ring-[#4A5D4E]"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isGenerating}
            />
          </div>
        </div>

        {/* Przycisk Akcji */}
        <Button
          onClick={handleGenerate}
          disabled={!url || isGenerating}
          className="w-full h-14 rounded-2xl bg-[#4A5D4E] hover:bg-[#3a4a3d] text-white font-semibold text-base shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Analizowanie...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generuj Przepis
            </>
          )}
        </Button>
      </div>

      {/* Symulacja panelu ładowania (pojawia się tylko gdy isGenerating to true) */}
      {isGenerating && (
        <div className="mt-12 w-full bg-muted/40 border border-muted-foreground/10 rounded-3xl p-6 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center shadow-sm mb-5">
            <Loader2 size={24} className="text-[#4A5D4E] animate-spin" />
          </div>
          <h3 className="font-bold text-lg mb-2 tracking-tight">Analizuję wideo...</h3>
          <p className="text-sm text-muted-foreground leading-relaxed px-4">
            To może chwilę potrwać. Nasza AI wyciąga składniki i kroki przygotowania.
          </p>
          {/* Sztuczny pasek postępu (animowany) */}
          <div className="w-full h-1.5 bg-muted-foreground/20 rounded-full mt-6 overflow-hidden">
            <div className="h-full bg-[#4A5D4E] rounded-full w-1/2 animate-pulse"></div>
          </div>
        </div>
      )}

    </div>
  );
}