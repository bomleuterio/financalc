import { calculatorMetadata } from '@/lib/calculator-metadata';

export const metadata = calculatorMetadata('401k');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
