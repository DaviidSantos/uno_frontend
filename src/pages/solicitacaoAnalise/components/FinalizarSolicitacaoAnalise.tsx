import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import axios, { AxiosError } from "axios";
import { useToast } from "../../../components/ui/use-toast";

interface FinalizarSolicitacaoAnaliseProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  solicitacaoAnalise: ISolicitacaoAnalise;
  fetchSolicitacaoAnalise: () => Promise<void>;
}

const FinalizarSolicitacaoAnalise: FC<FinalizarSolicitacaoAnaliseProps> = ({
  isOpen,
  setIsOpen,
  solicitacaoAnalise,
  fetchSolicitacaoAnalise,
}) => {
  const { toast } = useToast();

  const finalizarSolicitacaoAnalise = async () => {
    try {
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      solicitacaoAnalise.conclusaoProjeto = `${year}-${month}-${day}`;

      await axios.patch(
        "https://uno-api-pdre.onrender.com/api/v1/solicitacao-analise",
        solicitacaoAnalise
      );

      fetchSolicitacaoAnalise();
      toast({
        title: "Solicitação de Análise finalizada com sucesso",
        variant: "success",
      });
      setIsOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.erro,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        className="self-start flex-end py-8"
      >
        <Button size={"sm"}>Finalizar Solicitação de Análise</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Finalizar Solicitação de Análise?</DialogTitle>
          <DialogDescription>
            Você tem certeza que quer finalizar essa Solicitação de Análise?
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between pt-4">
          <Button
            variant={"destructive"}
            onClick={() => finalizarSolicitacaoAnalise()}
          >
            Finalizar projeto
          </Button>
          <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FinalizarSolicitacaoAnalise;
