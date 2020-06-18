import { notify } from 'react-notify-toast'

const popupStyles = { background: '#98FB98', text: '#000' }

export const popupToasty = message => {
  notify.show(message, 'custom', 3000, popupStyles)
}