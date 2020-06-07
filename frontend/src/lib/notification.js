import { notify } from 'react-notify-toast'

const popupStyles = { background: '#fbcb46', text: '#000' }

export const popupNotification = message => {
  notify.show(message, 'custom', 3000, popupStyles
  )
}