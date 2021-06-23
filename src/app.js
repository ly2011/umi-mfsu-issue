// export function render (oldRender) {
//   oldRender()
// }
import request from 'utils/request'

window.axios = request
export const dva = {
  config: {
    onError (err) {
      err.preventDefault()
      console.error(err.message)
    }
  }
}
