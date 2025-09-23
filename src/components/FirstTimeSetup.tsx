import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  User, 
  Settings, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Shield,
  Database
} from "lucide-react";

interface FirstTimeSetupProps {
  onComplete: () => void;
}

interface SetupData {
  companyName: string;
  companyType: string;
  fiscalYear: string;
  currency: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  address: string;
  features: string[];
}

const companyTypes = [
  { value: "private", label: "شرکت خصوصی" },
  { value: "public", label: "شرکت سهامی عام" },
  { value: "limited", label: "شرکت با مسئولیت محدود" },
  { value: "industrial", label: "واحد صنعتی" },
  { value: "commercial", label: "واحد تجاری" },
  { value: "service", label: "شرکت خدماتی" }
];

const features = [
  { id: "accounting", label: "حسابداری عمومی", description: "مدیریت حساب‌ها و اسناد مالی" },
  { id: "inventory", label: "مدیریت انبار", description: "کنترل موجودی و حرکت کالا" },
  { id: "sales", label: "فروش و فاکتور", description: "صدور فاکتور و مدیریت فروش" },
  { id: "purchase", label: "خرید و تهیه", description: "مدیریت خرید و تامین‌کنندگان" },
  { id: "payroll", label: "حقوق و دستمزد", description: "مدیریت پرسنل و حقوق" },
  { id: "automation", label: "اتوماسیون", description: "خودکارسازی فرآیندها" }
];

export default function FirstTimeSetup({ onComplete }: FirstTimeSetupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [setupData, setSetupData] = useState<SetupData>({
    companyName: "",
    companyType: "",
    fiscalYear: "1403",
    currency: "IRR",
    adminName: "",
    adminEmail: "",
    phone: "",
    address: "",
    features: []
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateSetupData = (field: keyof SetupData, value: any) => {
    setSetupData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (featureId: string) => {
    setSetupData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeSetup = () => {
    // Save setup data to localStorage
    localStorage.setItem('setupCompleted', 'true');
    localStorage.setItem('setupData', JSON.stringify(setupData));
    onComplete();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Building2 className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">اطلاعات شرکت</h2>
              <p className="text-muted-foreground">لطفاً اطلاعات اولیه شرکت خود را وارد کنید</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">نام شرکت</Label>
                <Input
                  id="companyName"
                  placeholder="نام شرکت یا سازمان خود را وارد کنید"
                  value={setupData.companyName}
                  onChange={(e) => updateSetupData('companyName', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="companyType">نوع شرکت</Label>
                <Select value={setupData.companyType} onValueChange={(value) => updateSetupData('companyType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="نوع شرکت را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fiscalYear">سال مالی</Label>
                  <Select value={setupData.fiscalYear} onValueChange={(value) => updateSetupData('fiscalYear', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1403">1403</SelectItem>
                      <SelectItem value="1404">1404</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currency">واحد پول</Label>
                  <Select value={setupData.currency} onValueChange={(value) => updateSetupData('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IRR">ریال ایران</SelectItem>
                      <SelectItem value="USD">دلار آمریکا</SelectItem>
                      <SelectItem value="EUR">یورو</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">اطلاعات مدیر سیستم</h2>
              <p className="text-muted-foreground">اطلاعات مدیر اصلی سیستم را وارد کنید</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="adminName">نام و نام خانوادگی</Label>
                <Input
                  id="adminName"
                  placeholder="نام و نام خانوادگی مدیر سیستم"
                  value={setupData.adminName}
                  onChange={(e) => updateSetupData('adminName', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="adminEmail">ایمیل</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="admin@company.com"
                  value={setupData.adminEmail}
                  onChange={(e) => updateSetupData('adminEmail', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="phone">شماره تماس</Label>
                <Input
                  id="phone"
                  placeholder="09123456789"
                  value={setupData.phone}
                  onChange={(e) => updateSetupData('phone', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address">آدرس شرکت</Label>
                <Textarea
                  id="address"
                  placeholder="آدرس کامل شرکت"
                  value={setupData.address}
                  onChange={(e) => updateSetupData('address', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Settings className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">انتخاب ماژول‌ها</h2>
              <p className="text-muted-foreground">ماژول‌هایی که نیاز دارید را انتخاب کنید</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    setupData.features.includes(feature.id)
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => toggleFeature(feature.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{feature.label}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                      </div>
                      {setupData.features.includes(feature.id) && (
                        <Check className="w-5 h-5 text-primary mt-1" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Badge variant="secondary" className="text-sm">
                {setupData.features.length} ماژول انتخاب شده
              </Badge>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">تایید و تکمیل</h2>
              <p className="text-muted-foreground">اطلاعات وارد شده را بررسی و تایید کنید</p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    اطلاعات شرکت
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">نام شرکت:</span>
                    <span className="font-medium">{setupData.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">نوع شرکت:</span>
                    <span className="font-medium">
                      {companyTypes.find(t => t.value === setupData.companyType)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">سال مالی:</span>
                    <span className="font-medium">{setupData.fiscalYear}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    مدیر سیستم
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">نام:</span>
                    <span className="font-medium">{setupData.adminName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ایمیل:</span>
                    <span className="font-medium">{setupData.adminEmail}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    ماژول‌های انتخابی
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {setupData.features.map((featureId) => {
                      const feature = features.find(f => f.id === featureId);
                      return (
                        <Badge key={featureId} variant="secondary">
                          {feature?.label}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="text-center space-y-2">
            <Shield className="w-12 h-12 text-primary mx-auto" />
            <CardTitle className="text-3xl">راه‌اندازی اولیه سیستم</CardTitle>
            <CardDescription>
              برای شروع کار با سیستم، لطفاً مراحل زیر را تکمیل کنید
            </CardDescription>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>مرحله {currentStep} از {totalSteps}</span>
              <span>%{Math.round(progress)}</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {renderStep()}

          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              مرحله قبل
            </Button>

            {currentStep === totalSteps ? (
              <Button
                onClick={completeSetup}
                className="flex items-center gap-2"
                disabled={!setupData.companyName || !setupData.adminName}
              >
                <Check className="w-4 h-4" />
                تکمیل راه‌اندازی
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2"
                disabled={
                  (currentStep === 1 && (!setupData.companyName || !setupData.companyType)) ||
                  (currentStep === 2 && (!setupData.adminName || !setupData.adminEmail))
                }
              >
                مرحله بعد
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}