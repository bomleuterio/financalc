import { calculatorMetadata } from '@/lib/calculator-metadata';

export const metadata = calculatorMetadata('debt-payoff');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
