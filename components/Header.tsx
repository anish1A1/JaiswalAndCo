import { cookies } from "next/headers";
import HeaderClient from "./HeaderClient";

export default async function Header() {

  const cookieStore = await cookies()
  const hasUser = Boolean(cookieStore.get('session')?.value)

  return <HeaderClient hasUser={hasUser} />
}
