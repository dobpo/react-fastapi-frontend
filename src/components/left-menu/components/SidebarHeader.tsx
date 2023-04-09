import styled from '@emotion/styled';
import React from 'react';

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed: boolean,
  children?: React.ReactNode;
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children, collapsed, ...rest }) => {
  return (
    <StyledSidebarHeader {...rest}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            backgroundImage: `url(${collapsed ? '/img/logo/logo_collapsed.png' : '/img/logo/logo.png'})`,
            height: '50px',
            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transition: 'background 0.3s'
          }}
        />
      </div>
    </StyledSidebarHeader>
  );
};
