const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SPREADSHEET_ID = "1UjTOLLKkUBNZ2BngNhdURe1-9Kxwa6W17NjhGZXfIkY";
const RANGE = "Leads!A:E";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GOOGLE_SHEETS_API_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    if (!GOOGLE_SHEETS_API_KEY) throw new Error("GOOGLE_SHEETS_API_KEY not configured");

    const body = await req.json();
    const name = String(body?.name ?? "").trim().slice(0, 80);
    const email = String(body?.email ?? "").trim().slice(0, 160);
    const phone = String(body?.phone ?? "").trim().slice(0, 20);
    const origin = String(body?.origin ?? "popup-lancamento").slice(0, 40);

    if (name.length < 2) return json({ error: "nome inválido" }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "email inválido" }, 400);
    if (phone.replace(/\D/g, "").length < 10) return json({ error: "telefone inválido" }, 400);

    const row = [new Date().toISOString(), name, email, phone, origin];

    const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });
    const data = await resp.json();
    if (!resp.ok) {
      console.error("Sheets append failed", resp.status, data);
      throw new Error(`sheets ${resp.status}`);
    }

    return json({ ok: true, coupon: "FLOW10" });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    console.error("submit-lead error", msg);
    return json({ ok: false, error: msg }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}