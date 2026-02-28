# SSH配置文件示例

## 在本地创建SSH配置文件
1. 编辑 ~/.ssh/config 文件（如果不存在则创建）
2. 添加以下内容：

Host meta-logic
  HostName 118.145.108.55
  User root
  Port 22

## 连接服务器
使用简化命令：ssh meta-logic

## 检查部署状态
现在检查服务器上的部署情况：
