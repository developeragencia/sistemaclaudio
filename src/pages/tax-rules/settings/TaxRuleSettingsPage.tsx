import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function TaxRuleSettingsPage() {
  const [automaticUpdates, setAutomaticUpdates] = useState(true);
  const [notifyChanges, setNotifyChanges] = useState(true);
  const [requireApproval, setRequireApproval] = useState(true);
  const [defaultCurrency, setDefaultCurrency] = useState("BRL");
  const [decimalPlaces, setDecimalPlaces] = useState("2");
  const [roundingMethod, setRoundingMethod] = useState("round");
  const [backupFrequency, setBackupFrequency] = useState("daily");
  const [retentionPeriod, setRetentionPeriod] = useState("365");
  const [apiEndpoint, setApiEndpoint] = useState("https://api.example.com/tax-rules");
  const [apiKey, setApiKey] = useState("****************************");

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    toast.success("Configurações salvas com sucesso!");
  };

  const handleTestConnection = () => {
    // Aqui você implementaria a lógica para testar a conexão com a API
    toast.success("Conexão com a API testada com sucesso!");
  };

  const handleResetDefaults = () => {
    // Aqui você implementaria a lógica para resetar as configurações
    toast.success("Configurações resetadas para os valores padrão!");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações gerais das regras tributárias
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="calculations">Cálculos</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="integration">Integração</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure as opções gerais do sistema de regras tributárias
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="automatic-updates">Atualizações Automáticas</Label>
                <Switch
                  id="automatic-updates"
                  checked={automaticUpdates}
                  onCheckedChange={setAutomaticUpdates}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notify-changes">Notificar Alterações</Label>
                <Switch
                  id="notify-changes"
                  checked={notifyChanges}
                  onCheckedChange={setNotifyChanges}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="require-approval">Exigir Aprovação</Label>
                <Switch
                  id="require-approval"
                  checked={requireApproval}
                  onCheckedChange={setRequireApproval}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Cálculo</CardTitle>
              <CardDescription>
                Configure as opções de cálculo e formatação de valores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="default-currency">Moeda Padrão</Label>
                  <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                    <SelectTrigger id="default-currency">
                      <SelectValue placeholder="Selecione a moeda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">Real (BRL)</SelectItem>
                      <SelectItem value="USD">Dólar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="decimal-places">Casas Decimais</Label>
                  <Select value={decimalPlaces} onValueChange={setDecimalPlaces}>
                    <SelectTrigger id="decimal-places">
                      <SelectValue placeholder="Selecione o número de casas decimais" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 casas decimais</SelectItem>
                      <SelectItem value="3">3 casas decimais</SelectItem>
                      <SelectItem value="4">4 casas decimais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="rounding-method">Método de Arredondamento</Label>
                  <Select value={roundingMethod} onValueChange={setRoundingMethod}>
                    <SelectTrigger id="rounding-method">
                      <SelectValue placeholder="Selecione o método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="round">Arredondamento Padrão</SelectItem>
                      <SelectItem value="ceil">Sempre para Cima</SelectItem>
                      <SelectItem value="floor">Sempre para Baixo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Backup</CardTitle>
              <CardDescription>
                Configure as opções de backup e retenção de dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="backup-frequency">Frequência de Backup</Label>
                  <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">A cada hora</SelectItem>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="retention-period">Período de Retenção (dias)</Label>
                  <Input
                    id="retention-period"
                    type="number"
                    value={retentionPeriod}
                    onChange={(e) => setRetentionPeriod(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Integração</CardTitle>
              <CardDescription>
                Configure as opções de integração com APIs externas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="api-endpoint">Endpoint da API</Label>
                  <Input
                    id="api-endpoint"
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="api-key">Chave da API</Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>

                <Button onClick={handleTestConnection}>
                  Testar Conexão
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button onClick={handleSave}>
          Salvar Configurações
        </Button>
        <Button variant="outline" onClick={handleResetDefaults}>
          Restaurar Padrões
        </Button>
      </div>
    </div>
  );
} 