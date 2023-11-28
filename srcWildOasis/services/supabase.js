import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://obwoskisoovetdksbvve.supabase.co";

// save to expose this key as Row Level Security is enabled
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9id29za2lzb292ZXRka3NidnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4MTIyMTcsImV4cCI6MjAxNjM4ODIxN30.IvgM5dEcNJHO6jfXcQ4Ks2RQ9XvNYcbnYbZo7F7cH4M";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
