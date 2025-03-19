// churchAPI.js
import { supabase } from '../services/supabaseClient';

/**
 * API for interacting with church data in Supabase
 */
export const churchAPI = {
  /**
   * Fetch available bookings based on search criteria
   * @param {Object} filters - Search filters
   * @param {string} filters.priestName - Priest name to search for (optional)
   * @param {string} filters.churchVenue - Church venue to search for (optional)
   * @param {string} filters.selectedDate - Date to search for (optional)
   * @returns {Promise<{data: Array, error: Error|null}>} - Search results or error
   */
  async getAvailableBookings(filters = {}) {
    try {
      const { priestName, churchVenue, selectedDate } = filters;
      console.log('Fetching data from Supabase');
      console.log('Search criteria:', { priestName, churchVenue, selectedDate });
      
      // Start with a base query to select all data from church_data where status is 'Available'
      let query = supabase
        .from('church_data')
        .select('package_id, priest_name, available_date, church_venue')
        .eq('status', 'Available');
      
      // Add filters only if they exist
      // Priest Name - case insensitive, partial match
      if (priestName && priestName.trim() !== '') {
        query = query.ilike('priest_name', `%${priestName.trim()}%`);
      }
      
      // Church Venue - case insensitive, partial match
      if (churchVenue && churchVenue.trim() !== '') {
        query = query.ilike('church_venue', `%${churchVenue.trim()}%`);
      }
      
      // Date - exact match if provided
      if (selectedDate && selectedDate.trim() !== '') {
        query = query.eq('available_date', selectedDate.trim());
      }
      
      console.log('Executing Supabase query');
      const { data, error } = await query;
      
      if (error) {
        console.error('Supabase query error details:', error);
        return { data: null, error: error };
      }
      
      console.log('Data received:', data);
      return { data, error: null };
    } catch (err) {
      console.error('Error fetching bookings (full error):', err);
      return { data: null, error: err };
    }
  },

  /**
   * Book an available slot by updating its status
   * @param {string} packageId - ID of the package to book
   * @param {string} bookBy - Name or identifier of the user making the booking
   * @returns {Promise<{success: boolean, error: Error|null}>} - Result of booking operation
   */
  async bookPackage(packageId, bookBy = 'EVENT TRIBE') {
    try {
      // Update the booking status and add the book_by info
      const { error } = await supabase
        .from('church_data')
        .update({ 
          status: 'booked',
          book_by: bookBy
        })
        .eq('package_id', packageId);
      
      if (error) {
        console.error('Supabase update error:', error);
        return { success: false, error };
      }
      
      return { success: true, error: null };
    } catch (err) {
      console.error('Error booking package:', err);
      return { success: false, error: err };
    }
  },

  /**
   * Get all church venues
   * @returns {Promise<{data: Array, error: Error|null}>} - List of venues or error
   */
  async getAllVenues() {
    try {
      const { data, error } = await supabase
        .from('church_data')
        .select('church_venue')
        .order('church_venue');
      
      if (error) return { data: null, error };
      
      // Remove duplicates
      const uniqueVenues = [...new Set(data.map(item => item.church_venue))];
      return { data: uniqueVenues, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Get all priests
   * @returns {Promise<{data: Array, error: Error|null}>} - List of priests or error
   */
  async getAllPriests() {
    try {
      const { data, error } = await supabase
        .from('church_data')
        .select('priest_name')
        .order('priest_name');
      
      if (error) return { data: null, error };
      
      // Remove duplicates
      const uniquePriests = [...new Set(data.map(item => item.priest_name))];
      return { data: uniquePriests, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};