'use client';

import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT, AD_SLOTS } from '@/lib/adsense';

type AdFormat = 'leaderboard' | 'rectangle' | 'responsive';

const SIZE: Record<AdFormat, { width: number; height: number; label: string }> = {
  leaderboard: { width: 728, height: 90,  label: '728 × 90' },
  rectangle:   { width: 300, height: 250, label: '300 × 250' },
  responsive:  { width: 0,   height: 90,  label: 'Responsive' },
};

interface Props {
  format?: AdFormat;
  className?: string;
}

const IS_PLACEHOLDER = ADSENSE_CLIENT.includes('XXXXX');

export default function AdBanner({ format = 'responsive', className = '' }: Props) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (IS_PLACEHOLDER || pushed.current) return;
    try {
      pushed.current = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  if (IS_PLACEHOLDER) {
    const { width, height, label } = SIZE[format];
    return (
      <div
        className={`flex items-center justify-center bg-muted/40 border border-dashed border-border rounded-lg text-xs text-muted-foreground ${className}`}
        style={{
          width: width > 0 ? `${width}px` : '100%',
          maxWidth: '100%',
          height: `${height}px`,
          minHeight: '90px',
        }}
      >
        Ad · {label} — add your AdSense ID in{' '}
        <code className="ml-1 font-mono">lib/adsense.ts</code>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: SIZE[format].width > 0 ? SIZE[format].width : undefined,
          height: SIZE[format].height,
        }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={AD_SLOTS[format]}
        data-ad-format={format === 'responsive' ? 'auto' : undefined}
        data-full-width-responsive={format === 'responsive' ? 'true' : undefined}
      />
    </div>
  );
}
