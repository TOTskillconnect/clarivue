import React from 'react';
import { Button, Typography, Input, Select, Space, Divider } from 'antd';
import { CopyOutlined, ArrowRightOutlined, GoogleOutlined, CalendarOutlined, PhoneOutlined } from '@ant-design/icons';
import { MicrosoftIcon } from './icons/MicrosoftIcon';

const { Text, Title } = Typography;

interface SetupSidebarProps {
  onClose?: () => void;
}

export function SetupSidebar({ onClose }: SetupSidebarProps) {
  const [meetingLink, setMeetingLink] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div style={{ 
      width: 320,
      height: '100vh',
      borderLeft: '1px solid #f0f0f0',
      backgroundColor: '#ffffff',
      padding: '24px',
      overflowY: 'auto'
    }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Invite Clarivue Section */}
        <div>
          <Title level={5} style={{ marginBottom: 16, fontWeight: 500 }}>
            Invite Clarivue to capture conversations
          </Title>
          <div style={{ 
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
            padding: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Text style={{ color: '#595959' }}>notes@clarivue.ai</Text>
            <Button 
              type="text" 
              icon={<CopyOutlined />}
              onClick={() => copyToClipboard('notes@clarivue.ai')}
            />
          </div>
        </div>

        {/* Join Call Section */}
        <div>
          <Title level={5} style={{ marginBottom: 16, fontWeight: 500 }}>
            Join an ongoing call
          </Title>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              placeholder="Paste link to a meeting in progress..."
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              style={{ borderRadius: '8px 0 0 8px' }}
            />
            <Button 
              type="primary"
              icon={<ArrowRightOutlined />}
              style={{ borderRadius: '0 8px 8px 0' }}
              onClick={() => window.open(meetingLink, '_blank')}
            />
          </Space.Compact>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 8 }}>
            Supports Google Meet, Zoom, and Microsoft Teams links
          </Text>
        </div>

        <Divider style={{ margin: '12px 0' }} />

        {/* Setup Account Section */}
        <div>
          <Title level={5} style={{ marginBottom: 16, fontWeight: 500 }}>
            Finish setting up your account
          </Title>
          
          {/* Calendar Connection */}
          <div style={{ marginBottom: 24 }}>
            <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              <CalendarOutlined style={{ marginRight: 8 }} />
              Connect your calendar
            </Text>
            <Text type="secondary" style={{ display: 'block', marginBottom: 12, fontSize: 13 }}>
              Connect your Google or Microsoft calendar
            </Text>
            <Space direction="vertical" style={{ width: '100%' }} size={8}>
              <Button 
                icon={<GoogleOutlined style={{ fontSize: 16 }} />} 
                block 
                style={{ textAlign: 'left', height: 36 }}
              >
                Continue with Google
              </Button>
              <Button 
                icon={<MicrosoftIcon />} 
                block 
                style={{ textAlign: 'left', height: 36 }}
              >
                Continue with Microsoft
              </Button>
              <Text type="secondary" style={{ fontSize: 12, cursor: 'pointer' }}>
                I don't use a calendar (remove this step)
              </Text>
            </Space>
          </div>

          {/* Phone Connection */}
          <div style={{ marginBottom: 24 }}>
            <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              <PhoneOutlined style={{ marginRight: 8 }} />
              Connect your phone number
            </Text>
            <Text type="secondary" style={{ display: 'block', marginBottom: 12, fontSize: 13 }}>
              We'll help you use Clarivue for phone-based interviews
            </Text>
            <Space.Compact style={{ width: '100%' }}>
              <Select
                defaultValue="+1"
                style={{ width: 80 }}
                options={[
                  { value: '+1', label: '+1' },
                  { value: '+44', label: '+44' },
                  { value: '+81', label: '+81' },
                ]}
              />
              <Input
                placeholder="(555) 555-0123"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{ width: 'calc(100% - 80px)' }}
              />
            </Space.Compact>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 8, cursor: 'pointer' }}>
              I don't call candidates over the phone
            </Text>
          </div>

          {/* Calendly Integration */}
          <div>
            <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              <CalendarOutlined style={{ marginRight: 8 }} />
              Enable Calendly integration
            </Text>
            <Text type="secondary" style={{ display: 'block', marginBottom: 12, fontSize: 13 }}>
              Allow Clarivue to see and customize which events Clarivue joins
            </Text>
            <Button block style={{ textAlign: 'left', height: 36 }}>
              Connect Calendly
            </Button>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 8, cursor: 'pointer' }}>
              I don't have a Calendly account
            </Text>
          </div>
        </div>
      </Space>
    </div>
  );
} 