import React from 'react';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  menuClasses,
  MenuItemStyles,
} from 'react-pro-sidebar';
import { Switch } from './components/Switch';
import { SidebarHeader } from './components/SidebarHeader';
import { Diamond } from './icons/Diamond';
import { BarChart } from './icons/BarChart';
import { Global } from './icons/Global';
import { InkBottle } from './icons/InkBottle';
import { Book } from './icons/Book';
import { Calendar } from './icons/Calendar';
import { ShoppingCart } from './icons/ShoppingCart';
import { Badge } from './components/Badge';
import LogoutIcon from '@mui/icons-material/Logout';

interface LeftMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

type Theme = 'light' | 'dark';

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#e5e2e2',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#0b2948',
      color: '#8ba1b7',
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#00458b',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const LeftMenu: React.FC<LeftMenuProps> = ({ children }) => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const theme: Theme = 'dark';

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes[theme].menu.menuContent,1)
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor,1),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  const logout = async () => {
    const url = '/api/auth/logout';
    const response = await fetch(url);
    const res = await response.json();
    if (response.ok) {
      window.location.reload();
    }
  };


  return (
    <Sidebar
      breakPoint="lg"
      backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor,1)}
      rootStyles={{
        color: themes[theme].sidebar.color,
        width: '270px',
        minWidth: '270px'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <SidebarHeader style={{  marginTop: '16px' }} collapsed={collapsed}  />
        <div style={{ flex: 1, marginBottom: '32px' }}>
          <hr style={{ backgroundColor: '#8ba1b7', border: 'none', height: '1px', marginBottom: '20px' }}/>
          <Menu menuItemStyles={menuItemStyles}>
            <SubMenu
              label="Charts"
              icon={<BarChart />}
              suffix={
                <Badge variant="danger" shape="circle">
                  6
                </Badge>
              }
            >
              <MenuItem> Pie charts</MenuItem>
              <MenuItem> Line charts</MenuItem>
              <MenuItem> Bar charts</MenuItem>
            </SubMenu>
            <SubMenu label="Maps" icon={<Global />}>
              <MenuItem> Google maps</MenuItem>
              <MenuItem> Open street maps</MenuItem>
            </SubMenu>
            <SubMenu label="Theme" icon={<InkBottle />}>
              <MenuItem> Dark</MenuItem>
              <MenuItem> Light</MenuItem>
            </SubMenu>
            <SubMenu label="Components" icon={<Diamond />}>
              <MenuItem> Grid</MenuItem>
              <MenuItem> Layout</MenuItem>
              <SubMenu label="Forms">
                <MenuItem> Input</MenuItem>
                <MenuItem> Select</MenuItem>
                <SubMenu label="More">
                  <MenuItem> CheckBox</MenuItem>
                  <MenuItem> Radio</MenuItem>
                </SubMenu>
              </SubMenu>
            </SubMenu>
            <SubMenu label="E-commerce" icon={<ShoppingCart />}>
              <MenuItem> Product</MenuItem>
              <MenuItem> Orders</MenuItem>
              <MenuItem> Credit card</MenuItem>
            </SubMenu>
          </Menu>

          <Menu menuItemStyles={menuItemStyles}>
            <MenuItem icon={<Calendar />} suffix={<Badge variant="success">New</Badge>}>
              Calendar
            </MenuItem>
          </Menu>

          <Menu menuItemStyles={menuItemStyles}>
            <hr style={{ backgroundColor: '#8ba1b7', border: 'none', height: '1px', marginBottom: '20px' }}/>
            <MenuItem icon={<LogoutIcon />} onClick={logout}>Выйти</MenuItem>
          </Menu>
        </div>

        <div style={{ margin: '50px auto' }}>
          <Switch
            id="collapse"
            checked={collapsed}
            onChange={() => collapseSidebar()}
          />
        </div>
      </div>
    </Sidebar>
  );
};

export default LeftMenu;
