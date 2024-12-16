interface DefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <h1>Header</h1>
      {children}
      <h2>Footer</h2>
    </>
  );
}
