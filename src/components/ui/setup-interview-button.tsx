import { Button, type ButtonProps } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props extends Omit<ButtonProps, 'onClick'> {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
  state?: Record<string, unknown>;
}

export function SetupInterviewButton({ variant = 'default', size = 'default', className, state, ...props }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/interviews/new', state ? { state } : undefined);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn(
        "bg-[#ACBAFF] hover:bg-gradient-to-br hover:from-[#7FDCD7] hover:to-[#ACBAFF] text-white transition-all duration-300",
        className
      )}
      {...props}
    >
      <Plus className="h-4 w-4 mr-2" />
      Set up Interview
    </Button>
  );
} 