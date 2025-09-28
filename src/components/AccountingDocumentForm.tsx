import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Plus,
  Trash2,
  Check,
  X,
  Calendar as CalendarIcon,
  Save,
  Upload,
  Search,
  ArrowLeft
} from "lucide-react";
import { AnimatedBackButton } from "@/components/ui/animated-back-button";

// Zod schema
const voucherEntrySchema = z.object({
  accountCode: z.string().min(1, "کد حساب الزامی است"),
  accountName: z.string().min(1, "نام حساب الزامی است"),
  description: z.string().min(1, "شرح الزامی است"),
  debitAmount: z.number().min(0, "مبلغ بدهکار نمی‌تواند منفی باشد"),
  creditAmount: z.number().min(0, "مبلغ بستانکار نمی‌تواند منفی باشد"),
}).refine((data) => !(data.debitAmount > 0 && data.creditAmount > 0), {
  message: "یک آرتیکل نمی‌تواند هم بدهکار و هم بستانکار باشد",
  path: ["debitAmount"],
});

const accountingDocumentSchema = z.object({
  voucherNumber: z.string().min(1, "شماره سند الزامی است"),
  date: z.date({ required_error: "تاریخ الزامی است" }),
  description: z.string().min(1, "شرح سند الزامی است"),
  status: z.enum(['draft', 'approved']),
  entries: z.array(voucherEntrySchema).min(1, "حداقل یک آرتیکل الزامی است"),
}).refine((data) => {
  const totalDebit = data.entries.reduce((sum, entry) => sum + entry.debitAmount, 0);
  const totalCredit = data.entries.reduce((sum, entry) => sum + entry.creditAmount, 0);
  return totalDebit === totalCredit;
}, {
  message: "مجموع بدهکار و بستانکار باید برابر باشد",
  path: ["entries"],
});

type AccountingDocumentFormData = z.infer<typeof accountingDocumentSchema>;

// Mock account data
const mockAccounts = [
  { code: '1101', name: 'موجودی کالا' },
  { code: '1102', name: 'موجودی نقدی' },
  { code: '2101', name: 'حساب‌های پرداختنی' },
  { code: '2102', name: 'حساب‌های دریافتنی' },
  { code: '3101', name: 'سرمایه' },
  { code: '4101', name: 'فروش کالا' },
  { code: '5101', name: 'خرید کالا' },
];

interface AccountingDocumentFormProps {
  onBack?: () => void;
}

export default function AccountingDocumentForm({ onBack }: AccountingDocumentFormProps = {}) {
  const [attachments, setAttachments] = useState<File[]>([]);

  const form = useForm<AccountingDocumentFormData>({
    resolver: zodResolver(accountingDocumentSchema),
    defaultValues: {
      voucherNumber: '',
      date: new Date(),
      description: '',
      status: 'draft',
      entries: [{ accountCode: '', accountName: '', description: '', debitAmount: 0, creditAmount: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "entries"
  });

  const calculateTotals = () => {
    const entries = form.watch('entries');
    const totalDebit = entries.reduce((sum, entry) => sum + (entry.debitAmount || 0), 0);
    const totalCredit = entries.reduce((sum, entry) => sum + (entry.creditAmount || 0), 0);
    return { totalDebit, totalCredit };
  };

  const handleAccountCodeChange = (index: number, code: string) => {
    const account = mockAccounts.find(acc => acc.code === code);
    if (account) {
      form.setValue(`entries.${index}.accountName`, account.name);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const onSubmit = (data: AccountingDocumentFormData) => {
    console.log('Form Data:', data);
    console.log('Attachments:', attachments);
    alert('سند حسابداری با موفقیت ذخیره شد (در کنسول مرورگر)');
  };

  const { totalDebit, totalCredit } = calculateTotals();
  const isBalanced = totalDebit === totalCredit;

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {onBack && <AnimatedBackButton onClick={onBack} text="بازگشت به اسناد حسابداری" />}
      <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          فرم سند حسابداری
        </CardTitle>
        <CardDescription>
          ایجاد و مدیریت اسناد حسابداری با امکانات کامل
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Header Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="voucherNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره سند</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="V-2024-001" />
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
                          <Button variant="outline" className="w-full justify-start text-right font-normal">
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

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وضعیت</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب وضعیت" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">پیش‌نویس</SelectItem>
                        <SelectItem value="approved">تایید شده</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

            {/* Voucher Entries */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">آرتیکل‌های سند</h3>
                <Button
                  type="button"
                  onClick={() => append({ accountCode: '', accountName: '', description: '', debitAmount: 0, creditAmount: 0 })}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  افزودن آرتیکل
                </Button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-12 gap-2 items-end p-3 border rounded">
                    <div className="col-span-2">
                      <Label>کد حساب</Label>
                      <Select onValueChange={(value) => {
                        form.setValue(`entries.${index}.accountCode`, value);
                        handleAccountCodeChange(index, value);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب کد" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockAccounts.map((account) => (
                            <SelectItem key={account.code} value={account.code}>
                              {account.code} - {account.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label>نام حساب</Label>
                      <Input
                        {...form.register(`entries.${index}.accountName`)}
                        placeholder="نام حساب"
                      />
                    </div>
                    <div className="col-span-3">
                      <Label>شرح</Label>
                      <Input
                        {...form.register(`entries.${index}.description`)}
                        placeholder="شرح آرتیکل"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>بدهکار</Label>
                      <Input
                        type="number"
                        {...form.register(`entries.${index}.debitAmount`, { valueAsNumber: true })}
                        placeholder="0"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>بستانکار</Label>
                      <Input
                        type="number"
                        {...form.register(`entries.${index}.creditAmount`, { valueAsNumber: true })}
                        placeholder="0"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex items-center justify-between mt-4 p-3 bg-muted rounded">
                <div className="flex items-center gap-4">
                  <span>مجموع بدهکار: {totalDebit.toLocaleString()} ریال</span>
                  <span>مجموع بستانکار: {totalCredit.toLocaleString()} ریال</span>
                </div>
                <div className="flex items-center gap-2">
                  {isBalanced ? (
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

            {/* Attachments */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">پیوست‌ها</h3>
              <div className="space-y-2">
                <Input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      انتخاب فایل‌ها
                    </span>
                  </Button>
                </Label>
                {attachments.length > 0 && (
                  <div className="space-y-1">
                    {attachments.map((file, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                بازنشانی
              </Button>
              <Button type="submit" disabled={!isBalanced}>
                <Save className="h-4 w-4 mr-2" />
                ذخیره سند
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
    </div>
  );
}
