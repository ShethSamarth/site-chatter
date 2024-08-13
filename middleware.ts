import { NextRequest, NextResponse } from "next/server"

export const middleware = (req: NextRequest) => {
  const res = NextResponse.next()

  const cookie = req.cookies.get("aw-session-id")

  if (!cookie) {
    res.cookies.set("aw-session-id", crypto.randomUUID())
  }

  return res
}
