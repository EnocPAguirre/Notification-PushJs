console.log('Service worker Loaded');

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('push received..');

  self.registration.showNotification(data.title, {
    body: 'Notificación enviada por Enoc Pineda',
    icon: 'http://ingenieria.aragon.unam.mx/ico/images/default/fes_ar.png'
  });
});
