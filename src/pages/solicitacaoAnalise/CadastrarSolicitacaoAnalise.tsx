import { date, z } from "zod";
import { useToast } from "../../components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ptBR } from "date-fns/locale";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/ui/popover";
import { cn } from "../../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Textarea } from "../../components/ui/textarea";
import Heading from "../../components/Heading";

const CadastrarSolicitacaoAnalise = () => {
  const { toast } = useToast();
  const [solicitantes, setSolicitantes] = useState<ISolicitante[] | undefined>(
    undefined
  );

  useEffect(() => {
    fetchSolicitantes();
  }, []);

  const fetchSolicitantes = async () => {
    const { data } = await axios.get<ISolicitante[]>(
      "https://uno-api-pdre.onrender.com/api/v1/solicitante/listagem"
    );

    setSolicitantes(data);
  };

  const solicitacaoAnaliseSchema = z.object({
    nomeProjeto: z.string(),
    prazoAcordado: z.date(),
    tipoAnalise: z.string(),
    descricaoProjeto: z.string(),
    cnpj: z.string(),
  });

  const form = useForm<z.infer<typeof solicitacaoAnaliseSchema>>({
    resolver: zodResolver(solicitacaoAnaliseSchema),
    defaultValues: {
      nomeProjeto: "",
      prazoAcordado: undefined,
      tipoAnalise: "",
      descricaoProjeto: "",
      cnpj: "",
    },
  });

  const cadastrar = async (data: z.infer<typeof solicitacaoAnaliseSchema>) => {
    try {
      const year = data.prazoAcordado.getFullYear();
      const month = String(data.prazoAcordado.getMonth() + 1).padStart(2, "0");
      const day = String(data.prazoAcordado.getDate()).padStart(2, "0");

      const solicitacaoAnalise: ISolicitacaoAnalise = {
        nomeProjeto: data.nomeProjeto,
        prazoAcordado: `${year}-${month}-${day}`,
        tipoAnalise: data.tipoAnalise,
        descricaoProjeto: data.descricaoProjeto,
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

      await axios.post(
        "https://uno-api-pdre.onrender.com/api/v1/solicitacao-analise",
        solicitacaoAnalise
      );
      form.reset({
        nomeProjeto: "",
        prazoAcordado: undefined,
        tipoAnalise: "",
        descricaoProjeto: "",
        cnpj: "",
      });

      toast({
        title: "Solicitação de Análise cadastrada com sucesso",
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
        <Heading title="Solicitação de Análise" description="Informe abaixo as informações de abertura do novo projeto" />

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
                            <SelectValue placeholder="Selecione o solicitante do projeto" />
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
                name="nomeProjeto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Projeto</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do Projeto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tipoAnalise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Análise</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um tipo de análise para o projeto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DESENVOLVIMENTO">
                          Desenvolvimento
                        </SelectItem>
                        <SelectItem value="DEGRADACAO_FORCADA">
                          Degradação Forçada
                        </SelectItem>
                        <SelectItem value="VALIDACAO">Validação</SelectItem>
                        <SelectItem value="CONTROLE">Controle</SelectItem>
                        <SelectItem value="SOLUBILIDADE">
                          Solubilidade
                        </SelectItem>
                        <SelectItem value="ESTABILIDADE">
                          Estabilidade
                        </SelectItem>
                        <SelectItem value="PERFIL_DISSOLUCAO">
                          Perfil de Dissolução
                        </SelectItem>
                        <SelectItem value="SOLVENTES_RESIDUAIS">
                          Solventes Residuais
                        </SelectItem>
                        <SelectItem value="SUMARIO_VALIDACAO">
                          Sumário de Validação
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prazoAcordado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prazo Acordado</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal flex w-[250px]",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Prazo Acordado</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            locale={ptBR}
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="descricaoProjeto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição do Projeto</FormLabel>
                      <FormControl>
                        <Textarea rows={10} {...field} />
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
      </div>
    )
  );
};

export default CadastrarSolicitacaoAnalise;
