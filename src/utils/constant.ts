import { IconType } from "react-icons";

export const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const year = () => {
  const start_year = new Date().getFullYear();
  let allYears = [];
  for (let index = start_year; index > start_year - 17; index--) {
    allYears.push(index);
  }
  return allYears;
};

export const sizes = [
  "1 to 12",
  "13 to 49",
  "50 to 149",
  "150 to 249",
  "250 to 499",
  "500 to 749",
  "750 to 999",
  "1000+",
];

export const title = [
  "Admin",
  "HR/Talent Professional",
  "Manager/Head of Department",
  "Director/VP",
  "C-Level",
  "Business Owner",
  "Recruiting/Staffing Firm",
  "Other",
];

export const sidebarData = [
  {
    name: "Dasboard",
    link: "/employee",
    icon: 6,
  },
  {
    name: "Conversation",
    link: "/employee/conversation",
    icon: 1,
  },

  {
    title: "Recuritment",
    name: "Jobs",
    link: "/employee/job",
    icon: 2,
  },
  {
    name: "Candidates",
    link: "/employee/candidates",
    icon: 4,
  },

  {
    title: "Company",
    name: "Company Profile",
    link: "/employee/profile",
    icon: 3,
  },

  {
    name: "Setting",
    link: "/employee/setting",
    icon: 5,
  },
];

export const currency = {
  USD: "$",
  CAD: "$",
  NGN: "N",
  GBP: "€",
  AUD: "£",
};
export const frequently = {
  mo: "Monthly",
  yr: "Annually",
  wk: "Weekly",
  day: "Daily",
  hr: "Hourly",
};

export const yearOfExperience = (): number[] => {
  const years = 10;
  let allYears = [];
  for (let index = 1; index <= years; index++) {
    allYears.push(index);
  }
  return allYears;
};

export const statusColor: any = {
  "new applied": "bg-orange-500",
  decline: "bg-red-500",
  screening: "bg-indigo-500",
  interview: "bg-blue-500",
  offer: "bg-cyan-500",
  hired: "bg-green-500",
};
export const colorWheel: any = {
  0: "from-orange-500  via-orange-400 to-orange-500 hover:via-orange-400 hover:to-orange-400 ",
  1: "from-red-500 via-red-400 to-red-400 hover:via-red-400 hover:to-red-400/75",
  2: "from-indigo-500 via-indigo-400 to-indigo-300 hover:via-indigo-500 hover:to-indigo-500 hover:from-indigo-400",
  // 3: "from-cyan-500 to-cyan-300",
  // 4: "from-blue-500",
  // 5: "from-green-500",
};
export const colorWheelShadow: any = {
  0: "hover:shadow-orange-500/50",
  1: "hover:shadow-red-500/50",
  2: "hover:shadow-indigo-500/50",
  3: "hover:shadow-cyan-500/50",
  4: "hover:shadow-blue-500/50",
  5: "bg-green-500",
};
