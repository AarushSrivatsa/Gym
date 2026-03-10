const API_BASE = "http://127.0.0.1:8000/api/v1/authentication";

async function request(path, body) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Something went wrong");
  return data;
}

export const sendOTP       = (email, password)           => request("/signup/send-otp", { email, password });
export const verifyOTP     = (email, otp)                => request(`/signup/verify-otp/${encodeURIComponent(email)}`, { otp });
export const login         = (email, password)           => request("/login", { email, password });
export const sendResetOTP  = (email)                     => request("/reset-password/send-otp", { email });
export const resetPassword = (email, otp, new_password)  => request(`/reset-password/${encodeURIComponent(email)}`, { otp, new_password });