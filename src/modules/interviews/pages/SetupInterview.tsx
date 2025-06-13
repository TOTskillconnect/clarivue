import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Steps,
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Typography,
  Space,
  Divider,
  Alert,
  Row,
  Col,
  Avatar,
  Tag,
  Radio,
  Empty,
  Spin
} from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  PlusOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { scorecardStorage, type Scorecard } from '@/lib/storage/scorecard';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface InterviewFormData {
  candidateName: string;
  candidateEmail: string;
  position: string;
  date: any;
  time: any;
  duration: number;
  interviewType: string;
  notes: string;
  scorecardId?: string;
}

export function SetupInterview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scorecardId } = useParams();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [scorecards, setScorecards] = useState<Scorecard[]>([]);
  const [selectedScorecardId, setSelectedScorecardId] = useState<string>('');
  const [formData, setFormData] = useState<InterviewFormData>({
    candidateName: '',
    candidateEmail: '',
    position: '',
    date: null,
    time: null,
    duration: 60,
    interviewType: 'video',
    notes: '',
    scorecardId
  });

  // Load scorecards on component mount
  useEffect(() => {
    const loadedScorecards = scorecardStorage.getAll();
    setScorecards(loadedScorecards);
  }, []);

  // Handle return from scorecard creation
  useEffect(() => {
    const state = location.state as { scorecardId?: string } | null;
    if (state?.scorecardId) {
      setSelectedScorecardId(state.scorecardId);
      setFormData(prev => ({ ...prev, scorecardId: state.scorecardId }));
      
      // Reload scorecards to include the newly created one
      const updatedScorecards = scorecardStorage.getAll();
      setScorecards(updatedScorecards);
      
      // Clear the state and go to step 2 (Schedule)
      window.history.replaceState({}, '', window.location.pathname);
      setCurrentStep(2);
    }
  }, [location.state]);

  const steps = [
    {
      title: 'Candidate Info',
      icon: <UserOutlined />,
      description: 'Basic candidate details'
    },
    {
      title: 'Scorecard',
      icon: <FileTextOutlined />,
      description: 'Select evaluation criteria'
    },
    {
      title: 'Schedule',
      icon: <CalendarOutlined />,
      description: 'Date and time'
    },
    {
      title: 'Review',
      icon: <CheckCircleOutlined />,
      description: 'Confirm details'
    }
  ];

  const handleNext = () => {
    if (currentStep === 1 && !selectedScorecardId) {
      // Scorecard step validation
      return;
    }
    
    form.validateFields().then(values => {
      const updatedData = { ...formData, ...values };
      if (currentStep === 1) {
        updatedData.scorecardId = selectedScorecardId;
      }
      setFormData(updatedData);
      setCurrentStep(currentStep + 1);
    }).catch(err => {
      console.log('Validation failed:', err);
    });
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Creating interview with data:', formData);
    // Here you would typically send the data to your backend
    
    // For now, show success and navigate back
    navigate('/dashboard', {
      state: { message: 'Interview scheduled successfully!' }
    });
  };

  const handleCreateScorecard = () => {
    // Navigate to scorecard creation with return path
    navigate('/dashboard/scorecards/new', {
      state: { 
        returnTo: `/dashboard/interviews/schedule`,
        step: currentStep,
        formData
      }
    });
  };

  const getSelectedScorecard = () => {
    return scorecards.find(s => s.id === selectedScorecardId);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div style={{ maxWidth: 500, margin: '0 auto' }}>
            <Title level={4} style={{ textAlign: 'center', marginBottom: 32 }}>
              Candidate Information
            </Title>
            <Form
              form={form}
              layout="vertical"
              initialValues={formData}
            >
              <Form.Item
                name="candidateName"
                label="Candidate Name"
                rules={[{ required: true, message: 'Please enter candidate name' }]}
              >
                <Input 
                  size="large"
                  placeholder="John Doe"
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="candidateEmail"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter email address' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input 
                  size="large"
                  placeholder="john.doe@example.com"
                />
              </Form.Item>

              <Form.Item
                name="position"
                label="Position"
                rules={[{ required: true, message: 'Please enter position' }]}
              >
                <Input 
                  size="large"
                  placeholder="Frontend Developer"
                />
              </Form.Item>

              <Form.Item
                name="notes"
                label="Additional Notes (Optional)"
              >
                <TextArea 
                  rows={3}
                  placeholder="Any additional information about the candidate or interview..."
                />
              </Form.Item>
            </Form>
          </div>
        );

      case 1:
        return (
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <Title level={4} style={{ textAlign: 'center', marginBottom: 32 }}>
              Select Scorecard
            </Title>
            
            <div style={{ marginBottom: 24 }}>
              <Button
                type="dashed"
                size="large"
                icon={<PlusOutlined />}
                onClick={handleCreateScorecard}
                style={{ width: '100%', height: 60 }}
              >
                Create New Scorecard
              </Button>
            </div>

            {scorecards.length > 0 ? (
              <div>
                <Text strong style={{ marginBottom: 16, display: 'block' }}>
                  Or select an existing scorecard:
                </Text>
                <Radio.Group
                  value={selectedScorecardId}
                  onChange={(e) => setSelectedScorecardId(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {scorecards.map(scorecard => (
                      <Radio.Button
                        key={scorecard.id}
                        value={scorecard.id}
                        style={{ 
                          width: '100%', 
                          height: 'auto',
                          padding: '16px',
                          textAlign: 'left'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 16 }}>
                            {scorecard.title}
                          </div>
                          <div style={{ color: '#666', marginTop: 4 }}>
                            {scorecard.metrics.length} metrics • Created {dayjs(scorecard.createdAt).format('MMM D, YYYY')}
                          </div>
                          {scorecard.description && (
                            <div style={{ color: '#999', marginTop: 8, fontSize: 14 }}>
                              {scorecard.description.substring(0, 100)}
                              {scorecard.description.length > 100 ? '...' : ''}
                            </div>
                          )}
                        </div>
                      </Radio.Button>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            ) : (
              <Empty
                description="No scorecards found"
                style={{ margin: '40px 0' }}
              >
                <Text type="secondary">
                  Create your first scorecard to evaluate candidates
                </Text>
              </Empty>
            )}
          </div>
        );

      case 2:
        return (
          <div style={{ maxWidth: 500, margin: '0 auto' }}>
            <Title level={4} style={{ textAlign: 'center', marginBottom: 32 }}>
              Schedule Interview
            </Title>
            <Form
              form={form}
              layout="vertical"
              initialValues={formData}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="date"
                    label="Interview Date"
                    rules={[{ required: true, message: 'Please select date' }]}
                  >
                    <DatePicker 
                      size="large"
                      style={{ width: '100%' }}
                      disabledDate={(current) => current && current < dayjs().startOf('day')}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="time"
                    label="Start Time"
                    rules={[{ required: true, message: 'Please select time' }]}
                  >
                    <TimePicker 
                      size="large"
                      style={{ width: '100%' }}
                      format="HH:mm"
                      minuteStep={15}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="duration"
                label="Duration (minutes)"
                rules={[{ required: true, message: 'Please select duration' }]}
              >
                <Select size="large">
                  <Option value={30}>30 minutes</Option>
                  <Option value={45}>45 minutes</Option>
                  <Option value={60}>1 hour</Option>
                  <Option value={90}>1.5 hours</Option>
                  <Option value={120}>2 hours</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="interviewType"
                label="Interview Type"
                rules={[{ required: true, message: 'Please select interview type' }]}
              >
                <Select size="large">
                  <Option value="video">Video Call</Option>
                  <Option value="phone">Phone Call</Option>
                  <Option value="in-person">In Person</Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        );

      case 3:
        const selectedScorecard = getSelectedScorecard();
        return (
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <Title level={4} style={{ textAlign: 'center', marginBottom: 32 }}>
              Review Interview Details
            </Title>
            
            <Card>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <Avatar size={48} icon={<UserOutlined />} style={{ marginRight: 12 }} />
                    <div>
                      <Title level={5} style={{ margin: 0 }}>{formData.candidateName}</Title>
                      <Text type="secondary">{formData.candidateEmail}</Text>
                    </div>
                  </div>
                </Col>
                
                <Col span={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>Position</Text>
                    <Text>{formData.position}</Text>
                  </Space>
                </Col>
                
                <Col span={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>Interview Type</Text>
                    <Tag color="blue">{formData.interviewType}</Tag>
                  </Space>
                </Col>
                
                <Col span={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>Date & Time</Text>
                    <Text>
                      {formData.date ? dayjs(formData.date).format('MMMM D, YYYY') : 'Not selected'}
                      {formData.time && ` at ${dayjs(formData.time).format('h:mm A')}`}
                    </Text>
                  </Space>
                </Col>
                
                <Col span={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>Duration</Text>
                    <Text>{formData.duration} minutes</Text>
                  </Space>
                </Col>

                <Col span={24}>
                  <Divider />
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <Text strong>Scorecard</Text>
                    {selectedScorecard ? (
                      <div>
                        <Text>{selectedScorecard.title}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {selectedScorecard.metrics.length} evaluation metrics
                        </Text>
                      </div>
                    ) : (
                      <Text type="secondary">No scorecard selected</Text>
                    )}
                  </Space>
                </Col>
                
                {formData.notes && (
                  <Col span={24}>
                    <Divider />
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <Text strong>Notes</Text>
                      <Paragraph style={{ margin: 0 }}>{formData.notes}</Paragraph>
                    </Space>
                  </Col>
                )}
              </Row>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return selectedScorecardId !== '';
    }
    return true;
  };

  return (
    <div style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard')}
            style={{ marginBottom: 16 }}
          >
            Back to Dashboard
          </Button>
          
          <Title level={2} style={{ margin: 0 }}>
            Schedule New Interview
          </Title>
          <Text type="secondary">
            Set up a new interview and invite Clarivue to automatically take notes
          </Text>
        </div>

        {/* Progress Steps */}
        <Card style={{ marginBottom: 24 }}>
          <Steps 
            current={currentStep} 
            items={steps}
            style={{ maxWidth: 700, margin: '0 auto' }}
          />
        </Card>

        {/* Step Content */}
        <Card style={{ marginBottom: 24 }}>
          {renderStepContent()}
        </Card>

        {/* Navigation Buttons */}
        <div style={{ textAlign: 'center' }}>
          <Space size="middle">
            {currentStep > 0 && (
              <Button size="large" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <Button 
                type="primary" 
                size="large" 
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Next
              </Button>
            ) : (
              <Button type="primary" size="large" onClick={handleSubmit}>
                Schedule Interview
              </Button>
            )}
          </Space>
        </div>

        {/* Helper Alert */}
        <Alert
          style={{ marginTop: 24 }}
          message="Pro Tip"
          description="After scheduling, you'll receive a calendar invite with the meeting link. Clarivue will automatically join to take notes and generate a scorecard."
          type="info"
          showIcon
        />
      </div>
    </div>
  );
} 