// src/components/sidebar/user-avatar.tsx
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  src?: string;
  name?: string;
  role?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({
  src = '',
  name = 'Gordon Hampton',
  role = 'Designer',
}) => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar>
        <AvatarImage src={src} alt={name} />
        <AvatarFallback>
          {name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
};

export default UserAvatar;