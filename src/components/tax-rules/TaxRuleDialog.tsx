import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaxRuleForm } from "./TaxRuleForm";

interface TaxRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

export function TaxRuleDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: TaxRuleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Regra Tributária" : "Nova Regra Tributária"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Edite os detalhes da regra tributária selecionada."
              : "Preencha os detalhes para criar uma nova regra tributária."}
          </DialogDescription>
        </DialogHeader>
        <TaxRuleForm onSubmit={onSubmit} initialData={initialData} />
      </DialogContent>
    </Dialog>
  );
} 