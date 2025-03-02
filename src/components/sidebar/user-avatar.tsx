import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  src?: string;
  name?: string;
  role?: string;
  condensed?: boolean;
}

const UserAvatar: FC<UserAvatarProps> = ({
  src = '',
  name = 'Gordon Hampton',
  role = 'Designer',
  condensed = false,
}) => {
  return (
    <div className={`flex ${condensed ? 'flex-col items-center' : 'items-center space-x-3'}`}>
      <Avatar className={condensed ? 'w-10 h-10' : 'w-16 h-16'}>
        <AvatarImage src={src} alt={name} />
        <AvatarFallback>
          {name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      {!condensed && (
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
