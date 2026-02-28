# 如何在GitHub上创建远程仓库并推送代码

## 步骤 1: 在GitHub上创建新仓库
1. 打开 https://github.com/new
2. 仓库名称填写：MetaLogic
3. 描述填写：基于第一性原理的传统制造业数字化自动化诊断 SaaS
4. 选择 Public (公开)
5. 不要勾选 Initialize this repository with a README
6. 点击 Create repository

## 步骤 2: 获取仓库URL
创建成功后，复制仓库的HTTPS URL（类似 https://github.com/your-username/MetaLogic.git）

## 步骤 3: 推送代码到远程仓库
在终端中执行以下命令（替换为您的仓库URL）：
git remote add origin https://github.com/your-username/MetaLogic.git
git push -u origin main
