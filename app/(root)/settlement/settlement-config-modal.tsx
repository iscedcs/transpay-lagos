"use client";

import type React from "react";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Landmark,
  Building2,
  PiggyBank,
  Code,
  AlertTriangle,
  CheckCircle,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

interface StakeholderConfig {
  name: string;
  key: string;
  percentage: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export function SettlementConfigModal() {
  const [isPending, startTransition] = useTransition();
  const [stakeholders, setStakeholders] = useState<StakeholderConfig[]>([
    {
      name: "State",
      key: "state",
      percentage: 40,
      icon: Landmark,
      color: "#0088FE",
    },
    {
      name: "IRS",
      key: "irs",
      percentage: 25,
      icon: Building2,
      color: "#00C49F",
    },
    {
      name: "LGA",
      key: "lga",
      percentage: 20,
      icon: PiggyBank,
      color: "#FFBB28",
    },
    { name: "ISCE", key: "isce", percentage: 15, icon: Code, color: "#FF8042" },
  ]);

  const totalPercentage = stakeholders.reduce(
    (sum, stakeholder) => sum + stakeholder.percentage,
    0
  );
  const isValidTotal = totalPercentage === 100;

  const updatePercentage = (key: string, value: number) => {
    setStakeholders((prev) =>
      prev.map((stakeholder) =>
        stakeholder.key === key
          ? { ...stakeholder, percentage: value }
          : stakeholder
      )
    );
  };

  const handleSave = () => {
    if (!isValidTotal) {
      toast.error("Total percentage must equal 100%");
      return;
    }

    startTransition(async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.success("Settlement configuration updated successfully");
        // onOpenChange(false)
      } catch (error) {
        toast.error("Failed to update settlement configuration");
      }
    });
  };

  const resetToDefaults = () => {
    setStakeholders([
      {
        name: "State",
        key: "state",
        percentage: 40,
        icon: Landmark,
        color: "#0088FE",
      },
      {
        name: "IRS",
        key: "irs",
        percentage: 25,
        icon: Building2,
        color: "#00C49F",
      },
      {
        name: "LGA",
        key: "lga",
        percentage: 20,
        icon: PiggyBank,
        color: "#FFBB28",
      },
      {
        name: "ISCE",
        key: "isce",
        percentage: 15,
        icon: Code,
        color: "#FF8042",
      },
    ]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Configure Split
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configure Revenue Split</DialogTitle>
          <DialogDescription>
            Set the percentage distribution for each stakeholder. Total must
            equal 100%.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {stakeholders.map((stakeholder) => {
              const Icon = stakeholder.icon;
              return (
                <Card key={stakeholder.key}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon
                        className="h-5 w-5"
                        /* @ts-expect-error: expected that error */
                        style={{ color: stakeholder.color }}
                      />
                      {stakeholder.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor={`${stakeholder.key}-percentage`}>
                        Percentage (%)
                      </Label>
                      <Input
                        id={`${stakeholder.key}-percentage`}
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={stakeholder.percentage}
                        onChange={(e) =>
                          updatePercentage(
                            stakeholder.key,
                            Number.parseFloat(e.target.value) || 0
                          )
                        }
                        className="text-right"
                      />
                      <div className="text-sm text-muted-foreground">
                        Amount: ₦
                        {(
                          (stakeholder.percentage / 100) *
                          2450000
                        ).toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isValidTotal ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  )}
                  <span className="font-medium">Total Percentage</span>
                </div>
                <div
                  className={`text-2xl font-bold ${
                    isValidTotal ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {totalPercentage}%
                </div>
              </div>
            </CardContent>
          </Card>

          {!isValidTotal && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                The total percentage must equal 100%. Current total is{" "}
                {totalPercentage}%.
                {totalPercentage > 100
                  ? " Please reduce some percentages."
                  : " Please increase some percentages."}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <h4 className="font-medium">
              Preview Distribution (Based on ₦2,450,000)
            </h4>
            <div className="space-y-2">
              {stakeholders.map((stakeholder) => {
                const Icon = stakeholder.icon;
                const amount = (stakeholder.percentage / 100) * 2450000;
                return (
                  <div
                    key={stakeholder.key}
                    className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className="h-4 w-4"
                        /* @ts-expect-error: expected that error */
                        style={{ color: stakeholder.color }}
                      />
                      <span className="font-medium">{stakeholder.name}</span>
                      <span className="text-muted-foreground">
                        ({stakeholder.percentage}%)
                      </span>
                    </div>
                    <span className="font-medium">
                      ₦{amount.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={resetToDefaults}
            disabled={isPending}
          >
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={!isValidTotal || isPending}>
            {isPending ? "Saving..." : "Save Configuration"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
