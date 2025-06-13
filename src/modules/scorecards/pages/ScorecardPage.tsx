import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { format, parseISO } from 'date-fns';
import {
  Layout,
  Row,
  Col,
  Card,
  Statistic,
  Progress,
  Table,
  Form,
  Input,
  InputNumber,
  Badge,
  Button,
  Space,
  Typography,
  Avatar,
  theme,
  message
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  ShareAltOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { clarivueColors } from '@/theme';
import { scorecardStorage, type Scorecard as StorageScorecard } from '@/lib/storage/scorecard';
import { type Metric } from '@/types/interview';
import { MetricsGridEditor, type EditorMetric } from '../components/MetricsGridEditor';

// Extend the base Metric type to include score
interface ScorecardMetric extends Metric {
  score: number;
}

interface ScorecardData extends StorageScorecard {
  notes: string;
  metrics: ScorecardMetric[];
}

// Helper function to convert Metric to ScorecardMetric
const toScorecardMetric = (metric: Metric, score = 0): ScorecardMetric => ({
  ...metric,
  score
});

// Helper function to convert ScorecardMetric to storage Metric
const toStorageMetric = ({ score, ...metric }: ScorecardMetric): Metric => metric;

// Helper functions to convert between metric types
const toEditorMetric = (metric: ScorecardMetric): EditorMetric => ({
  id: metric.id,
  name: metric.name,
  description: metric.description,
  weight: metric.weight,
  score: metric.score
});

const fromEditorMetric = (metric: EditorMetric): ScorecardMetric => ({
  id: metric.id,
  name: metric.name,
  description: metric.description,
  weight: metric.weight,
  score: metric.score
});

// Placeholder scorecards
const placeholderScorecards: Record<string, Omit<ScorecardData, 'id' | 'updatedAt'>> = {
  'technical-interview': {
    title: 'Technical Interview',
    createdAt: new Date().toISOString(),
    notes: `
This scorecard is designed to evaluate software engineering candidates across key technical dimensions.
Focus areas include:
- Depth of technical knowledge in relevant technologies
- Problem-solving approach and analytical thinking
- Code quality and best practices
- System design and architecture understanding
- Technical communication and documentation
    `.trim(),
    metrics: [
      {
        id: uuidv4(),
        name: 'Technical Knowledge',
        description: `
- Understanding of programming languages, frameworks, and tools
- Knowledge of software development principles and patterns
- Familiarity with testing methodologies
- Database and data structure knowledge
- Understanding of version control and CI/CD
        `.trim(),
        weight: 25,
        score: 0
      },
      {
        id: uuidv4(),
        name: 'Problem Solving',
        description: `
- Ability to break down complex problems
- Analytical thinking and algorithmic approach
- Consideration of edge cases and error handling
- Time and space complexity optimization
- Creative solutions and alternative approaches
        `.trim(),
        weight: 25,
        score: 0
      },
      {
        id: uuidv4(),
        name: 'Code Quality',
        description: `
- Clean, readable, and maintainable code
- Proper naming and code organization
- Use of design patterns and SOLID principles
- Code reusability and modularity
- Documentation and comments quality
        `.trim(),
        weight: 20,
        score: 0
      },
      {
        id: uuidv4(),
        name: 'System Design',
        description: `
- Understanding of scalable architecture
- Knowledge of distributed systems
- Security considerations
- Performance optimization
- Infrastructure and deployment understanding
        `.trim(),
        weight: 15,
        score: 0
      },
      {
        id: uuidv4(),
        name: 'Technical Communication',
        description: `
- Clear explanation of technical concepts
- Ability to discuss trade-offs
- Documentation skills
- Questions and clarification seeking
- Technical presentation skills
        `.trim(),
        weight: 15,
        score: 0
      }
    ]
  },
  'behavioral': {
    title: 'Behavioral Interview',
    createdAt: new Date().toISOString(),
    notes: `
This scorecard evaluates candidates on key behavioral competencies and soft skills.
Focus areas include:
- Leadership and influence
- Teamwork and collaboration
- Communication and interpersonal skills
- Problem-solving approach
- Cultural alignment and values
    `.trim(),
    metrics: [
      {
        id: uuidv4(),
        name: 'Leadership & Impact',
        description: `
- Past leadership experiences and outcomes
- Ability to influence without authority
- Decision-making process and judgment
- Mentoring and team development
- Taking ownership and initiative
        `.trim(),
        weight: 20,
        score: 0
      },
      {
        id: uuidv4(),
        name: 'Teamwork & Collaboration',
        description: `
- Experience in cross-functional teams
- Conflict resolution skills
- Adaptability and flexibility
- Supporting team members
- Contributing to team success
        `.trim(),
        weight: 20,
        score: 0
      },
      {
        id: uuidv4(),
        name: 'Communication',
        description: `
- Verbal and written communication clarity
- Active listening skills
- Presentation abilities
- Stakeholder management
- Giving and receiving feedback
        `.trim(),
        weight: 20,
        score: 0
      },
      {
        id: uuidv4(),
        name: 'Problem-Solving Approach',
        description: `
- Structured thinking and methodology
- Data-driven decision making
- Innovation and creativity
- Learning from failures
- Continuous improvement mindset
        `.trim(),
        weight: 20,
        score: 0
      },
      {
        id: uuidv4(),
        name: 'Culture & Values',
        description: `
- Alignment with company values
- Growth mindset
- Diversity and inclusion awareness
- Ethics and integrity
- Passion and motivation
        `.trim(),
        weight: 20,
        score: 0
      }
    ]
  },
  'product-manager': {
    title: 'Product Manager Interview',
    createdAt: new Date().toISOString(),
    notes: `
This scorecard evaluates Product Manager candidates across essential PM competencies.
Focus areas include:
- Product strategy and vision
- Technical understanding and feasibility assessment
- User-centric thinking and research
- Analytical and data-driven decision making
- Cross-functional leadership and communication
- Execution and delivery track record
    `.trim(),
    metrics: [
      {
        id: uuidv4(),
        name: 'Product Strategy',
        description: `
- Vision setting and strategic thinking
- Market understanding and competitive analysis
- Business model and monetization strategy
- Product lifecycle management
- Feature prioritization frameworks
        `.trim(),
        weight: 20,
        score: 0
      },
      {
        id: uuidv4(),
        name: 'Technical Acumen',
        description: `
- Understanding of technical architecture
- Ability to work with engineering teams
- Technical feasibility assessment
- Trade-off analysis and decision making
- API and platform thinking
        `.trim(),
        weight: 15,
        score: 0
      },
      {
        id: uuidv4(),
        name: 'User Focus',
        description: `
- User research and customer development
- Problem discovery and validation
- User journey and experience mapping
- User feedback incorporation
- Empathy and user advocacy
        `.trim(),
        weight: 20,
        score: 0
      },
      {
        id: uuidv4(),
        name: 'Data & Analytics',
        description: `
- Metrics definition and KPI tracking
- A/B testing and experimentation
- Data-driven decision making
- Analytics tools proficiency
- Quantitative analysis skills
        `.trim(),
        weight: 15,
        score: 0
      },
      {
        id: uuidv4(),
        name: 'Leadership',
        description: `
- Cross-functional team collaboration
- Stakeholder management
- Communication and presentation skills
- Conflict resolution
- Influence without authority
        `.trim(),
        weight: 15,
        score: 0
      },
      {
        id: uuidv4(),
        name: 'Execution',
        description: `
- Project management and delivery
- Agile/Scrum methodologies
- Resource planning and timeline estimation
- Risk management and mitigation
- Quality and success metrics
        `.trim(),
        weight: 15,
        score: 0
      }
    ]
  }
};

export function ScorecardPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  // State
  const [scorecard, setScorecard] = useState<ScorecardData>({
    id: '',
    title: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes: '',
    metrics: []
  });

  // Load scorecard data
  useEffect(() => {
    if (id) {
      console.log('Loading scorecard with ID:', id);
      // Try to load from localStorage first
      const savedScorecard = scorecardStorage.getById(id);
      console.log('Retrieved scorecard from storage:', savedScorecard);
      
      if (savedScorecard) {
        // Add score property to metrics if not present
        const scorecardWithScores: ScorecardData = {
          ...savedScorecard,
          notes: savedScorecard.description || '',
          metrics: savedScorecard.metrics.map(metric => toScorecardMetric(metric))
        };
        console.log('Scorecard with scores:', scorecardWithScores);
        setScorecard(scorecardWithScores);
      } else if (id in placeholderScorecards) {
        console.log('Loading placeholder scorecard:', id);
        // Load placeholder and save it to localStorage
        const newScorecard = {
          ...placeholderScorecards[id],
          id: uuidv4(), // Generate new ID for the instance
          updatedAt: new Date().toISOString()
        };
        
        try {
          const savedCard = scorecardStorage.save({
            title: newScorecard.title,
            description: newScorecard.notes,
            metrics: newScorecard.metrics.map(toStorageMetric)
          });

          const scorecardWithScores: ScorecardData = {
            ...savedCard,
            notes: savedCard.description || '',
            metrics: savedCard.metrics.map(metric => toScorecardMetric(metric))
          };
          
          setScorecard(scorecardWithScores);
          // Redirect to the new scorecard's URL
          navigate(`/dashboard/scorecards/${savedCard.id}`, { replace: true });
        } catch (error) {
          console.error('Failed to save placeholder scorecard:', error);
          message.error('Failed to load scorecard template');
          navigate('/dashboard/scorecards');
        }
      } else {
        console.log('Scorecard not found for ID:', id);
        message.error('Scorecard not found');
        navigate('/dashboard/scorecards');
      }
    } else {
      // New scorecard
      setScorecard({
        id: uuidv4(),
        title: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notes: '',
        metrics: []
      });
    }
  }, [id]); // Only depend on id, navigate is stable in React Router v6

  // Styles
  const cardStyle = {
    borderRadius: token.borderRadiusLG,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    marginBottom: 24,
    padding: 16,
    backgroundColor: 'white',
    border: `1px solid ${clarivueColors.gray[200]}`
  };

  const statStyle = { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: clarivueColors.primary[500]
  };

  // Computed values
  const avgScore = scorecard.metrics.length 
    ? Math.round(scorecard.metrics.reduce((a, m) => a + m.score, 0) / scorecard.metrics.length)
    : 0;

  const totalWeight = scorecard.metrics.reduce((sum, metric) => sum + metric.weight, 0);

  // Handlers
  const goBack = () => navigate('/dashboard/scorecards');

  const saveScorecard = () => {
    if (!scorecard.title.trim()) {
      message.error('Please enter a scorecard title');
      return;
    }

    if (totalWeight !== 100) {
      message.error('Total weight must equal 100%');
      return;
    }

    try {
      const storageData = {
        title: scorecard.title,
        description: scorecard.notes,
        metrics: scorecard.metrics.map(toStorageMetric)
      };

      if (scorecard.id) {
        // Update existing scorecard
        const updatedCard = scorecardStorage.update(scorecard.id, storageData);
        const updatedScorecard: ScorecardData = {
          ...updatedCard,
          notes: updatedCard.description || '',
          metrics: updatedCard.metrics.map(metric => toScorecardMetric(metric))
        };
        setScorecard(updatedScorecard);
        message.success('Scorecard updated successfully');
      } else {
        // Save new scorecard
        const savedCard = scorecardStorage.save(storageData);
        const newScorecard: ScorecardData = {
          ...savedCard,
          notes: savedCard.description || '',
          metrics: savedCard.metrics.map(metric => toScorecardMetric(metric))
        };
        setScorecard(newScorecard);
        message.success('Scorecard saved successfully');
        navigate(`/dashboard/scorecards/${savedCard.id}`);
      }
    } catch (error) {
      message.error('Failed to save scorecard');
      console.error('Save error:', error);
    }
  };

  const addMetricRow = () => {
    const newMetric: ScorecardMetric = {
      id: uuidv4(),
      name: '',
      description: '',
      weight: 0,
      score: 0
    };
    setScorecard(prev => ({
      ...prev,
      metrics: [...prev.metrics, newMetric]
    }));
  };

  // Editable table logic
  const isEditing = (record: ScorecardMetric) => record.id === editingKey;

  const edit = (record: ScorecardMetric) => {
    form.setFieldsValue(record);
    setEditingKey(record.id);
  };

  const cancel = () => setEditingKey('');

  const save = async (id: string) => {
    try {
      const row = await form.validateFields() as ScorecardMetric;
      setScorecard(prev => ({
        ...prev,
        metrics: prev.metrics.map(metric => 
          metric.id === id ? { ...metric, ...row } : metric
        )
      }));
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Metric',
      dataIndex: 'name',
      editable: true,
      render: (_: any, record: ScorecardMetric) => (
        <Space>
          <Avatar style={{ backgroundColor: clarivueColors.primary[500] }}>
            {record.name[0] || '?'}
          </Avatar>
          {record.name || 'Untitled Metric'}
        </Space>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      editable: true
    },
    {
      title: 'Weight (%)',
      dataIndex: 'weight',
      editable: true,
      width: 120,
      render: (weight: number) => (
        <Typography.Text style={{ color: totalWeight === 100 ? undefined : clarivueColors.error }}>
          {weight}%
        </Typography.Text>
      )
    },
    {
      title: 'Score',
      dataIndex: 'score',
      editable: true,
      width: 120
    },
    {
      title: 'Weighted',
      key: 'weighted',
      width: 120,
      render: (_: any, record: ScorecardMetric) => (
        <Typography.Text strong>
          {(record.weight * record.score / 100).toFixed(1)}
        </Typography.Text>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 120,
      render: (_: any, record: ScorecardMetric) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Typography.Link onClick={() => save(record.id)}>Save</Typography.Link>
            <Typography.Link onClick={cancel}>Cancel</Typography.Link>
          </Space>
        ) : (
          <Space>
            <Typography.Link 
              disabled={editingKey !== ''} 
              onClick={() => edit(record)}
              style={{ color: clarivueColors.primary[500] }}
            >
              Edit
            </Typography.Link>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => {
                setScorecard(prev => ({
                  ...prev,
                  metrics: prev.metrics.filter(m => m.id !== record.id)
                }));
              }}
              style={{ color: clarivueColors.error }}
            >
              Delete
            </Typography.Link>
          </Space>
        );
      }
    }
  ];

  // EditableCell component
  const EditableCell: React.FC<any> = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    ...restProps
  }) => {
    let inputNode = <Input />;
    if (dataIndex === 'weight' || dataIndex === 'score') {
      inputNode = <InputNumber min={0} max={100} />;
    }

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required: true, message: `Please enter ${title}` }]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <Layout.Content style={{ padding: 32, background: clarivueColors.gray[50] }}>
      {/* Header */}
      <Space align="center" style={{ justifyContent: 'space-between', width: '100%', marginBottom: 24 }}>
        <Space>
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={goBack}
            style={{ color: clarivueColors.gray[700] }}
          />
          <div>
            <Input
              value={scorecard.title}
              onChange={e => setScorecard(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter scorecard title"
              bordered={false}
              style={{ 
                fontSize: 24,
                fontWeight: 'bold',
                padding: 0,
                color: clarivueColors.gray[800],
                width: '100%'
              }}
            />
          </div>
        </Space>
        <Space size="large">
          <Typography.Text type="secondary">ID: {scorecard.id}</Typography.Text>
          <Typography.Text type="secondary">
            Created: {format(parseISO(scorecard.createdAt), 'PPP')}
          </Typography.Text>
          <Button icon={<ShareAltOutlined />}>Share</Button>
        </Space>
      </Space>

      {/* Summary Bar */}
      <Row gutter={16} style={{ marginBottom: 32 }}>
        <Col xs={24} md={8}>
          <Card style={cardStyle}>
            <Statistic 
              title="Average Score" 
              value={avgScore} 
              suffix="/100" 
              valueStyle={statStyle}
            />
            <Progress 
              type="circle" 
              percent={avgScore} 
              width={64} 
              strokeColor={clarivueColors.primary[500]}
              style={{ marginTop: 16 }}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card style={cardStyle}>
            <Statistic 
              title="Total Weight" 
              value={totalWeight} 
              suffix="%" 
              valueStyle={{
                ...statStyle,
                color: totalWeight === 100 ? clarivueColors.primary[500] : clarivueColors.error
              }}
            />
            <Progress 
              percent={totalWeight} 
              showInfo={false} 
              strokeColor={totalWeight === 100 ? clarivueColors.primary[500] : clarivueColors.error}
              style={{ marginTop: 16 }}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card style={cardStyle}>
            <Statistic 
              title="Metrics Count" 
              value={scorecard.metrics.length} 
              valueStyle={statStyle}
            />
          </Card>
        </Col>
      </Row>

      {/* Metrics Grid */}
      <Card style={cardStyle}>
        <MetricsGridEditor
          initial={scorecard.metrics.map(toEditorMetric)}
          onSave={metrics => {
            setScorecard(prev => ({
              ...prev,
              metrics: metrics.map(fromEditorMetric)
            }));
            saveScorecard();
          }}
          onCancel={goBack}
        />
      </Card>

      {/* Notes */}
      <Card title="Additional Notes" style={cardStyle}>
        <Input.TextArea
          rows={4}
          value={scorecard.notes}
          onChange={e => setScorecard(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Any extra guidance..."
          style={{ borderColor: clarivueColors.gray[200] }}
        />
      </Card>

      {/* Footer Actions */}
      <Space style={{ marginTop: 24, float: 'right' }}>
        <Button onClick={goBack}>Cancel</Button>
        <Button 
          type="primary" 
          icon={<SaveOutlined />} 
          onClick={saveScorecard}
          style={{ backgroundColor: clarivueColors.primary[500] }}
        >
          Save Scorecard
        </Button>
      </Space>
    </Layout.Content>
  );
} 