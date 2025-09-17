import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ActionButtons from "@/components/layout/ActionButtons";
import { DashboardStatsSkeleton, TableSkeleton } from "@/components/ui/skeleton-layouts";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  Edit3, 
  Copy, 
  Trash2,
  Check,
  X,
  Eye,
  Calculator,
  Save,
  RotateCcw
} from "lucide-react";

interface VoucherEntry {
  id: string;
  accountCode: string;
  accountName: string;
  description: string;
  debitAmount: number;
  creditAmount: number;
}

interface Voucher {
  id: string;
  voucherNumber: string;
  date: Date;
  description: string;
  totalDebit: number;
  totalCredit: number;
  status: 'draft' | 'approved' | 'posted';
  createdBy: string;
  entries: VoucherEntry[];
}

export default function AccountingVouchersPage() {
  const [loading, setLoading] = useState(true);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("vouchers");

  const form = useForm({
    defaultValues: {
      voucherNumber: '',
      date: new Date(),
      description: '',
      entries: [{ accountCode: '', accountName: '', description: '', debitAmount: 0, creditAmount: 0 }] as VoucherEntry[]
    }
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Mock data
      setVouchers([
        {
          id: '1',
          voucherNumber: 'V-2024-001',
          date: new Date(),
          description: 'خرید کالا از تامین‌کننده',
          totalDebit: 5000000,
          totalCredit: 5000000,
          status: 'approved',
          createdBy: 'احمد رضایی',
          entries: [
            {
              id: '1',
              accountCode: '1101',
              accountName: 'موجودی کالا',
              description: 'خرید کالا',
              debitAmount: 5000000,
              creditAmount: 0
            },
            {
              id: '2',
              accountCode: '2101',
              accountName: 'حساب‌های پرداختنی',
              description: 'بدهی به تامین‌کننده',
              debitAmount: 0,
              creditAmount: 5000000
            }
          ]
        }
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateVoucher = () => {
    setIsEditMode(false);
    setIsCreateModalOpen(true);
    form.reset();
  };

  const handleEditVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setIsEditMode(true);
    setIsCreateModalOpen(true);
    form.reset({
      voucherNumber: voucher.voucherNumber,
      date: voucher.date,
      description: voucher.description,
      entries: voucher.entries
    });
  };

  const addVoucherEntry = () => {
    const currentEntries = form.getValues('entries');
    form.setValue('entries', [
      ...currentEntries,
      { id: Date.now().toString(), accountCode: '', accountName: '', description: '', debitAmount: 0, creditAmount: 0 }
    ]);
  };

  const removeVoucherEntry = (index: number) => {
    const currentEntries = form.getValues('entries');
    if (currentEntries.length > 1) {
      form.setValue('entries', currentEntries.filter((_, i) => i !== index));
    }
  };

  const calculateTotals = () => {
    const entries = form.watch('entries');
    const totalDebit = entries.reduce((sum, entry) => sum + (entry.debitAmount || 0), 0);
    const totalCredit = entries.reduce((sum, entry) => sum + (entry.creditAmount || 0), 0);
    return { totalDebit, totalCredit };
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      draft: { label: 'پیش‌نویس', variant: 'secondary' as const },
      approved: { label: 'تایید شده', variant: 'default' as const },
      posted: { label: 'ثبت شده', variant: 'destructive' as const }
    };
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <DashboardStatsSkeleton />
        <TableSkeleton rows={5} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">اسناد حسابداری</h1>
          <p className="text-muted-foreground">مدیریت اسناد حسابداری، ثبت و تایید تراکنش‌ها</p>
        </div>
        <ActionButtons 
          onNew={handleCreateVoucher}
          onEdit={() => {}}
          onDelete={() => {}}
          onSearch={() => {}}
          onFilter={() => {}}
          onExport={() => {}}
          onImport={() => {}}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vouchers">فهرست اسناد</TabsTrigger>
          <TabsTrigger value="journal">دفتر روزنامه</TabsTrigger>
          <TabsTrigger value="templates">قالب‌های سند</TabsTrigger>
          <TabsTrigger value="reports">گزارشات</TabsTrigger>
        </TabsList>

        <TabsContent value="vouchers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                فهرست اسناد حسابداری
              </CardTitle>
              <CardDescription>
                مشاهده و مدیریت تمامی اسناد حسابداری
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="جستجو در اسناد..." className="w-64" />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleCreateVoucher}>
                  <Plus className="h-4 w-4 mr-2" />
                  سند جدید
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>شماره سند</TableHead>
                    <TableHead>تاریخ</TableHead>
                    <TableHead>شرح</TableHead>
                    <TableHead>مبلغ بدهکار</TableHead>
                    <TableHead>مبلغ بستانکار</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>ایجادکننده</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vouchers.map((voucher) => (
                    <TableRow key={voucher.id}>
                      <TableCell className="font-medium">{voucher.voucherNumber}</TableCell>
                      <TableCell>{format(voucher.date, 'yyyy/MM/dd')}</TableCell>
                      <TableCell>{voucher.description}</TableCell>
                      <TableCell>{voucher.totalDebit.toLocaleString()} ریال</TableCell>
                      <TableCell>{voucher.totalCredit.toLocaleString()} ریال</TableCell>
                      <TableCell>{getStatusBadge(voucher.status)}</TableCell>
                      <TableCell>{voucher.createdBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm" onClick={() => setSelectedVoucher(voucher)}>
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditVoucher(voucher)}>
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>دفتر روزنامه</CardTitle>
              <CardDescription>مشاهده تمامی تراکنش‌ها به ترتیب زمانی</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">دفتر روزنامه در حال توسعه است</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>قالب‌های سند</CardTitle>
              <CardDescription>ایجاد و مدیریت قالب‌های از پیش تعریف شده</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">قالب‌های سند در حال توسعه است</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>گزارشات اسناد</CardTitle>
              <CardDescription>گزارش‌های تحلیلی و خلاصه اسناد</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">گزارشات در حال توسعه است</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Voucher Dialog */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'ویرایش سند حسابداری' : 'سند حسابداری جدید'}
            </DialogTitle>
            <DialogDescription>
              {isEditMode ? 'ویرایش اطلاعات سند موجود' : 'ایجاد سند حسابداری جدید'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="voucherNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>شماره سند</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="V-2024-002" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تاریخ سند</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className="w-full">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, 'yyyy/MM/dd') : 'انتخاب تاریخ'}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>وضعیت</FormLabel>
                  <Select defaultValue="draft">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">پیش‌نویس</SelectItem>
                      <SelectItem value="approved">تایید شده</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شرح سند</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="شرح کلی سند حسابداری" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">آرتیکل‌های سند</h3>
                  <Button type="button" onClick={addVoucherEntry} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    افزودن آرتیکل
                  </Button>
                </div>

                <div className="space-y-3">
                  {form.watch('entries')?.map((entry, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-end p-3 border rounded">
                      <div className="col-span-2">
                        <Label>کد حساب</Label>
                        <Input 
                          placeholder="1101"
                          onChange={(e) => {
                            const entries = [...form.getValues('entries')];
                            entries[index].accountCode = e.target.value;
                            form.setValue('entries', entries);
                          }}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>نام حساب</Label>
                        <Input 
                          placeholder="نام حساب"
                          onChange={(e) => {
                            const entries = [...form.getValues('entries')];
                            entries[index].accountName = e.target.value;
                            form.setValue('entries', entries);
                          }}
                        />
                      </div>
                      <div className="col-span-3">
                        <Label>شرح</Label>
                        <Input 
                          placeholder="شرح آرتیکل"
                          onChange={(e) => {
                            const entries = [...form.getValues('entries')];
                            entries[index].description = e.target.value;
                            form.setValue('entries', entries);
                          }}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>بدهکار</Label>
                        <Input 
                          type="number"
                          placeholder="0"
                          onChange={(e) => {
                            const entries = [...form.getValues('entries')];
                            entries[index].debitAmount = Number(e.target.value);
                            form.setValue('entries', entries);
                          }}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>بستانکار</Label>
                        <Input 
                          type="number"
                          placeholder="0"
                          onChange={(e) => {
                            const entries = [...form.getValues('entries')];
                            entries[index].creditAmount = Number(e.target.value);
                            form.setValue('entries', entries);
                          }}
                        />
                      </div>
                      <div className="col-span-1">
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm"
                          onClick={() => removeVoucherEntry(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 p-3 bg-muted rounded">
                  <div className="flex items-center gap-4">
                    <span>مجموع بدهکار: {calculateTotals().totalDebit.toLocaleString()} ریال</span>
                    <span>مجموع بستانکار: {calculateTotals().totalCredit.toLocaleString()} ریال</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {calculateTotals().totalDebit === calculateTotals().totalCredit ? (
                      <Badge variant="default" className="flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        متعادل
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <X className="h-3 w-3" />
                        نامتعادل
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  انصراف
                </Button>
                <Button type="button" variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  بازنشانی
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {isEditMode ? 'ذخیره تغییرات' : 'ایجاد سند'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Voucher Dialog */}
      <Dialog open={!!selectedVoucher && !isCreateModalOpen} onOpenChange={() => setSelectedVoucher(null)}>
        <DialogContent className="max-w-3xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>مشاهده سند حسابداری</DialogTitle>
            <DialogDescription>
              جزئیات سند شماره {selectedVoucher?.voucherNumber}
            </DialogDescription>
          </DialogHeader>

          {selectedVoucher && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>شماره سند</Label>
                  <p className="font-medium">{selectedVoucher.voucherNumber}</p>
                </div>
                <div>
                  <Label>تاریخ</Label>
                  <p className="font-medium">{format(selectedVoucher.date, 'yyyy/MM/dd')}</p>
                </div>
                <div>
                  <Label>وضعیت</Label>
                  <div>{getStatusBadge(selectedVoucher.status)}</div>
                </div>
              </div>

              <div>
                <Label>شرح سند</Label>
                <p className="font-medium">{selectedVoucher.description}</p>
              </div>

              <div>
                <Label>آرتیکل‌های سند</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>کد حساب</TableHead>
                      <TableHead>نام حساب</TableHead>
                      <TableHead>شرح</TableHead>
                      <TableHead>بدهکار</TableHead>
                      <TableHead>بستانکار</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedVoucher.entries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.accountCode}</TableCell>
                        <TableCell>{entry.accountName}</TableCell>
                        <TableCell>{entry.description}</TableCell>
                        <TableCell>{entry.debitAmount.toLocaleString()}</TableCell>
                        <TableCell>{entry.creditAmount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedVoucher(null)}>
                  بستن
                </Button>
                <Button onClick={() => handleEditVoucher(selectedVoucher)}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  ویرایش
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}