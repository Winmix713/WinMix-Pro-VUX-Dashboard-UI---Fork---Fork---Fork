import React, { useMemo, useState, useRef } from 'react';
import { BTTSData } from '../../types/matches';
import { TrendingUp, Info } from 'lucide-react';
import { colors, animations } from '../../constants/designTokens';
interface BttsChartProps {
  data: BTTSData[];
}
const BttsChart: React.FC<BttsChartProps> = ({
  data
}) => {
  const [hoverData, setHoverData] = useState<{
    x: number;
    y: number;
    value: number;
    index: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const width = 100;
  const height = 40;
  const getPath = (points: {
    x: number;
    y: number;
  }[]) => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const x0 = i > 0 ? points[i - 1].x : points[0].x;
      const y0 = i > 0 ? points[i - 1].y : points[0].y;
      const x1 = points[i].x;
      const y1 = points[i].y;
      const x2 = points[i + 1].x;
      const y2 = points[i + 1].y;
      const x3 = i !== points.length - 2 ? points[i + 2].x : x2;
      const y3 = i !== points.length - 2 ? points[i + 2].y : y2;
      const cp1x = x1 + (x2 - x0) / 6;
      const cp1y = y1 + (y2 - y0) / 6;
      const cp2x = x2 - (x3 - x1) / 6;
      const cp2y = y2 - (y3 - y1) / 6;
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
    }
    return d;
  };
  const {
    pathString,
    areaPath,
    points
  } = useMemo(() => {
    if (!data.length) return {
      pathString: '',
      areaPath: '',
      points: []
    };
    const maxVal = Math.max(...data.map(d => d.bttsCount), 1);
    const minVal = 0;
    const normalizedPoints = data.map((d, i) => ({
      x: i / (data.length - 1) * width,
      y: height - (d.bttsCount - minVal) / (maxVal - minVal) * (height * 0.7) - 5,
      value: d.bttsCount,
      originalIndex: i
    }));
    const line = getPath(normalizedPoints);
    const area = `${line} L ${width},${height} L 0,${height} Z`;
    return {
      pathString: line,
      areaPath: area,
      points: normalizedPoints
    };
  }, [data]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !points.length) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const relX = x / rect.width * width;
    const closest = points.reduce((prev, curr) => Math.abs(curr.x - relX) < Math.abs(prev.x - relX) ? curr : prev);
    setHoverData({
      ...closest,
      index: closest.originalIndex
    });
  };
  return <div className="glass-card flex flex-col h-full relative group overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#BEF264]/5 blur-[80px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="p-6 md:p-8 relative z-10 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-white tracking-tight">
              BTTS Momentum
            </h3>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/5 border border-white/10 text-zinc-400 font-mono uppercase tracking-wider">
              Last 30 Days
            </span>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            Both Teams To Score frequency analysis using smoothed goal data
            points.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#BEF264]/10 border border-[#BEF264]/20 shadow-[0_0_15px_rgba(190,242,100,0.1)]">
            <TrendingUp className="w-4 h-4 text-[#BEF264]" />
            <span className="text-xs font-bold text-[#BEF264] uppercase tracking-wide">
              High Trend
            </span>
          </div>
          <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 w-full relative z-10 cursor-crosshair px-2 pb-4" onMouseMove={handleMouseMove} onMouseLeave={() => setHoverData(null)}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible filter drop-shadow-[0_0_20px_rgba(190,242,100,0.2)]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.4" />
              <stop offset="50%" stopColor={colors.primary} stopOpacity="0.1" />
              <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Reference Line */}
          <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="white" strokeOpacity="0.1" strokeWidth="0.5" strokeDasharray="2 2" />

          {/* Area Fill */}
          <path d={areaPath} fill="url(#chartFill)" className="transition-opacity duration-300" />

          {/* Main Line */}
          <path d={pathString} fill="none" stroke={colors.primary} strokeWidth="0.8" strokeLinecap="round" className="transition-all duration-300" filter="url(#glow)" />

          {/* Hover Effects */}
          {hoverData && <g>
              <line x1={hoverData.x} y1="0" x2={hoverData.x} y2={height} stroke="white" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="1 1" />
              <circle cx={hoverData.x} cy={hoverData.y} r="3" fill={colors.primary} className="animate-pulse" filter="url(#glow)" />
              <circle cx={hoverData.x} cy={hoverData.y} r="1.5" fill="white" />

              <foreignObject x={Math.min(hoverData.x - 12, width - 25)} y={hoverData.y - 15} width="50" height="30">
                <div className="flex flex-col items-center">
                  <div className="bg-zinc-900/90 border border-white/10 rounded-md px-2 py-1 text-[8px] text-center text-white font-mono shadow-xl backdrop-blur-md transform -translate-y-2">
                    <span className="text-[#BEF264] font-bold">
                      {hoverData.value}
                    </span>{' '}
                    Goals
                  </div>
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-zinc-900/90 transform -translate-y-2"></div>
                </div>
              </foreignObject>
            </g>}
        </svg>
      </div>
    </div>;
};
export default BttsChart;