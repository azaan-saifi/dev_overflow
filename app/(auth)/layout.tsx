import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-center size-full min-h-screen bg-[url('/assets/images/auth-light.png')] bg-cover bg-center py-10 dark:bg-[url('/assets/images/auth-dark.png')]">
      {children}
    </main>
  );
};

export default Layout;
