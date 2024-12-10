const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 w-screen">
      {children}
    </main>
  );
};

export default AuthLayout;
