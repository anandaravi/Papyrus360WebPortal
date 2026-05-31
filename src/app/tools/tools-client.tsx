'use client';

import { useState } from 'react';
import {
  Calculator,
  ArrowRightLeft,
  Package,
  Cylinder,
  Layers,
  Ruler,
  Hash,
  IndianRupee,
  Droplets,
  BookOpen,
  Gauge,
  Table2,
} from 'lucide-react';

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Card({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="amber-card rounded-2xl bg-surface border border-border p-6 flex flex-col gap-5">
      <div className="flex items-start gap-3">
        <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
          <Icon size={18} />
        </span>
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-text-2 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  unit,
  value,
  onChange,
  placeholder,
  min,
}: {
  label: string;
  unit?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  min?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-text-2">{label}</label>
      <div className="flex items-center border border-border rounded-lg overflow-hidden focus-within:border-amber-500/60 transition-colors">
        <input
          type="number"
          className="flex-1 bg-surface-2 px-3 py-2 text-sm text-foreground outline-none min-w-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? '0'}
          min={min}
        />
        {unit && (
          <span className="px-3 py-2 text-xs text-text-3 bg-surface-3 border-l border-border shrink-0">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-text-2">{label}</label>
      <select
        className="bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-amber-500/60 transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Result({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-xl bg-amber-500/8 border border-amber-500/20 px-4 py-3 flex items-center justify-between gap-4">
      <span className="text-xs text-amber-400/80">{label}</span>
      <span className="text-lg font-bold text-amber-400 tabular-nums">
        {value ?? '—'}
      </span>
    </div>
  );
}

function CalcButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2.5 text-sm font-semibold bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors duration-200"
    >
      Calculate
    </button>
  );
}

function fmt(n: number, decimals = 4): string {
  if (!isFinite(n)) return '—';
  const s = n.toPrecision(6);
  const f = parseFloat(s);
  return f.toLocaleString('en-IN', { maximumFractionDigits: decimals });
}

// ─── 1. GSM Calculator ────────────────────────────────────────────────────────

function GsmCalculator() {
  const [mode, setMode] = useState<'toGsm' | 'toWeight'>('toGsm');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gsm, setGsm] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [resultLabel, setResultLabel] = useState('');

  function calculate() {
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (mode === 'toGsm') {
      const wt = parseFloat(weight);
      if (!w || !h || !wt) return;
      const g = (wt * 1_000_000) / (w * h);
      setResultLabel('GSM (g/m²)');
      setResult(fmt(g, 2));
    } else {
      const g = parseFloat(gsm);
      if (!w || !h || !g) return;
      const wt = (g * w * h) / 1_000_000;
      setResultLabel('Sheet weight (g)');
      setResult(fmt(wt, 4));
    }
  }

  return (
    <Card
      icon={Calculator}
      title="GSM Calculator"
      description="Calculate GSM from sheet dimensions and weight, or find sheet weight from GSM."
    >
      <div className="flex rounded-lg border border-border overflow-hidden text-xs font-medium">
        <button
          className={`flex-1 py-2 transition-colors ${mode === 'toGsm' ? 'bg-amber-500 text-black' : 'text-text-2 hover:text-foreground'}`}
          onClick={() => { setMode('toGsm'); setResult(null); }}
        >
          Dimensions → GSM
        </button>
        <button
          className={`flex-1 py-2 transition-colors ${mode === 'toWeight' ? 'bg-amber-500 text-black' : 'text-text-2 hover:text-foreground'}`}
          onClick={() => { setMode('toWeight'); setResult(null); }}
        >
          GSM → Sheet Weight
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Width" unit="mm" value={width} onChange={setWidth} />
        <Field label="Height" unit="mm" value={height} onChange={setHeight} />
        {mode === 'toGsm' ? (
          <div className="col-span-2">
            <Field label="Sheet weight" unit="g" value={weight} onChange={setWeight} />
          </div>
        ) : (
          <div className="col-span-2">
            <Field label="GSM" unit="g/m²" value={gsm} onChange={setGsm} />
          </div>
        )}
      </div>
      <CalcButton onClick={calculate} />
      {result && <Result label={resultLabel} value={result} />}
    </Card>
  );
}

