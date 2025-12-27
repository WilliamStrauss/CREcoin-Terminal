import { ReactNode } from 'react';

export interface ProtocolData {
  name: string;
  ticker: string;
  price: string;
  tvl: string;
  riskScore: string;
  totalApy: number;
  realYield: number;
  inflationaryYield: number;
  treasuryInflow: number;
}

export interface CashFlow {
  id: number;
  type: 'RENT' | 'BUYBACK' | 'EXPENSE' | 'MINT';
  amount: string;
  source: string;
  time: string;
  verified: boolean;
}

export interface NavIconProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export interface NutrientRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface SectionHeaderProps {
  title: string;
  icon: ReactNode;
  noBorder?: boolean;
}

export interface BridgeNodeProps {
  label: string;
  status: 'valid' | 'invalid' | 'pending';
  detail?: string;
  isFirst?: boolean;
  isLast?: boolean;
  active?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

export interface AssetCardProps {
  title: string;
  location: string;
  value: string;
  type: string;
  occupancy?: string;
  leaseExpiry?: string;
  valuationTrend?: string;
  noiYield?: string;
}