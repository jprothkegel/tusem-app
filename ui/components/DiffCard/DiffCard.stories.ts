import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DiffCard } from "./DiffCard";

const meta = {
  component: DiffCard,
  title: "components/DiffCard",
  tags: ["autodocs"],
} satisfies Meta<typeof DiffCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leagueCategory: "Erwachsene",
    title: "Tusem vs The World",
    date: "12/10/2026",
    hall: "Test Hall",
    homeTeam: "Tusem Essen",
    awayTeam: "Tusem Essen II",
  },
};

export const WomenCard: Story = {
  args: {
    leagueCategory: "Erwachsene",
    title: "Tusem vs The World",
    date: "12/10/2026",
    hall: "Test Hall",
    homeTeam: "Tusem Essen",
    awayTeam: "Tusem Essen II",
    variant: "women",
  },
};

export const YoungCard: Story = {
  args: {
    leagueCategory: "Erwachsene",
    title: "Tusem vs The World",
    date: "12/10/2026",
    hall: "Test Hall",
    homeTeam: "Tusem Essen",
    awayTeam: "Tusem Essen II",
    variant: "youngs",
  },
};

export const YoungWomenCard: Story = {
  args: {
    leagueCategory: "Erwachsene",
    title: "Tusem vs The World",
    date: "12/10/2026",
    hall: "Test Hall",
    homeTeam: "Tusem Essen",
    awayTeam: "Tusem Essen II",
    variant: "young_women",
  },
};
