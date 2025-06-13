interface ClarivueLogoProps {
  collapsed: boolean;
  onCollapse: () => void;
}

export function ClarivueLogo({ collapsed, onCollapse }: ClarivueLogoProps) {
  return (
    <div style={{ 
      padding: '16px', 
      textAlign: collapsed ? 'center' : 'left',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'flex-start'
    }}>
      <img 
        src={collapsed ? '/clarivue-icon-new.png' : '/clarivue-logo-new.png'} 
        alt="Clarivue" 
        style={{ 
          height: collapsed ? '32px' : '80px',
          width: collapsed ? '32px' : '200px',
          objectFit: 'contain',
          display: 'block',
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }} 
        onClick={onCollapse}
      />
    </div>
  );
} 