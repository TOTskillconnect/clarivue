# Clarivue Theme Implementation Guide

This directory contains the complete implementation of the Clarivue Color Design System for Ant Design.

## 🎨 What's Implemented

### ✅ Complete Color System
- **Primary Colors**: Blue spectrum (#1076D1 base) with 10 shades
- **Secondary Colors**: Purple-blue spectrum (#5F9DF7 base) with 10 shades  
- **Neutral Colors**: Gray spectrum with 10 shades
- **Status Colors**: Success, Warning, Error, Info
- **All colors mapped to Ant Design theme tokens**

### ✅ Typography System
- **Font families**: System fonts optimized for readability
- **Font sizes**: Heading1 (48px) to Small (12px)
- **Line heights**: Optimized for each text size
- **Color tokens**: Primary, secondary, tertiary text colors

### ✅ Component Customization
- **Buttons**: Custom heights, border radius, shadows
- **Cards**: Consistent border radius, shadows, spacing
- **Layout**: Background colors, spacing, borders
- **Inputs**: Border radius, heights, focus shadows
- **All major Ant Design components themed**

### ✅ Gradient System
- **6 predefined gradients**: Purple, pink, blue, hero, CTA, brand
- **Utility function**: `createGradientStyle()` for easy usage
- **Consistent with design system**

## 🚀 How to Use

### 1. Using Theme Tokens
Always use theme tokens instead of hardcoded colors:

```tsx
import { theme } from 'antd';

function MyComponent() {
  const { token } = theme.useToken();
  
  return (
    <div style={{
      background: token.colorBgContainer,      // ✅ Good
      color: token.colorText,                  // ✅ Good  
      borderRadius: token.borderRadiusLG,      // ✅ Good
      padding: token.paddingLG,                // ✅ Good
    }}>
      Content
    </div>
  );
}
```

❌ **Avoid hardcoded values:**
```tsx
// Don't do this
<div style={{ background: '#ffffff', color: '#1A202C' }}>
```

### 2. Using Gradients
Import and use predefined gradients:

```tsx
import { clarivueGradients, createGradientStyle } from '@/theme';

// Method 1: Direct gradient
<Card style={{ background: clarivueGradients.purple }}>

// Method 2: Utility function (recommended)
<Card style={createGradientStyle('purple')}>

// Method 3: Custom combination
<Card style={{
  ...createGradientStyle('blue'),
  borderRadius: token.borderRadiusLG
}}>
```

### 3. Available Theme Tokens

#### Background Colors
```tsx
token.colorBgBase          // #FFFFFF - Main background
token.colorBgContainer     // #FFFFFF - Container background  
token.colorBgLayout        // #F7FAFC - Layout background
token.colorBgElevated      // #FFFFFF - Elevated elements
```

#### Text Colors
```tsx
token.colorText            // #1A202C - Primary text
token.colorTextSecondary   // #4A5568 - Secondary text
token.colorTextTertiary    // #718096 - Tertiary text
token.colorTextHeading     // #1A202C - Heading text
```

#### Border Colors
```tsx
token.colorBorder          // #E2E8F0 - Default border
token.colorBorderSecondary // #EDF2F7 - Secondary border
```

#### Status Colors
```tsx
token.colorSuccess         // #10B981 - Success
token.colorWarning         // #F59E0B - Warning
token.colorError           // #EF4444 - Error
token.colorInfo            // #3B82F6 - Info
```

#### Primary Brand Colors
```tsx
token.colorPrimary         // #1076D1 - Main brand
token.colorPrimaryBg       // #DFF6FF - Light backgrounds
token.colorPrimaryHover    // #39C7FF - Hover states
token.colorPrimaryActive   // #0C5DA6 - Active states
```

#### Spacing & Sizing
```tsx
token.borderRadius         // 12px - Default radius
token.borderRadiusLG       // 16px - Large radius
token.borderRadiusSM       // 8px - Small radius
token.controlHeight        // 40px - Default control height
token.controlHeightLG      // 48px - Large control height
```

#### Shadows
```tsx
token.boxShadow            // Subtle shadow
token.boxShadowSecondary   // Medium shadow  
token.boxShadowTertiary    // Strong shadow
```

### 4. Available Gradients

```tsx
import { clarivueGradients } from '@/theme';

clarivueGradients.purple       // Purple gradient
clarivueGradients.pink         // Pink gradient  
clarivueGradients.blue         // Blue gradient
clarivueGradients.hero         // Hero section gradient
clarivueGradients.cta          // Call-to-action gradient
clarivueGradients.brandVertical // Main brand gradient
```

## 📱 Component Examples

### Button with Theme
```tsx
<Button 
  type="primary"
  style={{
    height: token.controlHeightLG,
    borderRadius: token.borderRadius,
    background: clarivueGradients.cta
  }}
>
  Gradient Button
</Button>
```

### Card with Theme
```tsx
<Card
  style={{
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    background: token.colorBgContainer
  }}
>
  <Typography.Title 
    level={4} 
    style={{ color: token.colorTextHeading }}
  >
    Themed Card
  </Typography.Title>
</Card>
```

### Gradient Card
```tsx
<Card
  style={{
    ...createGradientStyle('purple'),
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowTertiary
  }}
>
  <Typography.Title 
    level={4} 
    style={{ color: 'white' }}
  >
    Gradient Card
  </Typography.Title>
</Card>
```

## 🎯 Best Practices

### ✅ Do
- Use theme tokens for all styling
- Use the `createGradientStyle()` utility function
- Test color contrast for accessibility
- Use semantic color names
- Combine theme tokens with gradients

### ❌ Don't
- Hardcode hex values
- Override theme colors with inline styles
- Use colors that don't exist in the system
- Ignore contrast ratios for accessibility

## 🔧 Extending the Theme

To add new colors or modify existing ones:

1. **Update `src/theme/index.ts`**:
```tsx
export const clarivueColors = {
  // Add new color
  accent: '#FF6B6B',
  
  // Or modify existing
  primary: {
    // ... existing shades
    1000: '#000000' // Add new shade
  }
};
```

2. **Update theme token**:
```tsx
export const clarivueTheme: ThemeConfig = {
  token: {
    // Map to Ant Design tokens
    colorAccent: clarivueColors.accent,
  }
};
```

3. **Add to gradients if needed**:
```tsx
export const clarivueGradients = {
  // ... existing gradients
  accent: `linear-gradient(135deg, ${clarivueColors.accent} 0%, ${clarivueColors.primary[500]} 100%)`,
};
```

## 📚 Related Files

- `src/theme/index.ts` - Main theme configuration
- `src/App.tsx` - Theme provider setup
- `public/COLOR-DESIGN-SYSTEM.md` - Original design system spec
- `src/modules/dashboard/pages/DashboardHome.tsx` - Implementation example

## 🚀 Implementation Status

✅ **Completed**:
- Full color system implementation
- All Ant Design component theming
- Gradient system with utilities
- Typography system
- Theme provider setup
- Dashboard implementation example

🔄 **Future Enhancements**:
- Dark mode support
- Additional gradient combinations
- Animation/motion tokens
- Responsive design tokens
- Component-specific color variants

---

*For questions or issues with the theme system, refer to the Ant Design theming documentation or the original COLOR-DESIGN-SYSTEM.md specification.* 