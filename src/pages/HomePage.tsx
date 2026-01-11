import React from 'react';
import { Target, Activity, Zap, BarChart2 } from 'lucide-react';
import { useMatchData } from '../hooks/useMatchData';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import HeroSection from '../components/dashboard/HeroSection';
import StatCard from '../components/dashboard/StatCard';
import BTTSChart from '../components/dashboard/BTTSChart';
import LeagueTable from '../components/dashboard/LeagueTable';
import { gridLayouts } from '../constants/gridSystem';
import { iconSizes } from '../constants/designTokens';
import { motion } from 'framer-motion';
const mockSparklines = {
  possession: [45, 48, 52, 55, 60, 58, 62, 64, 61, 64],
  xg: [0.5, 0.8, 1.2, 0.9, 1.5, 1.8, 2.1, 1.9, 2.3, 2.42],
  pass: [82, 85, 84, 88, 89, 90, 88, 91, 92, 91],
  shots: [5, 8, 7, 12, 10, 14, 15, 12, 16, 18]
};
const HomePage = () => {
  const {
    loading,
    bttsData,
    leagueTable
  } = useMatchData();
  if (loading) {
    return <SkeletonLoader />;
  }
  return <div className="animate-in fade-in duration-700">
      <HeroSection />

      <div className="container mx-auto px-0 pb-12">
        <div className={gridLayouts.dashboard}>
          {/* Stats Row */}
          <div className={gridLayouts.statsRow}>
            {[{
            title: 'Possession',
            value: '64',
            subValue: '%',
            subLabel: 'Dominating Midfield',
            percentage: 64,
            icon: <Activity size={iconSizes.md} />,
            data: mockSparklines.possession
          }, {
            title: 'Expected Goals (xG)',
            value: '2.42',
            subLabel: '+0.8 vs Avg',
            percentage: 82,
            icon: <Target size={iconSizes.md} />,
            data: mockSparklines.xg
          }, {
            title: 'Pass Accuracy',
            value: '91',
            subValue: '%',
            subLabel: '428 Completed',
            percentage: 91,
            icon: <Zap size={iconSizes.md} />,
            data: mockSparklines.pass
          }, {
            title: 'Total Shots',
            value: '18',
            subLabel: '6 On Target',
            percentage: 45,
            icon: <BarChart2 size={iconSizes.md} />,
            data: mockSparklines.shots
          }].map((stat, index) => <motion.div key={stat.title} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2 + index * 0.1,
            duration: 0.5
          }} className="h-full">
                <StatCard title={stat.title} value={stat.value} subValue={stat.subValue} subLabel={stat.subLabel} percentage={stat.percentage} icon={stat.icon} sparklineData={stat.data} />
              </motion.div>)}
          </div>

          {/* Deep Dive Section */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6,
          duration: 0.5
        }} className={gridLayouts.twoThirdsWidth + ' h-[600px]'}>
            <BTTSChart data={bttsData} />
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7,
          duration: 0.5
        }} className={gridLayouts.oneThirdWidth + ' h-[600px]'}>
            <LeagueTable teams={leagueTable} />
          </motion.div>
        </div>
      </div>
    </div>;
};
export default HomePage;