'use client';
import React, { useState, useEffect } from 'react';

const AIScanLoader: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const steps = [
    '正在进行行业标杆对比...',
    '正在识别战略机遇...',
    '正在分析渠道依赖度...',
    '正在评估利润下滑风险...',
    '正在生成诊断报告...'
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 5;
      });
    }, 150);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-dark-900 bg-opacity-95 flex flex-col items-center justify-center z-50">
      {/* 波纹动画 */}
      <div className="relative mb-12">
        <div className="w-32 h-32 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-primary bg-opacity-40 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <span className="text-dark-900 font-bold text-xl">AI</span>
            </div>
          </div>
        </div>
        {/* 波纹效果 */}
        <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-50"></div>
        <div className="absolute inset-2 rounded-full border-2 border-primary animate-ping opacity-30 animation-delay-300"></div>
        <div className="absolute inset-4 rounded-full border-2 border-primary animate-ping opacity-10 animation-delay-600"></div>
      </div>

      <div className="text-center max-w-md">
        <h3 className="text-2xl font-bold text-white mb-6">AI 智能扫描中</h3>
        <p className="text-primary font-mono text-sm mb-8">{steps[currentStep]}</p>
        
        {/* 进度条 */}
        <div className="w-full bg-dark-700 rounded-full h-3 mb-6">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* 扫描状态 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-dark-800 p-4 rounded-lg">
            <h4 className="text-sm text-gray-300 mb-2">行业标杆对比</h4>
            <div className="w-full bg-dark-700 rounded-full h-2 mb-2">
              <div 
                className="bg-primary h-2 rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <span className="text-xs text-primary">{Math.min(progress, 100)}%</span>
          </div>
          <div className="bg-dark-800 p-4 rounded-lg">
            <h4 className="text-sm text-gray-300 mb-2">战略机遇识别</h4>
            <div className="w-full bg-dark-700 rounded-full h-2 mb-2">
              <div 
                className="bg-primary h-2 rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <span className="text-xs text-primary">{Math.min(progress, 100)}%</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm">
          正在分析您的企业数据，请稍候...
        </p>
      </div>
    </div>
  );
};

export default AIScanLoader;