'use client';
import React, { useState } from 'react';

const IntroPage = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleStartDiagnosis = () => {
    // 导航到主页面
    window.location.href = '/';
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
        </div>
      </header>

      {/* 主要内容 */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* 标题部分 */}
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              基于第一性原理的企业数字化诊断
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              测一测：你的传统业务
              <br />
              <span className="text-primary">离被彻底淘汰还有多远？</span>
            </h1>
            <p className="text-gray-400 mb-8">
              不听忽悠，只看数据，3分钟，帮你省下30万咨询费
            </p>
            <button
              onClick={handleStartDiagnosis}
              className="px-8 py-4 bg-primary text-dark-900 font-bold rounded-lg hover:bg-opacity-90 btn-primary"
            >
              开始免费诊断
            </button>
          </div>

          {/* 数据部分 */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="bg-dark-800 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-gray-400">企业客户</div>
            </div>
            <div className="bg-dark-800 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">¥1000万</div>
              <div className="text-sm text-gray-400">平均增收</div>
            </div>
            <div className="bg-dark-800 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-white mb-1">98%</div>
              <div className="text-sm text-gray-400">客户满意度</div>
            </div>
          </div>

          {/* 为什么选择部分 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">为什么选择元逻辑？</h2>
            <div className="space-y-6">
              <div className="bg-dark-800 rounded-lg p-6 flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI 深度分析</h3>
                  <p className="text-gray-400">
                    基于第一性原理的AI分析引擎，深度剖析企业痛点，提供针对性的解决方案。
                  </p>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-6 flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xl">📈</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">止亏增收</h3>
                  <p className="text-gray-400">
                    让你的企业在3个月内实现止亏，6个月内实现营收增长，利润率提升30%以上。
                  </p>
                </div>
              </div>
              <div className="bg-dark-800 rounded-lg p-6 flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">战绩赫赫</h3>
                  <p className="text-gray-400">
                    已帮助500+传统企业成功转型，平均为客户增收1000万元以上。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 客户评价 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">客户怎么说？</h2>
            <div className="space-y-6">
              <div className="bg-dark-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <span className="text-primary text-xl">张</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">张总</h4>
                    <div className="flex text-yellow-400 text-sm">
                      ★★★★★
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">
                  "元逻辑的分析非常专业，帮我们找到了企业的核心问题。通过他们的建议，我们在7个月内实现了营收增长45%，利润率提升了12个百分点。强烈推荐！"
                </p>
              </div>
              <div className="bg-dark-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <span className="text-primary text-xl">李</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">李总</h4>
                    <div className="flex text-yellow-400 text-sm">
                      ★★★★★
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">
                  "做了十二年的传统制造业，一直想转型但不知道从何入手。元逻辑的诊断报告给了我们清晰的方向，现在我们的数字化转型已经取得了初步成效。"
                </p>
              </div>
            </div>
          </div>

          {/* 行动号召 */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">准备好破局了吗？</h2>
            <button
              onClick={handleStartDiagnosis}
              className="w-full py-4 bg-primary text-dark-900 font-bold rounded-lg hover:bg-opacity-90 btn-primary mb-4"
            >
              立即开始诊断
            </button>
            <div className="flex justify-center space-x-4 text-sm text-gray-400">
              <a href="#" className="hover:text-primary transition-colors">隐私政策</a>
              <a href="#" className="hover:text-primary transition-colors">服务条款</a>
              <a href="#" className="hover:text-primary transition-colors">联系我们</a>
            </div>
          </div>
        </div>
      </main>

      {/* 底部信息 */}
      <footer className="border-t border-dark-700 py-6 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          © 2026 元逻辑诊断. 保留所有权利.
        </div>
      </footer>
    </div>
  );
};

export default IntroPage;