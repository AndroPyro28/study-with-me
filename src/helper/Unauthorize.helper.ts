import { toast } from "react-toastify"

export const UnAuthorizeError = (error: any) => {
    if(error.data?.code === 'UNAUTHORIZED') {
        toast('Unauthorized', {type: 'error'})
        setTimeout(() => {
            window.location.replace('/')
        }, 1500)
    } else {
        toast('Something went wrong', {type: 'error'})
    }
  }