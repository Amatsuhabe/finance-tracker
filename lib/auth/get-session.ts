import { headers } from "next/headers"
import { auth } from "../auth"

export default async function getSession(){
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user.id) {
    throw new Error("User is not authenticated")
  }

  return session
}