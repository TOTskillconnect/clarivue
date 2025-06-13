import React, { CSSProperties } from 'react';
import { Layout, Menu, theme, Button, Typography } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SetupSidebar } from '../components/SetupSidebar';
import { ClarivueLogo } from '../components/ClarivueLogo';
import {
  HomeOutlined,
  TeamOutlined,
  SettingOutlined,
  FileTextOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import '@/styles/app.css';

const { Sider, Content } = Layout;

// Custom styles for the layout components
const layoutStyles: Record<string, CSSProperties> = {
  sider: {
    backgroundColor: '#fff',
    borderRight: '1px solid #E2E8F0',
    boxShadow: '1px 0 4px rgba(0,0,0,0.02)',
    zIndex: 2
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    padding: '0 24px',
    background: '#fff',
    borderBottom: '1px solid #E2E8F0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
  },
  content: {
    background: '#F7FAFC',
    minHeight: '100vh',
    padding: '24px',
    overflow: 'auto'
  }
};

// Custom styles for menu items and hover effects
const customStyles = `
  .dashboard-layout .ant-menu-item-selected {
    border-left: 4px solid #1076D1;
    padding-left: calc(24px - 4px) !important;
    background-color: #F5F8FF !important;
  }
  .dashboard-layout .ant-menu-item:not(.ant-menu-item-selected):hover {
    background-color: #F7FAFC !important;
    color: #1076D1;
  }
  .dashboard-layout .ant-menu {
    border: none;
    background-color: transparent;
  }
  .dashboard-layout .ant-menu-item {
    margin: 4px 0;
    border-radius: 0 8px 8px 0;
    transition: all 0.2s ease;
  }
  .dashboard-layout .sidebar-menu-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 80px);
  }
  .dashboard-layout .main-menu {
    flex: 1;
  }
  .dashboard-layout .bottom-menu {
    margin-top: auto;
    border-top: 1px solid #E2E8F0;
    padding-top: 8px;
  }
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.innerText = customStyles;
document.head.appendChild(styleSheet);

export function DashboardLayout() {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mock user state - replace with actual state management
  const user = {
    onboardingComplete: false,
    name: 'Tobi Towoju',
    email: 'tobi@getmatchbox.org',
    avatar: '/avatars/default.png'
  };

  const mainMenuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: 'scorecards',
      icon: <FileTextOutlined />,
      label: 'Scorecards',
    },
    {
      key: 'reports',
      icon: <BarChartOutlined />,
      label: 'Reports',
    },
    {
      key: 'team',
      icon: <TeamOutlined />,
      label: 'Team',
    },
  ];

  const bottomMenuItems = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  // Handle menu item clicks
  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'home':
        navigate('/dashboard');
        break;
      case 'scorecards':
        navigate('/dashboard/scorecards');
        break;
      case 'reports':
        navigate('/dashboard/reports');
        break;
      case 'team':
        navigate('/dashboard/team');
        break;
      case 'settings':
        navigate('/dashboard/settings');
        break;
      default:
        break;
    }
  };

  // Get the current active menu item based on the path
  const getSelectedKey = () => {
    const path = location.pathname.split('/')[2] || 'home';
    return [path];
  };

  return (
    <Layout className="dashboard-layout" style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={layoutStyles.sider}
        width={280}
        collapsedWidth={80}
      >
        <ClarivueLogo collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} />
        <div className="sidebar-menu-container" style={{ padding: '8px' }}>
          <Menu
            className="main-menu"
            mode="inline"
            selectedKeys={getSelectedKey()}
            items={mainMenuItems}
            inlineCollapsed={collapsed}
            onSelect={({ key }) => {
              handleMenuClick(key);
            }}
          />
          <Menu
            className="bottom-menu"
            mode="inline"
            selectedKeys={getSelectedKey()}
            items={bottomMenuItems}
            inlineCollapsed={collapsed}
            onSelect={({ key }) => {
              handleMenuClick(key);
            }}
          />
        </div>
      </Sider>
      
      <Layout>
        <Content style={layoutStyles.content}>
          <Outlet />
        </Content>
      </Layout>

      {/* Right Setup Sidebar */}
      {!user.onboardingComplete && <SetupSidebar />}
    </Layout>
  );
} 