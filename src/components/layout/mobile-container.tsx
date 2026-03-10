interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileContainer({ children, className }: MobileContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[430px] min-h-screen ${className ?? ""}`}>
      {children}
    </div>
  );
}
