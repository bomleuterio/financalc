import { calculatorMetadata } from '@/lib/calculator-metadata';

export const metadata = calculatorMetadata('cd');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
