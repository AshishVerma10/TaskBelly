
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ sidebar, content }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-8">
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-6`}>
          {sidebar}
          <div className="flex-1">
            {content}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
