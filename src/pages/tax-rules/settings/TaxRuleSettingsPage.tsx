import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface TaxRuleSettings {
  automaticUpdates: boolean;
  notifyChanges: boolean;
  requireApproval: boolean;
  historyRetentionDays: number;
  defaultTaxType: string;
  defaultRate: number;
  defaultStatus: string;
}

export function TaxRuleSettingsPage() {
  const [settings, setSettings] = useState<TaxRuleSettings>({
    automaticUpdates: true,
    notifyChanges: true,
    requireApproval: true,
    historyRetentionDays: 365,
    defaultTaxType: "ICMS",
    defaultRate: 18,
    defaultStatus: "active",
  });

  const handleSettingChange = (key: keyof TaxRuleSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Configurações de Regras Tributárias</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Restaurar Padrões</Button>
          <Button>Salvar Alterações</Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="defaults">Valores Padrão</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure as opções gerais para o gerenciamento de regras tributárias
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="automaticUpdates">Atualizações Automáticas</Label>
                <Switch
                  id="automaticUpdates"
                  checked={settings.automaticUpdates}
                  onCheckedChange={(checked) => handleSettingChange("automaticUpdates", checked)}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="requireApproval">Exigir Aprovação para Mudanças</Label>
                <Switch
                  id="requireApproval"
                  checked={settings.requireApproval}
                  onCheckedChange={(checked) => handleSettingChange("requireApproval", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="defaults" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Valores Padrão</CardTitle>
              <CardDescription>
                Configure os valores padrão para novas regras tributárias
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultTaxType">Tipo de Imposto Padrão</Label>
                  <Input
                    id="defaultTaxType"
                    value={settings.defaultTaxType}
                    onChange={(e) => handleSettingChange("defaultTaxType", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultRate">Alíquota Padrão (%)</Label>
                  <Input
                    id="defaultRate"
                    type="number"
                    value={settings.defaultRate}
                    onChange={(e) => handleSettingChange("defaultRate", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultStatus">Status Padrão</Label>
                  <Input
                    id="defaultStatus"
                    value={settings.defaultStatus}
                    onChange={(e) => handleSettingChange("defaultStatus", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>
                Gerencie como você deseja ser notificado sobre alterações nas regras
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notifyChanges">Notificar Alterações</Label>
                <Switch
                  id="notifyChanges"
                  checked={settings.notifyChanges}
                  onCheckedChange={(checked) => handleSettingChange("notifyChanges", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Histórico</CardTitle>
              <CardDescription>
                Configure por quanto tempo o histórico de alterações será mantido
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="historyRetentionDays">Dias de Retenção do Histórico</Label>
                <Input
                  id="historyRetentionDays"
                  type="number"
                  value={settings.historyRetentionDays}
                  onChange={(e) => handleSettingChange("historyRetentionDays", Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 