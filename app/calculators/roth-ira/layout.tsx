import { calculatorMetadata } from '@/lib/calculator-metadata';

export const metadata = calculatorMetadata('roth-ira');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
