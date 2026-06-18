'use client';

import { useEffect, useState } from 'react';

export default function NoSSR({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return fallback ? <>{fallback}</> : <div className="h-64 animate-pulse rounded-lg bg-muted" />;
  return <>{children}</>;
}
