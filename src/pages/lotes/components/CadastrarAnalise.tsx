import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

interface CadastrarAnaliseProps {
  lote: string;
  fetchLote: () => Promise<void>;
  fetchAnalises: () => Promise<void>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CadastrarAnalise: FC<CadastrarAnaliseProps> = ({
  lote,
  fetchLote,
  fetchAnalises,
  isOpen,
  setIsOpen,
}) => {
  const [ensaios, setEnsaios] = useState<IEnsaio[]>();
  const { toast } = useToast();

  useEffect(() => {
    fetchEnsaios();
  }, []);

  const fetchEnsaios = async () => {
    const { data } = await axios.get<IEnsaio[]>(
      "https://uno-api-pdre.onrender.com/api/v1/ensaio"
    );

    setEnsaios(data);
  };

  const loteSchema = z.object({
    especificacao: z.string(),
    resultado: z.string(),
    unidade: z.string(),
    observacao: z.string(),
    ensaio: z.string(),
  });

  const form = useForm<z.infer<typeof loteSchema>>({
    resolver: zodResolver(loteSchema),
    defaultValues: {
      especificacao: "",
      resultado: "",
      unidade: "",
      observacao: "",
      ensaio: "",
    },
  });

  const cadastrar = async (data: z.infer<typeof loteSchema>) => {
    try {
      const analise: IAnalise = {
        id: "",
        especificacao: Number(data.especificacao),
        resultado: Number(data.resultado),
        unidade: data.unidade,
        observacao: data.observacao,
        lote: {
          id: lote,
          amostra: "",
          notaFiscal: "",
          dataEntrada: "",
          dataValidade: "",
          descricao: "",
          quantidade: 0,
          solicitacaoAnalise: {
            nomeProjeto: "",
            tipoAnalise: "",
            prazoAcordado: "",
            conclusaoProjeto: "",
            descricaoProjeto: "",
            solicitante: {
              id: "",
              cnpj: "",
              nome: "",
              telefone: "",
              email: "",
              endereco: "",
              cidade: "",
              estado: "",
            },
          },
        },

        ensaio: {
          id: "",
          nome: data.ensaio,
        },
      };

      await axios.post(
        "https://uno-api-pdre.onrender.com/api/v1/analise",
        analise
      );

      form.reset({
        especificacao: "",
        resultado: "",
        unidade: "",
        observacao: "",
        ensaio: "",
      });

      toast({
        title: "Lote cadastrado com sucesso",
        variant: "success",
      });

      fetchLote();
      fetchAnalises();
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
    ensaios && (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger onClick={() => setIsOpen(true)}>
          <Plus className="text-zinc-800 mt-2" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrar nova analise</DialogTitle>
            <DialogDescription>
              Informe os dados da análise efetuada
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
                  name="ensaio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ensaio</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o ensaio efetuado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ensaios.map((ensaio) => (
                              <SelectItem value={ensaio.nome} key={ensaio.id}>
                                {ensaio.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="especificacao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Especificação</FormLabel>
                      <FormControl>
                        <Input placeholder="Especificação" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resultado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resultado</FormLabel>
                      <FormControl>
                        <Input placeholder="Resultado" {...field} />
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
                      <FormLabel>Unidade</FormLabel>
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
                    name="observacao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observação</FormLabel>
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
    )
  );
};

export default CadastrarAnalise;
