import React from 'react';
import { StatMetrics } from '../../hooks/useStatMetrics';
interface StatCardPopoverProps {
  title: string;
  metrics: StatMetrics;
}
const StatCardPopover: React.FC<StatCardPopoverProps> = ({
  title,
  metrics
}) => {
  return <div className="p-4">
      <h4 className="text-sm font-bold text-white mb-3">{title} Details</h4>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Current</span>
          <span className="text-sm font-bold text-white">{metrics.current}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Season Average</span>
          <span className="text-sm font-bold text-white">{metrics.average}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Last Match</span>
          <span className="text-sm font-bold text-white">{metrics.lastMatch}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-k-borderLight">
          <span className="text-xs text-gray-400">Trend</span>
          <span className="text-xs font-bold text-k-lime">{metrics.trend}</span>
        </div>
        <div className="pt-2 border-t border-k-borderLight">
          <p className="text-xs text-gray-400 leading-relaxed">{metrics.insight}</p>
        </div>
      </div>
    </div>;
};
export default StatCardPopover;