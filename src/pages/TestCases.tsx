
import React, { useState } from 'react';
import { Search, Filter, Plus, Tag, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testCases = [
  {
    id: 'TC-001',
    title: 'User Login Validation',
    status: 'automated',
    priority: 'high',
    lastRun: '2 hours ago',
    result: 'passed',
    assignee: 'Alice Johnson',
    tags: ['login', 'authentication', 'regression']
  },
  {
    id: 'TC-002',
    title: 'Payment Gateway Integration',
    status: 'manual',
    priority: 'critical',
    lastRun: '1 day ago',
    result: 'failed',
    assignee: 'Bob Smith',
    tags: ['payment', 'integration', 'critical']
  },
  {
    id: 'TC-003',
    title: 'User Profile Update',
    status: 'automated',
    priority: 'medium',
    lastRun: '30 min ago',
    result: 'passed',
    assignee: 'Carol Davis',
    tags: ['profile', 'crud', 'user-management']
  },
  {
    id: 'TC-004',
    title: 'Search Functionality',
    status: 'automated',
    priority: 'low',
    lastRun: '4 hours ago',
    result: 'skipped',
    assignee: 'David Wilson',
    tags: ['search', 'ui', 'functionality']
  },
];

const TestCases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredTestCases = testCases.filter(testCase => {
    const matchesSearch = testCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testCase.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || testCase.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'automated': return 'bg-blue-500/20 text-blue-400';
      case 'manual': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/20 text-red-400';
      case 'high': return 'bg-orange-500/20 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'passed': return 'text-green-400';
      case 'failed': return 'text-red-400';
      case 'skipped': return 'text-yellow-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Test Cases</h1>
          <p className="text-slate-400">Manage and monitor your test suite</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25">
          <Plus className="w-4 h-4 mr-2" />
          New Test Case
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search test cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <option value="all">All Status</option>
          <option value="automated">Automated</option>
          <option value="manual">Manual</option>
        </select>
        <Button variant="outline" className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Test Cases Grid */}
      <div className="grid gap-4">
        {filteredTestCases.map((testCase) => (
          <div
            key={testCase.id}
            className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl hover:border-slate-600/50 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-sm font-mono text-slate-400">{testCase.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(testCase.status)}`}>
                    {testCase.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(testCase.priority)}`}>
                    {testCase.priority}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {testCase.title}
                </h3>
                
                <div className="flex items-center space-x-6 text-sm text-slate-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{testCase.assignee}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{testCase.lastRun}</span>
                  </div>
                  <div className={`font-medium ${getResultColor(testCase.result)}`}>
                    {testCase.result}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {testCase.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md flex items-center space-x-1"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  View Details
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  Run Test
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCases;
