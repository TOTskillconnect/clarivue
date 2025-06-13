// @ts-ignore
// import 'antd/dist/reset.css'; // Remove this import that's causing build issues
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Statistic,
  List,
  Tabs,
  Badge,
  Button,
  Typography,
  Space,
  theme,
  Row,
  Col,
  Avatar,
  Input,
  Progress
} from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  MessageOutlined,
  RightOutlined,
  SettingOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { format, parseISO, isToday } from 'date-fns';
import { type Interview } from '@/types/interview';
import {
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';

// Define interfaces for our data types
interface Scorecard {
  id: string;
  candidate: string;
  date: string;
  score: number;
}

interface Conversation {
  id: string;
  title: string;
}

// Safe date formatting function
const formatDateString = (date: string | Date | undefined): string => {
  if (!date) return 'No date';
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date';
  }
};

// Mock data for testing
const mockInterviews: Interview[] = [
  {
    id: '1',
    title: 'Frontend Developer Interview',
    status: 'scheduled',
    candidateName: 'John Doe',
    candidateEmail: 'john@example.com',
    scheduledFor: new Date('2024-03-15T10:00:00Z').toISOString(),
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    scorecardId: 'scorecard-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Backend Developer Interview',
    status: 'pending',
    candidateName: 'Jane Smith',
    candidateEmail: 'jane@example.com',
    scorecardId: 'scorecard-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockScorecards: Scorecard[] = [
  {
    id: 'sc1',
    candidate: 'John Doe',
    score: 87,
    date: '2024-03-15T10:00:00Z',
  },
  {
    id: 'sc2',
    candidate: 'Jane Smith',
    score: 92,
    date: '2024-03-14T14:00:00Z',
  },
];

const mockConversations: Conversation[] = [
  { id: 'c1', title: 'Frontend Interview with John' },
  { id: 'c2', title: 'Backend Interview with Jane' },
  { id: 'c3', title: 'General Feedback' },
];

// Generate sparkline data
const generateSparklineData = (count: number, maxValue: number) => {
  return Array.from({ length: count }, (_, index) => ({
    value: Math.floor(Math.random() * maxValue) + 1,
    index
  }));
};

// Sparkline component
const SparklineChart = ({ data }: { data: Array<{ value: number; index: number }> }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <Line 
        type="monotone" 
        dataKey="value" 
        stroke="#1076D1" 
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
);

// Styles for consistent card and list appearance
const styles = {
  card: {
    borderRadius: 12,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    transition: 'box-shadow 0.2s ease',
    ':hover': {
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }
  },
  listItem: {
    padding: 12,
    borderRadius: 8,
    border: '1px solid #E2E8F0',
    transition: 'all 0.2s ease',
    marginBottom: 8
  }
};

// Custom CSS for tabs and list items
const customStyles = `
  .dashboard-home .ant-tabs-nav::before {
    border-bottom: none;
  }
  .dashboard-home .ant-tabs-ink-bar {
    height: 4px;
    border-radius: 4px;
  }
  .dashboard-home .ant-list-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .dashboard-home .ant-card:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .dashboard-home .ant-progress-circle .ant-progress-text {
    font-weight: 600;
    font-size: 20px;
  }
`;

// Add custom styles to document
const styleSheet = document.createElement('style');
styleSheet.innerText = customStyles;
document.head.appendChild(styleSheet);

export function DashboardHome() {
  const navigate = useNavigate();
  const [upcomingInterviews, setUpcomingInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = theme.useToken();

  useEffect(() => {
    const loadUpcomingInterviews = async () => {
      try {
        setIsLoading(true);
        // Using mock data instead of API call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        setUpcomingInterviews(mockInterviews);
      } catch (error) {
        console.error('Failed to load interviews:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUpcomingInterviews();
  }, []);

  // Metrics
  const interviewsToday = upcomingInterviews.filter(i => i.scheduledFor && typeof i.scheduledFor === 'string' && isToday(parseISO(i.scheduledFor))).length;
  const averageScore = mockScorecards.length ? Math.round(mockScorecards.reduce((acc, s) => acc + s.score, 0) / mockScorecards.length) : 0;

  return (
    <div className="dashboard-home">
      {/* Greeting Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        padding: '0 0 24px 0',
        borderBottom: '1px solid #E2E8F0'
      }}>
        <div>
          <Typography.Title level={2} style={{ margin: 0, color: '#1F2937' }}>
            Good morning, Tobi! 👋
          </Typography.Title>
          <Typography.Text style={{ color: '#6B7280', fontSize: '16px' }}>
            Ready to conduct some great interviews today?
          </Typography.Text>
        </div>
        <Button 
          type="primary" 
          size="large"
          style={{
            height: '48px',
            padding: '0 24px',
            borderRadius: '8px',
            fontWeight: '600'
          }}
        >
          Setup Interview
        </Button>
      </div>

      {/* Metrics Grid */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card bordered={false} style={styles.card}>
            <Statistic
              title={<Typography.Text strong>Upcoming Interviews</Typography.Text>}
              value={upcomingInterviews.length}
              valueStyle={{ fontSize: 36, fontWeight: 'bold', color: token.colorPrimary }}
            />
            <div style={{ height: 50, marginTop: 16 }}>
              <SparklineChart data={generateSparklineData(10, 5)} />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card bordered={false} style={styles.card}>
            <Statistic
              title={<Typography.Text strong>Interviews Today</Typography.Text>}
              value={interviewsToday}
              valueStyle={{ fontSize: 36, fontWeight: 'bold', color: token.colorPrimary }}
            />
            <div style={{ height: 50, marginTop: 16 }}>
              <SparklineChart data={generateSparklineData(10, 3)} />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card bordered={false} style={styles.card}>
            <Progress
              type="circle"
              percent={averageScore}
              strokeColor={token.colorPrimary}
              strokeWidth={8}
              width={80}
            />
            <div style={{ marginTop: 16 }}>
              <Typography.Text strong>Average Score</Typography.Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Content Grid */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Typography.Title level={5} style={{ margin: 0 }}>
                Upcoming Interviews ({upcomingInterviews.length})
              </Typography.Title>
            }
            bordered={false}
            style={styles.card}
            bodyStyle={{ padding: '16px' }}
          >
            <List
              loading={isLoading}
              dataSource={upcomingInterviews}
              renderItem={interview => (
                <List.Item style={styles.listItem}>
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        size="large" 
                        style={{ 
                          backgroundColor: token.colorPrimaryBg,
                          color: token.colorPrimary
                        }}
                      >
                        {interview.candidateName[0]}
                      </Avatar>
                    }
                    title={<Typography.Text strong>{interview.candidateName}</Typography.Text>}
                    description={formatDateString(interview.scheduledFor)}
                  />
                  <Space size="middle">
                    <Badge
                      style={{
                        padding: '4px 12px',
                        borderRadius: 16,
                        backgroundColor: interview.status === 'scheduled' 
                          ? token.colorSuccessBg
                          : token.colorWarningBg,
                        color: interview.status === 'scheduled'
                          ? token.colorSuccess
                          : token.colorWarning
                      }}
                      text={interview.status}
                    />
                    <Button
                      type="text"
                      icon={<RightOutlined />}
                      onClick={() => navigate(`/dashboard/interviews/${interview.id}`)}
                    />
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Typography.Title level={5} style={{ margin: 0 }}>
                Recent Scorecards ({mockScorecards.length})
              </Typography.Title>
            }
            bordered={false}
            style={styles.card}
            bodyStyle={{ padding: '16px' }}
          >
            <List
              dataSource={mockScorecards}
              renderItem={scorecard => (
                <List.Item style={styles.listItem}>
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        size="large"
                        style={{ 
                          backgroundColor: token.colorPrimaryBg,
                          color: token.colorPrimary
                        }}
                      >
                        {scorecard.candidate[0]}
                      </Avatar>
                    }
                    title={<Typography.Text strong>{scorecard.candidate}</Typography.Text>}
                    description={formatDateString(scorecard.date)}
                  />
                  <Badge
                    style={{
                      padding: '4px 12px',
                      borderRadius: 16,
                      backgroundColor: token.colorSuccessBg,
                      color: token.colorSuccess
                    }}
                    text={`Score: ${scorecard.score}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Conversations Section */}
      <Card
        bordered={false}
        style={{ ...styles.card, marginTop: 16 }}
        bodyStyle={{ padding: '16px' }}
      >
        <Tabs
          defaultActiveKey="mine"
          size="large"
          tabBarGutter={24}
          items={[
            { 
              key: 'mine', 
              label: 'Mine',
              children: (
                <>
                  <Space direction="vertical" style={{ width: '100%', marginBottom: 24 }}>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      Invite Clarivue to your calls
                    </Typography.Title>
                    <Input
                      value="notes@clarivue.ai"
                      readOnly
                      suffix={<CopyOutlined style={{ cursor: 'pointer' }} />}
                      style={{ maxWidth: 300 }}
                    />
                  </Space>
                  <List
                    dataSource={mockConversations}
                    renderItem={conv => (
                      <List.Item style={styles.listItem}>
                        <Typography.Text strong>{conv.title}</Typography.Text>
                        <RightOutlined />
                      </List.Item>
                    )}
                  />
                </>
              )
            },
            { 
              key: 'shared', 
              label: 'Shared',
              children: (
                <List
                  dataSource={mockConversations.filter(c => c.title.includes('Interview'))}
                  renderItem={conv => (
                    <List.Item style={styles.listItem}>
                      <Typography.Text strong>{conv.title}</Typography.Text>
                      <RightOutlined />
                    </List.Item>
                  )}
                />
              )
            },
            { 
              key: 'all', 
              label: 'All',
              children: (
                <List
                  dataSource={mockConversations}
                  renderItem={conv => (
                    <List.Item style={styles.listItem}>
                      <Typography.Text strong>{conv.title}</Typography.Text>
                      <RightOutlined />
                    </List.Item>
                  )}
                />
              )
            }
          ]}
        />
      </Card>
    </div>
  );
} 