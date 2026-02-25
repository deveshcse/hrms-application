import { useState } from 'react';
import { EmployeeForm } from './features/employees/components/EmployeeForm';
import { EmployeeTable } from './features/employees/components/EmployeeTable';
import { AttendanceForm } from './features/attendance/components/AttendanceForm';
import { LayoutDashboard, Users, Clock } from 'lucide-react';
import { cn } from './lib/utils';

type Tab = 'employees' | 'attendance';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('employees');

  return (
    <div className="w-full min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-full mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <LayoutDashboard className="text-white h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 italic">HRMS <span className="text-primary not-italic">Lite</span></h1>
          </div>
          <p className="text-sm font-medium text-neutral-500 hidden sm:block">Admin Portal</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex bg-neutral-200/50 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('employees')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === 'employees'
                ? "bg-white text-primary shadow-sm"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300/30"
            )}
          >
            <Users className="h-4 w-4" />
            Employee Management
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === 'attendance'
                ? "bg-white text-primary shadow-sm"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300/30"
            )}
          >
            <Clock className="h-4 w-4" />
            Attendance Tracking
          </button>
        </div>

        {/* Tab Panels */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {activeTab === 'employees' ? (
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Employees</h2>
                <p className="text-neutral-500">Add and manage your organization's employee records.</p>
              </div>
              <div className="grid gap-8">
                <EmployeeForm />
                <EmployeeTable />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Attendance</h2>
                <p className="text-neutral-500">Mark daily attendance for your staff members.</p>
              </div>
              <div className="grid gap-8">
                <AttendanceForm />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-neutral-400">
          &copy; 2026 HRMS Lite. Built for professionals.
        </div>
      </footer>
    </div>
  );
}

export default App;
