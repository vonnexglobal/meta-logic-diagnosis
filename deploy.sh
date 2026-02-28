#!/bin/bash

# MetaLogic Deployment Script

echo "=== MetaLogic Deployment Script ==="
echo ""

# 1. Clone the repository
echo "1. Cloning repository..."
git clone https://github.com/vonnexglobal/meta-logic-diagnosis.git

# 2. Enter project directory
echo "2. Entering project directory..."
cd meta-logic-diagnosis

# 3. Install dependencies
echo "3. Installing dependencies..."
npm install

# 4. Build project
echo "4. Building project..."
npm run build

# 5. Install PM2
echo "5. Installing PM2..."
npm install -g pm2

# 6. Start the application
echo "6. Starting application..."
pm2 start npm --name "meta-logic" -- run start

# 7. Set PM2 to start on boot
echo "7. Setting PM2 to start on boot..."
pm2 startup
pm2 save

# 8. Configure firewall
echo "8. Configuring firewall..."
ufw allow 3000
ufw enable

echo ""
echo "=== Deployment Complete ==="
echo "Application is running at http://$(hostname -I | awk '{print $1}'):3000"
echo "Use 'pm2 status' to check application status"
echo "Use 'pm2 logs meta-logic' to view application logs"