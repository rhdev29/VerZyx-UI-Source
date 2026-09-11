import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getSupabaseClient } from './supabase.js'

const app = new Hono()

app.use('*', cors())

app.post('/api/auth/signup', async (c) => {
    const { emailSignUp, passwordSignUp } = await c.req.json()
    const supabase = getSupabaseClient(c.env)

    try {
        const { data, error } = await supabase.auth.signUp({
            email: emailSignUp,
            password: passwordSignUp,
        })
        
        if (error) {
            c.status(400)
            return c.json({ error: error.message })
        }

        c.status(201)
        return c.json({ data })
    } catch (err) {
        c.status(500)
        return c.json({ error: err.message })
    }
})

app.post('/api/auth/signin', async (c) => {
    const { emailSignIn, passwordSignIn } = await c.req.json()
    const supabase = getSupabaseClient(c.env)

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: emailSignIn,
            password: passwordSignIn,
        })

        if (error) {
            c.status(400)
            return c.json({ error: error.message })
        }

        c.status(200)
        return c.json({ data })
    } catch (err) {
        c.status(500)
        return c.json({ error: err.message })
    }
})

export default app