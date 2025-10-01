import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Calculator, Shield, Users, TrendingUp, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RequestFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

export default function ProductIntroPage() {
  const [formData, setFormData] = useState<RequestFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleInputChange = (field: keyof RequestFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (submitMessage) setSubmitMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.company) {
        throw new Error('لطفاً نام، ایمیل و نام شرکت را وارد کنید');
      }

      if (!formData.email.includes('@')) {
        throw new Error('لطفاً یک ایمیل معتبر وارد کنید');
      }

      // Since actual submission requires login, show message
      setSubmitMessage('درخواست شما ثبت شد. برای پردازش درخواست، لطفاً وارد سیستم شوید.');
    } catch (err) {
      setSubmitMessage(err instanceof Error ? err.message : 'خطایی رخ داده است');
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: Calculator,
      title: "حسابداری جامع",
      description: "مدیریت کامل حساب‌ها، تراکنش‌ها و گزارش‌های مالی"
    },
    {
      icon: Shield,
      title: "امنیت بالا",
      description: "محافظت از داده‌های حساس با رمزگذاری پیشرفته"
    },
    {
      icon: Users,
      title: "مدیریت مشتریان و تامین‌کنندگان",
      description: "سیستم جامع برای مدیریت روابط تجاری"
    },
    {
      icon: TrendingUp,
      title: "گزارشات تحلیلی",
      description: "نمودارها و تحلیل‌های مالی پیشرفته"
    }
  ];

  const benefits = [
    "کاهش خطای انسانی در حسابداری",
    "صرفه‌جویی در زمان و هزینه‌ها",
    "دسترسی آسان به اطلاعات مالی",
    "سازگاری با قوانین مالیاتی ایران",
    "پشتیبانی ۲۴ ساعته"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Building className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            سیستم حسابداری پارس
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            راه‌حل جامع حسابداری برای کسب‌وکارهای کوچک و بزرگ.
            مدیریت هوشمند مالی، گزارش‌گیری آسان و امنیت بالا.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              مناسب بازرگانان
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              سازگار با قوانین ایران
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              پشتیبانی کامل
            </Badge>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            ویژگی‌های کلیدی
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            مزایای استفاده از سیستم پارس
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">درخواست همکاری</CardTitle>
              <CardDescription>
                برای دریافت اطلاعات بیشتر و شروع همکاری با ما، فرم زیر را پر کنید
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitMessage && (
                  <Alert>
                    <AlertDescription>{submitMessage}</AlertDescription>
                  </Alert>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">نام و نام خانوادگی *</Label>
                    <Input
                      id="name"
                      placeholder="نام خود را وارد کنید"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">ایمیل *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">نام شرکت *</Label>
                    <Input
                      id="company"
                      placeholder="نام شرکت خود را وارد کنید"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">شماره تماس</Label>
                    <Input
                      id="phone"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">پیام شما</Label>
                  <Textarea
                    id="message"
                    placeholder="توضیحات بیشتر درباره درخواست همکاری..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    disabled={isSubmitting}
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      در حال ارسال...
                    </div>
                  ) : (
                    'ارسال درخواست'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>* فیلدهای اجباری</p>
                <p className="mt-2">برای پردازش درخواست، لطفاً وارد سیستم شوید.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            تماس با ما
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">ایمیل</h3>
              <p className="text-muted-foreground">info@parsaccounting.com</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">تلفن</h3>
              <p className="text-muted-foreground">۰۲۱-۱۲۳۴۵۶۷۸</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">آدرس</h3>
              <p className="text-muted-foreground">تهران، ایران</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © ۱۴۰۳ سیستم حسابداری پارس. تمامی حقوق محفوظ است.
          </p>
        </div>
      </footer>
    </div>
  );
}
