// Central place to edit menu items
import type { LucideIcon } from "lucide-react";
import {
  Clock4,
  Download,
  Gamepad2,
  Grid2x2,
  LifeBuoy,
  MessageSquare,
  Settings,
  SquareGanttChart,
  Upload,
  Users,
  Wallet,
} from "lucide-react";

export type NavChild = { label: string; sublabel?: string; href: string };
export type NavItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  badge?: "new" | number;
  children?: NavChild[];
  section?: "default" | "bottom";
};

export const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: Grid2x2, href: "/dashboard" },
  { key: "users", label: "All Users", icon: Users, href: "/users" },
  { key: "agents", label: "All Agents", icon: Users, href: "/agents" },

  {
    key: "deposits",
    label: "Deposits",
    icon: Download,

    children: [
      { label: "All Deposits", href: "/deposits/all" },
      {
        label: "Manual Deposits",
        href: "/deposits/manual",
      },
      {
        label: " Agent Manual Deposits",
        href: "/manual-float",
      },
    ],
  },

  {
    key: "withdraw",
    label: "Withdrawals",
    icon: Upload,

    children: [
      { label: "All Withdrawals", href: "/withdrawals/all" },
      {
        label: "Pending Withdrawals",
        href: "/withdrawals/pending",
      },
    ],
  },

  {
    key: "games",
    label: "Games Management",
    icon: Gamepad2,

    children: [
      { label: "All Games", href: "/casino-games" },
      { label: "Categories", href: "/games/categories" },
    ],
  },

  {
    key: "wallet",
    label: "Wallet",
    icon: Wallet,

    children: [
      { label: "P2P", href: "/wallet/p2p" },
      {
        label: "Internal Transfer",
        href: "/wallet/transfer",
      },
    ],
  },
  {
    key: "history",
    label: "Transaction history",
    icon: Clock4,
    href: "/dashboard/history",
  },

  {
    key: "settings",
    label: "Settings",
    icon: Settings,

    children: [
      { label: "Profile", href: "/settings/profile" },
      {
        label: "Security",
        href: "/settings/security",
      },
    ],
  },

  {
    key: "chat",
    label: "Live Chat",
    icon: MessageSquare,
    href: "/dashboard/chat",
    section: "bottom",
  },
  {
    key: "support",
    label: "Support",
    icon: LifeBuoy,
    href: "/dashboard/support",
  },
];

export const INVITE_CARD = {
  title: "Invite friends and earn money",
  icon: SquareGanttChart,
  href: "/dashboard/referrals",
};
