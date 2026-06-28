/** Mailchimp audience — same list as the giveaway embed form. */
export const MAILCHIMP_AUDIENCE_ID = "5f1ce5f59b";
export const MAILCHIMP_USER_ID = "775c040759bfcee31ee35b7d5";
export const MAILCHIMP_SERVER_PREFIX = "us20";

export const MAILCHIMP_FORM_ACTION =
  "https://vegasathleticsmlb.us20.list-manage.com/subscribe/post";

function getServerPrefixFromApiKey(apiKey: string): string {
  const suffix = apiKey.split("-").pop();
  return suffix && suffix.length <= 4 ? suffix : MAILCHIMP_SERVER_PREFIX;
}

export type SubscribeResult =
  | { ok: true }
  | { ok: false; error: string };

/** Subscribe via Mailchimp Marketing API when MAILCHIMP_API_KEY is set. */
async function subscribeViaApi(email: string): Promise<SubscribeResult> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "Mailchimp API key is not configured" };
  }

  const server = getServerPrefixFromApiKey(apiKey);
  const auth = Buffer.from(`anystring:${apiKey}`).toString("base64");

  console.log("[mailchimp] Subscribing via Marketing API");

  const response = await fetch(
    `https://${server}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    },
  );

  const data = await response.json().catch(() => ({}));

  if (response.ok) {
    console.log("[mailchimp] Successfully subscribed via API");
    return { ok: true };
  }

  // Already subscribed is a success for the user experience.
  if (data.title === "Member Exists") {
    console.log("[mailchimp] Email already on list");
    return { ok: true };
  }

  console.error(
    "[mailchimp] Marketing API error:",
    response.status,
    data.detail ?? data.title,
  );
  return {
    ok: false,
    error: data.detail ?? data.title ?? "Failed to subscribe",
  };
}

/** Fallback: POST to the same list-manage endpoint as the giveaway embed form. */
async function subscribeViaFormPost(email: string): Promise<SubscribeResult> {
  console.log("[mailchimp] Subscribing via list-manage form post");

  const body = new URLSearchParams({
    EMAIL: email,
    u: MAILCHIMP_USER_ID,
    id: MAILCHIMP_AUDIENCE_ID,
    [`b_${MAILCHIMP_USER_ID}_${MAILCHIMP_AUDIENCE_ID}`]: "",
  });

  const response = await fetch(
    `${MAILCHIMP_FORM_ACTION}?u=${MAILCHIMP_USER_ID}&id=${MAILCHIMP_AUDIENCE_ID}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      redirect: "manual",
    },
  );

  // Mailchimp returns 302 on success for form posts.
  if (response.status === 200 || response.status === 302) {
    console.log("[mailchimp] Successfully subscribed via form post");
    return { ok: true };
  }

  console.error("[mailchimp] Form post failed:", response.status);
  return { ok: false, error: "Failed to subscribe. Please try again." };
}

export async function subscribeToMailchimp(
  email: string,
): Promise<SubscribeResult> {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (process.env.MAILCHIMP_API_KEY) {
    const apiResult = await subscribeViaApi(trimmed);
    if (apiResult.ok) return apiResult;
    console.error("[mailchimp] API failed, trying form post fallback");
  }

  return subscribeViaFormPost(trimmed);
}
