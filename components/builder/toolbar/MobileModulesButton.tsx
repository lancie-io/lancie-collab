'use client';
import BuilderSidebar from '@/components/project/BuilderSidebar';
import { useView } from '@/components/providers/ViewProvider';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LayoutGrid } from 'lucide-react';

const MobileModulesButton = () => {
  const { isView } = useView();
  if (isView) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button size="iconSmall">
          <LayoutGrid className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-0">
        <SheetHeader>
          <SheetTitle className="text-left pl-3">Modules</SheetTitle>
        </SheetHeader>
        <BuilderSidebar className="max-h-[100dvh] overflow-scroll" />
      </SheetContent>
    </Sheet>
  );
};

export default MobileModulesButton;
