
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { DiffCard } from './DiffCard';

const meta = {
  component: DiffCard,
  title: 'components/DiffCard',
  tags: ['autodocs'],
} satisfies Meta<typeof DiffCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leagueCategory: "Erwachsene",
    title: "Tusem vs The World"
  },
};
