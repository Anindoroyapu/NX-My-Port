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
        // replace with real auth check if needed
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
        <div
            style={{
             
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 9999,
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    background: "#fff",
                    padding: 24,
                    borderRadius: 8,
                    minWidth: 320,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                    fontFamily: "system-ui, -apple-system, Roboto, sans-serif",
                }}
            >
                <h2 style={{ margin: "0 0 12px 0" }}>Admin Login</h2>

                <label style={{ display: "block", marginBottom: 8 }}>
                    <div style={{ fontSize: 12, marginBottom: 4 }}>Email</div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
                    />
                </label>

                <label style={{ display: "block", marginBottom: 12 }}>
                    <div style={{ fontSize: 12, marginBottom: 4 }}>Password</div>
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        required
                        style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
                    />
                </label>

                {error && <div style={{ color: "red", marginBottom: 12, fontSize: 13 }}>{error}</div>}

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <button
                        type="button"
                        onClick={() => {
                            setEmail("");
                            setPass("");
                        }}
                        style={{ padding: "8px 12px" }}
                    >
                        Reset
                    </button>
                    <button type="submit" style={{ padding: "8px 12px" }}>
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
};