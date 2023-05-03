import { api } from '~/utils/api';
import Cookies from 'js-cookie';
import { useRouter} from 'next/router'

const useAuth = () => {
    const router = useRouter();
    const {data} = api.auth.getMe.useQuery(undefined, {
        onError() {
            Cookies.remove('userToken')
            router.replace('/')
        }
    })
    return data
}

export default useAuth;