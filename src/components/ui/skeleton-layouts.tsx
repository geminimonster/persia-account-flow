import { Skeleton } from "@/components/ui/skeleton";

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="card-financial p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <Skeleton className="w-16 h-5" />
          </div>
          <Skeleton className="w-32 h-8 mb-1" />
          <Skeleton className="w-24 h-4" />
        </div>
      ))}
    </div>
  );
}

export function RecentTransactionsSkeleton() {
  return (
    <div className="card-financial p-6">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-24 h-9" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-4">
              <Skeleton className="w-9 h-9 rounded-lg" />
              <div>
                <Skeleton className="w-32 h-5 mb-2" />
                <div className="flex items-center gap-2">
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="w-1 h-1 rounded-full" />
                  <Skeleton className="w-20 h-4" />
                </div>
              </div>
            </div>
            <Skeleton className="w-24 h-5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FinancialChartSkeleton() {
  return (
    <div className="card-financial p-6">
      <div className="mb-6">
        <Skeleton className="w-40 h-6 mb-2" />
        <Skeleton className="w-56 h-4" />
      </div>
      <div className="h-80">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="w-8 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="w-8 h-4" />
        </div>
      </div>
    </div>
  );
}

export function AccountCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Skeleton className="w-32 h-6 mb-2" />
          <Skeleton className="w-20 h-4" />
        </div>
        <Skeleton className="w-6 h-6" />
      </div>
      <Skeleton className="w-40 h-8 mb-2" />
      <div className="flex items-center gap-2">
        <Skeleton className="w-5 h-5" />
        <Skeleton className="w-16 h-4" />
      </div>
    </div>
  );
}

export function TileGridSkeleton() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <Skeleton className="w-64 h-8 mb-2" />
        <Skeleton className="w-96 h-5" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <Skeleton className="w-12 h-12 rounded-lg" />
            </div>
            <Skeleton className="w-full h-5 mb-2" />
            <Skeleton className="w-3/4 h-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="w-24 h-5" />
        <Skeleton className="w-full h-10 rounded-md" />
      </div>
      <div className="space-y-4">
        <Skeleton className="w-24 h-5" />
        <Skeleton className="w-full h-10 rounded-md" />
      </div>
      <div className="space-y-4">
        <Skeleton className="w-24 h-5" />
        <Skeleton className="w-full h-24 rounded-md" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="w-20 h-10 rounded-md" />
        <Skeleton className="w-20 h-10 rounded-md" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4 p-4 border-b">
        <Skeleton className="w-20 h-5" />
        <Skeleton className="w-24 h-5" />
        <Skeleton className="w-16 h-5" />
        <Skeleton className="w-12 h-5" />
      </div>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 p-4">
          <Skeleton className="w-32 h-5" />
          <Skeleton className="w-28 h-5" />
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-16 h-5" />
        </div>
      ))}
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <Skeleton className="w-48 h-8 mb-2" />
        <Skeleton className="w-64 h-5" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="w-24 h-10 rounded-md" />
        <Skeleton className="w-20 h-10 rounded-md" />
        <Skeleton className="w-28 h-10 rounded-md" />
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="w-8 h-8 rounded" />
      <div className="space-y-2">
        <Skeleton className="w-24 h-5" />
        <div className="space-y-1 mr-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="w-20 h-4" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="w-28 h-5" />
        <div className="space-y-1 mr-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="w-24 h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}