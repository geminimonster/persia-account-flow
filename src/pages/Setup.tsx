const handleFinish = async () => {
  const res = await fetch("http://localhost:5000/api/setup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    toast.success("تنظیمات ذخیره شد ✅");
    navigate("/login");
  } else {
    toast.error("خطا در ذخیره‌سازی");
  }
};
