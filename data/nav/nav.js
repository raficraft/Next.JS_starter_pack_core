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
    title: "Présentation",
    link: "/presentation",
    icon: <AccountCircle></AccountCircle>,
  },
  {
    title: "Soins",
    link: "/soins",
    icon: <EnergyIcon></EnergyIcon>,
    child: [
      {
        title: "Thérapie Energetique",
        link: "/soins/energie",
      },
      {
        title: "Soins de dégagement",
        link: "/soins/degagement",
      },
      {
        title: "Liens transgénérationelle",
        link: "/soins/transgenerationelle",
      },
      {
        title: "psychanaliste",
        link: "/soins/psychanaliste",
      },
      {
        title: "kinesiologie",
        link: "/soins/kinesiologie",
      },
      {
        title: "Electrosensible",
        link: "/soins/ondes",
      },
    ],
  },
  {
    title: "menhir",
    link: "/menhir",
    icon: <StoneIcon></StoneIcon>,
  },
  {
    title: "sourcier",
    link: "/sourcier",
    icon: <WaterOutline></WaterOutline>,
  },

  {
    title: "stage",
    link: "/stage",
    icon: <Learn_icon></Learn_icon>,
  },
];
