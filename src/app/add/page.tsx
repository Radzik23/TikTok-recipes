import { Wand2, Link as LinkIcon, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTestRecipe } from "@/actions/recipe";

export default function AddRecipe() {
  return (
    <div className="flex flex-col items-center pt-8 pb-6 px-4 min-h-[80vh]">
      
      {/* Nagłówek */}
      <h1 className="text-[22px] font-bold mb-10 tracking-tight">Dodaj Przepis</h1>

      {/* Ikona dekoracyjna (Magiczna Różdżka) */}
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-10 shadow-sm border border-muted-foreground/10">
        <Wand2 size={32} className="text-muted-foreground" />
      </div>

      {/* Formularz */}
      <form action={createTestRecipe} className="w-full space-y-8 flex flex-col items-center">
        
        {/* Pole tekstowe z ikonką w środku */}
        <div className="w-full space-y-2.5">
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">
            Link do wideo
          </label>
          <div className="relative">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              name="url"
              type="url"
              placeholder="Wklej tutaj link do TikToka..."
              className="pl-11 h-14 rounded-2xl bg-muted/40 border-muted-foreground/20 text-[15px] focus-visible:ring-[#4A5D4E]"
              required
            />
          </div>
        </div>

        {/* Przycisk Akcji */}
        <Button
          type="submit"
          className="w-full h-14 rounded-2xl bg-[#4A5D4E] hover:bg-[#3a4a3d] text-white font-semibold text-base shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          <>
            <Sparkles size={20} />
            Generuj i zapisz testowy przepis
          </>
        </Button>
      </form>

      <div className="mt-12 w-full bg-muted/40 border border-muted-foreground/10 rounded-3xl p-6 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center shadow-sm mb-5">
          <Loader2 size={24} className="text-[#4A5D4E]" />
        </div>
        <h3 className="font-bold text-lg mb-2 tracking-tight">Tryb testowy zapisu</h3>
        <p className="text-sm text-muted-foreground leading-relaxed px-4">
          Po kliknięciu przycisku zapiszemy przykładowy przepis do bazy i przekierujemy Cię na stronę główną.
        </p>
      </div>

    </div>
  );
}