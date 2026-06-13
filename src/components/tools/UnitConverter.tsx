import React, { useState, useEffect } from 'react';
import ToolWrapper from '../ToolWrapper';

const units: Record<string, Record<string, number>> = {
  length: {
    Meter: 1,
    Kilometer: 1000,
    Centimeter: 0.01,
    Millimeter: 0.001,
    Mile: 1609.34,
    Yard: 0.9144,
    Foot: 0.3048,
    Inch: 0.0254,
  },
  weight: {
    Kilogram: 1,
    Gram: 0.001,
    Milligram: 0.000001,
    MetricTon: 1000,
    Pound: 0.453592,
    Ounce: 0.0283495,
  },
};

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<'length' | 'weight' | 'temp'>('length');
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    const cats = Object.keys(units);
    if (category !== 'temp') {
      const availableUnits = Object.keys(units[category]);
      setFromUnit(availableUnits[0]);
      setToUnit(availableUnits[1]);
    } else {
      setFromUnit('Celsius');
      setToUnit('Fahrenheit');
    }
  }, [category]);

  useEffect(() => {
    if (!value || isNaN(Number(value))) {
      setResult('');
      return;
    }

    const val = Number(value);

    if (category === 'temp') {
      if (fromUnit === toUnit) {
        setResult(value);
      } else if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') {
        setResult(((val * 9) / 5 + 32).toFixed(2));
      } else if (fromUnit === 'Celsius' && toUnit === 'Kelvin') {
        setResult((val + 273.15).toFixed(2));
      } else if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') {
        setResult(((val - 32) * 5 / 9).toFixed(2));
      } else if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') {
        setResult(((val - 32) * 5 / 9 + 273.15).toFixed(2));
      } else if (fromUnit === 'Kelvin' && toUnit === 'Celsius') {
        setResult((val - 273.15).toFixed(2));
      } else if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') {
        setResult(((val - 273.15) * 9 / 5 + 32).toFixed(2));
      }
    } else {
      const fromRate = units[category][fromUnit];
      const toRate = units[category][toUnit];
      const baseValue = val * fromRate;
      setResult((baseValue / toRate).toString());
    }
  }, [value, fromUnit, toUnit, category]);

  return (
    <ToolWrapper 
      title="Unit Converter" 
      description="Convert between different units of length, weight, and temperature"
      onReset={() => setValue('1')}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          {['length', 'weight', 'temp'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as any)}
              style={{
                background: category === cat ? '#667eea' : 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="unit-input"
            />
            <select 
              value={fromUnit} 
              onChange={(e) => setFromUnit(e.target.value)}
              className="unit-select"
            >
              {category === 'temp' 
                ? ['Celsius', 'Fahrenheit', 'Kelvin'].map(u => <option key={u} value={u}>{u}</option>)
                : Object.keys(units[category]).map(u => <option key={u} value={u}>{u}</option>)
              }
            </select>
          </div>

          <div style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>=</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              readOnly
              value={result}
              className="unit-input readonly"
            />
            <select 
              value={toUnit} 
              onChange={(e) => setToUnit(e.target.value)}
              className="unit-select"
            >
              {category === 'temp' 
                ? ['Celsius', 'Fahrenheit', 'Kelvin'].map(u => <option key={u} value={u}>{u}</option>)
                : Object.keys(units[category]).map(u => <option key={u} value={u}>{u}</option>)
              }
            </select>
          </div>
        </div>
      </div>

      <style>{`
        .unit-input {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 16px;
          color: white;
          font-size: 1.2rem;
          outline: none;
          width: 100%;
        }
        .unit-input.readonly {
          background: rgba(255, 255, 255, 0.03);
        }
        .unit-select {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 10px;
          color: white;
          cursor: pointer;
          outline: none;
        }
        .unit-select option {
          background: #2d3748;
        }
      `}</style>
    </ToolWrapper>
  );
};

export default UnitConverter;
