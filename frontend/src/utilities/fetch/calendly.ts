// utils/api.js
const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

export async function exchangeCodeForToken(code: any) {
  const response = await fetch(`${backendUrl}/calendly`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  const data = await response.json();
  return data.access_token;
}
