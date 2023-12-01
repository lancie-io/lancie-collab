interface ElementBarProps {
  children: React.ReactNode;
}

const ElementBar = ({ children }: ElementBarProps) => {
  return (
    <div className="flex items-center border-b h-12 gap-2 px-2 shrink-0">
      {children}
    </div>
  );
};

export default ElementBar;
