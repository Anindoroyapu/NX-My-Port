import React from "react";

type AuthContextType = {
    locked: boolean;
    error: string;
    signIn: (email: string, pass: string) => boolean;
    signOut: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

type Props = { children?: React.ReactNode };

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [locked, setLocked] = React.useState<boolean>(() =>
        typeof window !== "undefined" ? sessionStorage.getItem("admin_auth") !== "1" : true
    );
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") === "1") {
            setLocked(false);
        }
    }, []);

    const signIn = (email: string, pass: string) => {
        if (email === "anindoroy112@gmail.com" && pass === "12345") {
            if (typeof window !== "undefined") sessionStorage.setItem("admin_auth", "1");
            setError("");
            setLocked(false);
            return true;
        } else {
            setError("Invalid email or password");
            return false;
        }
    };

    const signOut = () => {
        if (typeof window !== "undefined") sessionStorage.removeItem("admin_auth");
        setLocked(true);
        setError("");
    };

    const value: AuthContextType = {
        locked,
        error,
        signIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {locked ? <AuthModal /> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const ctx = React.useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
};

/* Internal modal component reused by the provider */
const AuthModal: React.FC = () => {
    const { error, signIn } = React.useContext(AuthContext)!;
    const [email, setEmail] = React.useState("");
    const [pass, setPass] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signIn(email, pass);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded-xl bg-white p-6 sm:p-8 shadow-2xl"
            >
                <div className="mb-2 flex justify-center">
                    <div className="flex size-12 sm:size-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-lg sm:text-xl font-bold text-white shadow-lg">
                        A
                    </div>
                </div>
                <h2 className="mb-1 text-center text-lg sm:text-xl font-semibold text-slate-800">
                    Admin Login
                </h2>
                <p className="mb-6 text-center text-xs sm:text-sm text-slate-400">
                    Asha Lenscraft Dashboard
                </p>

                <div className="mb-4">
                    <label className="mb-1.5 block text-xs sm:text-sm font-medium text-slate-600">
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        placeholder="anindoroy112@gmail.com"
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-100 min-h-[44px]"
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-1.5 block text-xs sm:text-sm font-medium text-slate-600">
                        Password
                    </label>
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        required
                        placeholder="Enter your password"
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-100 min-h-[44px]"
                    />
                </div>

                {error && (
                    <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-xs sm:text-sm text-red-600">
                        {error}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            setEmail("");
                            setPass("");
                        }}
                        className="flex-1 cursor-pointer rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 min-h-[44px]"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="flex-1 cursor-pointer rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-amber-600 hover:to-orange-600 active:scale-[0.98] min-h-[44px]"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
};
