
import React from 'react';
import { 
  CheckSquare, 
  TrendingUp, 
  Bug, 
  Clock, 
  Target, 
  AlertTriangle,
  Play,
  Pause
} from 'lucide-react';
import MetricCard from './MetricCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const executionTrends = [
  { name: 'Jan', passed: 85, failed: 10, skipped: 5 },
  { name: 'Feb', passed: 88, failed: 8, skipped: 4 },
  { name: 'Mar', passed: 92, failed: 6, skipped: 2 },
  { name: 'Apr', passed: 87, failed: 9, skipped: 4 },
  { name: 'May', passed: 94, failed: 4, skipped: 2 },
  { name: 'Jun', passed: 91, failed: 7, skipped: 2 },
];

const coverageData = [
  { name: 'Automated', value: 68, color: '#3B82F6' },
  { name: 'Manual', value: 32, color: '#8B5CF6' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">QA Dashboard</h1>
          <p className="text-slate-400">Real-time insights into your testing operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200">
            <Play className="w-4 h-4 mr-2 inline" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Test Cases"
          value="2,847"
          subtitle="1,936 automated"
          trend={{ value: 12, isPositive: true }}
          icon={CheckSquare}
        />
        <MetricCard
          title="Automation Coverage"
          value="68%"
          subtitle="Target: 75%"
          trend={{ value: 3, isPositive: true }}
          icon={Target}
        />
        <MetricCard
          title="Active Bugs"
          value="23"
          subtitle="5 critical"
          trend={{ value: -8, isPositive: true }}
          icon={Bug}
        />
        <MetricCard
          title="Avg Resolution Time"
          value="2.3h"
          subtitle="Last 30 days"
          trend={{ value: -15, isPositive: true }}
          icon={Clock}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Execution Trends */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Execution Trends</h3>
              <p className="text-sm text-slate-400">Test results over time</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={executionTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }} 
              />
              <Line type="monotone" dataKey="passed" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={2} />
              <Line type="monotone" dataKey="skipped" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Test Coverage */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Test Coverage</h3>
              <p className="text-sm text-slate-400">Automation vs Manual</p>
            </div>
            <Target className="w-5 h-5 text-blue-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={coverageData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                stroke="none"
              >
                {coverageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {coverageData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-400">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Pipeline Activity</h3>
        <div className="space-y-3">
          {[
            { pipeline: 'main-regression-suite', status: 'passed', time: '2 min ago', tests: '247 tests' },
            { pipeline: 'api-integration-tests', status: 'failed', time: '15 min ago', tests: '89 tests' },
            { pipeline: 'ui-smoke-tests', status: 'passed', time: '1 hour ago', tests: '134 tests' },
            { pipeline: 'performance-tests', status: 'running', time: '5 min ago', tests: '45 tests' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  activity.status === 'passed' ? 'bg-green-500' :
                  activity.status === 'failed' ? 'bg-red-500' :
                  'bg-yellow-500 animate-pulse'
                }`} />
                <div>
                  <p className="text-white font-medium">{activity.pipeline}</p>
                  <p className="text-sm text-slate-400">{activity.tests}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">{activity.time}</p>
                <p className={`text-sm font-medium ${
                  activity.status === 'passed' ? 'text-green-400' :
                  activity.status === 'failed' ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {activity.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
