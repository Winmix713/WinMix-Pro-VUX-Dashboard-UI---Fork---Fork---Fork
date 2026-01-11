import React, { useState, Component } from 'react';
import { RotateCcw, MousePointer2, Save, MoreHorizontal, X, ChevronDown, Laptop, UnfoldHorizontal, UnfoldVertical, Scan, Square, Eye, Image, Move, Zap, RotateCw, Maximize, WandSparkles, Sparkles, Paperclip, Figma, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
type TabMode = 'EDIT' | 'PROMPT' | 'CODE';
interface PropertyInspectorProps {
  selectedElement?: {
    type: string;
    id: string;
    classes: string;
    content?: string;
  };
  onStyleChange?: (property: string, value: any) => void;
  onClose?: () => void;
}
export const PropertyInspector = ({
  selectedElement,
  onStyleChange,
  onClose
}: PropertyInspectorProps) => {
  const [activeTab, setActiveTab] = useState<TabMode>('EDIT');
  const [opacity, setOpacity] = useState(100);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(100);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [rotateZ, setRotateZ] = useState(0);
  const [perspective, setPerspective] = useState(0);
  const [promptText, setPromptText] = useState('');
  const [codeText, setCodeText] = useState(selectedElement?.classes || '');
  const elementType = selectedElement?.type || 'div';
  const elementId = selectedElement?.id || 'element';
  return <div className="bg-card border-border rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] w-80 max-h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border py-2 px-4 bg-secondary/50 rounded-t-2xl flex-shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-xs uppercase font-medium text-muted-foreground">
            {elementType}
          </h3>
          <div className="flex border border-border rounded-md overflow-hidden">
            <button onClick={() => setActiveTab('EDIT')} className={`px-2 py-1 text-[8px] font-medium transition-colors cursor-pointer ${activeTab === 'EDIT' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-secondary'}`}>
              EDIT
            </button>
            <button onClick={() => setActiveTab('PROMPT')} className={`px-2 py-1 text-[8px] font-medium transition-colors border-l border-border cursor-pointer ${activeTab === 'PROMPT' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-secondary'}`}>
              PROMPT
            </button>
            <button onClick={() => setActiveTab('CODE')} className={`px-2 py-1 text-[8px] font-medium transition-colors border-l border-border cursor-pointer ${activeTab === 'CODE' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-secondary'}`}>
              CODE
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
            <MousePointer2 className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
            <Save className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
            <MoreHorizontal className="w-3 h-3" />
          </Button>
          {onClose && <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={onClose}>
              <X className="w-3 h-3" />
            </Button>}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto flex-1">
        {activeTab === 'PROMPT' ? <form className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Describe what you want to change:
              </label>
              <div className="relative">
                <Textarea placeholder="Adapt to dark mode, add details, make adaptive, change text to..." value={promptText} onChange={e => setPromptText(e.target.value)} className="w-full resize-none min-h-[100px] max-h-[200px] overflow-y-auto text-xs hover:bg-secondary/50 pb-[40px] rounded-2xl" />
                <div className="absolute bottom-[16px] left-[9px] z-10 flex gap-1">
                  <button type="button" className="flex p-2 py-1 gap-2 items-center text-[10px] rounded-lg bg-card hover:bg-secondary border border-border hover:border-primary/50 shadow-sm" title="Open Prompt Builder">
                    <WandSparkles className="h-3 w-3" />
                  </button>
                  <button type="button" className="flex items-center rounded-lg bg-card border border-border hover:border-primary/50 shadow-sm p-2 py-1 gap-2 text-[10px] flex-shrink-0 hover:bg-secondary" title="Select AI Model">
                    <Sparkles className="h-3 w-3" />
                    GPT-5
                    <ChevronDown className="h-3 w-3 ml-0.5" />
                  </button>
                  <button type="button" className="flex p-2 py-1 gap-2 items-center text-[10px] rounded-lg bg-card hover:bg-secondary border border-border hover:border-primary/50 shadow-sm" title="Attach Files (Max 2)">
                    <Paperclip className="h-3 w-3" />
                  </button>
                  <button type="button" className="flex p-2 py-1 items-center text-[10px] rounded-lg bg-card hover:bg-secondary border border-border hover:border-primary/50 shadow-sm" title="Import from Figma">
                    <Figma className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div>
                  Selected:{' '}
                  <span className="font-medium font-mono text-xs uppercase text-foreground">
                    {elementType}
                  </span>
                </div>
                <span className="text-[10px]">#{elementId}</span>
              </div>
              <div className="font-mono text-[10px] bg-secondary/50 border border-border rounded-lg px-2 py-2">
                {codeText || 'No classes'}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 mt-2">
                <Button type="submit" disabled={!promptText.trim()} className="flex p-2 px-3 gap-2 items-center">
                  <Send className="w-3 h-3" />
                  Apply Changes
                </Button>
                <Button type="button" variant="outline" onClick={() => setPromptText('')} className="p-2 px-3">
                  Cancel
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Costs 1 prompt. Don't forget to save changes.
              </p>
            </div>
          </form> : activeTab === 'CODE' ? <div className="flex flex-col h-full gap-3">
            <Textarea value={codeText} onChange={e => {
          const newValue = e.target.value;
          setCodeText(newValue);
          // ✅ IMMEDIATE onChange
          if (onStyleChange) {
            console.log('🎨 CODE tab - classes changed:', newValue);
            onStyleChange('classes', newValue);
          }
        }} className="flex-1 font-mono text-xs resize-none bg-secondary/50 border-border rounded-lg p-3 min-h-[400px]" spellCheck={false} />
            <div className="flex items-center justify-between border-t border-border py-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">
                  Live editing
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setCodeText(selectedElement?.classes || '')} className="text-[10px] h-7 px-2">
                  Reset
                </Button>
                <Button onClick={() => onStyleChange && onStyleChange('classes', codeText)} className="text-[10px] h-7 px-2">
                  Apply
                </Button>
              </div>
            </div>
          </div> : <div className="space-y-3">
            {/* Breakpoint Selector */}
            <div className="flex items-center justify-between">
              <div className="flex border border-border rounded-md overflow-hidden h-6">
                <button className="px-2 text-[9px] transition-[var(--transition-smooth)] bg-primary text-primary-foreground">
                  AUTO
                </button>
                <button className="px-2 text-[9px] transition-[var(--transition-smooth)] bg-card text-muted-foreground border-l border-border hover:bg-secondary">
                  *
                </button>
                <button className="px-2 text-[9px] transition-[var(--transition-smooth)] bg-accent/20 text-accent-foreground border-l border-border">
                  MD
                </button>
              </div>
              <span className="text-[10px] text-muted-foreground ml-2 flex items-center gap-1">
                <Laptop className="w-3 h-3" />
                <span>Auto Breakpoint</span>
              </span>
            </div>

            {/* Text Content - ✅ IMMEDIATE onChange */}
            {selectedElement?.content !== undefined && <PropertySection title="Text Content">
                <Textarea placeholder="Enter text content..." rows={1} className="resize-none text-xs" defaultValue={selectedElement.content} onChange={e => {
            const newValue = e.target.value;
            // ✅ IMMEDIATE onChange
            if (onStyleChange) {
              console.log('📝 Content changed:', newValue);
              onStyleChange('content', newValue);
            }
          }} />
              </PropertySection>}

            {/* Tailwind Classes - ✅ IMMEDIATE onChange */}
            <PropertySection title="Tailwind Classes">
              <Textarea placeholder="Enter Tailwind classes..." rows={2} className="resize-none text-xs" value={codeText} onChange={e => {
            const newValue = e.target.value;
            setCodeText(newValue);
            // ✅ IMMEDIATE onChange
            if (onStyleChange) {
              console.log('🎨 Tailwind classes changed:', newValue);
              onStyleChange('classes', newValue);
            }
          }} />
            </PropertySection>

            {/* Margin */}
            <PropertySection title="Margin" icon={<Scan className="w-3 h-3" />}>
              <div className="grid grid-cols-2 gap-2">
                <IconInput icon={<UnfoldHorizontal className="w-3 h-3" />} placeholder="X" />
                <IconInput icon={<UnfoldVertical className="w-3 h-3" />} placeholder="Y" />
              </div>
            </PropertySection>

            {/* Padding */}
            <PropertySection title="Padding" icon={<Square className="w-3 h-3" />}>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <LabeledInput label="L" placeholder="0" />
                  <LabeledInput label="T" placeholder="0" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <LabeledInput label="R" placeholder="0" />
                  <LabeledInput label="B" placeholder="0" />
                </div>
              </div>
            </PropertySection>

            {/* Size */}
            <PropertySection title="Size">
              <div className="grid grid-cols-2 gap-2">
                <IconInput icon={<UnfoldHorizontal className="w-3 h-3" />} placeholder="Width" />
                <IconInput icon={<UnfoldVertical className="w-3 h-3" />} placeholder="Height" />
              </div>
            </PropertySection>

            {/* Typography */}
            <PropertySection title="Typography">
              <div className="grid grid-cols-2 gap-2">
                <Select defaultValue="jakarta">
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jakarta">Jakarta Sans</SelectItem>
                    <SelectItem value="mono">JetBrains Mono</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="default">
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="xs">XS</SelectItem>
                    <SelectItem value="sm">SM</SelectItem>
                    <SelectItem value="base">Base</SelectItem>
                    <SelectItem value="lg">LG</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Select defaultValue="semibold">
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="semibold">Semibold</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="tight">
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tight">Tight</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="relaxed">Relaxed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </PropertySection>

            {/* Appearance - ✅ IMMEDIATE onChange */}
            <PropertySection title="Appearance" icon={<Eye className="w-3 h-3" />}>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-muted-foreground">
                    Opacity
                  </label>
                  <Input type="number" min="0" max="100" value={opacity} onChange={e => {
                const newValue = Number(e.target.value);
                setOpacity(newValue);
                // ✅ IMMEDIATE onChange
                if (onStyleChange) {
                  console.log('👁️ Opacity changed:', newValue);
                  onStyleChange('opacity', newValue / 100);
                }
              }} className="h-7 text-xs" />
                </div>
                <Select defaultValue="normal">
                  <SelectTrigger className="h-7 text-xs mt-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="multiply">Multiply</SelectItem>
                    <SelectItem value="screen">Screen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </PropertySection>

            {/* Background */}
            <PropertySection title="Background">
              <div className="grid grid-cols-2 gap-2">
                <button className="h-7 flex items-center gap-2 px-2 py-1 text-xs rounded-md border border-border bg-card hover:bg-secondary transition-colors">
                  <div className="w-4 h-4 rounded-full border border-border bg-muted"></div>
                  <span className="text-xs truncate">Color</span>
                </button>
                <button className="h-7 flex items-center gap-2 px-2 py-1 text-xs rounded-md border border-border bg-card hover:bg-secondary transition-colors">
                  <div className="w-4 h-4 rounded border border-border bg-muted flex items-center justify-center">
                    <Image className="w-2.5 h-2.5 text-muted-foreground" />
                  </div>
                  <span className="text-xs truncate">Image</span>
                </button>
              </div>
            </PropertySection>

            {/* Transforms - ✅ WITH CALLBACKS */}
            <div className="border-t border-border pt-4 pb-2">
              <PropertySection title="Transforms">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Slider icon={<Move className="w-2.5 h-2.5" />} label="Translate X" value={translateX} onChange={setTranslateX} min={-200} max={200} unit="px" onStyleChange={onStyleChange} styleProperty="translateX" />
                    <Slider icon={<Move className="w-2.5 h-2.5" />} label="Translate Y" value={translateY} onChange={setTranslateY} min={-200} max={200} unit="px" onStyleChange={onStyleChange} styleProperty="translateY" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Slider icon={<Zap className="w-2.5 h-2.5" />} label="Skew X" value={skewX} onChange={setSkewX} min={-45} max={45} unit="°" onStyleChange={onStyleChange} styleProperty="skewX" />
                    <Slider icon={<Zap className="w-2.5 h-2.5" />} label="Skew Y" value={skewY} onChange={setSkewY} min={-45} max={45} unit="°" onStyleChange={onStyleChange} styleProperty="skewY" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Slider icon={<RotateCw className="w-2.5 h-2.5" />} label="Rotate" value={rotate} onChange={setRotate} min={-180} max={180} unit="°" onStyleChange={onStyleChange} styleProperty="rotate" />
                    <Slider icon={<Maximize className="w-2.5 h-2.5" />} label="Scale" value={scale} onChange={setScale} min={0} max={200} unit="%" onStyleChange={onStyleChange} styleProperty="scale" />
                  </div>
                </div>
              </PropertySection>
            </div>

            {/* 3D Transform - ✅ WITH CALLBACKS */}
            <div className="border-t border-border pt-4 pb-2">
              <PropertySection title="3D Transform">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Slider icon={<RotateCw className="w-2.5 h-2.5" />} label="Rotate X" value={rotateX} onChange={setRotateX} min={-180} max={180} unit="°" onStyleChange={onStyleChange} styleProperty="rotateX" />
                    <Slider icon={<RotateCw className="w-2.5 h-2.5" />} label="Rotate Y" value={rotateY} onChange={setRotateY} min={-180} max={180} unit="°" onStyleChange={onStyleChange} styleProperty="rotateY" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Slider icon={<RotateCw className="w-2.5 h-2.5" />} label="Rotate Z" value={rotateZ} onChange={setRotateZ} min={-180} max={180} unit="°" onStyleChange={onStyleChange} styleProperty="rotateZ" />
                    <Slider icon={<Maximize className="w-2.5 h-2.5" />} label="Perspective" value={perspective} onChange={setPerspective} min={0} max={6} unit="" valueLabel={perspective === 0 ? 'Default' : perspective.toString()} onStyleChange={onStyleChange} styleProperty="perspective" />
                  </div>
                </div>
              </PropertySection>
            </div>
          </div>}
      </div>
    </div>;
};
// Helper Components
const PropertySection = ({
  title,
  icon,
  children
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => <div>
    <div className="flex items-center justify-between mb-2">
      <label className="text-xs font-medium text-muted-foreground">
        {title}
      </label>
      {icon && <button className="text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors">
          {icon}
        </button>}
    </div>
    {children}
  </div>;
const IconInput = ({
  icon,
  placeholder
}: {
  icon: React.ReactNode;
  placeholder?: string;
}) => <div className="relative">
    <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none">
      {icon}
    </div>
    <Input type="text" placeholder={placeholder} className="h-8 text-xs pl-8" />
  </div>;
const LabeledInput = ({
  label,
  placeholder
}: {
  label: string;
  placeholder?: string;
}) => <div className="relative">
    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xs font-light text-foreground pointer-events-none">
      {label}
    </span>
    <Input type="text" placeholder={placeholder} className="h-8 text-xs pl-8" />
  </div>;
// ✅ IMPROVED: Slider with immediate callback support
const Slider = ({
  icon,
  label,
  value,
  onChange,
  min,
  max,
  unit,
  valueLabel,
  onStyleChange,
  styleProperty
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit: string;
  valueLabel?: string;
  onStyleChange?: (property: string, value: any) => void;
  styleProperty?: string;
}) => <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        {icon}
        <span className="text-[10px] font-medium text-muted-foreground">
          {label}
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground">
        {valueLabel || `${value}${unit}`}
      </span>
    </div>
    <input type="range" min={min} max={max} value={value} onChange={e => {
    const newValue = Number(e.target.value);
    onChange(newValue);
    // ✅ IMMEDIATE onChange callback
    if (onStyleChange && styleProperty) {
      console.log(`🎚️ ${styleProperty} changed:`, newValue);
      onStyleChange(styleProperty, `${newValue}${unit}`);
    }
  }} className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer 
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary 
        [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md
        [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full 
        [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer" />
  </div>;