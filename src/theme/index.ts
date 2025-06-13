import type { ThemeConfig } from 'antd';

// Clarivue Color Design System Implementation for Ant Design
export const clarivueColors = {
  // Primary Colors - Blue Spectrum (#1076D1 base)
  primary: {
    50: '#DFF6FF',   // Lightest blue, backgrounds
    100: '#C1EFFF',  // Light blue, subtle accents
    200: '#94E2FF',  // Soft blue, hover states
    300: '#67D4FF',  // Medium light blue
    400: '#39C7FF',  // Medium blue
    500: '#1076D1',  // Main brand blue (Primary)
    600: '#0C5DA6',  // Darker blue, active states
    700: '#08447A',  // Dark blue, text on light
    800: '#042B4F',  // Very dark blue
    900: '#001223',  // Darkest blue, high contrast
  },

  // Secondary Colors - Purple-Blue Spectrum (#5F9DF7 base)
  secondary: {
    50: '#F5F8FF',   // Lightest purple-blue
    100: '#EBF1FF',  // Light purple-blue
    200: '#D6E4FF',  // Soft purple-blue
    300: '#B3CCFF',  // Medium light purple-blue
    400: '#80A9FF',  // Medium purple-blue
    500: '#5F9DF7',  // Main secondary color
    600: '#3264CC',  // Darker purple-blue
    700: '#1E2A78',  // Dark purple-blue
    800: '#101D66',  // Very dark purple-blue
    900: '#050B33',  // Darkest purple-blue
  },

  // Neutral Colors - Gray Spectrum
  gray: {
    50: '#F7FAFC',   // Lightest gray, backgrounds
    100: '#EDF2F7',  // Light gray, borders
    200: '#E2E8F0',  // Soft gray, dividers
    300: '#CBD5E0',  // Medium light gray
    400: '#A0AEC0',  // Medium gray, placeholders
    500: '#718096',  // Main gray, secondary text
    600: '#4A5568',  // Dark gray, body text
    700: '#2D3748',  // Darker gray, headings
    800: '#1A202C',  // Very dark gray, main text
    900: '#171923',  // Darkest gray, high contrast
  },

  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

// Clarivue Theme Configuration for Ant Design
export const clarivueTheme: ThemeConfig = {
  token: {
    // Primary brand colors
    colorPrimary: clarivueColors.primary[500],        // #1076D1
    colorPrimaryBg: clarivueColors.primary[50],       // Light blue backgrounds
    colorPrimaryBgHover: clarivueColors.primary[100], // Hover backgrounds
    colorPrimaryBorder: clarivueColors.primary[200],  // Borders
    colorPrimaryBorderHover: clarivueColors.primary[300], // Hover borders
    colorPrimaryHover: clarivueColors.primary[400],   // Hover states
    colorPrimaryActive: clarivueColors.primary[600],  // Active states
    colorPrimaryTextHover: clarivueColors.primary[400], // Text hover
    colorPrimaryText: clarivueColors.primary[500],    // Primary text
    colorPrimaryTextActive: clarivueColors.primary[600], // Active text

    // Background colors
    colorBgBase: '#FFFFFF',                           // Main background
    colorBgContainer: '#FFFFFF',                      // Container background
    colorBgElevated: '#FFFFFF',                       // Elevated elements
    colorBgLayout: clarivueColors.gray[50],          // Layout background
    colorBgSpotlight: clarivueColors.primary[50],    // Spotlight background
    colorBgMask: 'rgba(0, 0, 0, 0.45)',             // Modal mask

    // Text colors
    colorText: clarivueColors.gray[800],             // Primary text
    colorTextSecondary: clarivueColors.gray[600],    // Secondary text
    colorTextTertiary: clarivueColors.gray[500],     // Tertiary text
    colorTextQuaternary: clarivueColors.gray[400],   // Quaternary text
    colorTextDescription: clarivueColors.gray[500],   // Description text
    colorTextDisabled: clarivueColors.gray[400],     // Disabled text
    colorTextHeading: clarivueColors.gray[800],      // Heading text

    // Border colors
    colorBorder: clarivueColors.gray[200],           // Default border
    colorBorderSecondary: clarivueColors.gray[100],  // Secondary border
    
    // Status colors
    colorSuccess: clarivueColors.success,            // Success color
    colorSuccessBg: '#F0FDF4',                       // Success background
    colorSuccessBorder: '#BBF7D0',                   // Success border
    
    colorWarning: clarivueColors.warning,            // Warning color
    colorWarningBg: '#FFFBEB',                       // Warning background
    colorWarningBorder: '#FED7AA',                   // Warning border
    
    colorError: clarivueColors.error,                // Error color
    colorErrorBg: '#FEF2F2',                         // Error background
    colorErrorBorder: '#FECACA',                     // Error border
    
    colorInfo: clarivueColors.info,                  // Info color
    colorInfoBg: '#EFF6FF',                          // Info background
    colorInfoBorder: '#BFDBFE',                      // Info border

    // Typography
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    fontSizeHeading1: 48,
    fontSizeHeading2: 40,
    fontSizeHeading3: 32,
    fontSizeHeading4: 24,
    fontSizeHeading5: 18,
    fontSizeLG: 16,
    fontSizeSM: 12,
    fontSizeXL: 20,
    
    // Line heights
    lineHeight: 1.5,
    lineHeightHeading1: 1.2,
    lineHeightHeading2: 1.3,
    lineHeightHeading3: 1.3,
    lineHeightHeading4: 1.4,
    lineHeightHeading5: 1.5,

    // Spacing and sizing
    sizeUnit: 4,
    sizeStep: 4,
    borderRadius: 12,           // Rounded corners
    borderRadiusLG: 16,         // Large rounded corners
    borderRadiusSM: 8,          // Small rounded corners
    borderRadiusXS: 4,          // Extra small rounded corners

    // Shadows
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    boxShadowSecondary: '0 4px 12px rgba(0, 0, 0, 0.08)',
    boxShadowTertiary: '0 8px 24px rgba(0, 0, 0, 0.12)',

    // Control elements
    controlHeight: 40,          // Default control height
    controlHeightSM: 32,        // Small control height
    controlHeightLG: 48,        // Large control height

    // Motion
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },

  components: {
    // Button component customization
    Button: {
      borderRadius: 12,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
      fontWeight: 600,
      primaryShadow: '0 2px 8px rgba(16, 118, 209, 0.2)',
      defaultShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    },

    // Card component customization
    Card: {
      borderRadius: 12,
      borderRadiusLG: 16,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      boxShadowTertiary: '0 4px 12px rgba(0, 0, 0, 0.08)',
      paddingLG: 24,
      headerBg: 'transparent',
    },

    // Layout component customization
    Layout: {
      bodyBg: clarivueColors.gray[50],
      headerBg: '#FFFFFF',
      siderBg: '#FFFFFF',
      triggerBg: clarivueColors.gray[100],
    },

    // Menu component customization
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: clarivueColors.primary[50],
      itemSelectedColor: clarivueColors.primary[500],
      itemHoverBg: clarivueColors.primary[50],
      itemHoverColor: clarivueColors.primary[500],
      itemActiveBg: clarivueColors.primary[100],
      iconSize: 20,
      borderRadius: 8,
    },

    // Input component customization
    Input: {
      borderRadius: 8,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      paddingInline: 16,
      activeShadow: '0 0 0 2px rgba(16, 118, 209, 0.2)',
    },

    // Typography component customization
    Typography: {
      titleMarginBottom: 16,
      titleMarginTop: 0,
    },

    // Statistic component customization
    Statistic: {
      titleFontSize: 14,
      contentFontSize: 32,
    },

    // Badge component customization
    Badge: {
      borderRadius: 8,
      fontSize: 12,
    },

    // Collapse component customization
    Collapse: {
      borderRadius: 12,
      headerBg: '#FFFFFF',
      contentBg: '#FFFFFF',
      borderRadiusLG: 12,
    },

    // List component customization
    List: {
      borderRadius: 8,
      itemPadding: '12px 16px',
    },

    // Tabs component customization
    Tabs: {
      borderRadius: 8,
      cardBg: '#FFFFFF',
      itemActiveColor: clarivueColors.primary[500],
      itemHoverColor: clarivueColors.primary[400],
      itemSelectedColor: clarivueColors.primary[500],
      inkBarColor: clarivueColors.primary[500],
    },
  },

  // Algorithm for theme generation
  algorithm: undefined, // Use default algorithm
};

// Custom gradients (can be used with inline styles)
export const clarivueGradients = {
  // Main brand gradient (180° vertical)
  brandVertical: 'linear-gradient(180deg, #1E2A78 0%, #5F9DF7 65%, #C1EFFF 100%)',
  
  // Hero gradient (135° diagonal)
  hero: `linear-gradient(135deg, ${clarivueColors.primary[500]} 0%, ${clarivueColors.secondary[500]} 100%)`,
  
  // CTA gradient (135° diagonal)  
  cta: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
  
  // Purple gradient
  purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  
  // Pink gradient
  pink: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  
  // Blue gradient
  blue: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
};

// Utility function to create gradient styles
export const createGradientStyle = (gradient: keyof typeof clarivueGradients) => ({
  background: clarivueGradients[gradient],
  color: 'white',
});

export default clarivueTheme; 