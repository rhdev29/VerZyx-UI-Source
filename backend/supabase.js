import { createClient } from '@supabase/supabase-js'

export function getSupabaseClient(env) {
    const supabaseUrl = env.SUPABASE_URL
    const supabaseAnonKey = env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be configured')
    }

    return createClient(supabaseUrl, supabaseAnonKey)
}