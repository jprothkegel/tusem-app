
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Spinner } from './Spinner';

const meta = {
  component: Spinner,
  title: 'components/Spinner',
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
