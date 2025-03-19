// BookPageStyles.js
export const styles = {
    container: {
      width: '95%',
      padding: '20px',
      maxWidth: '95%',
      margin: '0 auto',
      backgroundColor: '#f9fafb'
    },
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    header: {
      borderBottom: '2px solid #6d28d9',
      paddingBottom: '15px',
      marginBottom: '5px'
    },
    headerTitle: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#6d28d9'
    },
    layoutContainer: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap'
    },
    filterContainer: {
      flex: '0 0 280px',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      alignSelf: 'flex-start'
    },
    filterTitle: {
      fontSize: '18px',
      marginBottom: '20px',
      color: '#4b5563',
      fontWeight: '600'
    },
    filterInputContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    inputLabel: {
      display: 'block',
      marginBottom: '6px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#4b5563'
    },
    input: {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#8b5cf6',
      boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.2)'
    },
    inputBlur: {
      borderColor: '#d1d5db',
      boxShadow: 'none'
    },
    searchButton: {
      marginTop: '10px'
    },
    searchButtonStyle: (loading) => ({
      backgroundColor: loading ? '#9ca3af' : '#6d28d9',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '10px 20px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: loading ? 'not-allowed' : 'pointer',
      width: '100%',
      transition: 'background-color 0.2s',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }),
    resultsContainer: {
      flex: '1',
      minWidth: '0',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      overflow: 'auto'
    },
    resultsTitle: {
      fontSize: '18px',
      marginBottom: '20px',
      color: '#4b5563',
      fontWeight: '600'
    },
    errorContainer: {
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
      padding: '10px 15px',
      borderRadius: '8px',
      marginBottom: '20px'
    },
    noSearchContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      color: '#4b5563',
      fontSize: '16px',
      backgroundColor: '#f3f4f6',
      border: '1px solid #e5e7eb',
      borderRadius: '8px'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      color: '#6d28d9',
      fontSize: '16px'
    },
    tableContainer: {
      overflow: 'auto',
      width: '100%'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px'
    },
    tableHeader: {
      backgroundColor: '#f3f4f6',
      borderBottom: '2px solid #e5e7eb'
    },
    tableHeaderCell: {
      padding: '12px 16px',
      textAlign: 'left',
      fontWeight: '600',
      color: '#4b5563'
    },
    tableRow: {
      borderBottom: '1px solid #e5e7eb',
      transition: 'background-color 0.2s'
    },
    tableRowHover: {
      backgroundColor: '#f9fafb'
    },
    tableCell: {
      padding: '12px 16px'
    },
    bookButton: (loading) => ({
      backgroundColor: loading ? '#9ca3af' : '#10b981',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '6px 12px',
      fontSize: '13px',
      fontWeight: '500',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.2s'
    })
  };