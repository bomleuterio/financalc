import { calculatorMetadata } from '@/lib/calculator-metadata';

export const metadata = calculatorMetadata('compound-interest');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