// ─── 2. Basis Weight ↔ GSM ────────────────────────────────────────────────────

const BASIS_TYPES = [
  { value: 'bond', label: 'Bond / Writing (17×22″)', factor: 3.7597 },
  { value: 'text', label: 'Text / Book (25×38″)', factor: 1.4801 },
  { value: 'cover', label: 'Cover (20×26″)', factor: 2.7030 },
  { value: 'index', label: 'Index (25.5×30.5″)', factor: 1.8130 },
  { value: 'newsprint', label: 'Newsprint (24×36″)', factor: 1.6275 },
  { value: 'tag', label: 'Tag / Kraft (24×36″)', factor: 1.2275 },
];

function BasisWeightConverter() {
  const [mode, setMode] = useState<'toGsm' | 'toBasis'>('toGsm');
  const [paperType, setPaperType] = useState('bond');
  const [basisWeight, setBasisWeight] = useState('');
  const [gsmInput, setGsmInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [resultLabel, setResultLabel] = useState('');

  function calculate() {
    const type = BASIS_TYPES.find((t) => t.value === paperType)!;
    if (mode === 'toGsm') {
      const b = parseFloat(basisWeight);
      if (!b) return;
      setResultLabel('GSM (g/m²)');
      setResult(fmt(b * type.factor, 1));
    } else {
      const g = parseFloat(gsmInput);
      if (!g) return;
      setResultLabel('Basis weight (lb)');
      setResult(fmt(g / type.factor, 1));
    }
  }

  return (
    <Card
      icon={ArrowRightLeft}
      title="Basis Weight ↔ GSM"
      description="Convert US basis weight to metric GSM or vice versa across all paper grades."
    >
      <div className="flex rounded-lg border border-border overflow-hidden text-xs font-medium">
        <button
          className={`flex-1 py-2 transition-colors ${mode === 'toGsm' ? 'bg-amber-500 text-black' : 'text-text-2 hover:text-foreground'}`}
          onClick={() => { setMode('toGsm'); setResult(null); }}
        >
          lb → GSM
        </button>
        <button
          className={`flex-1 py-2 transition-colors ${mode === 'toBasis' ? 'bg-amber-500 text-black' : 'text-text-2 hover:text-foreground'}`}
          onClick={() => { setMode('toBasis'); setResult(null); }}
        >
          GSM → lb
        </button>
      </div>
      <SelectField
        label="Paper grade"
        value={paperType}
        onChange={(v) => { setPaperType(v); setResult(null); }}
        options={BASIS_TYPES.map((t) => ({ value: t.value, label: t.label }))}
      />
      {mode === 'toGsm' ? (
        <Field label="Basis weight" unit="lb" value={basisWeight} onChange={setBasisWeight} />
      ) : (
        <Field label="GSM" unit="g/m²" value={gsmInput} onChange={setGsmInput} />
      )}
      <CalcButton onClick={calculate} />
      {result && <Result label={resultLabel} value={result} />}
    </Card>
  );
}

// ─── 3. Ream Weight ───────────────────────────────────────────────────────────

function ReamWeightCalculator() {
  const [gsm, setGsm] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [sheets, setSheets] = useState('500');
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const g = parseFloat(gsm);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const s = parseFloat(sheets);
    if (!g || !w || !h || !s) return;
    const kg = (g * w * h * s) / 1_000_000_000;
    setResult(`${fmt(kg, 3)} kg`);
  }

  return (
    <Card
      icon={Package}
      title="Ream Weight Calculator"
      description="Find the weight of a ream given GSM, sheet size, and number of sheets."
    >
      <div className="grid grid-cols-2 gap-3">
        <Field label="GSM" unit="g/m²" value={gsm} onChange={setGsm} />
        <Field label="Sheets per ream" value={sheets} onChange={setSheets} placeholder="500" />
        <Field label="Sheet width" unit="mm" value={width} onChange={setWidth} />
        <Field label="Sheet height" unit="mm" value={height} onChange={setHeight} />
      </div>
      <CalcButton onClick={calculate} />
      {result && <Result label="Ream weight" value={result} />}
    </Card>
  );
}

