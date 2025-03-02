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
  name = 'Your Name',
  role = 'Designer',
}) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Avatar className="w-24 h-24">
        <AvatarImage src={src} alt={name} />
        <AvatarFallback className="text-lg font-bold">
          {name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div className="text-center">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
};

export default UserAvatar;
