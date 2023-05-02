import useAuth from '~/hooks/useAuth';
const index = () => {
    const user = useAuth()
    return <>{user?.email}</>
}
// #endregion

export default index;