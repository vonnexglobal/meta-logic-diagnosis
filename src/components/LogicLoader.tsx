import React, { useState, useEffect } from 'react';

const LogicLoader: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    '正在应用约束理论(TOC)进行瓶颈定位...',
    '正在使用利特尔法则计算生产周期...',
    '正在分析设备综合效率(OEE)构成...',
    '正在评估数字化转型潜力...',
    '正在生成诊断报告...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-dark-900 bg-opacity-90 flex flex-col items-center justify-center z-50">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-dark-700 rounded-full border-t-primary animate-spin mb-6"></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-dark-800 rounded-full border-t-primary animate-spin-slow"></div>
        </div>
      </div>
      <div className="text-center max-w-md">
        <h3 className="text-xl font-bold text-white mb-4">逻辑推演中</h3>
        <p className="text-primary font-mono text-sm">{steps[currentStep]}</p>
        <div className="mt-6 w-full bg-dark-700 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-1000 ease-in-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LogicLoader;