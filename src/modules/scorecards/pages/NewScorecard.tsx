import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Steps,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Table,
  Space,
  Spin,
  Result,
  message,
  Popconfirm
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
  DragOutlined
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { scorecardStorage } from '@/lib/storage/scorecard';

const { Step } = Steps;
const { TextArea } = Input;
const { Title, Text } = Typography;

// Types
interface Metric {
  id: string;
  name: string;
  desc: string;
  weight: number;
}

interface ScorecardData {
  id: string;
  title: string;
  metrics: Metric[];
  createdAt: number;
}

// Editable Cell Component
const EditableCell: React.FC<{
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'number' | 'text';
  record: Metric;
  index: number;
  children: React.ReactNode;
  onSave: (record: Metric) => void;
}> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  children,
  onSave,
  ...restProps
}) => {
  const [form] = Form.useForm();

  const save = async () => {
    try {
      const values = await form.validateFields();
      onSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editing) {
    childNode = (
      <Form form={form} component={false}>
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          initialValue={record[dataIndex as keyof Metric]}
          rules={[
            {
              required: true,
              message: `Please input ${title}!`,
            },
            ...(inputType === 'number' ? [
              {
                type: 'number' as const,
                min: 0,
                max: 100,
                message: 'Weight must be between 0 and 100',
              },
            ] : []),
          ]}
        >
          {inputType === 'number' ? (
            <Input type="number" onPressEnter={save} onBlur={save} />
          ) : (
            <Input onPressEnter={save} onBlur={save} />
          )}
        </Form.Item>
      </Form>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export function NewScorecard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [newId, setNewId] = useState<string>('');
  const [editingKey, setEditingKey] = useState<string>('');
  const [jdForm] = Form.useForm();
  const [nameForm] = Form.useForm();

  // Mock OpenAI API call
  const generateFromOpenAI = async (jdText: string): Promise<Metric[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock generated metrics based on job description
    return [
      {
        id: uuidv4(),
        name: 'Technical Skills',
        desc: 'Programming languages, frameworks, and technical expertise',
        weight: 30
      },
      {
        id: uuidv4(),
        name: 'Problem Solving',
        desc: 'Ability to analyze and solve complex problems',
        weight: 25
      },
      {
        id: uuidv4(),
        name: 'Communication',
        desc: 'Verbal and written communication skills',
        weight: 20
      },
      {
        id: uuidv4(),
        name: 'Experience',
        desc: 'Relevant work experience and industry knowledge',
        weight: 15
      },
      {
        id: uuidv4(),
        name: 'Cultural Fit',
        desc: 'Alignment with company values and team dynamics',
        weight: 10
      }
    ];
  };

  const onSubmitJD = async (values: { jdText: string }) => {
    setCurrentStep(1);
    setIsLoading(true);
    try {
      const generatedMetrics = await generateFromOpenAI(values.jdText);
      setMetrics(generatedMetrics);
      setCurrentStep(2);
    } catch (error) {
      message.error('Failed to generate scorecard. Please try again.');
      setCurrentStep(0);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewRow = () => {
    const newMetric: Metric = {
      id: uuidv4(),
      name: 'New Metric',
      desc: 'Description of the metric',
      weight: 0
    };
    setMetrics([...metrics, newMetric]);
  };

  const removeRow = (id: string) => {
    setMetrics(metrics.filter(metric => metric.id !== id));
  };

  const isEditing = (record: Metric) => record.id === editingKey;

  const edit = (record: Metric) => {
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = (record: Metric) => {
    setMetrics(metrics.map(metric => 
      metric.id === record.id ? record : metric
    ));
    setEditingKey('');
  };

  const getTotalWeight = () => {
    return metrics.reduce((sum, metric) => sum + metric.weight, 0);
  };

  const proceedToReview = () => {
    const totalWeight = getTotalWeight();
    if (Math.abs(totalWeight - 100) > 0.1) {
      message.error('Total weight must equal 100%');
      return;
    }
    setCurrentStep(3);
  };

  const onSave = async (values: { title: string }) => {
    try {
      console.log('Saving scorecard with metrics:', metrics);
      // Convert metrics to the format expected by scorecardStorage
      const storageMetrics = metrics.map(metric => ({
        id: metric.id,
        name: metric.name,
        description: metric.desc,
        weight: metric.weight
      }));
      console.log('Converted storage metrics:', storageMetrics);

      // Save using the correct storage system (no job description needed)
      const savedScorecard = scorecardStorage.save({
        title: values.title,
        description: '', // Empty description since we don't need the job description
        metrics: storageMetrics
      });
      console.log('Saved scorecard:', savedScorecard);
      
      setNewId(savedScorecard.id);
      setCurrentStep(4);
      message.success('Scorecard created successfully!');
    } catch (error) {
      console.error('Failed to save scorecard:', error);
      message.error('Failed to save scorecard. Please try again.');
    }
  };

  const resetFlow = () => {
    setCurrentStep(0);
    setMetrics([]);
    setNewId('');
    setEditingKey('');
    jdForm.resetFields();
    nameForm.resetFields();
  };

  const columns = [
    {
      title: 'Metric',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      editable: true,
      render: (text: string, record: Metric) => {
        const editing = isEditing(record);
        return editing ? (
          <EditableCell
            editing={editing}
            dataIndex="name"
            title="Metric"
            inputType="text"
            record={record}
            index={0}
            onSave={save}
          >
            {text}
          </EditableCell>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span onClick={() => edit(record)} style={{ cursor: 'pointer', flex: 1 }}>
              {text}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
      width: '40%',
      editable: true,
      render: (text: string, record: Metric) => {
        const editing = isEditing(record);
        return editing ? (
          <EditableCell
            editing={editing}
            dataIndex="desc"
            title="Description"
            inputType="text"
            record={record}
            index={0}
            onSave={save}
          >
            {text}
          </EditableCell>
        ) : (
          <span onClick={() => edit(record)} style={{ cursor: 'pointer' }}>
            {text}
          </span>
        );
      },
    },
    {
      title: 'Weight (%)',
      dataIndex: 'weight',
      key: 'weight',
      width: '15%',
      editable: true,
      render: (text: number, record: Metric) => {
        const editing = isEditing(record);
        return editing ? (
          <EditableCell
            editing={editing}
            dataIndex="weight"
            title="Weight"
            inputType="number"
            record={record}
            index={0}
            onSave={save}
          >
            {text}
          </EditableCell>
        ) : (
          <span onClick={() => edit(record)} style={{ cursor: 'pointer' }}>
            {text}%
          </span>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',
      render: (_: any, record: Metric) => {
        const editing = isEditing(record);
        return editing ? (
          <Space>
            <Button type="link" onClick={() => save(record)}>
              Save
            </Button>
            <Button type="link" onClick={cancel}>
              Cancel
            </Button>
          </Space>
        ) : (
          <Space>
            <Button type="link" onClick={() => edit(record)}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this metric?"
              onConfirm={() => removeRow(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="link" icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const cardStyle = {
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px'
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card bordered={false} style={cardStyle}>
            <Title level={4}>1. Paste or upload your Job Description</Title>
            <Form form={jdForm} onFinish={onSubmitJD} layout="vertical">
              <Form.Item 
                name="jdText" 
                rules={[{ required: true, message: 'Please enter a job description' }]}
              >
                <TextArea 
                  rows={8} 
                  placeholder="Paste job description here…"
                  style={{ fontSize: '14px' }}
                />
              </Form.Item>
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<PlusOutlined />} 
                  size="large"
                  style={{ 
                    backgroundColor: '#1076D1',
                    border: 'none',
                    borderRadius: '6px'
                  }}
                >
                  Generate Scorecard
                </Button>
              </Form.Item>
            </Form>
          </Card>
        );

      case 1:
        return (
          <Card bordered={false} style={cardStyle}>
            <Space direction="vertical" size="large" align="center" style={{ width: '100%', padding: '64px 0' }}>
              <Spin size="large" tip="Generating your scorecard…">
                <div style={{ padding: '20px' }}>
                  <Text type="secondary" style={{ fontSize: '16px' }}>
                    We're parsing your description and crafting metrics & weights
                  </Text>
                </div>
              </Spin>
            </Space>
          </Card>
        );

      case 2:
        const totalWeight = getTotalWeight();
        const isValidWeight = Math.abs(totalWeight - 100) < 0.1;
        
        return (
          <Card bordered={false} style={cardStyle}>
            <Title level={4}>3. Review & Edit Your Scorecard</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button 
                type="dashed" 
                icon={<PlusOutlined />} 
                onClick={addNewRow}
                style={{ marginBottom: '16px' }}
              >
                Add Metric
              </Button>

              <Table
                dataSource={metrics}
                columns={columns}
                rowKey="id"
                pagination={false}
                style={{ marginBottom: '16px' }}
              />

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '16px',
                background: isValidWeight ? '#f6ffed' : '#fff2f0',
                border: `1px solid ${isValidWeight ? '#b7eb8f' : '#ffccc7'}`,
                borderRadius: '6px'
              }}>
                <Text strong>
                  Total Weight: {totalWeight.toFixed(1)}%
                </Text>
                {!isValidWeight && (
                  <Text type="danger">
                    Must equal 100%
                  </Text>
                )}
              </div>

              <div style={{ textAlign: 'right' }}>
                <Button 
                  type="primary" 
                  onClick={proceedToReview}
                  disabled={!isValidWeight}
                  size="large"
                  style={{ 
                    backgroundColor: isValidWeight ? '#1076D1' : undefined,
                    border: 'none',
                    borderRadius: '6px'
                  }}
                >
                  Continue to Review
                </Button>
              </div>
            </Space>
          </Card>
        );

      case 3:
        return (
          <Card bordered={false} style={cardStyle}>
            <Title level={4}>4. Name & Save Your Scorecard</Title>
            <Form form={nameForm} onFinish={onSave} layout="vertical">
              <Form.Item 
                name="title"
                rules={[{ required: true, message: 'Give your scorecard a name' }]}
              >
                <Input 
                  placeholder="e.g. Frontend Developer Scorecard" 
                  size="large"
                  style={{ fontSize: '14px' }}
                />
              </Form.Item>
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SaveOutlined />} 
                  size="large"
                  style={{ 
                    backgroundColor: '#1076D1',
                    border: 'none',
                    borderRadius: '6px'
                  }}
                >
                  Save Scorecard
                </Button>
              </Form.Item>
            </Form>
          </Card>
        );

      case 4:
        const state = location.state as { returnTo?: string } | null;
        const isFromInterviewSetup = state?.returnTo === '/dashboard/interviews/schedule';
        
        return (
          <Card bordered={false} style={cardStyle}>
            <Result
              status="success"
              title="Scorecard Created!"
              subTitle={`Your Scorecard ID: ${newId}`}
              extra={[
                isFromInterviewSetup && (
                  <Button 
                    key="continue"
                    type="primary" 
                    onClick={() => navigate('/dashboard/interviews/schedule', {
                      state: { scorecardId: newId }
                    })}
                    style={{ 
                      backgroundColor: '#1076D1',
                      border: 'none',
                      borderRadius: '6px'
                    }}
                  >
                    Continue with Interview Setup
                  </Button>
                ),
                <Button 
                  key="view"
                  type={isFromInterviewSetup ? "default" : "primary"} 
                  onClick={() => navigate(`/dashboard/scorecards/${newId}`)}
                  style={!isFromInterviewSetup ? { 
                    backgroundColor: '#1076D1',
                    border: 'none',
                    borderRadius: '6px'
                  } : {}}
                >
                  View Scorecard
                </Button>,
                <Button key="new" onClick={resetFlow}>
                  Create Another
                </Button>
              ].filter(Boolean)}
            />
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '0', background: '#FAFBFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <Steps current={currentStep} style={{ marginBottom: '32px' }}>
          <Step title="Job Description" />
          <Step title="Generating" />
          <Step title="Edit Scorecard" />
          <Step title="Review & Name" />
          <Step title="Save Complete" />
        </Steps>

        {renderStepContent()}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .ant-steps-item-finish .ant-steps-item-icon {
            background-color: #1076D1;
            border-color: #1076D1;
          }
          
          .ant-steps-item-process .ant-steps-item-icon {
            background-color: #1076D1;
            border-color: #1076D1;
          }
          
          .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
            color: #fff;
          }
          
          .ant-table-tbody > tr > td {
            padding: 12px;
          }
          
          .ant-table-tbody > tr:hover > td {
            background-color: #f5f5f5;
          }
          
          .ant-btn-primary {
            background-color: #1076D1;
            border: none;
            border-radius: 6px;
          }
          
          .ant-btn-primary:hover {
            background-color: #0C5DA6;
          }
          
          .ant-form-item-label > label {
            font-size: 14px;
            font-weight: 600;
          }
          
          .ant-typography h4 {
            font-size: 18px;
            font-weight: bold;
            color: #1F2937;
          }
          
          .ant-typography {
            font-size: 14px;
            line-height: 20px;
            color: #374151;
          }
          
          .ant-typography.ant-typography-caption {
            color: #718096;
          }
        `
      }} />
    </div>
  );
} 