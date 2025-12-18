import { createClient } from '@supabase/supabase-js';

// Connection details from your Supabase Dashboard
const supabaseUrl = 'https://xcpisbucnvqqdttwazts.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjcGlzYnVjbnZxcWR0dHdhenRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMzUyMzcsImV4cCI6MjA4MTYxMTIzN30.2LqgaADJnnxTrAT7gPPU9k06Y1fXIGIhd1A330whUXo'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);