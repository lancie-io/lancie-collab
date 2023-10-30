interface ModuleButtonProps {
  icon: React.ReactNode;
  label: string;
}

const ModuleButton = ({ icon, label }: ModuleButtonProps) => {
  return (
    <div className="cursor-pointer transition duration-150 aspect-square border-2 shadow-sm rounded-xl flex flex-col items-center justify-center gap-1.5 hover:border-primary hover:shadow-lg">
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
};

export default ModuleButton;
