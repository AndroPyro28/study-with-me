import { api } from '~/utils/api';
import Cookies from 'js-cookie';
import { useRouter} from 'next/router'
import { useEffect } from 'react';
import { setLoader } from '~/app/features/loaderSlice';
import { useDispatch } from 'react-redux';

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
            void router.push("/");
          }
        }
    })

    return data
}

export default useAuth;