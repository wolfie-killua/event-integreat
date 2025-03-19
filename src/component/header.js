import React from 'react';

const Header = ({ onNavigate, currentPage }) => {
  const navItems = [
    { name: 'HOME', icon: '🏠', path: 'home' },
    { name: 'ABOUT', icon: 'ℹ️', path: 'about' },
    { name: 'BOOK', icon: '📖', path: 'book' },
    { name: 'NOTIFICATION', icon: '🔔', path: 'notification' },
    { name: 'CREATE', icon: '➕', path: 'create' }
  ];

  const getActiveItem = (itemPath) => {
    return itemPath === currentPage;
  };

  return (
    <header style={{
      width: '100%',
      background: 'linear-gradient(90deg, #4338ca, #6d28d9, #8b5cf6)',
      padding: '18px 0',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Logo/Brand Name - explicitly aligned left */}
        <div style={{
          flex: '1',
          textAlign: 'left'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: 'white',
            margin: 0,
            letterSpacing: '0.5px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer'
          }}
          onClick={() => onNavigate('home')}>
            KILLUA'S EVENT MANAGEMENT
          </h1>
        </div>
        
        {/* Navigation - explicitly aligned right */}
        <nav style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-end'
        }}>
          {navItems.map((item) => (
            <button
              key={item.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 16px',
                backgroundColor: getActiveItem(item.path) ? 'white' : 'rgba(255, 255, 255, 0.1)',
                color: getActiveItem(item.path) ? '#6d28d9' : 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.25s ease',
                boxShadow: getActiveItem(item.path) 
                  ? '0 4px 8px rgba(0, 0, 0, 0.1)' 
                  : '0 2px 4px rgba(0, 0, 0, 0.05)',
                letterSpacing: '0.5px',
                marginLeft: '5px'
              }}
              onClick={() => onNavigate(item.path)}
              onMouseEnter={(e) => {
                if (!getActiveItem(item.path)) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!getActiveItem(item.path)) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                }
              }}
            >
              <span style={{ 
                marginRight: '8px',
                fontSize: '16px'
              }}>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;