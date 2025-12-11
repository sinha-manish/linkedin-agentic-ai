export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 
                    bg-white dark:bg-neutral-950 shadow-sm p-6 transition-all">
      {children}
    </div>
  );
}
