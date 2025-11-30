import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ksilqbnsyeqkcbcijein.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzaWxxYm5zeWVxa2NiY2lqZWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0OTYxNjksImV4cCI6MjA4MDA3MjE2OX0.5Xgpj3SSracDxunER6Zl1epgZ542ZtzXaMwNqJpCpvk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
