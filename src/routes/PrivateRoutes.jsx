
import useAuth from '../hooks/useAuth';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation();

    if(loading) return <h2>Loading....</h2>
    if(user?.email) return children
    return <Navigate to='/login' state={{from:location}} replace='true' />
};

PrivateRoutes.propTypes = {
    children: PropTypes.object
}


export default PrivateRoutes;