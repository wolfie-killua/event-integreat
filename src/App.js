import React, { useState } from 'react';
import Header from './component/header';
import BookPage from './Page/BookPage';


function App() {
  // State to track which page to show
  const [currentPage, setCurrentPage] = useState('home');
  
  // Function to change pages - pass this to the header
  const navigateTo = (page) => {
    setCurrentPage(page);
  };
  
  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'book':
        return <BookPage />;
      case 'create':
        return <div style={{ padding: '40px 20px' }}>About Page Content</div>;
      case 'about':
        return <div style={{ padding: '40px 20px' }}>About Page Content</div>;
      case 'notification':
        return <div style={{ padding: '40px 20px' }}>Notification Page Content</div>;
      case 'home':
      default:
        return (
          <div style={{ padding: '40px 20px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Home Page</h2>
            <p>Welcome to Killua Event Management. This is the home page content.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Header onNavigate={navigateTo} currentPage={currentPage} />
      
      <main style={{ 
        flexGrow: 1,
        backgroundColor: '#f9fafb',
        padding: 0
      }}>
        {renderPage()}
      </main>
      
      <footer style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '1rem 0',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          © {new Date().getFullYear()} Killua's Event Management. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;