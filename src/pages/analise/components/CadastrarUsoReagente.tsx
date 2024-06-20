import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../../../components/ui/use-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

interface CadastrarUsoReagenteProps {
  analiseId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  fetchReagenteAnalise: () => Promise<void>;
}

const CadastrarUsoReagente: FC<CadastrarUsoReagenteProps> = ({
  analiseId,
  isOpen,
  setIsOpen,
  fetchReagenteAnalise,
}) => {
  const { toast } = useToast();
  const [estoques, setEstoques] = useState<IEstoque[]>();
  const [reagentes, setReagentes] = useState<IReagente[]>();
  const [estoqueSelecionado, setEstoqueSelecionado] = useState<
    string | undefined
  >();

  useEffect(() => {
    fetchEstoques();
  }, []);

  useEffect(() => {
    fetchReagentes();
  }, [estoqueSelecionado]);

  const fetchEstoques = async () => {
    const { data } = await axios.get<IEstoque[]>(
      `https://uno-api-pdre.onrender.com/api/v1/estoque`
    );

    setEstoques(data);
  };

  const fetchReagentes = async () => {
    if (estoqueSelecionado) {
      const { data } = await axios.get<IReagente[]>(
        `https://uno-api-pdre.onrender.com/api/v1/reagente?estoque=${estoqueSelecionado}`
      );

      setReagentes(data);
    }
  };

  const usoReagenteSchema = z.object({
    reagente_id: z.string(),
    quantidade: z.string(),
  });

  const form = useForm<z.infer<typeof usoReagenteSchema>>({
    resolver: zodResolver(usoReagenteSchema),
    defaultValues: {
      reagente_id: "",
      quantidade: "",
    },
  });

  const cadastrar = async (data: z.infer<typeof usoReagenteSchema>) => {
    console.log(data);
    try {
      const reagenteAnalise: IReagenteAnalise = {
        analise_id: analiseId,
        reagente_id: data.reagente_id,
        quantidade: Number(data.quantidade),
      };

      await axios.post(
        "https://uno-api-pdre.onrender.com/api/v1/reagente-analise",
        reagenteAnalise
      );

      form.reset({
        reagente_id: "",
        quantidade: "",
      });

      toast({
        title: "Informe de reagente utilizado efetuado com sucesso",
        variant: "success",
      });

      fetchReagenteAnalise();
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
    estoques && (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger onClick={() => setIsOpen(true)}>
          <Plus className="text-zinc-800 mt-2" />
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Informe o uso de reagente</DialogTitle>
            <DialogDescription>
              Informe o uso de um reagente para a análise efetuada
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Form {...form}>
              <form
                className="grid grid-cols-2 gap-8 h-fit"
                onSubmit={form.handleSubmit(cadastrar)}
              >
                <div>
                  <FormItem>
                    <FormLabel>Estoque</FormLabel>
                    <Select
                      onValueChange={(nome) => setEstoqueSelecionado(nome)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estoque utilizado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {estoques.map((estoque) => (
                          <SelectItem value={estoque.nome}>
                            {estoque.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                </div>

                <FormField
                  control={form.control}
                  name="reagente_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reagente</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o reagente utilizado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {reagentes?.map((reagente) => (
                              <SelectItem value={reagente.id}>
                                {reagente.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="quantidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantidade</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Quantidade utilizada"
                            {...field}
                          />
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

export default CadastrarUsoReagente;
