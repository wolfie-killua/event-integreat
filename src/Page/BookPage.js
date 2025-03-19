import React, { useState, useEffect } from 'react';
import { churchAPI } from '../services/churchAPI';
import { styles } from './BookPageStyle';

const BookPage = () => {
  const [priestName, setPriestName] = useState('');
  const [churchVenue, setChurchVenue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch bookings using the API
  const fetchAvailableBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the API to get bookings
      const { data, error: apiError } = await churchAPI.getAvailableBookings({
        priestName,
        churchVenue,
        selectedDate
      });
      
      if (apiError) {
        throw new Error(`Failed to fetch bookings: ${apiError.message || 'Unknown error'}`);
      }
      
      setSearchResults(data || []);
      setHasSearched(true);
    } catch (err) {
      console.error('Error in component:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle booking an available slot
  const handleBook = async (packageId) => {
    try {
      setLoading(true);
      
      // Use the API to book the package
      const { success, error: bookError } = await churchAPI.bookPackage(packageId);
      
      if (!success) {
        throw new Error(`Booking error: ${bookError.message || 'Unknown error'}`);
      }
      
      // Remove the booked item from the search results
      setSearchResults(prevResults => 
        prevResults.filter(item => item.package_id !== packageId)
      );
      
      alert(`Successfully booked package: ${packageId}`);
    } catch (err) {
      console.error('Error in booking component:', err);
      alert(`Failed to book the package: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search
  const handleSearch = () => {
    fetchAvailableBookings();
  };

  // Fetch all data on initial render
  useEffect(() => {
    fetchAvailableBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContainer}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>BOOK AN INFORMATION</h2>
        </div>

        {/* Layout Container */}
        <div style={styles.layoutContainer}>
          {/* Search Filters Container */}
          <div style={styles.filterContainer}>
            <h3 style={styles.filterTitle}>Search Filters</h3>

            <div style={styles.filterInputContainer}>
              {/* Priest Name Input */}
              <div>
                <label
                  htmlFor="priestName"
                  style={styles.inputLabel}
                >
                  Priest Name
                </label>
                <input
                  id="priestName"
                  type="text"
                  value={priestName}
                  onChange={(e) => setPriestName(e.target.value)}
                  placeholder="Enter priest name"
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8b5cf6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Church Venue Input */}
              <div>
                <label
                  htmlFor="churchVenue"
                  style={styles.inputLabel}
                >
                  Church Venue
                </label>
                <input
                  id="churchVenue"
                  type="text"
                  value={churchVenue}
                  onChange={(e) => setChurchVenue(e.target.value)}
                  placeholder="Enter church venue"
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8b5cf6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Date Picker */}
              <div>
                <label
                  htmlFor="eventDate"
                  style={styles.inputLabel}
                >
                  Date
                </label>
                <input
                  id="eventDate"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8b5cf6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Search Button */}
              <div style={styles.searchButton}>
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  style={styles.searchButtonStyle(loading)}
                  onMouseEnter={(e) => {
                    if (!loading) e.target.style.backgroundColor = '#5b21b6';
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) e.target.style.backgroundColor = '#6d28d9';
                  }}
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </div>

          {/* Results Container */}
          <div style={styles.resultsContainer}>
            <h3 style={styles.resultsTitle}>Search Results</h3>

            {error && (
              <div style={styles.errorContainer}>
                {error}
              </div>
            )}

            {!hasSearched ? (
              <div style={styles.noSearchContainer}>
                <strong>Use the search filters to find available bookings</strong>
              </div>
            ) : loading ? (
              <div style={styles.loadingContainer}>
                <strong>Loading results...</strong>
              </div>
            ) : searchResults.length === 0 ? (
              <div style={styles.noSearchContainer}>
                <strong>No bookings found matching your criteria</strong>
              </div>
            ) : (
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th style={styles.tableHeaderCell}>Package ID</th>
                      <th style={styles.tableHeaderCell}>Priest Name</th>
                      <th style={styles.tableHeaderCell}>Available Date</th>
                      <th style={styles.tableHeaderCell}>Church Venue</th>
                      <th style={{...styles.tableHeaderCell, textAlign: 'center'}}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((result) => (
                      <tr 
                        key={result.package_id}
                        style={styles.tableRow}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <td style={styles.tableCell}>{result.package_id}</td>
                        <td style={styles.tableCell}>{result.priest_name}</td>
                        <td style={styles.tableCell}>{formatDate(result.available_date)}</td>
                        <td style={styles.tableCell}>{result.church_venue}</td>
                        <td style={{...styles.tableCell, textAlign: 'center'}}>
                          <button
                            onClick={() => handleBook(result.package_id)}
                            disabled={loading}
                            style={styles.bookButton(loading)}
                            onMouseEnter={(e) => {
                              if (!loading) e.target.style.backgroundColor = '#059669';
                            }}
                            onMouseLeave={(e) => {
                              if (!loading) e.target.style.backgroundColor = '#10b981';
                            }}
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;