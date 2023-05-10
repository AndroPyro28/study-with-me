import { api } from '~/utils/api';
import { useRouter} from 'next/router'

const useReverseAuth = () => {
    const router = useRouter();
    const {data, isError, isLoading} = api.auth.getMe.useQuery(undefined, {
        
        retry: (_count, err) => {
          // `onError` only runs once React Query stops retrying
          if (err.data?.code === "UNAUTHORIZED") {
            return false;
          }
          return true;
        },
        onSuccess: (data) => {
            void router.replace('/calendar')
        },
    })

    return {data, isError, isLoading}
}

export default useReverseAuth;