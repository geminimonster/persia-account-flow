import { Plus, Trash2, Edit, Maximize2, Search, Filter, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ActionButtonsProps {
  onNew?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onFullView?: () => void;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showFilter?: boolean;
  showExport?: boolean;
  showImport?: boolean;
}

export default function ActionButtons({
  onNew,
  onEdit,
  onDelete,
  onFullView,
  onSearch,
  onFilter,
  onExport,
  onImport,
  searchPlaceholder = "جستجو...",
  showSearch = true,
  showFilter = true,
  showExport = true,
  showImport = true
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-card border border-border rounded-lg shadow-soft">
      <div className="flex items-center gap-2">
        {onNew && (
          <Button onClick={onNew} className="gap-2">
            <Plus className="w-4 h-4" />
            جدید
          </Button>
        )}
        
        {onEdit && (
          <Button onClick={onEdit} variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            ویرایش
          </Button>
        )}
        
        {onDelete && (
          <Button onClick={onDelete} variant="destructive" className="gap-2">
            <Trash2 className="w-4 h-4" />
            حذف
          </Button>
        )}
        
        {onFullView && (
          <Button onClick={onFullView} variant="secondary" className="gap-2">
            <Maximize2 className="w-4 h-4" />
            نمای کامل
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {showSearch && onSearch && (
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              className="pr-10 w-64"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        )}
        
        {showFilter && onFilter && (
          <Button onClick={onFilter} variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        )}
        
        {showExport && onExport && (
          <Button onClick={onExport} variant="outline" size="icon">
            <Download className="w-4 h-4" />
          </Button>
        )}
        
        {showImport && onImport && (
          <Button onClick={onImport} variant="outline" size="icon">
            <Upload className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}