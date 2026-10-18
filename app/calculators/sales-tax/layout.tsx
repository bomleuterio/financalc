import { calculatorMetadata } from '@/lib/calculator-metadata';

export const metadata = calculatorMetadata('sales-tax');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
