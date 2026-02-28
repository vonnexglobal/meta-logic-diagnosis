'use client';
import React, { useState, useEffect } from 'react';
import AxiomInputGroup from '../components/AxiomInputGroup';
import AIScanLoader from '../components/AIScanLoader';
import DiagnosisResult from '../components/DiagnosisResult';

// 行业选项
const industries = [
  { value: '制造业', label: '制造业' },
  { value: '实体零售', label: '实体零售' },
  { value: '传统贸易', label: '传统贸易' },
  { value: '服务业', label: '服务业' }
];

// 营收规模选项
const revenueScales = [
  { value: '1000万以下', label: '1000万以下' },
  { value: '1000万-5000万', label: '1000万-5000万' },
  { value: '5000万-2亿', label: '5000万-2亿' },
  { value: '2亿以上', label: '2亿以上' }
];

// 核心痛点选项
const painPoints = [
  '利润下滑',
  '新客获取难',
  '人力成本激增',
  '库存积压'
];

// 利润趋势选项
const profitTrends = [
  { value: '增长中', label: '增长中' },
  { value: '基本持平', label: '基本持平' },
  { value: '下滑中', label: '下滑中' }
];

// 分步表单组件
const MetaLogicDiagnosis = () => {
  // 表单数据类型定义
  type FormData = {
    industry: string;
    revenueScale: string;
    painPoints: string[];
    onlineRatio: number;
    profitTrend: string;
  };
  // 保存数据到 LocalStorage
  const saveToLocalStorage = (data: any) => {
    try {
      localStorage.setItem('metaLogicDiagnosis', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // 初始状态使用默认值（服务器端和客户端一致）
  const [currentStep, setCurrentStep] = useState(1);
  // 表单数据
  const [formData, setFormData] = useState<FormData>({
    industry: '',
    revenueScale: '',
    painPoints: [],
    onlineRatio: 50,
    profitTrend: ''
  });
  // 加载状态
  const [isLoading, setIsLoading] = useState(false);
  // 页面状态: form, loading, result, report
  const [pageState, setPageState] = useState<'form' | 'loading' | 'result' | 'report'>('form');

  // 在客户端从 LocalStorage 加载数据
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('metaLogicDiagnosis');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setCurrentStep(parsedData.currentStep || 1);
        setFormData(parsedData.formData || {
          industry: '',
          revenueScale: '',
          painPoints: [],
          onlineRatio: 50,
          profitTrend: ''
        });
        setPageState(parsedData.pageState || 'form');
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  // 监听数据变化并保存到 LocalStorage
  useEffect(() => {
    saveToLocalStorage({
      currentStep,
      formData,
      pageState
    });
  }, [currentStep, formData, pageState]);

  // 总步骤数
  const totalSteps = 5;

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理痛点选择
  const handlePainPointToggle = (painPoint: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      painPoints: prev.painPoints.includes(painPoint)
        ? prev.painPoints.filter(p => p !== painPoint)
        : [...prev.painPoints, painPoint]
    }));
  };

  // 处理滑块变化
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: FormData) => ({
      ...prev,
      onlineRatio: parseInt(e.target.value)
    }));
  };

  // 验证当前步骤的表单数据
  const validateCurrentStep = () => {
    if (currentStep === 1 && !formData.industry) {
      alert('请选择您的行业');
      return false;
    }
    if (currentStep === 2 && !formData.revenueScale) {
      alert('请选择您的营收规模');
      return false;
    }
    if (currentStep === 3 && formData.painPoints.length === 0) {
      alert('请至少选择一个核心痛点');
      return false;
    }
    if (currentStep === 5 && !formData.profitTrend) {
      alert('请选择您的利润趋势');
      return false;
    }
    return true;
  };

  // 下一步
  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 上一步
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 提交表单
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 验证所有步骤的表单数据
    if (validateCurrentStep()) {
      // 显示加载动画
      setPageState('loading');
      // 模拟生成报告的过程
      setTimeout(() => {
        setPageState('result');
        // 这里可以添加表单提交逻辑
        console.log('Form submitted:', formData);
      }, 10000); // 10秒模拟加载时间
    }
  };

  // 返回表单
  const handleBackToForm = () => {
    setPageState('form');
  };

  // 解锁完整报告
  const handleUnlockReport = () => {
    setPageState('report');
  };

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      {/* 顶部导航 */}
      <header className="border-b border-dark-700 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-dark-900 font-bold">M</span>
            </div>
            <h1 className="text-xl font-bold text-white">元逻辑诊断</h1>
          </div>
          <div className="text-sm text-gray-400">
            基于第一性原理的企业数字化诊断
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 pb-24">
        <div className="w-full max-w-4xl">
          {/* 表单页面 */}
          {pageState === 'form' && (
            <>
              {/* 步骤指示器 */}
              <div className="flex items-center mb-12">
                {Array.from({ length: totalSteps }, (_, index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep > index + 1 ? 'step-completed' : currentStep === index + 1 ? 'step-active' : 'border-dark-600 text-gray-400'}`}>
                        {currentStep > index + 1 ? '✓' : index + 1}
                      </div>
                      <div className={`text-xs mt-2 ${currentStep >= index + 1 ? 'text-primary' : 'text-gray-500'}`}>
                        {index + 1 === 1 && '行业'}
                        {index + 1 === 2 && '营收'}
                        {index + 1 === 3 && '痛点'}
                        {index + 1 === 4 && '渠道'}
                        {index + 1 === 5 && '利润'}
                      </div>
                    </div>
                    {index < totalSteps - 1 && (
                      <div className={`step-connector ${currentStep > index + 1 ? 'active' : ''}`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* 表单 */}
              <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8">
                {/* 步骤 1: 行业选择 */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-white">选择您的行业</h2>
                      <p className="text-gray-400 mb-6">请选择您所在的行业，以便我们提供更精准的诊断</p>
                    </div>
                    <AxiomInputGroup
                      label="行业"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      options={industries}
                      required
                      feedbackType="industry"
                    />
                  </div>
                )}

                {/* 步骤 2: 营收规模 */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-white">营收规模</h2>
                      <p className="text-gray-400 mb-6">请选择贵公司的年营收规模</p>
                    </div>
                    <AxiomInputGroup
                      label="营收规模"
                      name="revenueScale"
                      value={formData.revenueScale}
                      onChange={handleInputChange}
                      options={revenueScales}
                      required
                      feedbackType="industry"
                    />
                  </div>
                )}

                {/* 步骤 3: 核心痛点 */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-white">核心痛点</h2>
                      <p className="text-gray-400 mb-6">请选择贵公司面临的核心痛点（可多选）</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {painPoints.map(painPoint => (
                        <div key={painPoint} className="flex items-center">
                          <input
                            type="checkbox"
                            id={painPoint}
                            checked={formData.painPoints.includes(painPoint)}
                            onChange={() => handlePainPointToggle(painPoint)}
                            className="w-4 h-4 accent-primary"
                          />
                          <label htmlFor={painPoint} className="ml-2 text-gray-300">
                            {painPoint}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 步骤 4: 渠道分析 */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-white">渠道分析</h2>
                      <p className="text-gray-400 mb-6">请调整线上 vs 线下销售占比</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">线下</span>
                        <span className="text-primary font-medium">{formData.onlineRatio}% 线上</span>
                        <span className="text-gray-300">线上</span>
                      </div>
                      <input
                        type="range"
                        name="onlineRatio"
                        min="0"
                        max="100"
                        value={formData.onlineRatio}
                        onChange={handleSliderChange}
                        className="slider"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>0%</span>
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 步骤 5: 利润趋势 */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-white">利润趋势</h2>
                      <p className="text-gray-400 mb-6">请选择贵公司近一年的利润趋势</p>
                    </div>
                    <AxiomInputGroup
                      label="利润趋势"
                      name="profitTrend"
                      value={formData.profitTrend}
                      onChange={handleInputChange}
                      options={profitTrends}
                      required
                      feedbackType="industry"
                    />
                  </div>
                )}

                {/* 导航按钮 */}
                <div className="mt-12 flex justify-between">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-dark-700 rounded-lg text-white hover:bg-dark-600 transition-colors"
                    >
                      上一步
                    </button>
                  )}
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-primary text-dark-900 font-medium rounded-lg hover:bg-opacity-90 btn-primary"
                    >
                      下一步
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-3 bg-primary text-dark-900 font-medium rounded-lg hover:bg-opacity-90 btn-primary"
                    >
                      生成诊断报告
                    </button>
                  )}
                </div>
              </form>
            </>
          )}

          {/* 加载页面 */}
          {pageState === 'loading' && (
            <AIScanLoader />
          )}

          {/* 诊断结果页面 */}
          {pageState === 'result' && (
            <DiagnosisResult
              formData={formData}
              onBack={handleBackToForm}
              onUnlock={handleUnlockReport}
            />
          )}

          {/* 深度报告页面 */}
          {pageState === 'report' && (
            <div className="glass-card rounded-xl p-8">
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={handleBackToForm}
                  className="flex items-center text-gray-400 hover:text-primary transition-colors"
                >
                  <span className="mr-2">←</span> 返回
                </button>
                <h2 className="text-2xl font-bold text-white">深度诊断报告</h2>
                <button
                  onClick={async () => {
                    const { default: html2canvas } = await import('html2canvas');
                    const { default: jsPDF } = await import('jspdf');
                    const reportElement = document.querySelector('.glass-card') as HTMLElement;
                    if (reportElement) {
                      const canvas = await html2canvas(reportElement, {
                        scale: 2,
                        useCORS: true,
                        backgroundColor: '#0a0a0a'
                      });
                      const pdf = new jsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: 'a4'
                      });
                      const imgData = canvas.toDataURL('image/png');
                      const imgWidth = 210;
                      const pageHeight = 297;
                      const imgHeight = (canvas.height * imgWidth) / canvas.width;
                      let heightLeft = imgHeight;
                      let position = 0;
                      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                      heightLeft -= pageHeight;
                      while (heightLeft >= 0) {
                        position = heightLeft - imgHeight;
                        pdf.addPage();
                        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                      }
                      pdf.save('深度诊断报告.pdf');
                    }
                  }}
                  className="flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  导出 PDF
                  <span className="ml-2">📄</span>
                </button>
              </div>

              {/* 三项关键指标 */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                <div className="bg-dark-800 rounded-lg p-6 text-center">
                  <h3 className="text-sm text-gray-400 mb-2">健康度评分</h3>
                  <span className="text-3xl font-bold text-primary">75</span>
                  <p className="text-sm text-gray-300 mt-2">良好</p>
                </div>
                <div className="bg-dark-800 rounded-lg p-6 text-center">
                  <h3 className="text-sm text-gray-400 mb-2">行业排名</h3>
                  <span className="text-3xl font-bold text-primary">前 25%</span>
                  <p className="text-sm text-gray-300 mt-2">优于平均水平</p>
                </div>
                <div className="bg-dark-800 rounded-lg p-6 text-center">
                  <h3 className="text-sm text-gray-400 mb-2">增长预期</h3>
                  <span className="text-3xl font-bold text-primary">+15%</span>
                  <p className="text-sm text-gray-300 mt-2">未来 12 个月</p>
                </div>
              </div>

              {/* 营收流转桑基图 */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-white mb-6">营收流转分析</h3>
                <div className="bg-dark-800 rounded-lg p-6">
                  <div className="h-80">
                    {/* 这里将使用 Recharts 的 SankeyChart */}
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-center">
                        <div className="text-primary font-bold text-2xl mb-4">营收流转示意图</div>
                        <div className="grid grid-cols-4 gap-4 mb-6">
                          <div className="bg-dark-700 p-4 rounded-lg text-center">
                            <div className="text-sm text-gray-400">总营收</div>
                            <div className="text-lg font-bold text-white">100%</div>
                          </div>
                          <div className="bg-dark-700 p-4 rounded-lg text-center">
                            <div className="text-sm text-gray-400">原材料</div>
                            <div className="text-lg font-bold text-white">35%</div>
                          </div>
                          <div className="bg-dark-700 p-4 rounded-lg text-center">
                            <div className="text-sm text-gray-400">物流</div>
                            <div className="text-lg font-bold text-white">20%</div>
                          </div>
                          <div className="bg-dark-700 p-4 rounded-lg text-center">
                            <div className="text-sm text-gray-400">效率浪费</div>
                            <div className="text-lg font-bold text-red-400">30%</div>
                          </div>
                        </div>
                        <div className="bg-dark-700 p-4 rounded-lg text-center max-w-xs mx-auto">
                          <div className="text-sm text-gray-400">净利润</div>
                          <div className="text-lg font-bold text-green-400">15%</div>
                        </div>
                        <div className="mt-4 text-sm text-gray-400">
                          注：效率浪费部分通过数字化转型可减少 60%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 结构性风险热力图 */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-white mb-6">结构性风险热力图</h3>
                <div className="space-y-4">
                  {[
                    { name: '供应链', risk: 65 },
                    { name: '人才', risk: 45 },
                    { name: '技术', risk: 75 },
                    { name: '市场', risk: 55 }
                  ].map(item => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{item.name}</span>
                        <span className={`font-medium ${item.risk > 70 ? 'text-red-400' : item.risk > 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {item.risk}%
                        </span>
                      </div>
                      <div className="w-full bg-dark-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ease-in-out ${item.risk > 70 ? 'bg-red-400' : item.risk > 50 ? 'bg-yellow-400' : 'bg-green-400'}`}
                          style={{ width: `${item.risk}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3步实操路径 */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-white mb-6">3步实操路径</h3>
                <div className="space-y-4">
                  {[
                    { 
                      step: 1, 
                      title: 'DTC 转型', 
                      description: '建立直接面向消费者的销售渠道，减少中间环节，提高利润率。'
                    },
                    { 
                      step: 2, 
                      title: 'AI 增效', 
                      description: '引入人工智能技术优化生产和运营流程，降低人力成本。'
                    },
                    { 
                      step: 3, 
                      title: '全球化扩张', 
                      description: '拓展国际市场，分散地域风险，寻找新的增长点。'
                    }
                  ].map(item => (
                    <div key={item.step} className="flex space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-dark-900 font-bold">{item.step}</span>
                      </div>
                      <div className="flex-1 bg-dark-800 rounded-lg p-4">
                        <h4 className="text-lg font-medium text-white mb-2">{item.title}</h4>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 同行对标案例 */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">同行对标案例</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { 
                      industry: '制造业', 
                      revenue: '1.2亿', 
                      improvement: '+22%', 
                      strategy: 'DTC 转型'
                    },
                    { 
                      industry: '实体零售', 
                      revenue: '8000万', 
                      improvement: '+18%', 
                      strategy: 'AI 库存管理'
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-dark-800 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-400">{item.industry}</span>
                        <span className="text-primary font-bold">{item.improvement}</span>
                      </div>
                      <h4 className="text-lg font-medium text-white mb-2">{item.revenue} 营收案例</h4>
                      <p className="text-sm text-gray-300">核心策略: {item.strategy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 底部 TabBar */}
      <div className="tab-bar fixed bottom-0 left-0 right-0 flex justify-around items-center py-4">
        <div className="tab-item active flex flex-col items-center">
          <div className="w-6 h-6 mb-1">🏠</div>
          <span className="text-xs">首页</span>
        </div>
        <div className="tab-item flex flex-col items-center">
          <div className="w-6 h-6 mb-1">📚</div>
          <span className="text-xs">案例库</span>
        </div>
        <div className="tab-item flex flex-col items-center">
          <div className="w-6 h-6 mb-1">📊</div>
          <span className="text-xs">我的报告</span>
        </div>
        <div className="tab-item flex flex-col items-center">
          <div className="w-6 h-6 mb-1">👨‍💼</div>
          <span className="text-xs">专家支持</span>
        </div>
      </div>

      {/* 加载动画 */}
      {isLoading && <AIScanLoader />}
    </div>
  );
};

export default MetaLogicDiagnosis;