"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function getRecipes() {
  return prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      time: true,
      difficulty: true,
      image: true,
      createdAt: true,
    },
  })
}

export async function getRecipeById(id: string) {
  return prisma.recipe.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      time: true,
      difficulty: true,
      image: true,
      ingredients: true,
      steps: true,
      createdAt: true,
      originalUrl: true,
    },
  })
}

export async function createTestRecipe(formData: FormData) {
  const session = await auth()
  const userId = (session?.user as { id?: string } | undefined)?.id

  if (!userId) {
    redirect("/profile?next=/add")
  }

  const originalUrl = String(formData.get("url") ?? "").trim()
  if (!originalUrl) {
    throw new Error("Link do wideo jest wymagany.")
  }

  await prisma.recipe.create({
    data: {
      userId,
      originalUrl,
      title: "Testowy przepis z TikToka",
      time: "15 min",
      difficulty: "Łatwe",
      image:
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1200&auto=format&fit=crop",
      ingredients: ["2 jajka", "100 g mąki", "200 ml mleka", "Szczypta soli"],
      steps: [
        "Wymieszaj wszystkie składniki w misce.",
        "Rozgrzej patelnię na średnim ogniu.",
        "Wylej porcję ciasta i smaż z obu stron.",
        "Podawaj od razu po usmażeniu.",
      ],
    },
  })

  revalidatePath("/")
  redirect("/")
}