// ─── 4. Roll Weight ───────────────────────────────────────────────────────────

function RollWeightCalculator() {
  const [gsm, setGsm] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const g = parseFloat(gsm);
    const w = parseFloat(width);
    const l = parseFloat(length);
    if (!g || !w || !l) return;
    const kg = (g * w * l) / 1_000_000;
    setResult(`${fmt(kg, 2)} kg`);
  }

  return (
    <Card
      icon={Cylinder}
      title="Roll Weight Calculator"
      description="Calculate gross weight of a paper roll from GSM, width, and length."
    >
      <div className="grid grid-cols-2 gap-3">
        <Field label="GSM" unit="g/m²" value={gsm} onChange={setGsm} />
        <Field label="Roll width" unit="mm" value={width} onChange={setWidth} />
        <div className="col-span-2">
          <Field label="Roll length" unit="m" value={length} onChange={setLength} />
        </div>
      </div>
      <CalcButton onClick={calculate} />
      {result && <Result label="Roll weight" value={result} />}
    </Card>
  );
}

// ─── 5. Roll Length ───────────────────────────────────────────────────────────

function RollLengthCalculator() {
  const [mode, setMode] = useState<'fromWeight' | 'fromDiameter'>('fromWeight');
  const [gsm, setGsm] = useState('');
  const [width, setWidth] = useState('');
  const [rollWeight, setRollWeight] = useState('');
  const [outerDia, setOuterDia] = useState('');
  const [coreDia, setCoreDia] = useState('');
  const [caliper, setCaliper] = useState('');
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    if (mode === 'fromWeight') {
      const g = parseFloat(gsm);
      const w = parseFloat(width);
      const rw = parseFloat(rollWeight);
      if (!g || !w || !rw) return;
      const m = (rw * 1_000_000) / (g * w);
      setResult(`${fmt(m, 1)} m`);
    } else {
      const D = parseFloat(outerDia);
      const d = parseFloat(coreDia);
      const c = parseFloat(caliper);
      if (!D || !d || !c) return;
      const m = (Math.PI * (D * D - d * d)) / (4 * c);
      setResult(`${fmt(m / 1000, 1)} m`);
    }
  }

  return (
    <Card
      icon={Layers}
      title="Roll Length Calculator"
      description="Find paper length on a roll from weight & GSM, or from outer/core diameter and caliper."
    >
      <div className="flex rounded-lg border border-border overflow-hidden text-xs font-medium">
        <button
          className={`flex-1 py-2 transition-colors ${mode === 'fromWeight' ? 'bg-amber-500 text-black' : 'text-text-2 hover:text-foreground'}`}
          onClick={() => { setMode('fromWeight'); setResult(null); }}
        >
          Weight method
        </button>
        <button
          className={`flex-1 py-2 transition-colors ${mode === 'fromDiameter' ? 'bg-amber-500 text-black' : 'text-text-2 hover:text-foreground'}`}
          onClick={() => { setMode('fromDiameter'); setResult(null); }}
        >
          Diameter method
        </button>
      </div>
      {mode === 'fromWeight' ? (
        <div className="grid grid-cols-2 gap-3">
          <Field label="GSM" unit="g/m²" value={gsm} onChange={setGsm} />
          <Field label="Roll width" unit="mm" value={width} onChange={setWidth} />
          <div className="col-span-2">
            <Field label="Roll weight" unit="kg" value={rollWeight} onChange={setRollWeight} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Outer diameter" unit="mm" value={outerDia} onChange={setOuterDia} />
          <Field label="Core diameter" unit="mm" value={coreDia} onChange={setCoreDia} />
          <div className="col-span-2">
            <Field label="Caliper (thickness)" unit="μm" value={caliper} onChange={setCaliper} />
          </div>
        </div>
      )}
      <CalcButton onClick={calculate} />
      {result && <Result label="Roll length" value={result} />}
    </Card>
  );
}

// ─── 6. Caliper/Thickness Converter ──────────────────────────────────────────

function CaliperConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('micron');
  const [results, setResults] = useState<{ label: string; value: string }[] | null>(null);

  const units = [
    { value: 'micron', label: 'Microns (μm)' },
    { value: 'mil', label: 'Mils (thou)' },
    { value: 'mm', label: 'Millimetres (mm)' },
    { value: 'pt', label: 'Points (pt paper)' },
  ];

  function toMicron(v: number, unit: string): number {
    switch (unit) {
      case 'micron': return v;
      case 'mil': return v * 25.4;
      case 'mm': return v * 1000;
      case 'pt': return v * 25.4;
      default: return v;
    }
  }

  function calculate() {
    const v = parseFloat(value);
    if (!v) return;
    const μm = toMicron(v, fromUnit);
    setResults([
      { label: 'Microns (μm)', value: fmt(μm, 2) },
      { label: 'Mils (thou)', value: fmt(μm / 25.4, 4) },
      { label: 'Millimetres (mm)', value: fmt(μm / 1000, 4) },
      { label: 'Points (pt paper)', value: fmt(μm / 25.4, 4) },
    ]);
  }

  return (
    <Card
      icon={Ruler}
      title="Caliper / Thickness Converter"
      description="Convert paper thickness between microns, mils, millimetres, and points."
    >
      <div className="grid grid-cols-2 gap-3">
        <Field label="Value" value={value} onChange={setValue} />
        <SelectField
          label="From unit"
          value={fromUnit}
          onChange={(v) => { setFromUnit(v); setResults(null); }}
          options={units}
        />
      </div>
      <CalcButton onClick={calculate} />
      {results && (
        <div className="flex flex-col gap-2">
          {results.map((r) => (
            <Result key={r.label} label={r.label} value={r.value} />
          ))}
        </div>
      )}
    </Card>
  );
}

// ─── 7. Sheets from Weight ────────────────────────────────────────────────────

function SheetsFromWeightCalculator() {
  const [totalKg, setTotalKg] = useState('');
  const [gsm, setGsm] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const kg = parseFloat(totalKg);
    const g = parseFloat(gsm);
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (!kg || !g || !w || !h) return;
    const sheets = (kg * 1_000_000_000) / (g * w * h);
    setResult(`${Math.round(sheets).toLocaleString('en-IN')} sheets`);
  }

  return (
    <Card
      icon={Hash}
      title="Sheets from Weight"
      description="Calculate how many sheets are in a given weight for a specific paper size and GSM."
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Field label="Total weight" unit="kg" value={totalKg} onChange={setTotalKg} />
        </div>
        <Field label="GSM" unit="g/m²" value={gsm} onChange={setGsm} />
        <div />
        <Field label="Sheet width" unit="mm" value={width} onChange={setWidth} />
        <Field label="Sheet height" unit="mm" value={height} onChange={setHeight} />
      </div>
      <CalcButton onClick={calculate} />
      {result && <Result label="Sheet count" value={result} />}
    </Card>
  );
}

// ─── 8. Price Converter ───────────────────────────────────────────────────────

function PriceConverter() {
  const [pricePerTon, setPricePerTon] = useState('');
  const [gsm, setGsm] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [sheetsPerRiam, setSheetsPerRiam] = useState('500');
  const [currency, setCurrency] = useState('INR');
  const [results, setResults] = useState<{ label: string; value: string }[] | null>(null);

  function calculate() {
    const pt = parseFloat(pricePerTon);
    const g = parseFloat(gsm);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const s = parseFloat(sheetsPerRiam);
    if (!pt || !g || !w || !h || !s) return;
    const sheetKg = (g * w * h) / 1_000_000_000;
    const reamKg = sheetKg * s;
    const pricePerSheet = (pt / 1000) * sheetKg;
    const pricePerRiam = (pt / 1000) * reamKg;
    const sym = currency === 'INR' ? '₹' : '$';
    setResults([
      { label: `Price per ream (${s} sheets)`, value: `${sym} ${fmt(pricePerRiam, 2)}` },
      { label: 'Price per sheet', value: `${sym} ${fmt(pricePerSheet, 4)}` },
      { label: 'Weight per ream', value: `${fmt(reamKg * 1000, 1)} g` },
    ]);
  }

  return (
    <Card
      icon={IndianRupee}
      title="Price Converter"
      description="Convert paper price from per metric ton to per ream and per sheet."
    >
      <div className="grid grid-cols-2 gap-3">
        <Field
          label={`Price per MT`}
          unit={currency}
          value={pricePerTon}
          onChange={setPricePerTon}
        />
        <SelectField
          label="Currency"
          value={currency}
          onChange={setCurrency}
          options={[
            { value: 'INR', label: '₹ INR' },
            { value: 'USD', label: '$ USD' },
          ]}
        />
        <Field label="GSM" unit="g/m²" value={gsm} onChange={setGsm} />
        <Field label="Sheets per ream" value={sheetsPerRiam} onChange={setSheetsPerRiam} placeholder="500" />
        <Field label="Sheet width" unit="mm" value={width} onChange={setWidth} />
        <Field label="Sheet height" unit="mm" value={height} onChange={setHeight} />
      </div>
      <CalcButton onClick={calculate} />
      {results && (
        <div className="flex flex-col gap-2">
          {results.map((r) => (
            <Result key={r.label} label={r.label} value={r.value} />
          ))}
        </div>
      )}
    </Card>
  );
}

