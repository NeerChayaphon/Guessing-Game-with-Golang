import {useNavigate} from 'react-router-dom';
import { useFetchUser } from './useFetchUser'

const useAuthCheck = () => {
  const {isAuthorized, refetch} = useFetchUser()
  const navigate = useNavigate();
  if (!isAuthorized) {
    navigate("/login")
  }
}

export default useAuthCheck