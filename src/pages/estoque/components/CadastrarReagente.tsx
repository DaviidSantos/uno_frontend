import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";

import { Button } from "../../../components/ui/button";

import { Textarea } from "../../../components/ui/textarea";
import axios, { AxiosError } from "axios";
import { useToast } from "../../../components/ui/use-toast";

interface CadastrarReagenteProps {
  nomeEstoque: string;
  fetchReagentes: () => Promise<void>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CadastrarReagente: FC<CadastrarReagenteProps> = ({
  nomeEstoque,
  fetchReagentes,
  isOpen,
  setIsOpen,
}) => {
  const { toast } = useToast();

  const reagenteSchema = z.object({
    nome: z.string(),
    fornecedor: z.string(),
    descricao: z.string(),
    unidade: z.string(),
    quantidade: z.string(),
  });

  const form = useForm<z.infer<typeof reagenteSchema>>({
    resolver: zodResolver(reagenteSchema),
    defaultValues: {
      nome: "",
      fornecedor: "",
      descricao: "",
      unidade: "",
      quantidade: "",
    },
  });

  const cadastrar = async (data: z.infer<typeof reagenteSchema>) => {
    try {
      const reagente: IReagente = {
        id: "",
        nome: data.nome,
        fornecedor: data.fornecedor,
        descricao: data.descricao,
        unidade: data.unidade,
        quantidade: Number(data.quantidade),
        estoque: {
          id: "",
          nome: nomeEstoque,
        },
      };

      await axios.post(
        "https://uno-api-pdre.onrender.com/api/v1/reagente",
        reagente
      );

      form.reset({
        nome: "",
        fornecedor: "",
        descricao: "",
        unidade: "",
        quantidade: "",
      });

      toast({
        title: "Reagente cadastrado com sucesso",
        variant: "success",
      });

      fetchReagentes();
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
      <DialogTrigger onClick={() => setIsOpen(true)}>
        <Plus className="text-zinc-800 mt-2" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar novo reagente</DialogTitle>
          <DialogDescription>
            Informe os dados de entrada do novo reagente
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Form {...form}>
            <form
              className="grid grid-cols-2 gap-8 h-fit"
              onSubmit={form.handleSubmit(cadastrar)}
            >
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reagente</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do reagente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fornecedor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fornecedor</FormLabel>
                    <FormControl>
                      <Input placeholder="Fornecedor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qauntidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Quantidade de entrada" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidade de medida</FormLabel>
                    <FormControl>
                      <Input placeholder="Unidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição do reagente</FormLabel>
                      <FormControl>
                        <Textarea rows={7} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="col-span-2">
                Cadastrar
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CadastrarReagente;