// ─── 9. Moisture Correction ───────────────────────────────────────────────────

function MoistureCorrectionCalculator() {
  const [actualWeight, setActualWeight] = useState('');
  const [actualMoisture, setActualMoisture] = useState('');
  const [stdMoisture, setStdMoisture] = useState('10');
  const [results, setResults] = useState<{ label: string; value: string }[] | null>(null);

  function calculate() {
    const w = parseFloat(actualWeight);
    const am = parseFloat(actualMoisture);
    const sm = parseFloat(stdMoisture);
    if (!w || am == null || !sm) return;
    if (am >= 100 || sm >= 100) return;
    const adjustedWeight = w * (100 - sm) / (100 - am);
    const dryWeight = w * (100 - am) / 100;
    const correction = adjustedWeight - w;
    setResults([
      { label: 'Adjusted weight at std moisture', value: `${fmt(adjustedWeight, 3)} kg` },
      { label: 'Bone-dry weight (0% moisture)', value: `${fmt(dryWeight, 3)} kg` },
      { label: 'Weight correction', value: `${correction >= 0 ? '+' : ''}${fmt(correction, 3)} kg` },
    ]);
  }

  return (
    <Card
      icon={Droplets}
      title="Moisture Correction"
      description="Adjust paper weight from actual moisture content to standard (trade) moisture. Standard is typically 10% for India trade."
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Field label="Actual weight" unit="kg" value={actualWeight} onChange={setActualWeight} />
        </div>
        <Field label="Actual moisture" unit="%" value={actualMoisture} onChange={setActualMoisture} placeholder="e.g. 12" />
        <Field label="Standard moisture" unit="%" value={stdMoisture} onChange={setStdMoisture} placeholder="10" />
      </div>
      <CalcButton onClick={calculate} />
      {results && (
        <div className="flex flex-col gap-2">
          {results.map((r) => (
            <Result key={r.label} label={r.label} value={r.value} />
          ))}
        </div>
      )}
    </Card>
  );
}

// ─── 10. Bulk Calculator ──────────────────────────────────────────────────────

