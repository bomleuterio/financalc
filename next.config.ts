import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Short posts merged into longer guides (Nov 2026).
    return [
      { source: '/blog/tax-advantaged-accounts', destination: '/blog/roth-vs-traditional-401k', permanent: true },
      { source: '/blog/debt-payoff-strategies', destination: '/blog/credit-card-debt-payoff-guide', permanent: true },
      { source: '/blog/credit-card-debt-truth', destination: '/blog/credit-card-debt-payoff-guide', permanent: true },
      { source: '/blog/compound-interest-power', destination: '/blog/how-compound-growth-builds-wealth', permanent: true },
      { source: '/blog/wealth-building-boring-path', destination: '/blog/how-compound-growth-builds-wealth', permanent: true },
    ];
  },
};

export default nextConfig;
