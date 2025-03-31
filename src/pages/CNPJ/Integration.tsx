import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CNPJResponse } from '@/types/audit';
import { cnpjService } from '@/services/cnpjService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Search } from 'lucide-react';

export default function CNPJIntegration() {
  const { toast } = useToast();
  const [cnpj, setCnpj] = useState('');
  const [result, setResult] = useState<CNPJResponse | null>(null);

  const searchMutation = useMutation({
    mutationFn: (cnpj: string) => cnpjService.fetchCNPJData(cnpj),
    onSuccess: (data) => {
      setResult(data);
      toast({
        title: 'CNPJ encontrado',
        description: 'Os dados do CNPJ foram carregados com sucesso.',
      });
    },
    onError: (error) => {
      setResult(null);
      toast({
        title: 'Erro na consulta',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cnpj) {
      toast({
        title: 'CNPJ obrigatório',
        description: 'Por favor, informe um CNPJ para consulta.',
        variant: 'destructive',
      });
      return;
    }
    searchMutation.mutate(cnpj);
  };

  const formatCNPJ = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 14) {
      setCnpj(value);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Consulta de CNPJ</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <Input
              placeholder="Digite o CNPJ"
              value={formatCNPJ(cnpj)}
              onChange={handleCNPJChange}
              maxLength={18}
              className="max-w-sm"
            />
            <Button
              type="submit"
              disabled={searchMutation.isPending || cnpj.length !== 14}
            >
              {searchMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Consultar
            </Button>
          </form>

          {result && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Dados Principais</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-muted-foreground">CNPJ</dt>
                      <dd>{formatCNPJ(result.cnpj)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Razão Social</dt>
                      <dd>{result.razao_social}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Nome Fantasia</dt>
                      <dd>{result.nome_fantasia || '-'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Natureza Jurídica</dt>
                      <dd>{result.natureza_juridica}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Porte</dt>
                      <dd>{result.porte}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Endereço</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-muted-foreground">Logradouro</dt>
                      <dd>
                        {result.endereco.logradouro}, {result.endereco.numero}
                        {result.endereco.complemento
                          ? ` - ${result.endereco.complemento}`
                          : ''}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Bairro</dt>
                      <dd>{result.endereco.bairro}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Cidade/UF</dt>
                      <dd>
                        {result.endereco.municipio}/{result.endereco.uf}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">CEP</dt>
                      <dd>{result.endereco.cep}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Atividades</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-1">
                      Atividade Principal
                    </h4>
                    <ul className="list-disc list-inside">
                      {result.atividade_principal.map((atividade, index) => (
                        <li key={index}>
                          {atividade.code} - {atividade.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {result.atividades_secundarias.length > 0 && (
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">
                        Atividades Secundárias
                      </h4>
                      <ul className="list-disc list-inside">
                        {result.atividades_secundarias.map((atividade, index) => (
                          <li key={index}>
                            {atividade.code} - {atividade.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
