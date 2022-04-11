import { Home_icon } from "../../public/assets/icons/Icon_svg";

export const nav = [
  {
    title: "Acceuil",
    link: "/",
    icon: <Home_icon></Home_icon>,
  },
  {
    title: "Projet",
    link: "#project",
    icon: null,
  },

  {
    title: "Features",
    link: "#features",
    icon: null,
    child: [
      {
        title: "Features",
        link: "#features",
        icon: null,
      },
    ],
  },
  {
    title: "Parcours",
    link: "#parcours",
    icon: null,
  },
];
