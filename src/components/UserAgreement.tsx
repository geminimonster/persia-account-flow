import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, FileText } from "lucide-react";

interface UserAgreementProps {
  onAccept: () => void;
}

const UserAgreement = ({ onAccept }: UserAgreementProps) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
    
    if (scrollPercentage >= 0.95) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAccept = () => {
    if (hasScrolledToBottom && hasAccepted) {
      localStorage.setItem('userAgreementAccepted', 'true');
      onAccept();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl mx-auto animate-fade-in">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">
            توافقنامه کاربری سیستم حسابداری
          </CardTitle>
          <p className="text-muted-foreground text-lg">
            لطفاً شرایط و قوانین استفاده را با دقت مطالعه کرده و در صورت موافقت، تأیید نمایید
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <ScrollArea 
            className="h-96 w-full rounded-md border p-6"
            onScrollCapture={handleScroll}
          >
            <div className="space-y-6 text-sm text-foreground leading-relaxed">
              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary">۱. شرایط عمومی استفاده</h3>
                <p className="mb-4">
                  با استفاده از این سیستم حسابداری، شما موافقت می‌کنید که تمام قوانین و مقررات ذکر شده در این توافقنامه را رعایت نمایید. این سیستم برای مدیریت امور مالی و حسابداری کسب و کارها طراحی شده است.
                </p>
                <p>
                  شرکت ارائه‌دهنده خدمات متعهد است که بهترین خدمات را در حوزه نرم‌افزار حسابداری ارائه دهد و کاربران نیز متعهد هستند که از سیستم طبق قوانین استفاده نمایند.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary">۲. حریم خصوصی و امنیت اطلاعات</h3>
                <p className="mb-4">
                  تمام اطلاعات مالی و حسابداری شما با بالاترین استانداردهای امنیتی محافظت می‌شود. ما متعهد هستیم که هیچ‌گونه اطلاعات شخصی یا تجاری شما را بدون اجازه صریح در اختیار اشخاص ثالث قرار ندهیم.
                </p>
                <p className="mb-4">
                  تمام داده‌ها با استفاده از پروتکل‌های رمزنگاری پیشرفته ذخیره و انتقال داده می‌شوند. پشتیبان‌گیری منظم از اطلاعات انجام شده و در صورت بروز مشکل، امکان بازیابی اطلاعات وجود دارد.
                </p>
                <p>
                  شما مسئول حفظ امنیت نام کاربری و رمز عبور خود هستید و باید از افشای این اطلاعات به دیگران جلوگیری کنید.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary">۳. مسئولیت‌های کاربر</h3>
                <p className="mb-4">
                  کاربران متعهد هستند که اطلاعات صحیح و دقیق وارد نمایند و از سیستم صرفاً برای اهداف قانونی استفاده کنند. هرگونه سوء استفاده از سیستم ممنوع است.
                </p>
                <p className="mb-4">
                  کاربران باید از قوانین مالیاتی و حسابداری کشور آگاه باشند و مسئولیت صحت گزارشات مالی ارائه شده بر عهده خودشان است.
                </p>
                <p>
                  در صورت مشاهده هرگونه مشکل یا باگ در سیستم، کاربران موظف هستند موضوع را در اسرع وقت به تیم پشتیبانی اطلاع دهند.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary">۴. محدودیت‌ها و ممنوعیت‌ها</h3>
                <p className="mb-4">
                  استفاده از سیستم برای فعالیت‌های غیرقانونی، تقلب، یا هرگونه عمل مغایر با قوانین کشور اکیداً ممنوع است. در صورت تخلف، حساب کاربری مسدود خواهد شد.
                </p>
                <p className="mb-4">
                  کاربران حق ندارند سیستم را برای اهداف مضر، نشر ویروس، یا حمله سایبری استفاده کنند. همچنین اشتراک‌گذاری اطلاعات ورود با دیگران ممنوع است.
                </p>
                <p>
                  تلاش برای نفوذ غیرمجاز، تغییر کد، یا دستکاری سیستم منجر به پیگرد قانونی خواهد شد.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary">۵. پشتیبانی و خدمات</h3>
                <p className="mb-4">
                  تیم پشتیبانی آماده ارائه راهنمایی و حل مشکلات فنی در ساعات کاری است. پاسخگویی به سوالات از طریق چت آنلاین، ایمیل، و تلفن امکان‌پذیر است.
                </p>
                <p className="mb-4">
                  به‌روزرسانی‌های منظم سیستم برای بهبود عملکرد و افزودن ویژگی‌های جدید انجام می‌شود. کاربران از قبل از تغییرات مهم مطلع خواهند شد.
                </p>
                <p>
                  آموزش‌های لازم برای استفاده بهینه از سیستم به صورت رایگان در اختیار کاربران قرار می‌گیرد.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary">۶. لغو و تغییرات</h3>
                <p className="mb-4">
                  این توافقنامه در هر زمان قابل تغییر است و کاربران از تغییرات مطلع خواهند شد. ادامه استفاده از سیستم به منزله پذیرش تغییرات جدید است.
                </p>
                <p className="mb-4">
                  در صورت عدم موافقت با تغییرات، کاربران می‌توانند حساب خود را لغو کنند. در این صورت، اطلاعات طبق قوانین حریم خصوصی حذف خواهد شد.
                </p>
                <p>
                  شرکت حق دارد در صورت تخلف کاربران، دسترسی آنها را محدود یا قطع کند.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 text-primary">۷. تماس و ارتباط</h3>
                <p className="mb-4">
                  برای هرگونه سوال، پیشنهاد، یا گزارش مشکل، می‌توانید از طریق بخش پشتیبانی سیستم یا ایمیل support@accounting-system.com با ما تماس بگیرید.
                </p>
                <p>
                  تیم ما آماده پاسخگویی به سوالات شما در کوتاه‌ترین زمان ممکن است.
                </p>
              </section>
            </div>
          </ScrollArea>

          <div className="space-y-4">
            {hasScrolledToBottom && (
              <div className="flex items-center space-x-2 animate-fade-in">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-green-600 font-medium">
                  شما تمام متن توافقنامه را مطالعه کردید
                </span>
              </div>
            )}

            <div className="flex items-center space-x-3">
              <Checkbox
                id="accept-terms"
                checked={hasAccepted}
                onCheckedChange={(checked) => setHasAccepted(!!checked)}
                disabled={!hasScrolledToBottom}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label 
                htmlFor="accept-terms" 
                className={`text-sm font-medium cursor-pointer ${
                  !hasScrolledToBottom ? 'text-muted-foreground' : 'text-foreground'
                }`}
              >
                تمام شرایط و قوانین فوق را مطالعه کرده و با آنها موافق هستم
              </label>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleAccept}
              disabled={!hasScrolledToBottom || !hasAccepted}
              size="lg"
              className="px-8 py-3 font-semibold animate-scale-in"
            >
              تأیید و ادامه
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAgreement;