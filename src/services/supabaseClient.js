import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://sojdvxucakmyrdonsigv.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvamR2eHVjYWtteXJkb25zaWd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjM5OTkxMCwiZXhwIjoyMDU3OTc1OTEwfQ.m1mk4hwi1M5duDZ1xc1yiqrQAz4JIUdbA6pFTFL_7DU';

console.log('Supabase URL:', supabaseUrl);
console.log('Attempting to connect to Supabase');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

