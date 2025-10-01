import { register } from 'register-service-worker'
import { Dialog, Notify } from 'quasar'

register(process.env.SERVICE_WORKER_FILE as string, {
  registrationOptions: { scope: './' },
  ready(registration) {
    console.log('Service worker is active.')
    Notify.create({
      message: 'App is ready for offline use',
      color: 'positive'
    })
  },

  registered(registration) {
    console.log('Service worker has been registered.')
    // Check for updates periodically
    setInterval(() => {
      registration.update()
    }, 1000 * 60 * 60) // Check every hour
  },

  cached(registration) {
    console.log('Content has been cached for offline use.')
    Notify.create({
      message: 'Content has been cached for offline use',
      color: 'info'
    })
  },

  updatefound(registration) {
    console.log('New content is downloading.')
    Notify.create({
      message: 'New content is downloading...',
      color: 'info'
    })
  },

  updated(registration) {
    console.log('New content is available; please refresh.')
    Dialog.create({
      title: 'Update Available',
      message: 'New content is available. Would you like to refresh now?',
      cancel: true,
      persistent: true,
      ok: {
        label: 'Refresh',
        color: 'primary'
      }
    }).onOk(() => {
      window.location.reload()
    })
  },

  offline() {
    console.log('No internet connection found. App is running in offline mode.')
    Notify.create({
      message: 'App is running in offline mode',
      color: 'warning'
    })
  },

  error(error) {
    console.error('Error during service worker registration:', error)
    Notify.create({
      message: 'Error during service worker registration',
      color: 'negative'
    })
  }
})