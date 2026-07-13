'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { spawn } from "child_process"

export default function LoginPage(){

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState("")
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleLogin = async (e: React.SubmitEvent) => {
        e.preventDefault();
        seterror('')
        setloading(true)

        try {
            const res = await fetch('/api/admin/login/',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user, password})
            })

            const data = await res.json()

            if(!res.ok){
                throw new Error(data.error || 'Failed to authenticate')
            }

            router.push('/admin')
            router.refresh()

        } catch (error:any) {
            seterror(error.message)
        } finally {
            setloading(false)
        }

    }

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 ">

                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 text-2xl mb-3">
                        🔒
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Portal</h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Sign in to manage your system metrics
                    </p>
                </div>


                {/* Dynamic Error Banner */}
                {error && (
                    <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-shake">
                        ⚠️ <span>{error}</span>
                    </div>
                )}

                {/* Login Form */}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                            Username
                        </label>
                        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required placeholder="name"
                        className="w-full  h-12 px-4 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 text-sm focus:outline-none focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"/>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                        Password
                        </label>
                        <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                        />
                    </div>

                     <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 mt-2 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-md shadow-blue-500/10 hover:bg-blue-700 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
                    >
                        {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Verifying Credentials...
                        </span>
                        ) : (
                        'Access Catalogue'
                        )}
                    </button>
                </form>
            </div>


        </div>
    )
}