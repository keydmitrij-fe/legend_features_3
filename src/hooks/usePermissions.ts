import { useAppSelector } from '../store';

const usePermissions = () => {
  const profile = useAppSelector((state) => state.auth.profile);

  if (!profile) return;

  return !!(
    profile.roles.includes('ADMIN') || profile.roles.includes('MODERATOR')
  );
};

export default usePermissions;
