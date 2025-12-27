import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  FileText, 
  Landmark, 
  ArrowRight, 
  Box, 
  Search, 
  Lock, 
  Info, 
  Terminal,
  LineChart,
  Building2,
  Factory,
  Store,
  Wallet,
  LogIn,
  TrendingUp,
  Calendar,
  Users,
  FileSignature,
  Globe,
  Plane,
  Zap,
  Network,
  Percent,
  Download,
  ExternalLink,
  Vote,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileCheck,
  X,
  Printer,
  Eye,
  Check
} from 'lucide-react';
import { ProtocolData, CashFlow, NavIconProps, NutrientRowProps, SectionHeaderProps, BridgeNodeProps, AssetCardProps } from '../types';

// --- Sub-components Definitions ---

const NavIcon: React.FC<NavIconProps> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-3 md:p-3 rounded-xl transition-all relative group flex items-center justify-center ${
      active 
        ? 'bg-amber-500/10 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] border border-amber-500/40' 
        : 'text-zinc-500 hover:text-amber-200 hover:bg-zinc-900 border border-transparent hover:border-zinc-800'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement, { size: 22 })}
    
    {/* Active Indicator - Right Bar (Desktop) */}
    {active && <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-500 rounded-l shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>}
    
    {/* Active Indicator - Top Dot (Mobile) */}
    {active && <div className="md:hidden absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full shadow-[0_0_5px_rgba(245,158,11,0.8)]"></div>}
    
    {/* Tooltip (Desktop Only) */}
    <div className="hidden md:block absolute left-full ml-4 px-3 py-1.5 bg-zinc-900 text-xs font-bold text-amber-100 rounded border border-zinc-700 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 shadow-xl translate-x-[-10px] group-hover:translate-x-0">
      {label}
    </div>
  </button>
);

const NutrientRow: React.FC<NutrientRowProps> = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center border-b border-zinc-800 py-2 hover:bg-zinc-900/80 px-2 -mx-2 transition-colors group">
    <span className={`text-xs md:text-sm font-medium ${highlight ? 'text-amber-100' : 'text-zinc-500 group-hover:text-zinc-400'}`}>{label}</span>
    <span className={`font-mono text-xs md:text-sm ${highlight ? 'font-bold text-amber-500' : 'text-zinc-400 group-hover:text-amber-200'}`}>{value}</span>
  </div>
);

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon, noBorder }) => (
  <div className={`flex items-center gap-2 ${!noBorder && 'border-b border-zinc-800 pb-2'}`}>
    <span className="text-amber-500 drop-shadow-[0_0_3px_rgba(245,158,11,0.5)]">{icon}</span>
    <h3 className="text-zinc-100 font-bold uppercase tracking-wider text-sm">{title}</h3>
  </div>
);

const BridgeConnector: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="hidden md:flex flex-1 h-[2px] bg-zinc-900 relative mx-2 items-center overflow-hidden">
    {/* Background Line */}
    <div className={`absolute inset-0 bg-amber-900/30 transition-colors duration-500 ${active ? 'bg-amber-500/20' : ''}`}></div>
    
    {/* Flow Animation Particle */}
    <div 
      className={`absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-amber-500 to-transparent transition-opacity duration-300 ${active ? 'opacity-100 animate-data-flow' : 'opacity-0'}`}
    ></div>
  </div>
);