function BulkCalculator() {
  const [caliper, setCaliper] = useState('');
  const [gsm, setGsm] = useState('');
  const [results, setResults] = useState<{ label: string; value: string }[] | null>(null);

  function calculate() {
    const c = parseFloat(caliper);
    const g = parseFloat(gsm);
    if (!c || !g) return;
    const bulk = (c / 1000) / (g / 1000); // cm³/g: (mm/1000 → cm) / (g/m² / 1000 → g/cm²)
    // bulk = caliper_cm / (gsm / 10000) = caliper_mm * 10 / gsm
    const bulkVal = (c * 10) / g; // cm³/g
    const ppi = 25.4 / c; // pages per mm if caliper in μm... wait
    // caliper is in μm here (standard unit from the caliper converter)
    // bulk (cm³/g) = caliper(cm) / (GSM g/m²) × 10000
    // = (caliper_μm / 10000) / (GSM / 10000) = caliper_μm / GSM
    const bulkCmg = c / g; // when caliper in μm, bulk = μm/gsm (dimensionless ratio that equals cm³/g)
    const pagesPerMm = 1000 / c; // pages per mm of book thickness (single sheet = 2 pages, so book pages = 2000/caliper_μm * 1mm)
    const sheetsPerMm = 1000 / c;
    setResults([
      { label: 'Bulk', value: `${fmt(bulkCmg, 4)} cm³/g` },
      { label: 'Sheets per mm thickness', value: `${fmt(sheetsPerMm, 1)}` },
      { label: 'Book pages per mm (2 sides)', value: `${fmt(sheetsPerMm * 2, 1)}` },
    ]);
  }

  return (
    <Card
      icon={BookOpen}
      title="Bulk Calculator"
      description="Calculate paper bulk (cm³/g) and book thickness from caliper and GSM. Critical for book designers and printers."
    >
      <div className="grid grid-cols-2 gap-3">
        <Field label="Caliper" unit="μm" value={caliper} onChange={setCaliper} placeholder="e.g. 100" />
        <Field label="GSM" unit="g/m²" value={gsm} onChange={setGsm} />
      </div>
      <p className="text-xs text-text-3">Bulk = Caliper (μm) ÷ GSM</p>
      <CalcButton onClick={calculate} />
      {results && (
        <div className="flex flex-col gap-2">
          {results.map((r) => (
            <Result key={r.label} label={r.label} value={r.value} />
          ))}
        </div>
      )}
    </Card>
  );
}

// ─── 11. Production Rate ──────────────────────────────────────────────────────

function ProductionRateCalculator() {
  const [speed, setSpeed] = useState('');
  const [trimWidth, setTrimWidth] = useState('');
  const [gsm, setGsm] = useState('');
  const [efficiency, setEfficiency] = useState('85');
  const [results, setResults] = useState<{ label: string; value: string }[] | null>(null);

  function calculate() {
    const s = parseFloat(speed);
    const w = parseFloat(trimWidth);
    const g = parseFloat(gsm);
    const eff = parseFloat(efficiency) / 100;
    if (!s || !w || !g || !eff) return;
    const kgPerMin = (s * (w / 1000) * g) / 1000;
    const kgPerHr = kgPerMin * 60;
    const mtPerDay = (kgPerHr * 24 * eff) / 1000;
    const mtPerShift = (kgPerHr * 8 * eff) / 1000;
    setResults([
      { label: 'Production (theoretical)', value: `${fmt(kgPerMin, 2)} kg/min` },
      { label: 'Per hour (theoretical)', value: `${fmt(kgPerHr / 1000, 2)} MT/hr` },
      { label: `Per shift (8 hr @ ${efficiency}% eff.)`, value: `${fmt(mtPerShift, 1)} MT` },
      { label: `Per day (24 hr @ ${efficiency}% eff.)`, value: `${fmt(mtPerDay, 1)} MT/day` },
    ]);
  }

  return (
    <Card
      icon={Gauge}
      title="Production Rate Calculator"
      description="Calculate paper machine output from machine speed, trim width, GSM, and operating efficiency."
    >
      <div className="grid grid-cols-2 gap-3">
        <Field label="Machine speed" unit="m/min" value={speed} onChange={setSpeed} placeholder="e.g. 600" />
        <Field label="Trim width" unit="mm" value={trimWidth} onChange={setTrimWidth} placeholder="e.g. 4200" />
        <Field label="GSM" unit="g/m²" value={gsm} onChange={setGsm} />
        <Field label="Efficiency" unit="%" value={efficiency} onChange={setEfficiency} placeholder="85" />
      </div>
      <CalcButton onClick={calculate} />
      {results && (
        <div className="flex flex-col gap-2">
          {results.map((r) => (
            <Result key={r.label} label={r.label} value={r.value} />
          ))}
        </div>
      )}
    </Card>
  );
}

// ─── 12. Standard Paper Sizes reference ──────────────────────────────────────

type PaperSize = { name: string; w: number; h: number; note?: string };

