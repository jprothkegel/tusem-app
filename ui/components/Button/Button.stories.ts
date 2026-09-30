
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './Button';

const meta = {
  component: Button,
  title: 'components/Button',
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    buttonLabel: "Story Label",
  },
};

export const DisabledButton: Story = {
  args: {
    buttonLabel: "Story Label",
    disabled: true
  },
};