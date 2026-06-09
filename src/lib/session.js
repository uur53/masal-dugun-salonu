import { cookies } from "next/headers";

export async function setSession(user) {
  const cookieStore = await cookies();
  cookieStore.set("session", JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 hafta
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { maxAge: 0, path: "/" });
}

export async function getSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get("session")?.value;
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
