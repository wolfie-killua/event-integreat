// server.js
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://sojdvxucakmyrdonsigv.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvamR2eHVjYWtteXJkb25zaWd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjM5OTkxMCwiZXhwIjoyMDU3OTc1OTEwfQ.m1mk4hwi1M5duDZ1xc1yiqrQAz4JIUdbA6pFTFL_7DU';

const supabase = createClient(supabaseUrl, supabaseKey);

// Routes

// GET - Available bookings with optional filters
app.get('/api/church/available', async (req, res) => {
  try {
    const { priestName, churchVenue, date } = req.query;
    
    // Build query
    let query = supabase
      .from('church_data')
      .select('package_id, priest_name, available_date, church_venue')
      .eq('status', 'Available');
    
    // Apply filters if provided
    if (priestName) {
      query = query.ilike('priest_name', `%${priestName}%`);
    }
    
    if (churchVenue) {
      query = query.ilike('church_venue', `%${churchVenue}%`);
    }
    
    if (date) {
      query = query.eq('available_date', date);
    }
    
    // Execute query
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching available bookings:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to fetch bookings'
    });
  }
});

// GET - All church venues
app.get('/api/church/venues', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('church_data')
      .select('church_venue');
    
    if (error) throw error;
    
    // Extract unique venues
    const uniqueVenues = [...new Set(data.map(item => item.church_venue))];
    
    res.json({ success: true, data: uniqueVenues });
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to fetch venues'
    });
  }
});

// GET - All priests
app.get('/api/church/priests', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('church_data')
      .select('priest_name');
    
    if (error) throw error;
    
    // Extract unique priests
    const uniquePriests = [...new Set(data.map(item => item.priest_name))];
    
    res.json({ success: true, data: uniquePriests });
  } catch (error) {
    console.error('Error fetching priests:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to fetch priests'
    });
  }
});

// POST - Book an event
app.post('/api/church/book/:packageId', async (req, res) => {
  try {
    const { packageId } = req.params;
    const { bookedBy } = req.body;
    
    const { error } = await supabase
      .from('church_data')
      .update({ 
        status: 'Booked',
        book_by: bookedBy || 'API User' 
      })
      .eq('package_id', packageId);
    
    if (error) throw error;
    
    res.json({ 
      success: true, 
      message: `Successfully booked package ID: ${packageId}`
    });
  } catch (error) {
    console.error('Error booking event:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to book event'
    });
  }
});

// POST - Create a new event
app.post('/api/church/create', async (req, res) => {
  try {
    const { priestName, churchVenue, availableDate } = req.body;
    
    // Validate required fields
    if (!priestName || !churchVenue || !availableDate) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: priestName, churchVenue, availableDate'
      });
    }
    
    // Get next package ID
    const { data: existingData, error: nextIdError } = await supabase
      .from('church_data')
      .select('package_id')
      .order('package_id', { ascending: false })
      .limit(1);
    
    if (nextIdError) throw nextIdError;
    
    const nextId = existingData && existingData.length > 0 
      ? existingData[0].package_id + 1 
      : 1;
    
    // Insert new record
    const { error: insertError } = await supabase
      .from('church_data')
      .insert([
        {
          package_id: nextId,
          priest_name: priestName.trim(),
          church_venue: churchVenue.trim(),
          available_date: availableDate,
          status: 'Available',
          book_by: null
        }
      ]);
    
    if (insertError) throw insertError;
    
    res.json({ 
      success: true, 
      packageId: nextId,
      message: 'Event created successfully'
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to create event'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});