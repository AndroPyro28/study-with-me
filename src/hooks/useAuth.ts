import { api } from '~/utils/api';
import { useRouter} from 'next/router'

const useAuth = () => {
    const router = useRouter();
    const {data, isError, isLoading} = api.auth.getMe.useQuery(undefined, {
        retry: (_count, err) => {
          // `onError` only runs once React Query stops retrying
          if (err.data?.code === "UNAUTHORIZED") {
            return false;
          }
          return true;
        },
        onError: (err) => {
          if (err.data?.code === "UNAUTHORIZED") {
            void router.push('/');
          }
        }
    })

    return data
}

export default useAuth;