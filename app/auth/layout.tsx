import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full flex items-center justify-center bg-[linear-gradient(to_bottom,#fff,#E4DFEDFF_34%,#817FF4FF_65%,#A4BBFFFF_82%)]">
      {children}
    </main>
  );
};

export default AuthLayout;
