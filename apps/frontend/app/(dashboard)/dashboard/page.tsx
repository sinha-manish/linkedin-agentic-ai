import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>

      <p className="text-neutral-600 dark:text-neutral-400">
        Welcome to LinkedIn Agentic AI.
      </p>

      <Card>
        <h2 className="text-xl font-medium mb-2">System Status</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Everything is running smoothly.
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-medium mb-2">Recent Posts</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          No posts created yet.
        </p>
      </Card>
    </div>
  );
}
