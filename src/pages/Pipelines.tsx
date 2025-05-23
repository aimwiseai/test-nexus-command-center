
import React from 'react';
import { Play, Pause, RefreshCw, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pipelines = [
  {
    id: 'pipeline-001',
    name: 'Main Regression Suite',
    status: 'running',
    progress: 65,
    duration: '12m 34s',
    tests: { total: 247, passed: 160, failed: 2, running: 85 },
    lastRun: '2 min ago',
    branch: 'main'
  },
  {
    id: 'pipeline-002',
    name: 'API Integration Tests',
    status: 'failed',
    progress: 100,
    duration: '8m 12s',
    tests: { total: 89, passed: 76, failed: 13, running: 0 },
    lastRun: '15 min ago',
    branch: 'develop'
  },
  {
    id: 'pipeline-003',
    name: 'UI Smoke Tests',
    status: 'passed',
    progress: 100,
    duration: '5m 43s',
    tests: { total: 134, passed: 134, failed: 0, running: 0 },
    lastRun: '1 hour ago',
    branch: 'release/v2.1'
  },
  {
    id: 'pipeline-004',
    name: 'Performance Tests',
    status: 'pending',
    progress: 0,
    duration: '--',
    tests: { total: 45, passed: 0, failed: 0, running: 0 },
    lastRun: 'Never',
    branch: 'feature/performance'
  },
];

const Pipelines = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'passed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-400" />;
      default: return <AlertCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'passed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">CI/CD Pipelines</h1>
          <p className="text-slate-400">Monitor and manage your test automation pipelines</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25">
            <Play className="w-4 h-4 mr-2" />
            Run Pipeline
          </Button>
        </div>
      </div>

      {/* Pipeline Cards */}
      <div className="grid gap-6">
        {pipelines.map((pipeline) => (
          <div
            key={pipeline.id}
            className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl hover:border-slate-600/50 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(pipeline.status)}
                <div>
                  <h3 className="text-xl font-semibold text-white">{pipeline.name}</h3>
                  <p className="text-sm text-slate-400">Branch: {pipeline.branch}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(pipeline.status)}`}>
                  {pipeline.status}
                </span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <Pause className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {pipeline.status === 'running' && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                  <span>Progress</span>
                  <span>{pipeline.progress}%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${pipeline.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Test Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="p-3 bg-slate-700/30 rounded-lg">
                <p className="text-sm text-slate-400">Total Tests</p>
                <p className="text-lg font-bold text-white">{pipeline.tests.total}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <p className="text-sm text-green-400">Passed</p>
                <p className="text-lg font-bold text-green-400">{pipeline.tests.passed}</p>
              </div>
              <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <p className="text-sm text-red-400">Failed</p>
                <p className="text-lg font-bold text-red-400">{pipeline.tests.failed}</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-sm text-blue-400">Running</p>
                <p className="text-lg font-bold text-blue-400">{pipeline.tests.running}</p>
              </div>
            </div>

            {/* Pipeline Info */}
            <div className="flex items-center justify-between text-sm text-slate-400">
              <div className="flex items-center space-x-4">
                <span>Duration: {pipeline.duration}</span>
                <span>Last run: {pipeline.lastRun}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                View Logs
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pipelines;
