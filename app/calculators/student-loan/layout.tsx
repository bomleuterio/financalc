import { calculatorMetadata } from '@/lib/calculator-metadata';

export const metadata = calculatorMetadata('student-loan');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
