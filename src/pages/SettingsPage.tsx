import { useState } from "react";
import { Save, User, Shield, Bell, Palette, Database, Globe, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    companyName: 'شرکت حسابداری پارس',
    companyAddress: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
    companyPhone: '02112345678',
    companyEmail: 'info@parsaccounting.com',
    currency: 'IRR',
    language: 'fa',
    timezone: 'Asia/Tehran',
    
    // User Settings
    userName: 'مدیر سیستم',
    userEmail: 'admin@parsaccounting.com',
    notifications: true,
    emailNotifications: true,
    smsNotifications: false,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
    
    // Appearance Settings
    theme: 'light',
    sidebarCollapsed: false,
    compactMode: false,
    
    // Database Settings
    backupEnabled: true,
    backupFrequency: 'daily',
    retentionDays: 30,
    
    // API Settings
    apiEnabled: true,
    rateLimit: 1000,
    corsOrigins: ['http://localhost:8080']
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save settings to backend
    console.log('Saving settings:', settings);
    // Here you would typically make an API call to save settings
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">تنظیمات سیستم</h1>
          <p className="text-muted-foreground">مدیریت تنظیمات و پیکربندی سیستم</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          ذخیره تغییرات
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">عمومی</TabsTrigger>
          <TabsTrigger value="user">کاربری</TabsTrigger>
          <TabsTrigger value="security">امنیت</TabsTrigger>
          <TabsTrigger value="appearance">ظاهر</TabsTrigger>
          <TabsTrigger value="database">پایگاه داده</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                اطلاعات شرکت
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">نام شرکت</Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => handleSettingChange('companyName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">تلفن</Label>
                  <Input
                    id="companyPhone"
                    value={settings.companyPhone}
                    onChange={(e) => handleSettingChange('companyPhone', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyAddress">آدرس</Label>
                <Input
                  id="companyAddress"
                  value={settings.companyAddress}
                  onChange={(e) => handleSettingChange('companyAddress', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">واحد پول</Label>
                  <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IRR">ریال</SelectItem>
                      <SelectItem value="USD">دلار</SelectItem>
                      <SelectItem value="EUR">یورو</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">زبان</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fa">فارسی</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">منطقه زمانی</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Tehran">تهران</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                تنظیمات کاربری
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">نام کاربری</Label>
                  <Input
                    id="userName"
                    value={settings.userName}
                    onChange={(e) => handleSettingChange('userName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">ایمیل</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={settings.userEmail}
                    onChange={(e) => handleSettingChange('userEmail', e.target.value)}
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-sm font-medium">اعلان‌ها</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>اعلان‌های سیستم</Label>
                    <p className="text-sm text-muted-foreground">دریافت اعلان‌های سیستم</p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>اعلان‌های ایمیل</Label>
                    <p className="text-sm text-muted-foreground">دریافت اعلان‌ها از طریق ایمیل</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>اعلان‌های پیامک</Label>
                    <p className="text-sm text-muted-foreground">دریافت اعلان‌ها از طریق پیامک</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                تنظیمات امنیتی
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>احراز هویت دو مرحله‌ای</Label>
                  <p className="text-sm text-muted-foreground">فعال‌سازی 2FA برای امنیت بیشتر</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                />
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">مدت زمان جلسه (دقیقه)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">انقضای رمز عبور (روز)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={settings.passwordExpiry}
                    onChange={(e) => handleSettingChange('passwordExpiry', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loginAttempts">حد تلاش ورود</Label>
                  <Input
                    id="loginAttempts"
                    type="number"
                    value={settings.loginAttempts}
                    onChange={(e) => handleSettingChange('loginAttempts', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                تنظیمات ظاهر
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">تم</Label>
                  <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">روشن</SelectItem>
                      <SelectItem value="dark">تاریک</SelectItem>
                      <SelectItem value="system">سیستم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>منوی جمع‌شده</Label>
                    <p className="text-sm text-muted-foreground">نمایش منوی جمع‌شده</p>
                  </div>
                  <Switch
                    checked={settings.sidebarCollapsed}
                    onCheckedChange={(checked) => handleSettingChange('sidebarCollapsed', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>حالت فشرده</Label>
                    <p className="text-sm text-muted-foreground">نمایش فشرده عناصر</p>
                  </div>
                  <Switch
                    checked={settings.compactMode}
                    onCheckedChange={(checked) => handleSettingChange('compactMode', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                تنظیمات پایگاه داده
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>پشتیبان‌گیری خودکار</Label>
                  <p className="text-sm text-muted-foreground">فعال‌سازی پشتیبان‌گیری خودکار</p>
                </div>
                <Switch
                  checked={settings.backupEnabled}
                  onCheckedChange={(checked) => handleSettingChange('backupEnabled', checked)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">فرکانس پشتیبان‌گیری</Label>
                  <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange('backupFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">روزانه</SelectItem>
                      <SelectItem value="weekly">هفتگی</SelectItem>
                      <SelectItem value="monthly">ماهانه</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retentionDays">مدت نگهداری (روز)</Label>
                  <Input
                    id="retentionDays"
                    type="number"
                    value={settings.retentionDays}
                    onChange={(e) => handleSettingChange('retentionDays', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                تنظیمات API
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>فعال‌سازی API</Label>
                  <p className="text-sm text-muted-foreground">فعال‌سازی دسترسی API</p>
                </div>
                <Switch
                  checked={settings.apiEnabled}
                  onCheckedChange={(checked) => handleSettingChange('apiEnabled', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rateLimit">محدودیت نرخ (درخواست/ساعت)</Label>
                <Input
                  id="rateLimit"
                  type="number"
                  value={settings.rateLimit}
                  onChange={(e) => handleSettingChange('rateLimit', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="corsOrigins">منابع CORS</Label>
                <Input
                  id="corsOrigins"
                  value={settings.corsOrigins.join(', ')}
                  onChange={(e) => handleSettingChange('corsOrigins', e.target.value.split(', '))}
                  placeholder="http://localhost:3000, https://example.com"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
