import React from 'react';
import { format } from 'date-fns';
import { ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { 
  Statistic, 
  Progress, 
  Avatar, 
  Badge, 
  Typography,
  Pagination
} from 'antd';

// Enhanced KPI Card component
interface KPICardProps {
  title: string;
  value: number;
  type?: 'number' | 'percentage';
}

const KPICard: React.FC<KPICardProps> = ({ title, value, type = 'number' }) => (
  <Card className="kpi-card">
    <div className="kpi-content">
      {type === 'percentage' ? (
        <div className="kpi-progress">
          <Progress 
            type="circle" 
            percent={value} 
            width={64}
            strokeColor="#1076D1"
            strokeWidth={6}
          />
          <Typography.Text className="kpi-label">{title}</Typography.Text>
        </div>
      ) : (
        <Statistic
          title={<span className="kpi-label">{title}</span>}
          value={value.toLocaleString()}
          valueStyle={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#1F2937',
            lineHeight: '1.2'
          }}
        />
      )}
    </div>
  </Card>
);

interface Report {
  id: string;
  candidateName: string;
  role: string;
  date: Date;
  status: 'Draft' | 'Sent' | 'Done';
  interviewer: string;
  score?: number;
}

export const ReportsOverviewPage: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 10;

  const kpiData = [
    { title: 'Interviews', value: 128, type: 'number' as const },
    { title: 'Follow-Up Qs Generated', value: 342, type: 'number' as const },
    { title: 'Cue & Tip Records', value: 76, type: 'number' as const },
    { title: 'Question Bank', value: 1254, type: 'number' as const },
    { title: 'Avg Fit Score %', value: 84, type: 'percentage' as const },
    { title: 'Draft Reports', value: 12, type: 'number' as const },
  ];

  const reports: Report[] = [
    {
      id: '1',
      candidateName: 'Sarah Chen',
      role: 'Frontend Engineer',
      date: new Date('2025-01-12'),
      status: 'Done',
      interviewer: 'Alice Johnson',
      score: 87,
    },
    {
      id: '2',
      candidateName: 'Jamal Malik',
      role: 'Product Manager',
      date: new Date('2025-01-10'),
      status: 'Draft',
      interviewer: 'Bob Smith',
      score: 92,
    },
    {
      id: '3',
      candidateName: 'Priya Singh',
      role: 'Data Analyst',
      date: new Date('2025-01-08'),
      status: 'Sent',
      interviewer: 'Carol Williams',
      score: 78,
    },
    {
      id: '4',
      candidateName: 'Marcus Rodriguez',
      role: 'Backend Engineer',
      date: new Date('2025-01-07'),
      status: 'Done',
      interviewer: 'Alice Johnson',
      score: 95,
    },
    {
      id: '5',
      candidateName: 'Emily Watson',
      role: 'UX Designer',
      date: new Date('2025-01-06'),
      status: 'Sent',
      interviewer: 'David Lee',
      score: 81,
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Done': { color: '#10B981', bg: '#D1FAE5' },
      'Draft': { color: '#6B7280', bg: '#F3F4F6' },
      'Sent': { color: '#3B82F6', bg: '#DBEAFE' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge
        style={{
          backgroundColor: config.bg,
          color: config.color,
          border: 'none',
          borderRadius: '12px',
          padding: '2px 8px',
          fontSize: '12px',
          fontWeight: '500'
        }}
        text={status}
      />
    );
  };

  return (
    <div className="reports-overview">
      {/* KPI Grid */}
      <div className="dashboard-kpis">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            type={kpi.type}
          />
        ))}
      </div>

      {/* Sticky Filter Bar */}
      <div className="filter-bar-sticky">
        <div className="filter-bar">
          <div className="filter-controls">
            <Select>
              <SelectTrigger className="filter-select">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineer">Engineer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="product">Product</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="filter-select">
                <SelectValue placeholder="Interviewer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alice">Alice Johnson</SelectItem>
                <SelectItem value="bob">Bob Smith</SelectItem>
                <SelectItem value="carol">Carol Williams</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="filter-select">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="filter-select">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="search"
              placeholder="Search candidates..."
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Interviewer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow
                key={report.id}
                className="table-row-enhanced"
              >
                <TableCell className="candidate-cell">
                  <div className="candidate-info">
                    <Avatar 
                      size="default"
                      style={{ 
                        backgroundColor: '#1076D1',
                        color: '#fff',
                        marginRight: '12px'
                      }}
                    >
                      {report.candidateName.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <span className="candidate-name">{report.candidateName}</span>
                  </div>
                </TableCell>
                <TableCell className="role-cell">{report.role}</TableCell>
                <TableCell className="interviewer-cell">{report.interviewer}</TableCell>
                <TableCell className="date-cell">{format(report.date, 'MMM dd, yy')}</TableCell>
                <TableCell className="score-cell">
                  {report.score && (
                    <span className="score-badge">{report.score}%</span>
                  )}
                </TableCell>
                <TableCell className="status-cell">
                  {getStatusBadge(report.status)}
                </TableCell>
                <TableCell className="actions-cell">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="action-button"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <div className="table-pagination">
          <Pagination
            current={currentPage}
            total={reports.length}
            pageSize={pageSize}
            onChange={setCurrentPage}
            showSizeChanger={false}
            showQuickJumper={false}
            size="default"
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} interviews`}
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .reports-overview {
          padding: 0;
          background: #FAFBFC;
          min-height: 100vh;
        }

        /* KPI Grid */
        .dashboard-kpis {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .kpi-card {
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          border-radius: 8px;
          border: none;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          padding: 24px;
        }

        .kpi-card:hover {
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        .kpi-content {
          text-align: center;
        }

        .kpi-progress {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .kpi-label {
          font-size: 13px;
          font-weight: 600;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Sticky Filter Bar */
        .filter-bar-sticky {
          position: sticky;
          top: 0;
          z-index: 10;
          background: #FAFBFC;
          padding: 16px 0;
          margin-bottom: 24px;
          border-bottom: 1px solid #E5E7EB;
        }

        .filter-bar {
          background: white;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .filter-controls {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .filter-select {
          min-width: 140px;
        }

        .search-input {
          min-width: 240px;
        }

        /* Enhanced Table */
        .table-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          overflow: hidden;
          margin-bottom: 32px;
        }

        .table-pagination {
          padding: 16px 24px;
          border-top: 1px solid #E5E7EB;
          display: flex;
          justify-content: center;
          background: #FAFBFC;
        }

        .table-row-enhanced:hover {
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          background: #fff;
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }

        .candidate-info {
          display: flex;
          align-items: center;
        }

        .candidate-name {
          font-weight: 600;
          color: #1F2937;
        }

        .score-badge {
          background: #D1FAE5;
          color: #10B981;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .action-button {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .table-row-enhanced:hover .action-button {
          opacity: 1;
        }

        /* Focus States */
        .ant-input:focus, 
        .ant-btn:focus,
        .ant-select-selector:focus {
          box-shadow: 0 0 0 2px rgba(16,118,209,0.2) !important;
          border-color: #1076D1 !important;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .dashboard-kpis {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .filter-bar {
            flex-direction: column;
            gap: 16px;
          }
          
          .filter-controls {
            flex-direction: column;
            width: 100%;
            gap: 8px;
          }
          
          .filter-select,
          .search-input {
            width: 100%;
          }
        }

        /* Typography Consistency */
        h1, h2, h3 {
          color: #1F2937;
          font-weight: bold;
        }

        h1 { font-size: 18px; }
        h2 { font-size: 16px; }
        h3 { font-size: 14px; }

        p, span {
          font-size: 14px;
          line-height: 20px;
          color: #374151;
        }

        .text-muted {
          color: #718096;
        }
        `
      }} />
    </div>
  );
}; 