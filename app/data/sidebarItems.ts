export const initialSidebarItems = [
  { title: "Chat", url: "/home", icon: "MessageCircle" },
  { title: "Santé", url: "/sante", icon: "Activity" },
  { title: "Santé Mentale", url: "/sante-mental", icon: "Activity" },
  { title: "Santé Physique", url: "/sante-physique", icon: "Activity" },
  {
    title: "Recette de Grand Mère",
    url: "/recette-de-grand-mere",
    icon: "BookOpen",
  },
  { title: "Notre équipe", url: "/equipe", icon: "Tag" },
  { title: "FeedBack", url: "/feedback", icon: "MessageCircle" },
];

export function addItem(newItem: {
  title: string;
  url: string;
  icon: string; // Changé pour accepter une chaîne de caractères
}) {
  initialSidebarItems.push({ ...newItem });
}

export function removeItem(title: string) {
  const index = initialSidebarItems.findIndex((item) => item.title === title);
  if (index !== -1) {
    initialSidebarItems.splice(index, 1);
  }
}
