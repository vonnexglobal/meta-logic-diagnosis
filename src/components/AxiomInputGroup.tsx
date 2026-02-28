'use client';
import React, { useState, useEffect } from 'react';

interface AxiomInputGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  industry?: string;
  feedbackType: 'revenue' | 'profitMargin' | 'oee' | 'industry';
}

const AxiomInputGroup: React.FC<AxiomInputGroupProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  min,
  max,
  step,
  options,
  industry,
  feedbackType
}) => {
  const [feedback, setFeedback] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState<'healthy' | 'warning' | 'critical' | ''>('');

  // 计算逻辑反馈
  useEffect(() => {
    if (!value) {
      setFeedback('');
      setFeedbackStatus('');
      return;
    }

    switch (feedbackType) {
      case 'industry':
        if (value) {
          setFeedback(`您选择的行业是 ${value}，我们将根据该行业的标准进行分析`);
          setFeedbackStatus('healthy');
        }
        break;

      case 'revenue':
        const revenue = parseFloat(value);
        if (revenue < 1000) {
          setFeedback('年营收低于 1000 万元，属于小型制造企业');
          setFeedbackStatus('warning');
        } else if (revenue < 10000) {
          setFeedback('年营收在 1000-10000 万元之间，属于中型制造企业');
          setFeedbackStatus('healthy');
        } else {
          setFeedback('年营收超过 10000 万元，属于大型制造企业');
          setFeedbackStatus('healthy');
        }
        break;

      case 'profitMargin':
        const profitMargin = parseFloat(value);
        if (profitMargin < 5) {
          setFeedback('该利润率在离散制造行业处于危机水平');
          setFeedbackStatus('critical');
        } else if (profitMargin < 15) {
          setFeedback('该利润率在离散制造行业处于预警水平');
          setFeedbackStatus('warning');
        } else {
          setFeedback('该利润率在离散制造行业处于健康水平');
          setFeedbackStatus('healthy');
        }
        break;

      case 'oee':
        const oee = parseFloat(value);
        if (oee < 60) {
          setFeedback('该 OEE 水平在制造业处于危机状态，设备利用率严重不足');
          setFeedbackStatus('critical');
        } else if (oee < 80) {
          setFeedback('该 OEE 水平在制造业处于预警状态，有较大提升空间');
          setFeedbackStatus('warning');
        } else {
          setFeedback('该 OEE 水平在制造业处于健康状态，设备利用率良好');
          setFeedbackStatus('healthy');
        }
        break;

      default:
        setFeedback('');
        setFeedbackStatus('');
    }
  }, [value, feedbackType, industry]);

  const getFeedbackColor = () => {
    switch (feedbackStatus) {
      case 'healthy':
        return 'text-primary';
      case 'warning':
        return 'text-yellow-400';
      case 'critical':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full form-input rounded-lg p-4"
          required={required}
        >
          <option value="">请选择{label}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          step={step}
          className="w-full form-input rounded-lg p-4"
        />
      )}
      {feedback && (
        <div className={`text-sm ${getFeedbackColor()} mt-1`}>
          {feedback}
        </div>
      )}
    </div>
  );
};

export default AxiomInputGroup;