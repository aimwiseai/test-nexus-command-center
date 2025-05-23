
import React from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface TopNavigationProps {
  sidebarCollapsed: boolean;
}

const squads = [
  { id: 1, name: 'Alpha Squad', color: 'from-blue-500 to-cyan-500' },
  { id: 2, name: 'Beta Squad', color: 'from-purple-500 to-pink-500' },
  { id: 3, name: 'Gamma Squad', color: 'from-green-500 to-teal-500' },
  { id: 4, name: 'Delta Squad', color: 'from-orange-500 to-red-500' },
];

const TopNavigation = ({ sidebarCollapsed }: TopNavigationProps) => {
  const [selectedSquad, setSelectedSquad] = React.useState(squads[0]);

  return (
    <header className={`fixed top-0 right-0 h-16 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 z-40 transition-all duration-300 ${
      sidebarCollapsed ? 'left-16' : 'left-64'
    }`}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Squad Switcher */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-slate-800/50">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${selectedSquad.color}`} />
                <span className="font-medium">{selectedSquad.name}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-slate-800/95 backdrop-blur-xl border-slate-700/50">
              {squads.map((squad) => (
                <DropdownMenuItem
                  key={squad.id}
                  onClick={() => setSelectedSquad(squad)}
                  className="flex items-center space-x-2 text-slate-200 hover:bg-slate-700/50 cursor-pointer"
                >
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${squad.color}`} />
                  <span>{squad.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search test cases, pipelines... (Ctrl+K)"
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            />
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800/50">
            <Bell className="w-5 h-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-slate-800/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-medium">John Doe</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-slate-800/95 backdrop-blur-xl border-slate-700/50">
              <DropdownMenuItem className="text-slate-200 hover:bg-slate-700/50">
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-200 hover:bg-slate-700/50">
                Squad Management
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700/50" />
              <DropdownMenuItem className="text-slate-200 hover:bg-slate-700/50">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
