import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  User,
  Shield,
  Database,
  Palette,
  Globe,
  Bell,
  Download,
  Upload,
  Settings as SettingsIcon
} from "lucide-react";

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    // General
    companyName: "شرکت نمونه",
    companyAddress: "آدرس شرکت",
    fiscalYear: "1403",
    currency: "IRR",
    dateFormat: "persian",
    timeZone: "Asia/Tehran",

    // Users
    defaultRole: "user",
    sessionTimeout: 30,
    passwordPolicy: "medium",

    // Security
    twoFactorAuth: false,
    loginAttempts: 5,
    ipWhitelist: false,

    // Database
    autoBackup: true,
    backupFrequency: "daily",
    retentionPeriod: 30,

    // Appearance
    theme: "light",
    language: "fa",
    sidebarCollapsed: false,

    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save settings to localStorage or API
    localStorage.setItem('systemSettings', JSON.stringify(settings));
    alert('تنظیمات ذخیره شد');
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">تنظیمات سیستم</h1>
          <p className="text-muted-foreground">مدیریت تنظیمات کامل سیستم حسابداری</p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          ذخیره تنظیمات
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="w-4 h-4" />
            عمومی
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            کاربران
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            امنیت
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            پایگاه داده
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            نمایش
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            اعلان‌ها
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات عمومی</CardTitle>
              <CardDescription>تنظیمات پایه سیستم حسابداری</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">نام شرکت</Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => updateSetting('companyName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="fiscalYear">سال مالی</Label>
                  <Select value={settings.fiscalYear} onValueChange={(value) => updateSetting('fiscalYear', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1402">1402</SelectItem>
                      <SelectItem value="1403">1403</SelectItem>
                      <SelectItem value="1404">1404</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="companyAddress">آدرس شرکت</Label>
                <Textarea
                  id="companyAddress"
                  value={settings.companyAddress}
                  onChange={(e) => updateSetting('companyAddress', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="currency">واحد پول</Label>
                  <Select value={settings.currency} onValueChange={(value) => updateSetting('currency', value)}>
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
                <div>
                  <Label htmlFor="dateFormat">فرمت تاریخ</Label>
                  <Select value={settings.dateFormat} onValueChange={(value) => updateSetting('dateFormat', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="persian">شمسی</SelectItem>
                      <SelectItem value="gregorian">میلادی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeZone">منطقه زمانی</Label>
                  <Select value={settings.timeZone} onValueChange={(value) => updateSetting('timeZone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Tehran">تهران</SelectItem>
                      <SelectItem value="Europe/London">لندن</SelectItem>
                      <SelectItem value="America/New_York">نیویورک</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>مدیریت کاربران</CardTitle>
              <CardDescription>تنظیمات مربوط به کاربران و دسترسی‌ها</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="defaultRole">نقش پیش‌فرض</Label>
                  <Select value={settings.defaultRole} onValueChange={(value) => updateSetting('defaultRole', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">کاربر</SelectItem>
                      <SelectItem value="admin">مدیر</SelectItem>
                      <SelectItem value="viewer">ناظر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sessionTimeout">زمان انقضا جلسه (دقیقه)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="passwordPolicy">سیاست رمز عبور</Label>
                <Select value={settings.passwordPolicy} onValueChange={(value) => updateSetting('passwordPolicy', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">ضعیف</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="high">قوی</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات امنیتی</CardTitle>
              <CardDescription>گزینه‌های امنیتی سیستم</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactorAuth">احراز هویت دو مرحله‌ای</Label>
                  <p className="text-sm text-muted-foreground">فعال کردن احراز هویت دو مرحله‌ای برای امنیت بیشتر</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="loginAttempts">حداکثر تلاش ورود</Label>
                  <Input
                    id="loginAttempts"
                    type="number"
                    value={settings.loginAttempts}
                    onChange={(e) => updateSetting('loginAttempts', parseInt(e.target.value))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ipWhitelist"
                    checked={settings.ipWhitelist}
                    onCheckedChange={(checked) => updateSetting('ipWhitelist', checked)}
                  />
                  <Label htmlFor="ipWhitelist">لیست سفید IP</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>پایگاه داده</CardTitle>
              <CardDescription>تنظیمات پشتیبان‌گیری و بازیابی</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoBackup">پشتیبان‌گیری خودکار</Label>
                  <p className="text-sm text-muted-foreground">فعال کردن پشتیبان‌گیری خودکار داده‌ها</p>
                </div>
                <Switch
                  id="autoBackup"
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="backupFrequency">فرکانس پشتیبان‌گیری</Label>
                  <Select value={settings.backupFrequency} onValueChange={(value) => updateSetting('backupFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">ساعتی</SelectItem>
                      <SelectItem value="daily">روزانه</SelectItem>
                      <SelectItem value="weekly">هفتگی</SelectItem>
                      <SelectItem value="monthly">ماهانه</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="retentionPeriod">دوره نگهداری (روز)</Label>
                  <Input
                    id="retentionPeriod"
                    type="number"
                    value={settings.retentionPeriod}
                    onChange={(e) => updateSetting('retentionPeriod', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  پشتیبان‌گیری دستی
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  بازیابی از فایل
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>نمایش و ظاهر</CardTitle>
              <CardDescription>تنظیمات نمایش و رابط کاربری</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="theme">تم</Label>
                  <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">روشن</SelectItem>
                      <SelectItem value="dark">تیره</SelectItem>
                      <SelectItem value="system">سیستم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">زبان</Label>
                  <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fa">فارسی</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sidebarCollapsed">سایدبار جمع شده</Label>
                  <p className="text-sm text-muted-foreground">نمایش سایدبار به صورت جمع شده به طور پیش‌فرض</p>
                </div>
                <Switch
                  id="sidebarCollapsed"
                  checked={settings.sidebarCollapsed}
                  onCheckedChange={(checked) => updateSetting('sidebarCollapsed', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>اعلان‌ها</CardTitle>
              <CardDescription>تنظیمات اعلان‌های سیستم</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">اعلان‌های ایمیلی</Label>
                    <p className="text-sm text-muted-foreground">دریافت اعلان‌ها از طریق ایمیل</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">اعلان‌های SMS</Label>
                    <p className="text-sm text-muted-foreground">دریافت اعلان‌ها از طریق پیامک</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifications">اعلان‌های پوش</Label>
                    <p className="text-sm text-muted-foreground">دریافت اعلان‌های درون‌برنامه‌ای</p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
