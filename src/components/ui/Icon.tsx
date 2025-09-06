import { Icons, IconName } from '../icons';
import { cn } from '@/lib/utils';

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

export function Icon({ name, className, size = 16 }: IconProps) {
  const IconComponent = Icons[name];
  
  return (
    <IconComponent 
      size={size} 
      className={cn("inline-block", className)} 
    />
  );
}