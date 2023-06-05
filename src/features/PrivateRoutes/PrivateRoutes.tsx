import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const PrivateRoutes = () => {
    const email = useAppSelector((state) => state.login.email);
    const location = useLocation();
    return (
        email ? <Outlet /> : <Navigate to="/login" state={{from: location}} replace />
    );
};

export default PrivateRoutes;