const BridgeNode: React.FC<BridgeNodeProps> = ({ label, status, detail, active, onHover, onLeave }) => (
  <div 
    className={`flex flex-col items-center bg-zinc-950 border transition-all duration-300 cursor-pointer p-3 w-full md:w-32 z-10 relative group mb-4 md:mb-0
      ${active ? 'border-amber-500 scale-105 shadow-[0_0_20px_rgba(245,158,11,0.25)]' : 'border-zinc-800 hover:border-amber-500/40'}
    `}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    // Mobile: Toggle active on click since no hover
    onClick={active ? onLeave : onHover}
  >
    {/* Pulsing Ring for Active State */}
    {active && <div className="absolute inset-0 border border-amber-500/50 rounded animate-ping pointer-events-none"></div>}

    <div className={`w-2 h-2 rounded-full mb-2 transition-all duration-300 ${status === 'valid' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'bg-red-500'} ${active ? 'shadow-[0_0_12px_rgba(245,158,11,1)] bg-amber-400' : ''}`}></div>
    <span className={`font-bold text-[10px] text-center transition-colors ${active ? 'text-amber-100' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{label}</span>
    {detail && <span className="text-[9px] text-zinc-600 mt-1 text-center font-mono group-hover:text-amber-500/70 transition-colors">{detail}</span>}
    
    {/* Connector Dot for Mobile */}
    <div className="md:hidden absolute -bottom-5 w-0.5 h-4 bg-zinc-800"></div>
  </div>
);

const AssetCard: React.FC<AssetCardProps & { icon?: React.ReactNode }> = ({ 
  title, 
  location, 
  value, 
  type, 
  icon,
  occupancy,
  leaseExpiry,
  valuationTrend,
  noiYield
}) => (
  <div className="bg-zinc-950/80 border border-zinc-800 p-4 flex justify-between items-center hover:border-amber-600/50 hover:bg-zinc-900/80 transition-all cursor-pointer group hover:shadow-[0_0_15px_rgba(245,158,11,0.05)] relative overflow-visible hover:z-50">
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
    
    {/* Detailed Tooltip */}
    <div className="hidden md:flex absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-64 bg-zinc-950 border border-amber-500/30 p-4 shadow-2xl rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex-col gap-2 backdrop-blur-md translate-y-2 group-hover:translate-y-0">
      <div className="text-[10px] text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2 mb-1 font-bold">Asset Fundamentals</div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-zinc-400 flex items-center gap-2"><Percent size={12} className="text-amber-600" /> NOI Yield</span>
          <span className="font-mono text-amber-500 font-bold">{noiYield || 'N/A'}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-zinc-400 flex items-center gap-2"><Users size={12} className="text-amber-600" /> Occupancy Rate</span>
          <span className="font-mono text-zinc-200">{occupancy || 'N/A'}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-zinc-400 flex items-center gap-2"><Calendar size={12} className="text-amber-600" /> Lease Expiry</span>
          <span className="font-mono text-zinc-400">{leaseExpiry || 'N/A'}</span>
        </div>
        <div className="flex justify-between items-center text-xs pt-1 border-t border-zinc-900">
          <span className="text-zinc-500 flex items-center gap-2"><TrendingUp size={12} className="text-amber-700" /> Valuation Trend</span>
          <span className={`font-mono font-bold ${valuationTrend?.includes('+') ? 'text-green-500' : 'text-zinc-300'}`}>{valuationTrend || 'Stable'}</span>
        </div>
      </div>

      {/* Tooltip Arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-8 border-transparent border-t-amber-500/30"></div>
    </div>

    {/* Mobile Info Expansion (Simple) */}
    <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900 border-x border-b border-amber-500/20 p-2 z-20 hidden group-hover:block">
        <div className="flex justify-between text-[10px] text-zinc-400">
            <span>Yield: <span className="text-amber-500">{noiYield}</span></span>
            <span>Occ: {occupancy}</span>
            <span>Trend: {valuationTrend}</span>
        </div>
    </div>

    <div className="flex gap-3 items-center">
      <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-600/80 group-hover:text-amber-500 group-hover:border-amber-500/30 transition-all shadow-inner shrink-0">
        {icon || <Building2 size={16} />}
      </div>
      <div className="min-w-0">
        <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5 group-hover:text-amber-500/60 transition-colors truncate">{type}</div>
        <div className="text-zinc-200 font-bold text-sm group-hover:text-white transition-colors truncate">{title}</div>
        <div className="text-zinc-600 text-xs flex items-center gap-1 group-hover:text-zinc-400 truncate">
          <Landmark size={10} /> {location}
        </div>
      </div>
    </div>
    <div className="text-right z-10 shrink-0 ml-2">
       <div className="text-[10px] text-zinc-600 uppercase group-hover:text-zinc-500">Valuation</div>
       <div className="text-amber-500 font-mono text-sm font-bold tracking-tight shadow-amber-500/10 drop-shadow-sm">{value}</div>
    </div>
  </div>
);

const DocumentViewerModal: React.FC<{ doc: any, onClose: () => void }> = ({ doc, onClose }) => {
  if (!doc) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 md:p-8 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl h-full max-h-[85vh] md:max-h-[90vh] bg-zinc-900 border border-zinc-700 flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex justify-between items-center p-3 md:p-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-3 overflow-hidden">
             <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-500/10 rounded flex items-center justify-center border border-amber-500/20 shrink-0">
               <FileText className="text-amber-500" size={18} />
             </div>
             <div className="min-w-0">
               <h3 className="text-white font-bold text-xs md:text-sm truncate">{doc.title}</h3>
               <p className="text-zinc-500 text-[10px] md:text-xs font-mono truncate">{doc.type} • {doc.size}</p>
             </div>
          </div>
          <div className="flex gap-1 md:gap-2 shrink-0">
             <button className="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors hidden md:block" title="Print"><Printer size={18} /></button>
             <button onClick={onClose} className="p-2 hover:bg-red-900/30 text-zinc-400 hover:text-red-400 rounded transition-colors"><X size={18} /></button>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-2 md:p-8 bg-zinc-800/50 flex justify-center custom-scrollbar">
           <div className="bg-[#e4e4e7] text-black w-full max-w-3xl min-h-[600px] md:min-h-[1000px] p-4 md:p-12 shadow-xl">
              {/* Fake Legal Content */}
              <div className="text-center mb-8 md:mb-12">
                 <h1 className="text-xl md:text-3xl font-serif font-bold uppercase mb-4 tracking-wide text-black">{doc.title}</h1>
                 <div className="w-16 md:w-24 h-1 bg-black mx-auto mb-4"></div>
                 <p className="font-serif text-xs md:text-sm italic">Effective Date: {doc.date}</p>
                 <p className="font-serif text-xs md:text-sm italic">Jurisdiction: Delaware, USA</p>
              </div>
              
              <div className="font-serif text-xs md:text-sm space-y-4 md:space-y-6 text-justify leading-relaxed opacity-90 text-zinc-900">
                 <p><strong>THIS AGREEMENT</strong> (the "Agreement") is made and entered into as of the date first set forth above, by and between <strong>Crecoin Foundation</strong>, a Delaware Series LLC ("Issuer"), and the Undersigned ("Holder"), collectively referred to as the "Parties".</p>
                 
                 <p><strong>WHEREAS</strong>, the Issuer maintains a decentralized infrastructure for the acquisition, management, and tokenization of Real World Assets (RWA) compliant with Regulations D/S of the Securities Act of 1933; and</p>
                 
                 <p><strong>WHEREAS</strong>, the Holder desires to participate in the Protocol governance and yield distribution mechanisms as defined in the Whitepaper v2.1;</p>
                 
                 <p><strong>NOW, THEREFORE</strong>, in consideration of the mutual covenants contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows:</p>
                 
                 <div className="my-6 md:my-8">
                   <h4 className="font-bold uppercase mb-3 text-sm md:text-base border-b border-black pb-1 inline-block">Article I: Definitions & Interpretation</h4>
                   <p className="mb-2">1.1 <strong>"Token"</strong> shall mean the cryptographic asset minted on the Solana blockchain representing fractionalized beneficial ownership or governance rights as specified in Schedule A.</p>
                   <p className="mb-2">1.2 <strong>"Net Operating Income (NOI)"</strong> shall be calculated as Gross Revenue minus Operating Expenses, excluding depreciation and amortization, audited quarterly by the appointed Oracle Network.</p>
                   <p className="mb-2">1.3 <strong>"Smart Contract"</strong> refers to the immutable code deployed at address <code>0x82...91A2</code> managing the treasury and distribution logic.</p>
                 </div>
                 
                 <div className="my-6 md:my-8">
                   <h4 className="font-bold uppercase mb-3 text-sm md:text-base border-b border-black pb-1 inline-block">Article II: Representations & Warranties</h4>
                   <p>The Holder acknowledges that: (a) crypto-assets involve significant risk; (b) this instrument has not been registered with the SEC; and (c) voting rights are proportional to token holdings and subject to the Governance Framework.</p>
                 </div>

                 {/* Simulated Text Blocks */}
                 <div className="space-y-4 mt-8 opacity-60 select-none grayscale blur-[0.4px]">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                 </div>
                 
                 <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t-2 border-black flex flex-col md:flex-row justify-between gap-8 md:gap-12">
                    <div className="flex-1">
                       <div className="h-12 border-b border-black w-full mb-2 flex items-end pb-1 font-dancing-script text-xl italic">
                         Crecoin Governance
                       </div>
                       <p className="text-[10px] uppercase font-bold tracking-wider">By: Crecoin Foundation</p>
                    </div>
                    <div className="flex-1">
                       <div className="h-12 border-b border-black w-full mb-2 flex items-end pb-1 font-dancing-script text-xl italic">
                         Verified Wallet Sig
                       </div>
                       <p className="text-[10px] uppercase font-bold tracking-wider">By: Holder</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

// --- Main Component ---

const CrecoinTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hoveredYield, setHoveredYield] = useState<'real' | 'inflation' | null>(null);
  const [tokenPrice, setTokenPrice] = useState<string | null>(null);
  
  // Use index for hover state to animate previous connectors
  // 0: None, 1: Token, 2: Contract, 3: SPV, 4: Deed
  const [hoveredBridgeIndex, setHoveredBridgeIndex] = useState<number>(0);
  
  // dApp State
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Document Simulation State
  const [previewDoc, setPreviewDoc] = useState<any>(null);
  const [downloadStatus, setDownloadStatus] = useState<Record<string, number>>({});

  // Mock Data
  const protocolData: ProtocolData = {
    name: "Crecoin Foundation",
    ticker: "CRE",
    price: "$10.42",
    tvl: "$45,200,000",
    riskScore: "A", 
    totalApy: 12.5,
    realYield: 4.2,
    inflationaryYield: 8.3,
    treasuryInflow: 145200,
  };

  const cashFlows: CashFlow[] = [
    { id: 1, type: 'RENT', amount: '+$45,200', source: 'Denver Logistics Hub', time: '2m ago', verified: true },
    { id: 2, type: 'BUYBACK', amount: '-$12,500', source: 'Treasury Execution', time: '1h ago', verified: true },
    { id: 3, type: 'RENT', amount: '+$18,900', source: 'Manchester Retail Promenade', time: '4h ago', verified: true },
    { id: 4, type: 'EXPENSE', amount: '-$2,100', source: 'Legal Maintenance', time: '6h ago', verified: true },
    { id: 5, type: 'RENT', amount: '+$12,400', source: 'Boulder Tech Center', time: '8h ago', verified: true },
    { id: 6, type: 'MINT', amount: '+$50,000', source: 'User Deposit', time: '12h ago', verified: true },
    { id: 7, type: 'RENT', amount: '+$10,000', source: 'Aspen Ski Lodge', time: '13h ago', verified: true },
    { id: 8, type: 'RENT', amount: '+$5,200', source: 'Concord Mixed-Use', time: '1d ago', verified: true },
  ];
  
  const lois = [
    { id: 1, target: "Miami Hospitality Unit", value: "$22.5M", status: "LOI Signed", date: "2d ago" },
    { id: 2, target: "Chicago Data Center", value: "$18.2M", status: "Due Diligence", date: "5d ago" }
  ];
  
  const ecosystemProjects = [
    { id: 1, name: "Air Lingus", type: "Aviation Leasing", description: "Tokenized Commercial Fleet", icon: <Plane size={16} /> },
    { id: 2, name: "SolarGreen Grid", type: "Energy Infrastructure", description: "Renewable Energy Credits", icon: <Zap size={16} /> },
    { id: 3, name: "Metro Fiber", type: "Digital Infrastructure", description: "Urban Connectivity Layer", icon: <Network size={16} /> }
  ];

  const connectWallet = async () => {
    setIsConnecting(true);
    // Simulate network request to Phantom/Solflare
    await new Promise(resolve => setTimeout(resolve, 1500));
    setWalletAddress('7X8z...9jK2'); // Mock Solana-style address
    setIsConnecting(false);
  };

  const handleDownload = (e: React.MouseEvent, title: string) => {
    e.stopPropagation(); // Prevent opening modal
    if (downloadStatus[title] === 100 || downloadStatus[title] > 0) return;

    setDownloadStatus(prev => ({ ...prev, [title]: 5 })); // Start
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadStatus(prev => {
        const current = prev[title] || 0;
        if (current >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [title]: current + 10 }; // Increment by 10%
      });
    }, 150);
  };

  // Fetch Token Price
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.dexscreener.com/latest/dex/pairs/solana/dg91befdbhsibyffms35apx9zxiet7dq26wnjdww46wa');
        const data = await response.json();
        
        // Check for pairs array as per DexScreener API docs
        const pair = data.pairs?.[0] || data.pair;
        
        if (pair && pair.priceUsd) {
          const price = parseFloat(pair.priceUsd);
          // Format with appropriate decimals
          const formattedPrice = price < 1 
            ? `$${price.toFixed(4)}` 
            : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
          
          setTokenPrice(formattedPrice);
        }
      } catch (error) {
        console.error("Failed to fetch price from DexScreener:", error);
      }
    };

    fetchPrice();
    const intervalId = setInterval(fetchPrice, 60000); // Update every minute
    return () => clearInterval(intervalId);
  }, []);

  // --- Sub-render Functions for Tabs ---

  const renderDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
      {/* LEFT COLUMN: Nutritional Facts Label */}
      <div className="lg:col-span-5 space-y-6">
        <div className="border border-zinc-800 bg-zinc-950 p-4 md:p-6 shadow-2xl relative max-w-md mx-auto lg:mx-0 group hover:border-amber-900/40 transition-colors">
          {/* Gold accent line top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 opacity-80"></div>

          <div className="flex justify-between items-start mb-1">
              <h2 className="text-3xl md:text-4xl font-black text-zinc-100 tracking-tight">YIELD DISCLOSURE</h2>
          </div>
          <div className="border-b-[4px] border-zinc-100 w-full mb-1"></div>

          <p className="text-sm text-zinc-500 mb-4 border-b border-zinc-800 pb-2 flex justify-between">
            <span>Serving Size:</span>
            <span className="font-bold text-zinc-300">1 Protocol Interaction</span>
          </p>
          
          <div className="space-y-4">
            <div className="flex justify-between items-end border-b-[2px] border-zinc-100 pb-2">
              <div>
                <span className="font-black text-base md:text-lg text-white block">Total Yield (APY)</span>
                <span className="text-[9px] md:text-[10px] text-zinc-500 font-bold uppercase">Amount per serving</span>
              </div>
              <span className="font-black text-4xl md:text-5xl text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">{protocolData.totalApy}%</span>
            </div>

            {/* THE YIELD TRUTH HIGHLIGHT */}
            <div className="py-2">
              <div className="flex justify-between items-baseline mb-2 h-5">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Yield Composition</p>
                {hoveredYield && (
                  <span className={`text-[10px] md:text-xs font-bold uppercase animate-pulse ${hoveredYield === 'real' ? 'text-amber-400' : 'text-zinc-400'}`}>
                    {hoveredYield === 'real' ? 'Verified Rent Payments' : 'Governance Token Emission'}
                  </span>
                )}
              </div>
              
              {/* Interactive Bar Chart */}
              <div className="h-12 md:h-14 w-full flex bg-zinc-900 border border-zinc-800 mb-2 cursor-crosshair relative overflow-hidden">
                <div 
                  onMouseEnter={() => setHoveredYield('real')}
                  onMouseLeave={() => setHoveredYield(null)}
                  // Support touch for mobile tooltip behavior
                  onTouchStart={() => setHoveredYield('real')}
                  className="bg-gradient-to-b from-amber-500 to-amber-600 border-r border-amber-400 h-full flex items-center justify-center text-black font-bold text-base md:text-lg transition-all duration-300 hover:brightness-110 hover:w-[105%] relative z-10" 
                  style={{ width: `${(protocolData.realYield / protocolData.totalApy) * 100}%` }}
                >
                  {protocolData.realYield}%
                </div>
                <div 
                  onMouseEnter={() => setHoveredYield('inflation')}
                  onMouseLeave={() => setHoveredYield(null)}
                  onTouchStart={() => setHoveredYield('inflation')}
                  className="bg-zinc-800 border-l border-zinc-700 h-full flex items-center justify-center text-zinc-400 font-bold text-base md:text-lg transition-all duration-300 hover:bg-zinc-700 hover:w-[105%]" 
                  style={{ width: `${(protocolData.inflationaryYield / protocolData.totalApy) * 100}%` }}
                >
                  {protocolData.inflationaryYield}%
                </div>
              </div>
              
              <div className="flex justify-between text-[10px] uppercase mt-2 font-bold tracking-tight">
                <div className={`flex items-center gap-2 transition-opacity duration-300 ${hoveredYield === 'inflation' ? 'opacity-30' : 'opacity-100'}`}>
                  <div className="w-2 h-2 bg-amber-500 rotate-45"></div>
                  <span className="text-amber-500">Operational Cash Flow</span>
                </div>
                <div className={`flex items-center gap-2 transition-opacity duration-300 ${hoveredYield === 'real' ? 'opacity-30' : 'opacity-100'}`}>
                  <div className="w-2 h-2 bg-zinc-700 rotate-45"></div>
                  <span className="text-zinc-500">Token Incentives</span>
                </div>
              </div>
            </div>

            {/* Revenue Source Breakdown Table */}
            <div className="border border-zinc-800/50 bg-zinc-900/30 p-3 mt-4">
              <p className="text-[9px] font-bold text-zinc-500 uppercase mb-2 tracking-widest border-b border-zinc-800 pb-1">Revenue Source Breakdown</p>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 flex items-center gap-2"><div className="w-1 h-1 bg-amber-500 rounded-full"></div>Industrial Rents (CO)</span>
                  <span className="font-mono text-amber-500">2.1%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 flex items-center gap-2"><div className="w-1 h-1 bg-amber-600 rounded-full"></div>Commercial Office (CO)</span>
                  <span className="font-mono text-amber-500">1.8%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 flex items-center gap-2"><div className="w-1 h-1 bg-amber-700 rounded-full"></div>Retail Leases (NH)</span>
                  <span className="font-mono text-amber-500">0.3%</span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-zinc-800/50 pt-1 mt-1">
                    <span className="text-zinc-500 flex items-center gap-2"><div className="w-1 h-1 bg-zinc-700 rounded-full"></div>Treasury Bonds</span>
                    <span className="font-mono text-zinc-500">1.1%</span>
                </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 flex items-center gap-2"><div className="w-1 h-1 bg-zinc-700 rounded-full"></div>Governance Emissions</span>
                    <span className="font-mono text-zinc-500">7.2%</span>
                </div>
              </div>
            </div>

            {/* Data Rows */}
            <div className="border-t-[1px] border-zinc-700 mt-4 pt-1">
              <NutrientRow label="Underlying Asset Portfolio" value="Commercial RE" highlight />
              <NutrientRow label="Debt Ratio" value="12%" />
              <NutrientRow label="Vacancy Rate" value="2.1%" />
              <NutrientRow label="Audit Status" value="PASSED" />
            </div>
            
            <div className="border-t-[4px] border-zinc-100 pt-4 mt-6">
              <div className="flex justify-between items-center group cursor-pointer hover:bg-zinc-900 p-2 -mx-2 rounded transition-colors border border-transparent hover:border-zinc-800">
                <div>
                  <span className="font-black text-zinc-200 block text-lg">RISK GRADE</span>
                  <span className="text-[10px] text-zinc-500 uppercase group-hover:text-amber-500 transition-colors">Click for breakdown</span>
                </div>
                <span className="font-black text-6xl text-amber-500 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(245,158,11,0.2)]">{protocolData.riskScore}</span>
              </div>
            </div>
            
            <p className="text-[9px] text-zinc-600 uppercase mt-4 leading-tight">
              *Percent Daily Values are based on verified on-chain data. Your individual results may vary depending on market conditions and smart contract latency.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Evidence & Tools */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* The Legal Bridge */}
        <div className="bg-zinc-950 border border-zinc-800 p-4 md:p-6 relative overflow-hidden group/bridge shadow-lg">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50 group-hover/bridge:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 blur-3xl rounded-full pointer-events-none"></div>

          <SectionHeader title="The Legal Bridge" icon={<ShieldCheck />} />
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-0 text-xs uppercase relative px-2">
            
            <BridgeNode 
              label={walletAddress ? "My Wallet" : "User Token"}
              status="valid" 
              isFirst
              active={hoveredBridgeIndex >= 1 || !!walletAddress} 
              onHover={() => setHoveredBridgeIndex(1)}
              onLeave={() => setHoveredBridgeIndex(0)}
            />
            
            <BridgeConnector active={hoveredBridgeIndex >= 2} />
            <ArrowRight className="text-zinc-700 md:hidden my-1 rotate-90 md:rotate-0" />
            
            <BridgeNode 
              label="Smart Contract" 
              status="valid"
              active={hoveredBridgeIndex >= 2}
              onHover={() => setHoveredBridgeIndex(2)}
              onLeave={() => setHoveredBridgeIndex(0)}
            />

            <BridgeConnector active={hoveredBridgeIndex >= 3} />
            <ArrowRight className="text-zinc-700 md:hidden my-1 rotate-90 md:rotate-0" />
            
            <BridgeNode 
              label="SPV Entity" 
              status="valid" 
              detail="Delaware LLC"
              active={hoveredBridgeIndex >= 3}
              onHover={() => setHoveredBridgeIndex(3)}
              onLeave={() => setHoveredBridgeIndex(0)}
            />

            <BridgeConnector active={hoveredBridgeIndex >= 4} />
            <ArrowRight className="text-zinc-700 md:hidden my-1 rotate-90 md:rotate-0" />
            
            <BridgeNode 
              label="Asset Title" 
              status="valid" 
              detail="Deed #40291" 
              isLast
              active={hoveredBridgeIndex >= 4}
              onHover={() => setHoveredBridgeIndex(4)}
              onLeave={() => setHoveredBridgeIndex(0)}
            />
          </div>

          {/* Dynamic Detail Box */}
          <div className="mt-6 min-h-[40px] flex items-center justify-center">
              {hoveredBridgeIndex > 0 ? (
                <div className="bg-zinc-900 border border-amber-500/30 text-amber-100 px-4 py-2 text-xs font-mono shadow-[0_0_15px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-2 duration-200 w-full md:w-auto text-center">
                  {hoveredBridgeIndex === 1 && <span className="flex items-center justify-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"></div> {walletAddress ? `Connected: ${walletAddress}` : 'Wallet Balance Verified: 1,402 CRE'}</span>}
                  {hoveredBridgeIndex === 2 && <span className="flex items-center justify-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"></div> Audit: Clean • Proxy Verified</span>}
                  {hoveredBridgeIndex === 3 && <span className="flex items-center justify-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"></div> State of Delaware File #829102</span>}
                  {hoveredBridgeIndex === 4 && <span className="flex items-center justify-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"></div> County Clerk Record #40291</span>}
                </div>
              ) : (
              <div className="text-zinc-600 text-[10px] uppercase tracking-widest flex items-center gap-2">
                <Info size={12} /> <span className="hidden md:inline">Hover nodes to verify chain of custody</span> <span className="md:hidden">Tap nodes to verify</span>
              </div>
              )}
          </div>
        </div>

        {/* DexScreener Embed */}
        <div className="bg-zinc-950 border border-zinc-800 p-4 md:p-6 shadow-lg">
          <SectionHeader title="Market Performance" icon={<LineChart />} />
          <div className="mt-4 h-[300px] md:h-[400px] w-full border border-zinc-800 relative bg-black">
            <iframe 
              src="https://dexscreener.com/solana/dg91befdbhsibyffms35apx9zxiet7dq26wnjdww46wa?embed=1&theme=dark&trades=0"
              className="w-full h-full absolute inset-0 opacity-90 hover:opacity-100 transition-opacity"
              title="DexScreener Chart"
              frameBorder="0"
            />
          </div>
        </div>

        {/* Systematic Value Accrual (Ticker) */}
        <div className="bg-zinc-950 border border-zinc-800 p-4 md:p-6 shadow-lg">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-4">
            <SectionHeader title="Operational Cash Flow Feed" icon={<Activity />} noBorder />
            <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-950/20 border border-amber-900/30 rounded text-[10px] text-amber-500 uppercase tracking-wider shadow-[0_0_8px_rgba(245,158,11,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Live Feed
            </div>
          </div>
          
          <div className="mt-2 space-y-0">
            <div className="grid grid-cols-12 text-[10px] text-zinc-500 uppercase mb-2 px-1 md:px-3 tracking-wider font-bold">
              <div className="col-span-2">Type</div>
              <div className="col-span-3 text-right pr-2 md:pr-4">Amount</div>
              <div className="col-span-4">Source</div>
              <div className="col-span-3 text-right">Time</div>
            </div>
            
            <div className="border border-zinc-800 bg-black/50 h-56 overflow-y-auto font-mono text-sm custom-scrollbar relative">
              {/* Shadow overlay for depth */}
              <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>
              
              {cashFlows.map((flow) => (
                <div key={flow.id} className="grid grid-cols-12 px-2 md:px-3 py-3 border-b border-zinc-900 hover:bg-zinc-900 transition-colors cursor-crosshair group items-center">
                  <div className={`col-span-2 font-bold text-[10px] md:text-xs ${flow.type === 'BUYBACK' ? 'text-blue-400' : flow.type === 'RENT' ? 'text-amber-500' : flow.type === 'MINT' ? 'text-zinc-100' : 'text-red-400'}`}>
                    {flow.type}
                  </div>
                  <div className={`col-span-3 text-right pr-2 md:pr-4 text-[10px] md:text-xs ${flow.type === 'EXPENSE' || flow.type === 'BUYBACK' ? 'text-red-300' : 'text-amber-100'}`}>{flow.amount}</div>
                  <div className="col-span-4 text-zinc-500 flex justify-between items-center group-hover:text-zinc-300 transition-colors">
                    <span className="truncate pr-2 text-[10px] md:text-xs">{flow.source}</span>
                  </div>
                  <div className="col-span-3 text-right text-zinc-600 text-[10px] md:text-xs font-mono">{flow.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Asset Portfolio Summary */}
        <div className="bg-zinc-950 border border-zinc-800 p-4 md:p-6 shadow-lg">
          <SectionHeader title="Commercial Real Estate Portfolio" icon={<Box />} />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <AssetCard 
                title="Denver Logistics Hub" 
                location="Denver, CO" 
                value="$12.5M" 
                type="Industrial" 
                icon={<Factory size={16} />}
                occupancy="100%"
                leaseExpiry="NNN / 2029"
                valuationTrend="+12% YoY"
                noiYield="6.2%"
              />
              <AssetCard 
                title="Boulder Tech Center" 
                location="Boulder, CO" 
                value="$24.2M" 
                type="Office" 
                icon={<Building2 size={16} />}
                occupancy="94%"
                leaseExpiry="Multi / 2026"
                valuationTrend="+5% YoY"
                noiYield="5.8%"
              />
              <AssetCard 
                title="Manchester Retail Promenade" 
                location="Manchester, NH" 
                value="$8.8M" 
                type="Retail" 
                icon={<Store size={16} />}
                occupancy="98%"
                leaseExpiry="Anchor / 2030"
                valuationTrend="+3.2% YoY"
                noiYield="7.1%"
              />
              <AssetCard 
                title="Concord Mixed-Use" 
                location="Concord, NH" 
                value="$5.2M" 
                type="Mixed-Use" 
                icon={<Building2 size={16} />}
                occupancy="100%"
                leaseExpiry="Res / 2025"
                valuationTrend="+8.1% YoY"
                noiYield="6.5%"
              />
          </div>
        </div>

        {/* LOIs Section */}
        <div className="bg-zinc-950 border border-zinc-800 p-4 md:p-6 shadow-lg">
          <SectionHeader title="Active Letters of Intent (LOIs)" icon={<FileSignature />} />
          <div className="mt-4 flex flex-col gap-3">
            {lois.map((loi) => (
              <div key={loi.id} className="flex justify-between items-center p-3 bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/30 transition-colors group">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">{loi.status}</div>
                  <div className="text-zinc-200 font-bold text-sm group-hover:text-amber-100 transition-colors">{loi.target}</div>
                  <div className="text-[10px] text-zinc-600 mt-1">Last Update: {loi.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-zinc-600 uppercase">Est. Value</div>
                  <div className="text-amber-500 font-mono font-bold text-sm">{loi.value}</div>
                  {loi.status === 'LOI Signed' && (
                    <div className="mt-1 flex justify-end">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commonwealth Ecosystem Section */}
        <div className="bg-zinc-950 border border-zinc-800 p-4 md:p-6 shadow-lg">
          <SectionHeader title="Commonwealth Ecosystem Projects" icon={<Globe />} />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {ecosystemProjects.map((project) => (
              <div key={project.id} className="bg-zinc-900/30 border border-zinc-800 p-4 hover:bg-zinc-900 hover:border-amber-600/40 transition-all cursor-pointer group flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-amber-500 mb-3 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  {project.icon}
                </div>
                <div className="text-white font-bold text-sm mb-1">{project.name}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wide mb-2">{project.type}</div>
                <div className="text-xs text-zinc-400 leading-tight group-hover:text-zinc-300">{project.description}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );

  const renderExplorer = () => (
    <div className="max-w-7xl mx-auto w-full pb-12">
      <div className="bg-zinc-950 border border-zinc-800 p-4 md:p-6 shadow-lg mb-8">
        <SectionHeader title="Protocol Explorer" icon={<Search />} />
        <p className="text-sm text-zinc-500 mt-2 mb-6">Real-time tracking of asset on-boarding, rental yield distribution, and treasury operations.</p>
        
        <div className="overflow-x-auto border border-zinc-800 bg-zinc-900/30">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Tx Hash</th>
                <th className="p-4">Method</th>
                <th className="p-4">Block</th>
                <th className="p-4">Age</th>
                <th className="p-4">From</th>
                <th className="p-4">Value</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-xs font-mono">
              {[...Array(8)].map((_, i) => (
                <tr key={i} className="hover:bg-zinc-900/80 transition-colors">
                  <td className="p-4 text-amber-500 cursor-pointer hover:underline">0x{Math.random().toString(16).substr(2, 8)}...</td>
                  <td className="p-4">
                    <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-[10px] uppercase border border-zinc-700">
                      {['DistributeYield', 'UpdateAsset', 'MintCRE'][i % 3]}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-400">1829{300 + i}</td>
                  <td className="p-4 text-zinc-500">{i * 5 + 2} mins ago</td>
                  <td className="p-4 text-zinc-400">0x{Math.random().toString(16).substr(2, 6)}...</td>
                  <td className="p-4 text-zinc-200 font-bold">
                    {i % 3 === 0 ? `$${(Math.random() * 10000).toFixed(2)}` : '-'}
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-green-500 flex items-center justify-end gap-1">
                      <CheckCircle2 size={12} /> Success
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="max-w-7xl mx-auto w-full pb-12">
      <div className="bg-zinc-950 border border-zinc-800 p-4 md:p-6 shadow-lg">
        <SectionHeader title="Legal & Compliance Documents" icon={<FileCheck />} />
        <p className="text-sm text-zinc-500 mt-2 mb-6">Verified immutable copies of all legal frameworks underpinning the Crecoin Protocol. Click to preview.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Series LLC Operating Agreement", type: "Governance", size: "2.4 MB", date: "Oct 12, 2023" },
            { title: "Regulation D Offering Memo", type: "SEC Filing", size: "4.1 MB", date: "Nov 05, 2023" },
            { title: "Denver Logistics Asset Appraisal", type: "Valuation", size: "15.8 MB", date: "Jan 20, 2024" },
            { title: "Legal Opinion: Non-Security Status", type: "Compliance", size: "1.2 MB", date: "Dec 15, 2023" },
            { title: "Smart Contract Audit Report (Certik)", type: "Technical", size: "3.5 MB", date: "Feb 01, 2024" },
            { title: "Master Lease Agreement Template", type: "Operational", size: "0.8 MB", date: "Sep 28, 2023" }
          ].map((doc, i) => {
            const progress = downloadStatus[doc.title] || 0;
            const isComplete = progress >= 100;
            const isDownloading = progress > 0 && !isComplete;

            return (
              <div 
                key={i} 
                onClick={() => setPreviewDoc(doc)}
                className="border border-zinc-800 bg-zinc-900/30 p-5 hover:border-amber-500/40 hover:bg-zinc-900 transition-all group cursor-pointer relative overflow-hidden active:scale-[0.98] duration-150"
              >
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={16} className="text-amber-500" />
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 group-hover:text-amber-500 group-hover:border-amber-500/30 transition-colors">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="text-zinc-200 font-bold text-sm leading-tight group-hover:text-amber-100 transition-colors">{doc.title}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] uppercase bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">{doc.type}</span>
                      <span className="text-[10px] text-zinc-600">{doc.date}</span>
                    </div>
                  </div>
                </div>
                
                {/* Download Area */}
                <div className="mt-4 pt-3 border-t border-zinc-800/50 flex justify-between items-center relative">
                  <span className="text-xs text-zinc-600 font-mono">{doc.size}</span>
                  
                  <button 
                    onClick={(e) => handleDownload(e, doc.title)}
                    className={`text-xs flex items-center gap-1 uppercase font-bold tracking-wider transition-all
                      ${isComplete ? 'text-green-500' : isDownloading ? 'text-amber-500' : 'text-zinc-500 hover:text-amber-500'}
                    `}
                  >
                    {isComplete ? (
                      <>Downloaded <Check size={12} /></>
                    ) : isDownloading ? (
                      <>Downloading... <span className="animate-pulse">{progress}%</span></>
                    ) : (
                      <>Download <Download size={12} /></>
                    )}
                  </button>

                  {/* Progress Bar Overlay */}
                  {isDownloading && (
                     <div className="absolute bottom-[-1px] left-0 h-[2px] bg-amber-500 transition-all duration-150" style={{ width: `${progress}%` }}></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderGovernance = () => (
    <div className="max-w-7xl mx-auto w-full pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 p-4 md:p-6">
             <SectionHeader title="Active Proposals" icon={<Vote />} />
             <div className="mt-6 space-y-4">
               {[
                 { id: "CIP-12", title: "Acquire 'Phoenix Distribution Center'", votes: "1.2M CRE", end: "2d 4h", status: "Active", for: 82, against: 18 },
                 { id: "CIP-13", title: "Adjust Treasury Fee to 0.5%", votes: "450K CRE", end: "4d 12h", status: "Active", for: 45, against: 55 }
               ].map((prop, i) => (
                 <div key={i} className="border border-zinc-800 bg-zinc-900/30 p-5 hover:border-amber-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                         <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] px-2 py-0.5 rounded uppercase font-bold">{prop.id}</span>
                         <span className="bg-green-900/30 text-green-400 border border-green-900/50 text-[10px] px-2 py-0.5 rounded uppercase font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> {prop.status}</span>
                      </div>
                      <span className="text-xs text-zinc-500 flex items-center gap-1"><Clock size={12} /> Ends in {prop.end}</span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-200 mb-4">{prop.title}</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-zinc-400">For</span>
                          <span className="text-zinc-200 font-mono">{prop.for}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500/80" style={{ width: `${prop.for}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-zinc-400">Against</span>
                          <span className="text-zinc-200 font-mono">{prop.against}%</span>
                        </div>
                         <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500/80" style={{ width: `${prop.against}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center">
                       <span className="text-xs text-zinc-500">Total Votes: <span className="text-zinc-300 font-mono">{prop.votes}</span></span>
                       <button className="bg-zinc-100 text-black px-4 py-1.5 rounded text-xs font-bold uppercase hover:bg-white transition-colors">Vote Now</button>
                    </div>
                 </div>
               ))}
             </div>
          </div>
          
           <div className="bg-zinc-950 border border-zinc-800 p-4 md:p-6 opacity-60">
             <SectionHeader title="Past Proposals" icon={<FileText />} />
             <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center p-3 border-b border-zinc-800">
                   <div>
                     <div className="text-xs text-zinc-500 uppercase">CIP-11</div>
                     <div className="text-sm font-bold text-zinc-400">Expand to European Market</div>
                   </div>
                   <span className="text-green-500 text-xs font-bold uppercase border border-green-900/50 bg-green-900/10 px-2 py-1 rounded">Passed</span>
                </div>
                <div className="flex justify-between items-center p-3 border-b border-zinc-800">
                   <div>
                     <div className="text-xs text-zinc-500 uppercase">CIP-10</div>
                     <div className="text-sm font-bold text-zinc-400">Liquidate 'Austin Multi-Family'</div>
                   </div>
                   <span className="text-red-500 text-xs font-bold uppercase border border-red-900/50 bg-red-900/10 px-2 py-1 rounded">Rejected</span>
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
           <div className="bg-zinc-900/50 border border-zinc-800 p-6">
             <h3 className="text-zinc-200 font-bold uppercase text-sm mb-4">Your Voting Power</h3>
             <div className="text-3xl font-mono text-amber-500 font-bold mb-1">0.00 CRE</div>
             <p className="text-xs text-zinc-500 mb-6">Connect wallet to view your voting power.</p>
             <button className="w-full bg-zinc-800 border border-zinc-700 text-zinc-300 py-2 text-xs uppercase font-bold hover:bg-zinc-700 hover:text-white transition-colors">Delegate Votes</button>
           </div>
           
           <div className="bg-zinc-900/50 border border-zinc-800 p-6">
             <h3 className="text-zinc-200 font-bold uppercase text-sm mb-4">Governance Stats</h3>
             <div className="space-y-3">
               <NutrientRow label="Quorum Required" value="4%"/>
               <NutrientRow label="Proposal Threshold" value="100K CRE"/>
               <NutrientRow label="Voting Period" value="5 Days"/>
               <NutrientRow label="Timelock" value="48 Hours"/>
             </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderAdmin = () => (
    <div className="max-w-md mx-auto w-full pt-4 md:pt-12 pb-12 flex flex-col items-center">
       <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center text-red-500 mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)] border border-red-900/30">
          <Lock size={32} />
       </div>
       <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">Restricted Access</h2>
       <p className="text-zinc-500 text-center text-sm mb-8">This area is restricted to authorized multisig signers and legal administrators only. All attempts are logged.</p>
       
       <div className="w-full bg-zinc-950 border border-zinc-800 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
          <div className="space-y-4">
             <div>
               <label className="block text-xs uppercase font-bold text-zinc-500 mb-1">Admin Key ID</label>
               <div className="flex bg-zinc-900 border border-zinc-700 px-3 py-2 items-center text-zinc-300">
                  <Terminal size={14} className="mr-3 text-zinc-500" />
                  <input type="text" placeholder="ENTER_KEY_ID" className="bg-transparent border-none outline-none w-full font-mono text-sm placeholder:text-zinc-700" />
               </div>
             </div>
             <div>
               <label className="block text-xs uppercase font-bold text-zinc-500 mb-1">Passphrase</label>
               <div className="flex bg-zinc-900 border border-zinc-700 px-3 py-2 items-center text-zinc-300">
                  <ShieldCheck size={14} className="mr-3 text-zinc-500" />
                  <input type="password" placeholder="••••••••••••••••" className="bg-transparent border-none outline-none w-full font-mono text-sm placeholder:text-zinc-700" />
               </div>
             </div>
             <button className="w-full bg-red-900/20 border border-red-900/50 text-red-500 py-3 uppercase font-bold text-sm hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2 mt-2">
                <AlertTriangle size={16} /> Authenticate
             </button>
          </div>
       </div>
    </div>
  );

  // --- Main Render ---

  return (
    <div className="h-screen bg-black text-zinc-400 font-mono flex flex-col md:flex-row selection:bg-amber-900 selection:text-amber-100 overflow-hidden">
      
      {/* Modal Overlay */}
      <DocumentViewerModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />

      {/* Main Content (Shifted for mobile to be above nav, desktop to right of nav) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative md:ml-0 order-1 md:order-2">
        {/* Background Grain/Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,18,18,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.5)_1px,transparent_1px)] bg-[size:30px_30px] z-0"></div>

        {/* Header Section - Fixed */}
        <header className="flex flex-col gap-4 md:flex-row justify-between items-start md:items-center p-4 md:p-8 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md shrink-0 z-10 shadow-lg">
          <div className="w-full md:w-auto flex justify-between items-start md:block">
            <div>
                <div className="flex items-center gap-2 md:gap-3">
                <h1 className="text-xl md:text-3xl text-zinc-100 font-bold tracking-tight uppercase drop-shadow-md">{protocolData.name}</h1>
                <span className="bg-amber-950/30 text-amber-500 border border-amber-900/50 px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs rounded uppercase flex items-center gap-1 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                    <ShieldCheck size={10} className="md:w-3 md:h-3" /> <span className="hidden md:inline">Verified Live</span><span className="md:hidden">Live</span>
                </span>
                </div>
                <div className="flex items-center gap-4 mt-1">
                <p className="text-zinc-600 uppercase text-[10px] md:text-xs tracking-wider">ID: <span className="text-zinc-400 cursor-pointer hover:underline hover:text-amber-500 transition-colors">0x82...91A2</span></p>
                <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.8)]"></div>
                    <span className="text-[9px] md:text-[10px] text-zinc-600 uppercase">12ms</span>
                </div>
                </div>
            </div>
            
            {/* Mobile Wallet Connect (Top Right) */}
            <div className="md:hidden">
               {walletAddress ? (
                   <div className="flex flex-col items-end">
                       <span className="text-[9px] text-zinc-500 uppercase">Connected</span>
                       <span className="text-amber-500 font-bold text-xs">{walletAddress.slice(0,6)}...</span>
                   </div>
               ) : (
                  <button onClick={connectWallet} className="bg-amber-500 text-black px-3 py-1.5 rounded text-[10px] font-bold uppercase">{isConnecting ? '...' : 'Connect'}</button>
               )}
            </div>
          </div>
          
          <div className="flex w-full md:w-auto flex-row justify-between md:justify-end gap-4 md:gap-8 items-end md:items-center mt-2 md:mt-0">
            <div className="flex gap-4 md:gap-8 text-left md:text-right w-full md:w-auto justify-between md:justify-end">
              <div>
                <p className="text-[10px] md:text-xs text-zinc-600 uppercase mb-1">Price</p>
                <p className="text-lg md:text-2xl text-amber-100 font-bold tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                  {tokenPrice || "Loading..."}
                </p>
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-zinc-600 uppercase mb-1">TVL</p>
                <p className="text-lg md:text-2xl text-amber-100 font-bold tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">{protocolData.tvl}</p>
              </div>
            </div>

            {/* Desktop Connect Wallet Button */}
            <div className="hidden md:block ml-4 pl-4 border-l border-zinc-800">
              {walletAddress ? (
                <div className="flex items-center gap-3 bg-zinc-900/50 border border-amber-500/40 px-4 py-2 rounded-lg cursor-pointer hover:bg-zinc-900 transition-all hover:border-amber-500 group">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] text-zinc-500 uppercase leading-none mb-0.5">Connected</span>
                    <span className="text-amber-500 font-bold font-mono text-sm leading-none group-hover:text-amber-400">{walletAddress}</span>
                  </div>
                  <LogIn size={16} className="text-zinc-600 group-hover:text-amber-500 ml-1" />
                </div>
              ) : (
                <button 
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="bg-amber-500 text-black px-5 py-2.5 rounded font-bold uppercase text-xs tracking-wider hover:bg-amber-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isConnecting ? (
                    <>
                      <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet size={16} strokeWidth={2.5} /> 
                      Connect Wallet
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar z-0 relative pb-24 md:pb-12">
          
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'explorer' && renderExplorer()}
          {activeTab === 'documents' && renderDocuments()}
          {activeTab === 'governance' && renderGovernance()}
          {activeTab === 'admin' && renderAdmin()}

        </div>
      </div>

      {/* Sidebar Navigation (Desktop) / Bottom Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 w-full md:relative md:w-20 md:h-full bg-zinc-950 border-t md:border-t-0 md:border-r border-zinc-900 flex flex-row md:flex-col items-center justify-around md:justify-start py-2 md:py-6 md:gap-8 z-50 shrink-0 order-2 md:order-1 safe-area-bottom">
        <div 
          className="hidden md:flex text-amber-500 font-bold text-2xl tracking-tighter flex-col items-center cursor-pointer hover:text-amber-400 transition-colors drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]"
          onClick={() => setActiveTab('dashboard')}
        >
          <Terminal size={28} strokeWidth={2.5} />
        </div>
        
        {/* Navigation Items */}
        <NavIcon 
            icon={<Activity />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          />
          <NavIcon 
            icon={<Search />} 
            label="Explorer" 
            active={activeTab === 'explorer'} 
            onClick={() => setActiveTab('explorer')}
          />
          <NavIcon 
            icon={<FileText />} 
            label="Documents" 
            active={activeTab === 'documents'} 
            onClick={() => setActiveTab('documents')}
          />
          <NavIcon 
            icon={<Landmark />} 
            label="Governance" 
            active={activeTab === 'governance'} 
            onClick={() => setActiveTab('governance')}
          />
          
          <div className="hidden md:block md:mt-auto md:mb-6">
            <NavIcon 
              icon={<Lock />} 
              label="Admin Access" 
              active={activeTab === 'admin'} 
              onClick={() => setActiveTab('admin')}
            />
          </div>
          {/* Mobile Admin Link shown as icon */}
          <div className="md:hidden">
            <NavIcon 
              icon={<Lock />} 
              label="Admin" 
              active={activeTab === 'admin'} 
              onClick={() => setActiveTab('admin')}
            />
          </div>
      </div>

      {/* Inline Style for Scrollbar to ensure it works without external CSS file */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #09090b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d97706; /* Amber-600 hover state */
        }
        @keyframes data-flow {
          0% { left: -33%; }
          100% { left: 133%; }
        }
        .animate-data-flow {
          animation: data-flow 1.5s linear infinite;
        }
        /* Mobile safe area for bottom nav */
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
};

export default CrecoinTerminal;