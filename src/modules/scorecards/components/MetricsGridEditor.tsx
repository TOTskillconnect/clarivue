import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Space, Typography, theme } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { clarivueColors } from '@/theme';
import { type Metric as StorageMetric } from '@/types/interview';

// Extend the base Metric type to include score
export interface EditorMetric extends StorageMetric {
  score: number;
}

interface MetricsGridEditorProps {
  initial: EditorMetric[];
  onSave?: (metrics: EditorMetric[]) => void;
  onCancel?: () => void;
}

export function MetricsGridEditor({ initial, onSave, onCancel }: MetricsGridEditorProps) {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const metrics = Form.useWatch('metrics', form) || initial;

  // Reset form when initial values change
  useEffect(() => {
    console.log('MetricsGridEditor: Received initial metrics:', initial);
    form.setFieldsValue({ metrics: initial });
    console.log('MetricsGridEditor: Form fields set to:', initial);
  }, [form, initial]);

  // Styles
  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr 1fr 1fr 1fr',
    gap: token.padding,
    alignItems: 'start',
    marginBottom: token.padding,
  };

  const cellStyle = {
    borderRadius: token.borderRadius,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    padding: token.padding,
    background: '#fff',
    border: `1px solid ${clarivueColors.gray[200]}`,
  };

  // Compute total weight
  const totalWeight = metrics.reduce((sum: number, m: EditorMetric) => sum + (m.weight || 0), 0);

  const onFinish = (values: { metrics: EditorMetric[] }) => {
    if (onSave) {
      onSave(values.metrics);
    } else {
      console.log('Saved metrics:', values.metrics);
    }
  };

  return (
    <Form
      form={form}
      name="metricsGrid"
      initialValues={{ metrics: initial }}
      onFinish={onFinish}
      layout="vertical"
    >
      {/* Header Row */}
      <div style={rowStyle}>
        <div style={cellStyle}>
          <Typography.Text strong style={{ color: clarivueColors.gray[700] }}>
            Metric
          </Typography.Text>
        </div>
        <div style={cellStyle}>
          <Typography.Text strong style={{ color: clarivueColors.gray[700] }}>
            Description
          </Typography.Text>
        </div>
        <div style={cellStyle}>
          <Typography.Text strong style={{ color: clarivueColors.gray[700] }}>
            Weight (%)
          </Typography.Text>
        </div>
        <div style={cellStyle}>
          <Typography.Text strong style={{ color: clarivueColors.gray[700] }}>
            Score (%)
          </Typography.Text>
        </div>
        <div style={cellStyle}>
          <Typography.Text strong style={{ color: clarivueColors.gray[700] }}>
            Weighted
          </Typography.Text>
        </div>
      </div>

      {/* Validation Warning */}
      {totalWeight !== 100 && (
        <Typography.Text type="warning" style={{ display: 'block', marginBottom: 16 }}>
          Total weight is {totalWeight}%. It should equal 100%.
        </Typography.Text>
      )}

      {/* Dynamic Metric Rows */}
      <Form.List name="metrics">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} style={rowStyle}>
                {/* Metric Name */}
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  rules={[{ required: true, message: 'Enter metric name' }]}
                  style={cellStyle}
                >
                  <Input placeholder="Metric name" bordered={false} />
                </Form.Item>

                {/* Description */}
                <Form.Item
                  {...restField}
                  name={[name, 'description']}
                  rules={[{ required: true, message: 'Enter description' }]}
                  style={cellStyle}
                >
                  <Input.TextArea rows={2} placeholder="What to look for…" bordered={false} />
                </Form.Item>

                {/* Weight */}
                <Form.Item
                  {...restField}
                  name={[name, 'weight']}
                  rules={[{ required: true, type: 'number', min: 0, max: 100 }]}
                  style={cellStyle}
                >
                  <InputNumber
                    min={0}
                    max={100}
                    formatter={v => `${v}%`}
                    bordered={false}
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                {/* Score */}
                <Form.Item
                  {...restField}
                  name={[name, 'score']}
                  rules={[{ required: true, type: 'number', min: 0, max: 100 }]}
                  style={cellStyle}
                >
                  <InputNumber
                    min={0}
                    max={100}
                    formatter={v => `${v}%`}
                    bordered={false}
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                {/* Weighted Score (computed) */}
                <div style={cellStyle}>
                  <Typography.Text strong style={{ color: clarivueColors.primary[500] }}>
                    {(() => {
                      const values = form.getFieldValue(['metrics', name]) as EditorMetric;
                      const weight = values?.weight || 0;
                      const score = values?.score || 0;
                      return ((weight * score) / 100).toFixed(1);
                    })()}
                  </Typography.Text>
                </div>
              </div>
            ))}

            {/* Add Metric Button */}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add({ id: uuidv4(), name: '', description: '', weight: 0, score: 0 })}
                block
                icon={<PlusOutlined />}
                style={{ marginBottom: token.padding }}
              >
                Add Metric
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      {/* Footer Actions */}
      <Form.Item>
        <Space style={{ float: 'right', marginTop: token.padding }}>
          <Button 
            htmlType="button" 
            onClick={() => {
              form.resetFields();
              if (onCancel) onCancel();
            }}
          >
            Cancel
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />}
            style={{ backgroundColor: clarivueColors.primary[500] }}
          >
            Save Scorecard
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
} 