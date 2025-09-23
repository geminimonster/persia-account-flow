export type DBConfig = {
  ip: string
  port: string
  engine: "sql" | "mongo"
  path?: string
}

export async function testConnection(config: DBConfig): Promise<boolean> {
  try {
    const url =
      config.engine === "mongo"
        ? `mongodb://${config.ip}:${config.port}`
        : `http://${config.ip}:${config.port}/ping`

    const response = await fetch(url, {
      method: "GET",
    })

    return response.ok
  } catch (err) {
    console.error("خطا در اتصال به دیتابیس:", err)
    return false
  }
}
