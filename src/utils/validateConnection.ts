import { DBConfig } from "../services/db"

export function validateConnectionInput(config: DBConfig): string[] {
  const errors: string[] = []

  // اعتبارسنجی IP
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})){3}$/
  if (!ipRegex.test(config.ip)) {
    errors.push("آی‌پی وارد شده معتبر نیست")
  }

  // اعتبارسنجی پورت
  const portNum = parseInt(config.port)
  if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
    errors.push("پورت باید عددی بین 1 تا 65535 باشد")
  }

  // اعتبارسنجی مسیر فایل
  if (config.path && config.path.length < 3) {
    errors.push("مسیر فایل باید حداقل ۳ کاراکتر باشد")
  }

  // اعتبارسنجی نوع دیتابیس
  if (!["sql", "mongo"].includes(config.engine)) {
    errors.push("نوع دیتابیس باید SQL یا MongoDB باشد")
  }

  return errors
}
