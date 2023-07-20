export interface PlatformColors {
  primary: string;
  secondary: string;
  grey: string;
  searchBg: string;
  success: string;
  error: string;
  warning: string;
}

const platformColors: Partial<PlatformColors> = {
  primary: '#33cc33',
  secondary: '#FF3366',
  grey: '#7d7d7d',
  searchBg: '#dcdce1',
  success: '#008000',
  error: '#cc0011',
  warning: '#ffc107',
};

const platformColorsDark: Partial<PlatformColors> = {
  primary: '#33cc33',
  secondary: '#FF3366',
  grey: '#ffffff',
  searchBg: '#393e42',
  success: '#008000',
  error: '#cc0011',
  warning: '#ffc107',
};

export type DWTTheme = {
  name: string;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    popup: string;
    popbuttonDark: string;
    popbuttonLight:  string;
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;
    white: string;
    black: string;
    grey0: string;
    grey1Light: string;
    grey1Dark: string;
    grey1: string;
    grey2: string;
    grey3: string;
    grey4: string;
    grey5: string;
    info: string;
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    success: string;
    error: string;
    warning: string;
    disabled: string;
    divider: string;
    platform: Partial<PlatformColors>;
    background: string;
    darkerBackground: string;
    darkerBackground2: string;
    transparent: string;
  };
};

const lightTheme: DWTTheme = {
  name: 'light',
  colors: {
    primaryLight: '#06ac9e',
    primary: '#0378ff',
    primaryDark: '#007067',
    popup: '#000000',
    popbuttonDark: '#0378ff',
    popbuttonLight: '#00a8ec',
    secondary: '#000000',
    secondaryLight: '#000000',
    secondaryDark: '#000000',
    h1: '#000000',
    h2: '#262626',
    h3: '#333333',
    h4: '#8c8c8c',
    h5: '#666666',
    white: '#ffffff',
    black: '#1a1a1a', // 10% black
    grey0: '#f2f2f2',
    grey1Light: '#e6e6e6',
    grey1Dark: '#dedede',
    grey1: '#d9d9d9',
    grey2: '#bfbfbf',
    grey3: '#a6a6a6',
    grey4: '#8c8c8c',
    grey5: '#737373',
    info: '#e6e6e6',
    success: '#008000',
    error: '#e62e00',
    warning: '#ffc107',
    disabled: '#e6e6e6',
    divider: '#e6e6e6',
    platform: platformColors,
    background: '#f2f2f2',
    darkerBackground: '#e6e6e6',
    darkerBackground2: '#d9d9d9',
    transparent: 'transparent',
  },
};

const darkTheme: DWTTheme = {
  name: 'dark',
  colors: {
    primaryLight: '#08d4c4',
    primary: '#0378ff',
    primaryDark: '#008075',
    popup: '#000000',
    popbuttonDark: '#0378ff',
    popbuttonLight: '#00a8ec',
    secondary: '#000000',
    secondaryLight: '#000000',
    secondaryDark: '#000000',
    h1: '#f2f2f2',
    h2: '#e6e6e6',
    h3: '#bfbfbf',
    h4: '#8c8c8c',
    h5: '#737373',
    white: '#ffffff',
    black: '#1a1a1a', // 10% black
    grey0: '#f2f2f2',
    grey1Light: '#e6e6e6',
    grey1Dark: '#dedede',
    grey1: '#d9d9d9',
    grey2: '#bfbfbf',
    grey3: '#bfbfbf',
    grey4: '#8c8c8c',
    grey5: '#737373',
    info: '#e6e6e6',
    success: '#008000',
    error: '#e62e00',
    warning: '#ffc107',
    disabled: '#e6e6e6',
    divider: '#e6e6e6',
    platform: platformColorsDark,
    background: '#1a1a1a', //#1a1a1a
    darkerBackground: '#262626',
    darkerBackground2: '#333333',
    transparent: 'transparent',
  },
};

export {lightTheme, darkTheme};
