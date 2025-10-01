import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, DollarSign, FileText, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddTransactionPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [transactionType, setTransactionType] = useState<"income" | "expense">("income");
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    account: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    notes: ""
  });

  const categories = {
    income: [
      "فروش کالا",
      "دریافت حقوق",
      "درآمد سرمایه‌گذاری",
      "پرداخت‌های دریافتی",
      "سایر درآمد"
    ],
    expense: [
      "خرید کالا",
      "هزینه‌های اداری",
      "هزینه‌های بازاریابی",
      "هزینه‌های عملیاتی",
      "سایر هزینه"
    ]
  };

  const accounts = [
    "حساب بانکی اصلی",
    "صندوق نقدی",
    "کارت اعتباری",
    "حساب سرمایه‌گذاری"
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Mock submission
    console.log("Submitting transaction:", { ...formData, type: transactionType });
    // In a real app, this would call an API
    navigate("/");
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">افزودن تراکنش جدید</h1>
        <p className="text-muted-foreground">تراکنش مالی خود را گام به گام ثبت کنید</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            ۱
          </div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            ۲
          </div>
          <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            ۳
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "انتخاب نوع تراکنش"}
            {step === 2 && "اطلاعات پایه"}
            {step === 3 && "بررسی و ثبت"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <RadioGroup
                value={transactionType}
                onValueChange={(value) => setTransactionType(value as "income" | "expense")}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 space-x-reverse border border-border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="income" id="income" />
                  <Label htmlFor="income" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">درآمد</p>
                      <p className="text-sm text-muted-foreground">دریافت پول</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse border border-border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="expense" id="expense" />
                  <Label htmlFor="expense" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                      <p className="font-medium">هزینه</p>
                      <p className="text-sm text-muted-foreground">پرداخت پول</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">مبلغ (ریال)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="مبلغ را وارد کنید"
                  value={formData.amount}
                  onChange={(e) => updateFormData("amount", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">توضیحات</Label>
                <Input
                  id="description"
                  placeholder="توضیحات تراکنش"
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="account">حساب</Label>
                <Select value={formData.account} onValueChange={(value) => updateFormData("account", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="حساب را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account} value={account}>{account}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">دسته‌بندی</Label>
                <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories[transactionType].map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">تاریخ</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateFormData("date", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="notes">یادداشت‌ها (اختیاری)</Label>
                <Textarea
                  id="notes"
                  placeholder="یادداشت‌های اضافی"
                  value={formData.notes}
                  onChange={(e) => updateFormData("notes", e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">نوع تراکنش:</span>
                  <span className="font-medium">
                    {transactionType === "income" ? "درآمد" : "هزینه"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">مبلغ:</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat('fa-IR').format(parseInt(formData.amount) || 0)} ریال
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">توضیحات:</span>
                  <span className="font-medium">{formData.description || "بدون توضیح"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">حساب:</span>
                  <span className="font-medium">{formData.account || "انتخاب نشده"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">دسته‌بندی:</span>
                  <span className="font-medium">{formData.category || "انتخاب نشده"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">تاریخ:</span>
                  <span className="font-medium">
                    {new Date(formData.date).toLocaleDateString('fa-IR')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-success">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">اطلاعات آماده ثبت است</span>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              قبلی
            </Button>
            {step < 3 ? (
              <Button onClick={handleNext}>
                بعدی
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gap-2">
                <CheckCircle className="w-4 h-4" />
                ثبت تراکنش
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
