import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { CalendarIcon, Plus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import { ptBR } from "date-fns/locale";
import { Calendar } from "../../../components/ui/calendar";
import { format } from "date-fns";
import { cn } from "../../../lib/utils";
import { Textarea } from "../../../components/ui/textarea";
import axios, { AxiosError } from "axios";
import { useToast } from "../../../components/ui/use-toast";

interface CadastrarLoteProps {
  idSa: string
  fetchLotes: () => Promise<void>
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const CadastrarLote: FC<CadastrarLoteProps> = ({ idSa, fetchLotes, isOpen, setIsOpen }) => {
  const { toast } = useToast();

  const loteSchema = z.object({
    amostra: z.string(),
    notaFiscal: z.string(),
    dataEntrada: z.date(),
    dataValidade: z.date(),
    descricao: z.string(),
    quantidade: z.string()
  })

  const form = useForm<z.infer<typeof loteSchema>>({
    resolver: zodResolver(loteSchema),
    defaultValues: {
      amostra: "",
      notaFiscal: "",
      dataEntrada: undefined,
      dataValidade: undefined,
      descricao: "",
      quantidade: ""
    }
  })

  const cadastrar = async (data: z.infer<typeof loteSchema>) => {
    try {
      const yearEntrada = data.dataEntrada.getFullYear();
      const monthEntrada = String(data.dataEntrada.getMonth() + 1).padStart(2, "0");
      const dayEntrada = String(data.dataEntrada.getDate()).padStart(2, "0");

      const yearValidade = data.dataValidade.getFullYear();
      const monthValidade = String(data.dataValidade.getMonth() + 1).padStart(2, "0");
      const dayValidade = String(data.dataValidade.getDate()).padStart(2, "0");

      const lote: ILote = {
        id: "",
        amostra: data.amostra,
        notaFiscal: data.notaFiscal,
        dataEntrada: `${yearEntrada}-${monthEntrada}-${dayEntrada}`,
        dataValidade: `${yearValidade}-${monthValidade}-${dayValidade}`,
        descricao: data.descricao,
        quantidade: Number(data.quantidade),
        solicitacaoAnalise: {
          idSa: idSa,
          nomeProjeto: "",
          prazoAcordado: "",
          tipoAnalise: "",
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
      };

      await axios.post("https://uno-api-pdre.onrender.com/api/v1/lote", lote);

      form.reset({
        amostra: "",
        notaFiscal: "",
        dataEntrada: undefined,
        dataValidade: undefined,
        descricao: "",
        quantidade: "",
      });

      toast({
        title: "Lote cadastrado com sucesso",
        variant: "success",
      });

      fetchLotes();
      setIsOpen(false)
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
          <DialogTitle>Cadastrar novo lote</DialogTitle>
          <DialogDescription>Informe os dados de entrada do novo lote de amostra e sua solicitação de análise</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Form {...form}>
            <form className="grid grid-cols-2 gap-8 h-fit" onSubmit={form.handleSubmit(cadastrar)}>
              <FormField
                control={form.control}
                name="amostra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amostra</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da amostra" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

              <FormField
                control={form.control}
                name="notaFiscal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nota Fiscal</FormLabel>
                    <FormControl>
                      <Input placeholder="Nota Fiscal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

              <FormField
                control={form.control}
                name="dataEntrada"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Entrada</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal flex w-[215px]",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Data de Entrada</span>
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

              <FormField
                control={form.control}
                name="dataValidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Validade</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal flex w-[215px]",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Data de Validade</span>
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

              <FormField
                control={form.control}
                name="quantidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade de amostras</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Quantidade..."
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição do Projeto</FormLabel>
                    <FormControl>
                      <Textarea rows={7} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="col-span-2">Cadastrar</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CadastrarLote;
