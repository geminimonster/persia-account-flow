import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Mail, MessageCircle, HelpCircle, Ticket, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

// Schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد").max(50),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  subject: z.string().min(5, "موضوع باید حداقل ۵ کاراکتر باشد"),
  message: z.string().min(10, "پیام باید حداقل ۱۰ کاراکتر باشد"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Schema for ticket form (similar to contact)
const ticketSchema = z.object({
  title: z.string().min(5, "عنوان باید حداقل ۵ کاراکتر باشد"),
  description: z.string().min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
  priority: z.enum(["low", "medium", "high"], { required_error: "اولویت را انتخاب کنید" }),
});

type TicketFormData = z.infer<typeof ticketSchema>;

// Mock FAQs
const faqs = [
  {
    question: "چگونه حساب جدید اضافه کنم؟",
    answer: "برای اضافه کردن حساب جدید، به بخش حساب‌ها بروید و دکمه 'اضافه کردن' را بزنید. جزئیات حساب را وارد کنید و ذخیره نمایید."
  },
  {
    question: "چگونه تراکنش ثبت کنم؟",
    answer: "در بخش تراکنش‌ها، نوع تراکنش را انتخاب کنید، مبلغ و توضیحات را وارد نمایید و تأیید کنید."
  },
  {
    question: "گزارش‌های مالی چگونه مشاهده شوند؟",
    answer: "از منوی گزارش‌ها، نوع گزارش مورد نظر را انتخاب کنید و فیلترهای لازم را اعمال نمایید."
  },
  {
    question: "پشتیبانی از زبان‌های مختلف؟",
    answer: "این نرم‌افزار از زبان فارسی و انگلیسی پشتیبانی می‌کند. زبان را از تنظیمات تغییر دهید."
  },
  {
    question: "چگونه پشتیبان‌گیری کنم؟",
    answer: "در تنظیمات سیستم، گزینه پشتیبان‌گیری را انتخاب کنید و فایل را دانلود نمایید."
  },
];

// Mock tickets
const mockTickets = [
  { id: 1, title: "مشکل در ثبت فاکتور", status: "open", priority: "high", date: "۱۴۰۳/۰۵/۱۰" },
  { id: 2, title: "سؤال در مورد گزارش‌ها", status: "closed", priority: "low", date: "۱۴۰۳/۰۵/۰۹" },
  { id: 3, title: "خطا در ورود داده", status: "pending", priority: "medium", date: "۱۴۰۳/۰۵/۰۸" },
];

// Mock chat responses
const botResponses = [
  "سلام! چطور می‌توانم کمک کنم؟",
  "لطفاً جزئیات مشکل را توصیف کنید.",
  "در حال بررسی... ممنون از صبر شما.",
  "مشکل شما حل شد. اگر سؤال دیگری دارید، بپرسید."
];

const SupportPage: React.FC = () => {
  const { toast } = useToast();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ user: string; bot: string }[]>([]);
  const [newTicketOpen, setNewTicketOpen] = useState(false);

  // Contact form
  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onContactSubmit = (data: ContactFormData) => {
    // Mock submission
    toast({
      title: "موفقیت",
      description: "درخواست تماس شما ارسال شد. به زودی با شما تماس خواهیم گرفت.",
    });
    contactForm.reset();
  };

  // Ticket form
  const ticketForm = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: { title: "", description: "", priority: "medium" },
  });

  const onTicketSubmit = (data: TicketFormData) => {
    // Mock submission
    toast({
      title: "موفقیت",
      description: "بلیط جدید ایجاد شد. شماره بلیط: #" + Math.floor(Math.random() * 1000),
    });
    ticketForm.reset();
    setNewTicketOpen(false);
  };

  // Chat functionality
  const sendChatMessage = (message: string) => {
    setChatMessages(prev => [...prev, { user: message, bot: botResponses[Math.floor(Math.random() * botResponses.length)] }]);
  };

  return (
    <div className={cn("min-h-screen bg-background p-4", "dir-rtl")}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6" />
            پشتیبانی و راهنما
          </CardTitle>
          <CardDescription>
            به بخش پشتیبانی خوش آمدید. از تب‌های زیر برای دسترسی به امکانات استفاده کنید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="faq">سؤالات متداول</TabsTrigger>
              <TabsTrigger value="contact">تماس با ما</TabsTrigger>
              <TabsTrigger value="tickets">بلیط‌ها</TabsTrigger>
              <TabsTrigger value="chat">چت زنده</TabsTrigger>
            </TabsList>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="mt-4">
              <div className="space-y-2">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="mt-4">
              <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">نام</Label>
                  <Input id="name" {...contactForm.register("name")} />
                  {contactForm.formState.errors.name && <p className="text-sm text-destructive">{contactForm.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل</Label>
                  <Input id="email" type="email" {...contactForm.register("email")} />
                  {contactForm.formState.errors.email && <p className="text-sm text-destructive">{contactForm.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">موضوع</Label>
                  <Input id="subject" {...contactForm.register("subject")} />
                  {contactForm.formState.errors.subject && <p className="text-sm text-destructive">{contactForm.formState.errors.subject.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">پیام</Label>
                  <Textarea id="message" {...contactForm.register("message")} />
                  {contactForm.formState.errors.message && <p className="text-sm text-destructive">{contactForm.formState.errors.message.message}</p>}
                </div>
                <Button type="submit" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  ارسال
                </Button>
              </form>
            </TabsContent>

            {/* Tickets Tab */}
            <TabsContent value="tickets" className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">بلیط‌های پشتیبانی</h3>
                <Dialog open={newTicketOpen} onOpenChange={setNewTicketOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Ticket className="mr-2 h-4 w-4" />
                      بلیط جدید
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>ایجاد بلیط جدید</DialogTitle>
                      <DialogDescription>جزئیات بلیط را وارد کنید.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={ticketForm.handleSubmit(onTicketSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">عنوان</Label>
                        <Input id="title" {...ticketForm.register("title")} />
                        {ticketForm.formState.errors.title && <p className="text-sm text-destructive">{ticketForm.formState.errors.title.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">توضیحات</Label>
                        <Textarea id="description" {...ticketForm.register("description")} />
                        {ticketForm.formState.errors.description && <p className="text-sm text-destructive">{ticketForm.formState.errors.description.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">اولویت</Label>
                        <select id="priority" {...ticketForm.register("priority")} className="w-full p-2 border rounded">
                          <option value="low">پایین</option>
                          <option value="medium">متوسط</option>
                          <option value="high">بالا</option>
                        </select>
                        {ticketForm.formState.errors.priority && <p className="text-sm text-destructive">{ticketForm.formState.errors.priority.message}</p>}
                      </div>
                      <DialogFooter>
                        <Button type="submit">ایجاد</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>شماره</TableHead>
                    <TableHead>عنوان</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>اولویت</TableHead>
                    <TableHead>تاریخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>#{ticket.id}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>
                        <Badge variant={ticket.status === "open" ? "default" : ticket.status === "pending" ? "secondary" : "outline"}>
                          {ticket.status === "open" ? "باز" : ticket.status === "pending" ? "در حال بررسی" : "بسته"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{ticket.priority === "high" ? "بالا" : ticket.priority === "medium" ? "متوسط" : "پایین"}</Badge>
                      </TableCell>
                      <TableCell>{ticket.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat" className="mt-4">
              <div className="text-center">
                <Button onClick={() => setChatOpen(true)} className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  شروع چت زنده
                </Button>
              </div>
              <Dialog open={chatOpen} onOpenChange={setChatOpen}>
                <DialogContent className="max-w-md h-[500px] flex flex-col">
                  <DialogHeader>
                    <DialogTitle>چت زنده</DialogTitle>
                    <DialogDescription>با تیم پشتیبانی چت کنید.</DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-muted rounded">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-right"><strong>شما:</strong> {msg.user}</div>
                        <div className="text-left"><strong>ربات:</strong> {msg.bot}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="پیام خود را بنویسید..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const input = e.target as HTMLInputElement;
                            sendChatMessage(input.value);
                            input.value = "";
                          }
                        }}
                      />
                      <Button size="sm" onClick={() => setChatOpen(false)}>
                        بستن
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>برای تماس اضافی: ایمیل support@accounting.com | تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
      </div>
    </div>
  );
};

export default SupportPage;
