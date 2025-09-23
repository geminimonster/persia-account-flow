import { SetupData } from "../pages/Setup"

const CONFIG_KEY = "persia_config"

export function saveConfigLocally(data: SetupData) {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(data))
    console.log("تنظیمات با موفقیت ذخیره شد ✅")
  } catch (err) {
    console.error("خطا در ذخیره‌سازی تنظیمات:", err)
  }
}

export function loadConfig(): SetupData | null {
  try {
    const raw = localStorage.getItem(CONFIG_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (err) {
    console.error("خطا در خواندن تنظیمات:", err)
    return null
  }
}

export async function sendConfigToServer(data: SetupData) {
  try {
    const response = await fetch("https://your-server.com/api/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error("خطا در ارسال تنظیمات به سرور")
    console.log("تنظیمات به سرور ارسال شد ✅")
  } catch (err) {
    console.error("ارسال تنظیمات به سرور ناموفق بود:", err)
  }
}
