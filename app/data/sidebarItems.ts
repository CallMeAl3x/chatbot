export const initialSidebarItems = [
  { title: "Chat", url: "/home", icon: "MessageCircle" },
  { title: "Santé", url: "/sante", icon: "Newspaper" },
  { title: "Informatique", url: "/informatique", icon: "Newspaper" },
  { title: "Langues", url: "/langues", icon: "Newspaper" },
  { title: "Notre équipe", url: "/equipe", icon: "Tag" },
  { title: "FeedBack", url: "/feedback", icon: "MessageCircle" },
  { title: "Cerveau", url: "/cerveau", icon: "Brain" }
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
