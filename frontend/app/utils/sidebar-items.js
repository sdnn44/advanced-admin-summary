import { FaChartBar, FaBan } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

export const sidebarItems = [
  {
    id: 1,
    title: "Admin bans",
    icon: <FaBan size={20} />,
    link: "/",
  },
  {
    id: 2,
    title: "Admin playtime",
    icon: <FiClock size={20} />,
    link: "/section-playtime",
  },
  {
    id: 3,
    title: "Summary of players",
    icon: <FaChartBar size={20} />,
    link: "/section-summary",
  },
  {
    id: 4,
    title: "Settings",
    icon: <FaChartBar size={20} />,
    link: "/section-settings",
  },
];