const PAPER_SIZES: { series: string; sizes: PaperSize[] }[] = [
  {
    series: 'ISO A Series',
    sizes: [
      { name: 'A0', w: 841, h: 1189 },
      { name: 'A1', w: 594, h: 841 },
      { name: 'A2', w: 420, h: 594 },
      { name: 'A3', w: 297, h: 420 },
      { name: 'A4', w: 210, h: 297, note: 'Standard office paper' },
      { name: 'A5', w: 148, h: 210 },
      { name: 'A6', w: 105, h: 148, note: 'Postcard size' },
      { name: 'A7', w: 74, h: 105 },
      { name: 'A8', w: 52, h: 74 },
      { name: 'A9', w: 37, h: 52 },
      { name: 'A10', w: 26, h: 37 },
    ],
  },
  {
    series: 'ISO B Series',
    sizes: [
      { name: 'B0', w: 1000, h: 1414 },
      { name: 'B1', w: 707, h: 1000 },
      { name: 'B2', w: 500, h: 707 },
      { name: 'B3', w: 353, h: 500 },
      { name: 'B4', w: 250, h: 353 },
      { name: 'B5', w: 176, h: 250, note: 'Common book size' },
      { name: 'B6', w: 125, h: 176 },
      { name: 'B7', w: 88, h: 125 },
      { name: 'B8', w: 62, h: 88 },
    ],
  },
  {
    series: 'ISO C Series (Envelopes)',
    sizes: [
      { name: 'C0', w: 917, h: 1297 },
      { name: 'C1', w: 648, h: 917 },
      { name: 'C2', w: 458, h: 648 },
      { name: 'C3', w: 324, h: 458 },
      { name: 'C4', w: 229, h: 324, note: 'Fits A4 unfolded' },
      { name: 'C5', w: 162, h: 229, note: 'Fits A4 folded once' },
      { name: 'C6', w: 114, h: 162, note: 'Fits A4 folded twice' },
      { name: 'C7', w: 81, h: 114 },
    ],
  },
  {
    series: 'SRA Series (Bleed printing)',
    sizes: [
      { name: 'SRA0', w: 900, h: 1280 },
      { name: 'SRA1', w: 640, h: 900 },
      { name: 'SRA2', w: 450, h: 640 },
      { name: 'SRA3', w: 320, h: 450, note: 'Most common for print' },
      { name: 'SRA4', w: 225, h: 320 },
      { name: 'RA0', w: 860, h: 1220 },
      { name: 'RA1', w: 610, h: 860 },
      { name: 'RA2', w: 430, h: 610 },
    ],
  },
  {
    series: 'US / ANSI Sizes',
    sizes: [
      { name: 'Letter', w: 216, h: 279, note: '8.5 × 11″' },
      { name: 'Legal', w: 216, h: 356, note: '8.5 × 14″' },
      { name: 'Tabloid', w: 279, h: 432, note: '11 × 17″' },
      { name: 'Executive', w: 184, h: 267, note: '7.25 × 10.5″' },
      { name: 'Statement', w: 140, h: 216, note: '5.5 × 8.5″' },
      { name: 'ANSI C', w: 432, h: 559, note: '17 × 22″' },
      { name: 'ANSI D', w: 559, h: 864, note: '22 × 34″' },
    ],
  },
  {
    series: 'Indian / Traditional Sizes',
    sizes: [
      { name: 'Crown', w: 381, h: 508 },
      { name: 'Demy', w: 445, h: 572 },
      { name: 'Medium', w: 457, h: 584 },
      { name: 'Royal', w: 508, h: 635 },
      { name: 'Super Royal', w: 521, h: 686 },
      { name: 'Foolscap', w: 343, h: 432 },
      { name: 'Elephant', w: 584, h: 711 },
    ],
  },
];

function mmToInch(mm: number) {
  return (mm / 25.4).toFixed(2);
}

