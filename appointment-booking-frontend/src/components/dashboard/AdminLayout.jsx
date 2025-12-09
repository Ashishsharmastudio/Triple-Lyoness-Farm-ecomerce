import { Icon } from "@iconify/react";

export default function AdminLayout({ children }) {
  // Skipping authentication check for this demo as requested "stub out backend"
  // In a real app, useAuth would be here.

  return (
    <div className="flex bg-background min-h-[calc(100vh-80px)]">
      <aside className="w-64 bg-white border-r border-primary/10 hidden md:block">
        <nav className="p-6 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-secondary mb-6 px-4">Dashboard</h2>

          <a
            href="#products"
            className="flex items-center gap-3 py-3 px-4 bg-primary/5 text-primary rounded-lg font-medium"
          >
            <Icon icon="solar:box-linear" width="20" />
            Products
          </a>
          <a
            href="#orders"
            className="flex items-center gap-3 py-3 px-4 text-text/70 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Icon icon="solar:bag-3-linear" width="20" />
            Orders
            <span className="ml-auto text-xs bg-secondary text-white px-2 py-0.5 rounded-full">Coming Soon</span>
          </a>
          <a
            href="#settings"
            className="flex items-center gap-3 py-3 px-4 text-text/70 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Icon icon="solar:settings-linear" width="20" />
            Settings
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
