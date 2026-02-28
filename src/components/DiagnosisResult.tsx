'use client';
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DiagnosisResultProps {
  formData: {
    industry: string;
    revenueScale: string;
    painPoints: string[];
    onlineRatio: number;
    profitTrend: string;
  };
  onBack: () => void;
  onUnlock: () => void;
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ formData, onBack, onUnlock }) => {
  const reportRef = useRef<HTMLDivElement>(null);

  // 导出为 PDF
  const handleExport = async () => {
    if (!reportRef.current) return;

    try {
      // 使用 html2canvas 捕获报告内容
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // 提高分辨率
        useCORS: true,
        backgroundColor: '#0a0a0a'
      });

      // 创建 PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 宽度
      const pageHeight = 297; // A4 高度
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // 添加图片到 PDF
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 如果内容超出一页，添加新页
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // 保存 PDF
      pdf.save('元逻辑诊断报告.pdf');
    } catch (error) {
      console.error('导出 PDF 失败:', error);
    }
  };
  // 计算危险指数
  const calculateRiskScore = () => {
    let score = 50;
    
    // 渠道依赖度分析
    if (formData.onlineRatio > 80 || formData.onlineRatio < 20) {
      score += 20;
    }
    
    // 利润趋势分析
    if (formData.profitTrend === '下滑中') {
      score += 25;
    }
    
    // 核心痛点分析
    if (formData.painPoints.includes('利润下滑')) {
      score += 10;
    }
    
    return Math.min(score, 100);
  };

  const riskScore = calculateRiskScore();
  const isHighRisk = riskScore > 70;

  // 生成核心痛点分析
  const generatePainPointAnalysis = () => {
    if (formData.onlineRatio > 80 && formData.profitTrend === '下滑中') {
      return {
        title: '渠道依赖过度',
        impact: '-45% 营收潜力影响',
        description: '过度依赖线上渠道导致抗风险能力弱，一旦平台政策变化或竞争加剧，将严重影响营收。'
      };
    } else if (formData.onlineRatio < 20 && formData.profitTrend === '下滑中') {
      return {
        title: '线下渠道老化',
        impact: '-35% 增长潜力影响',
        description: '过度依赖线下渠道导致无法触达更广泛的消费者群体，增长空间受限。'
      };
    } else if (formData.painPoints.includes('新客获取难')) {
      return {
        title: '获客成本高',
        impact: '-25% 利润影响',
        description: '新客获取成本持续上升，导致营销投入产出比下降，挤压利润空间。'
      };
    } else if (formData.painPoints.includes('人力成本激增')) {
      return {
        title: '人力成本过高',
        impact: '-30% 利润影响',
        description: '人力成本占比过大，影响企业盈利能力，需要通过数字化手段优化。'
      };
    } else {
      return {
        title: '库存管理不当',
        impact: '-20% 资金效率影响',
        description: '库存积压导致资金占用增加，降低企业运营效率。'
      };
    }
  };

  const painPointAnalysis = generatePainPointAnalysis();

  return (
    <div className="glass-card rounded-xl p-8" ref={reportRef}>
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-primary transition-colors"
        >
          <span className="mr-2">←</span> 返回
        </button>
        <h2 className="text-2xl font-bold text-white">诊断结果</h2>
        <button
          onClick={handleExport}
          className="flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          导出 PDF
          <span className="ml-2">📄</span>
        </button>
      </div>

      {/* 危险指数 */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">危险指数</h3>
          <span className={`text-3xl font-bold ${isHighRisk ? 'text-red-400' : 'text-yellow-400'}`}>
            {riskScore}分
          </span>
        </div>
        <div className="w-full bg-dark-700 rounded-full h-4">
          <div 
            className={`h-4 rounded-full transition-all duration-1000 ease-in-out ${isHighRisk ? 'bg-red-400' : 'bg-yellow-400'}`}
            style={{ width: `${riskScore}%` }}
          ></div>
        </div>
        <p className={`mt-2 text-sm ${isHighRisk ? 'text-red-400' : 'text-yellow-400'}`}>
          {isHighRisk ? '⚠️ 高风险：企业面临严重挑战，需要立即采取行动' : '⚠️ 中等风险：企业存在一定问题，需要关注并优化'}
        </p>
      </div>

      {/* 核心痛点分析 */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-white mb-4">核心痛点分析</h3>
        <div className="bg-dark-800 rounded-lg p-6 border-l-4 border-primary">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-medium text-white">{painPointAnalysis.title}</h4>
            <span className="text-primary font-bold">{painPointAnalysis.impact}</span>
          </div>
          <p className="text-gray-300">{painPointAnalysis.description}</p>
        </div>
      </div>

      {/* 行业对比 */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-white mb-4">行业对比</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-dark-800 rounded-lg p-4">
            <h4 className="text-sm text-gray-400 mb-2">您的线上占比</h4>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-primary">{formData.onlineRatio}%</span>
              <span className="text-sm text-gray-400 ml-2 mb-1">线上</span>
            </div>
          </div>
          <div className="bg-dark-800 rounded-lg p-4">
            <h4 className="text-sm text-gray-400 mb-2">行业平均</h4>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-300">45%</span>
              <span className="text-sm text-gray-400 ml-2 mb-1">线上</span>
            </div>
          </div>
        </div>
      </div>

      {/* 付费解锁按钮 */}
      <div className="mt-8">
        <button
          onClick={onUnlock}
          className="w-full py-4 bg-primary text-dark-900 font-bold rounded-lg hover:bg-opacity-90 btn-primary"
        >
          支付 99 元立即解锁完整破局报告
        </button>
        <p className="text-center text-sm text-gray-400 mt-4">
          完整报告包含：详细风险分析、3步实操路径、同行对标案例
        </p>
      </div>
    </div>
  );
};

export default DiagnosisResult;