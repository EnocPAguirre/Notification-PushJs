const publicVapidKey = 'BCZ6CwkyUtFgiEVS8K0kRteWz46HTRJ5paq_F7w8iZBXtYnbB68DfRe9768IzPoiMz1jRw74U7xcYRRAYcH88oo';

//Checki para el service worker

if('serviceWorker' in navigator) {
  send().catch(err => console.error(err));
}
//Register the service worker, push, send Push/Notification
async function send() {
  console.log('Registering service worker');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });
  console.log('Service worker registered.......');

  console.log('Registering Push');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)

  });
  console.log('push registered.....');

  console.log('Sending push');
  await fetch('/suscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Push sent');
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