function PaperSizesReference() {
  const [filter, setFilter] = useState('');
  const [activeSeries, setActiveSeries] = useState<string | null>(null);

  const displaySeries = activeSeries
    ? PAPER_SIZES.filter((s) => s.series === activeSeries)
    : PAPER_SIZES;

  const filtered = filter
    ? displaySeries.map((s) => ({
        ...s,
        sizes: s.sizes.filter((sz) => sz.name.toLowerCase().includes(filter.toLowerCase())),
      })).filter((s) => s.sizes.length > 0)
    : displaySeries;

  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="p-6 border-b border-border flex items-start gap-3">
        <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
          <Table2 size={18} />
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">Standard Paper Sizes</h3>
          <p className="text-xs text-text-2 mt-0.5">
            ISO A/B/C, SRA, US ANSI, and Indian traditional sizes with mm and inch dimensions.
          </p>
        </div>
      </div>

      <div className="p-4 border-b border-border flex flex-wrap gap-2 items-center">
        <input
          type="text"
          className="bg-surface-2 border border-border rounded-lg px-3 py-1.5 text-sm text-foreground outline-none focus:border-amber-500/60 transition-colors w-36"
          placeholder="Search size…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="flex flex-wrap gap-1.5">
          {PAPER_SIZES.map((s) => (
            <button
              key={s.series}
              onClick={() => setActiveSeries(activeSeries === s.series ? null : s.series)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                activeSeries === s.series
                  ? 'bg-amber-500 text-black border-amber-500'
                  : 'border-border text-text-3 hover:text-foreground hover:border-amber-500/40'
              }`}
            >
              {s.series.split(' ')[1] ?? s.series.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-2.5 text-xs font-semibold text-text-3 uppercase tracking-wide">Size</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-text-3 uppercase tracking-wide">Width (mm)</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-text-3 uppercase tracking-wide">Height (mm)</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-text-3 uppercase tracking-wide">Width (in)</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-text-3 uppercase tracking-wide">Height (in)</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-text-3 uppercase tracking-wide hidden md:table-cell">Note</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((series) => (
              <>
                <tr key={series.series} className="bg-surface-2/60">
                  <td colSpan={6} className="px-4 py-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
                    {series.series}
                  </td>
                </tr>
                {series.sizes.map((sz) => (
                  <tr key={sz.name} className="border-b border-border/50 hover:bg-surface-2 transition-colors">
                    <td className="px-4 py-2.5 font-medium text-foreground">{sz.name}</td>
                    <td className="px-4 py-2.5 tabular-nums text-text-2">{sz.w}</td>
                    <td className="px-4 py-2.5 tabular-nums text-text-2">{sz.h}</td>
                    <td className="px-4 py-2.5 tabular-nums text-text-3">{mmToInch(sz.w)}"</td>
                    <td className="px-4 py-2.5 tabular-nums text-text-3">{mmToInch(sz.h)}"</td>
                    <td className="px-4 py-2.5 text-xs text-text-3 hidden md:table-cell">{sz.note ?? '—'}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    title: 'Weight & Grammage',
    description: 'GSM calculations and international paper weight conversions',
    calculators: [GsmCalculator, BasisWeightConverter, ReamWeightCalculator],
  },
  {
    title: 'Roll Calculations',
    description: 'Weight and length calculations for paper rolls',
    calculators: [RollWeightCalculator, RollLengthCalculator],
  },
  {
    title: 'Thickness & Dimensions',
    description: 'Caliper and thickness unit conversions',
    calculators: [CaliperConverter, BulkCalculator],
  },
  {
    title: 'Quantity & Pricing',
    description: 'Sheet counts and price breakdowns from bulk orders',
    calculators: [SheetsFromWeightCalculator, PriceConverter],
  },
  {
    title: 'Production & Efficiency',
    description: 'Machine output and moisture-adjusted weights',
    calculators: [MoistureCorrectionCalculator, ProductionRateCalculator],
  },
];

export function ToolsClient() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
      {SECTIONS.map((section) => (
        <div key={section.title}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <p className="text-text-2 text-sm mt-1">{section.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.calculators.map((Calc, i) => (
              <Calc key={i} />
            ))}
          </div>
          <div className="border-t border-border mt-16" />
        </div>
      ))}

      {/* Standard Paper Sizes — full width */}
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Standard Paper Sizes</h2>
          <p className="text-text-2 text-sm mt-1">
            ISO A/B/C, SRA/RA, US ANSI, and Indian traditional sizes with mm and inch equivalents
          </p>
        </div>
        <PaperSizesReference />
      </div>
    </div>
  );
}
