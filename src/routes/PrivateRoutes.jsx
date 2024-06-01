
import useAuth from '../hooks/useAuth';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Shared/Loader';

const PrivateRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation();

    if(loading) return <Loader></Loader>
    if(user?.email) return children
    return <Navigate to='/login' state={{from:location}} replace='true' />
};

PrivateRoutes.propTypes = {
    children: PropTypes.object
}


export default PrivateRoutes;