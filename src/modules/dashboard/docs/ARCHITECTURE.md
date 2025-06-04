# Dashboard Architecture

## Route Structure

```typescript
// Main Routes
/dashboard                     // Dashboard home/overview
/dashboard/conversations       // List of all conversations
/dashboard/conversations/:id   // Individual conversation view
/dashboard/upcoming           // Upcoming interviews
/dashboard/reports            // Analytics and reports
/dashboard/team              // Team management
/dashboard/settings          // User/account settings
/dashboard/upgrade           // Subscription/upgrade page

// Onboarding Routes
/dashboard/onboarding/step1   // Calendar integration
/dashboard/onboarding/step2   // Phone verification
/dashboard/onboarding/step3   // Calendly setup
```

## State Structure

```typescript
interface UserState {
  id: string;
  name: string;
  email: string;
  avatar: string;
  onboarding: {
    isComplete: boolean;
    steps: {
      calendar: boolean;
      phone: boolean;
      calendly: boolean;
    };
    currentStep: number;
  };
  subscription: {
    plan: 'free' | 'pro' | 'enterprise';
    minutesRemaining: number;
    minutesUsed: number;
    totalMinutes: number;
  };
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    sidebarCollapsed: boolean;
  };
}

interface ConversationState {
  conversations: {
    [id: string]: {
      id: string;
      candidateName: string;
      status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
      scheduledFor: Date;
      duration: number;
      role: string;
      notes?: string;
      recording?: string;
      transcript?: string;
    };
  };
  activeConversationId: string | null;
}

interface TeamState {
  members: {
    [id: string]: {
      id: string;
      name: string;
      email: string;
      role: 'admin' | 'interviewer' | 'recruiter';
      status: 'active' | 'pending' | 'inactive';
    };
  };
  invites: Array<{
    email: string;
    role: 'admin' | 'interviewer' | 'recruiter';
    expiresAt: Date;
  }>;
}
```

## Conditional Logic & Component Visibility

### Dashboard Layout
```typescript
// Show onboarding banner if not complete
shouldShowOnboardingBanner = !user.onboarding.isComplete

// Show usage banner if minutes are low
shouldShowUsageBanner = user.subscription.minutesRemaining < 60 && 
                       user.subscription.plan !== 'enterprise'

// Show upgrade prompt if on free plan
shouldShowUpgradePrompt = user.subscription.plan === 'free' && 
                         user.subscription.minutesUsed > 0
```

### Onboarding
```typescript
// Redirect to onboarding if incomplete
if (!user.onboarding.isComplete && 
    !location.pathname.includes('/dashboard/onboarding')) {
  redirect(`/dashboard/onboarding/step${user.onboarding.currentStep}`)
}

// Lock certain features until onboarding complete
const canAccessFeature = user.onboarding.isComplete || 
                        isOnboardingRelatedFeature
```

### Conversation Access
```typescript
// Check if user can join conversation
canJoinConversation = conversation.status === 'in-progress' || 
                     (conversation.status === 'scheduled' && 
                      isWithinMinutes(conversation.scheduledFor, 5))

// Check if user can view recording
canViewRecording = conversation.status === 'completed' && 
                  conversation.recording && 
                  hasPermission('view_recordings')
```

### Team Management
```typescript
// Show team management features based on role
canManageTeam = user.role === 'admin'
canInviteMembers = ['admin', 'recruiter'].includes(user.role)

// Show billing section only to admins
showBillingSection = user.role === 'admin'
```

### Feature Flags & Permissions
```typescript
interface FeatureFlags {
  enableNewReports: boolean;
  enableAIFeedback: boolean;
  enableBulkUpload: boolean;
}

interface Permissions {
  canViewTeam: boolean;
  canManageTeam: boolean;
  canViewReports: boolean;
  canExportData: boolean;
  canModifySettings: boolean;
}
```

## Component Dependencies

```typescript
// Required props for key components
interface DashboardLayoutProps {
  user: UserState;
  onboarding: OnboardingState;
  subscription: SubscriptionState;
}

interface ConversationListProps {
  conversations: ConversationState['conversations'];
  filters: {
    status?: ConversationStatus;
    dateRange?: DateRange;
    search?: string;
  };
}

interface TeamManagementProps {
  team: TeamState;
  permissions: Permissions;
  featureFlags: FeatureFlags;
}
```

## State Management Tips

1. Use React Query for server state:
   - Conversations list
   - Team members
   - Usage statistics

2. Use Zustand for client state:
   - UI preferences
   - Form data
   - Filters and sorting

3. Use Context for theme/global settings:
   - Color scheme
   - Language
   - Feature flags

4. Use localStorage for persistence:
   - Sidebar collapsed state
   - Last viewed conversation
   - User preferences 