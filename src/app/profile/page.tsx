import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

type ProfilePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const session = await auth();
  const params = await searchParams;
  const rawNext = params?.next;
  const nextPath = typeof rawNext === "string" ? rawNext : "/";

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm rounded-3xl border border-muted-foreground/10 bg-card p-6 text-center shadow-sm">
        {session?.user ? (
          <>
            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border border-muted-foreground/20 bg-muted">
              {session.user.image ? (
                // Używamy <img>, żeby uniknąć dodatkowej konfiguracji next/image dla zewnętrznych domen awatarów.
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "Awatar użytkownika"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-muted-foreground">
                  {(session.user.name ?? "U").slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
            <h1 className="mb-1 text-xl font-bold tracking-tight">Twój profil</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              {session.user.name ?? "Użytkownik GitHub"}
            </p>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/profile" });
              }}
            >
              <Button
                type="submit"
                className="h-11 w-full rounded-2xl bg-[#4A5D4E] text-white hover:bg-[#3a4a3d]"
              >
                Wyloguj
              </Button>
            </form>
          </>
        ) : (
          <>
            <h1 className="mb-2 text-xl font-bold tracking-tight">Profil</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              Zaloguj się, aby dodawać i zapisywać przepisy.
            </p>

            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: nextPath });
              }}
            >
              <Button
                type="submit"
                className="h-11 w-full rounded-2xl bg-[#4A5D4E] text-white hover:bg-[#3a4a3d]"
              >
                Zaloguj przez GitHub
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
