import {
  EnergyIcon,
  Learn_icon,
  StoneIcon,
  WaterOutline,
  AccountCircle,
  Home_icon,
} from "../../public/assets/icons/Icon_svg";

export const nav = [
  {
    title: "Acceuil",
    link: "/",
    icon: <Home_icon></Home_icon>,
  },

  {
    title: "Demo",
    link: "/demo",
    icon: null,
    child: [
      {
        title: "Navigation",
        link: "/navigation",
      },
      {
        title: "Guide.js",
        link: "/guides",
      },
      {
        title: "Radial Chart",
        link: "/guides",
      },
    ],
  },

  {
    title: "Parcours",
    link: "/parcours",
    icon: null,
  },
  {
    title: "Projet",
    link: "/parcours",
    icon: null,
  },
];
