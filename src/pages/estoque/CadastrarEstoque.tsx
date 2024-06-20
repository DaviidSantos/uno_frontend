import { z } from "zod";
import Heading from "../../components/Heading";
import { useToast } from "../../components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const CadastrarEstoque = () => {
  const [solicitantes, setSolicitantes] = useState<ISolicitante[] | undefined>(
    undefined
  );
  const { toast } = useToast();

  useEffect(() => {
    fetchSolicitantes();
  }, []);

  const fetchSolicitantes = async () => {
    const { data } = await axios.get<ISolicitante[]>(
      "https://uno-api-pdre.onrender.com/api/v1/solicitante/listagem"
    );

    setSolicitantes(data);
  };

  const estoqueSchema = z.object({
    nome: z.string(),
    cnpj: z.string(),
  });

  const form = useForm<z.infer<typeof estoqueSchema>>({
    resolver: zodResolver(estoqueSchema),
    defaultValues: {
      nome: "",
      cnpj: "",
    },
  });

  const cadastrar = async (data: z.infer<typeof estoqueSchema>) => {
    const estoque: IEstoque = {
      id: "",
      nome: data.nome,
      solicitante: {
        id: "",
        cnpj: data.cnpj,
        nome: "",
        telefone: "",
        email: "",
        endereco: "",
        cidade: "",
        estado: "",
      },
    };

    try {
      await axios.post(
        "https://uno-api-pdre.onrender.com/api/v1/estoque",
        estoque
      );

      form.reset();

      toast({
        title: "Estoque criado com sucesso",
        variant: "success",
      });
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
    solicitantes && (
      <div className="container max-w-screen-2xl py-10">
        <Heading
          title="Cadastrar estoque"
          description="Informe os dados necessários para a criação de um novo estoque"
        />

        <div className="py-4">
          <Form {...form}>
            <form
              className="gap-8 grid grid-cols-2 h-fit"
              onSubmit={form.handleSubmit(cadastrar)}
            >
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solicitante</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o solicitante do estoque" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {solicitantes.map((solicitante) => (
                            <SelectItem value={solicitante.cnpj}>
                              {solicitante.nome}
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
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do estoque" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="col-span-2">
                Cadastrar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    )
  );
};

export default CadastrarEstoque;
