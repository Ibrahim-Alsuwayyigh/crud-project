import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://psstpeudfqshqcbkcljw.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzc3RwZXVkZnFzaHFjYmtjbGp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMzc4NzYsImV4cCI6MjA5MjcxMzg3Nn0.1yXEjwM3_ZeuMoSVEcVrMvovKbOnhR_jfS-sMlX3snw"

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)