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

import axios, { AxiosError } from "axios";
import { useToast } from "../../../components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

interface CadastrarUsoReagenteProps {
  idAnalise: string;
  idEstoque: string;
  isOpen: boolean;
  fetchReagentesAnalise: () => Promise<void>;
  setIsOpen: (isOpen: boolean) => void;
}

const CadastrarUsoReagente: FC<CadastrarUsoReagenteProps> = ({
  idAnalise,
  // idEstoque,
  isOpen,
  fetchReagentesAnalise,
  setIsOpen,
}) => {
  // const [reagentes, setReagentes] = useState<IReagente[]>();
  const [estoques, setEstoques] = useState<IEstoque[]>();
  const { toast } = useToast();

  useEffect(() => {
    fetchEstoque();
  }, []);

  const fetchEstoque = async () => {
    const { data } = await axios.get<IEstoque[]>(
      `https://uno-api-pdre.onrender.com/api/v1/estoque`
    );

    setEstoques(data);
  };

  // const fetchReagentes = async () => {
  //   const { data } = await axios.get<IReagente[]>(
  //     `https://uno-api-pdre.onrender.com/api/v1/reagente?estoque=${idEstoque}`
  //   );

  //   setReagentes(data);
  // };

  const reagenteAnaliseSchema = z.object({
    estoque_id: z.string(),
    analise_id: z.string(),
    reagente_id: z.string(),
    quantidade: z.string(),
  });

  const form = useForm<z.infer<typeof reagenteAnaliseSchema>>({
    resolver: zodResolver(reagenteAnaliseSchema),
    defaultValues: {
      estoque_id: "",
      analise_id: idAnalise,
      reagente_id: "",
      quantidade: "",
    },
  });

  const cadastrar = async (data: z.infer<typeof reagenteAnaliseSchema>) => {
    try {
      const reagenteAnalise: IReagenteAnalise = {
        analise_id: data.analise_id,
        reagente_id: data.reagente_id,
        quantidade: Number(data.quantidade),
      };

      await axios.post(
        "https://uno-api-pdre.onrender.com/api/v1/reagente-analise",
        reagenteAnalise
      );

      form.reset({
        estoque_id: "",
        analise_id: "",
        reagente_id: "",
        quantidade: "",
      });

      toast({
        title: "Informe de reagente utilizado efetuado com sucesso!",
        variant: "success",
      });

      fetchReagentesAnalise();
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
    // reagentes &&
    estoques && (
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
                  name="reagente_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estoque</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o estoque do reagente" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {estoques.map((estoque) => (
                              <SelectItem value={estoque.id} key={estoque.id}>
                                {estoque.nome}
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
                  name="quantidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade utilizada</FormLabel>
                      <FormControl>
                        <Input placeholder="Quantidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
