import React, { Component } from 'react';
import { Zap, Activity, Target, Search } from 'lucide-react';
import { ComponentShowcase } from './ComponentShowcase';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../components/ui/Card';
import StatCard from '../../../../components/dashboard/StatCard';
export const Components: React.FC = () => {
  return <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
        Component Library
      </h2>

      <ComponentShowcase title="Buttons" description="Primary, secondary, and ghost button variants with multiple sizes">
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Button variant="default" size="lg">
            Primary Button
          </Button>
          <Button variant="secondary" size="lg">
            Secondary Button
          </Button>
          <Button variant="outline" size="lg">
            Outline Button
          </Button>
          <Button variant="ghost" size="lg">
            Ghost Button
          </Button>
          <Button variant="default" size="default">
            Default Size
          </Button>
          <Button variant="default" size="sm">
            Small Size
          </Button>
          <Button variant="default" size="icon">
            <Zap className="w-4 h-4" />
          </Button>
        </div>
      </ComponentShowcase>

      <ComponentShowcase title="Badges" description="Status indicators and labels with semantic colors">
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default Badge</Badge>
          <Badge variant="secondary">Secondary Badge</Badge>
          <Badge variant="outline">Outline Badge</Badge>
          <Badge variant="destructive">Destructive Badge</Badge>
          <div className="badge-primary">Primary Badge</div>
          <div className="badge-success">Success Badge</div>
          <div className="badge-danger">Danger Badge</div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase title="Cards" description="Glass-effect cards with various layouts and content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>
                Card description with supporting text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400">
                This is a standard card component with header, title,
                description, and content sections.
              </p>
            </CardContent>
          </Card>

          <div className="glass-card p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#BEF264]/10 border border-[#BEF264]/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#BEF264]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Glass Card</h4>
                <p className="text-xs text-zinc-500">With icon and content</p>
              </div>
            </div>
            <p className="text-sm text-zinc-400">
              Custom glass-effect card with glassmorphism styling and backdrop
              blur.
            </p>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase title="Stat Cards" description="Analytics cards with sparklines and progress indicators">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <StatCard title="Possession" value="64" subValue="%" subLabel="Dominating Midfield" percentage={64} icon={<Activity size={20} />} sparklineData={[45, 48, 52, 55, 60, 58, 62, 64, 61, 64]} />
          <StatCard title="Expected Goals" value="2.42" subLabel="+0.8 vs Avg" percentage={82} icon={<Target size={20} />} sparklineData={[0.5, 0.8, 1.2, 0.9, 1.5, 1.8, 2.1, 1.9, 2.3, 2.42]} />
        </div>
      </ComponentShowcase>

      <ComponentShowcase title="Input Fields" description="Form inputs with glass styling and validation states">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-white mb-2 block" htmlFor="default-input">
              Default Input
            </label>
            <input id="default-input" type="text" placeholder="Enter text..." className="input-glass w-full" aria-label="Default input field" />
          </div>
          <div>
            <label className="text-sm font-medium text-white mb-2 block" htmlFor="search-input">
              Search Input
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" aria-hidden="true" />
              <input id="search-input" type="text" placeholder="Search..." className="search-input w-full" aria-label="Search input field" />
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase title="Live Indicators" description="Real-time status indicators with pulse animations">
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <div className="live-pulse">
            <span>Live</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#BEF264]/10 border border-[#BEF264]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BEF264] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BEF264]"></span>
            </span>
            <span className="text-xs font-bold text-[#BEF264]">AI LIVE</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold">
            <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            System Online
          </div>
        </div>
      </ComponentShowcase>
    </div>;
};