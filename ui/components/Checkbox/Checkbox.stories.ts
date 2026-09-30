
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Checkbox } from './Checkbox';

const meta = {
  component: Checkbox,
  title: 'components/Checkbox',
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Story Label",
    size: "sm"
  },
};
