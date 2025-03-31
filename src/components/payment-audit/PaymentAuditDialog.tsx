import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PaymentAuditForm } from "./PaymentAuditForm";

interface PaymentAuditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

export function PaymentAuditDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: PaymentAuditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Auditoria" : "Nova Auditoria"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Edite os detalhes da auditoria de pagamento"
              : "Adicione uma nova auditoria de pagamento"}
          </DialogDescription>
        </DialogHeader>
        <PaymentAuditForm onSubmit={onSubmit} initialData={initialData} />
      </DialogContent>
    </Dialog>
  );
} 