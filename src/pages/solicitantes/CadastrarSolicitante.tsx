import { z } from "zod";
import Heading from "../../components/Heading"
import { useToast } from "../../components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const CadastrarSolicitante = () => {
  const { toast } = useToast();

  const solicitanteSchema = z.object({
    cnpj: z
      .string()
      .regex(
        new RegExp("\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}"),
        "Formato do CNPJ inválido!"
      ),
    nome: z.string(),
    telefone: z
      .string()
      .regex(
        new RegExp("^\\(\\d{2}\\) \\d{5}-\\d{4}$"),
        "Formato do telefone inválido!"
      ),
    email: z.string().email("Formato de email inválido!"),
    endereco: z.string(),
    cidade: z.string(),
    estado: z.string(),
  });

  const form = useForm<z.infer<typeof solicitanteSchema>>({
    resolver: zodResolver(solicitanteSchema),
    defaultValues: {
      cnpj: "",
      nome: "",
      telefone: "",
      email: "",
      endereco: "",
      cidade: "",
      estado: "",
    },
  });

  const cadastrar = async (data: z.infer<typeof solicitanteSchema>) => {
    try {
      await axios.post(
        "https://uno-api-pdre.onrender.com/api/v1/solicitante",
        data
      );
      form.reset();

      toast({
        title: "Solicitante cadastrado com sucesso",
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
    <div className="container max-w-screen-2xl py-10">
      <Heading title="Cadastrar Solicitante" description="Informe abaixo os dados do novo cliente do laboratório" />

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
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="XX.XXX.XXX/XXXX-XX" {...field} />
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
                  <FormLabel>Nome Fantasia</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome Fantasia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormDescription>
                    Informe um telefone para contato com o responsável pelo
                    solicitante
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="contato@exemplo.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormDescription>
                    Informe um email para contato com o responsável pelo
                    solicitante
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endereco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua Exemplo 123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="Estado" {...field} />
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
    </div>
  );
}

export default CadastrarSolicitante
