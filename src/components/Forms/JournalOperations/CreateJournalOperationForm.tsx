// components/JournalOperationForm.tsx
"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { AuthStore } from "@/store/authStore";
import { addJournalOperation } from "@/store/journalOperationStore";

// Define a schema for an immobilisation item
const immobilisationSchema = z.object({
  nature: z.enum(["CORPOERELLE", "INCORPORELLE"]),
  name: z.string().min(1, "Name required"),
  type: z.enum(["CONSOMMABLE", "IMMOBILISATION"]),
  description: z.string().optional(),
  category: z.string(),
  tva: z.coerce.number(),
  cost: z.coerce.number(),
  acquisitionDate: z.string(), // using ISO date string (YYYY-MM-DD)
  usageStartDate: z.string(),
  residualValue: z.coerce.number(),
  lifeExpectancy: z.coerce.number(),
  pieceNumber: z.string(),
  beneficiary: z.string().min(1, "Beneficiary required"),
  depreciationType: z.enum(["LINEAR", "DEGRESSIVE", "PRODUCTION_UNIT"]),
  provider: z.string(),
});

export type ImmobilisationFormData = z.infer<typeof immobilisationSchema>;

// Define the main form schema
const formSchema = z.object({
  journalId: z.string(),
  direction: z.enum(["CREDIT", "DEBIT"]),
  classId: z.string(),
  mainAccountId: z.string(),
  subAccountId: z.string(),
  type: z.enum(["ASSET", "LIABILITY"]),
  rubric: z.string(),
  department: z.string(),
  label: z.string(),
  amount: z.string().min(1, "Champ obligatoire"),
  currencyCode: z.string(),
  pieceNumber: z.string(),
  date: z.string(), // expected in YYYY-MM-DD format
  beneficiary: z.string(),
  // immobilisations is optional but will be required if the selected class requires it (see onSubmit check)
  immobilisations: z.array(immobilisationSchema).optional(),
});

export type JournalOperationFormValues = z.infer<typeof formSchema>;

interface JournalOperationFormProps {
  journalId: string;
  classes: Array<{ id: string; name: string; class: number }>;
  accounts: Array<{
    id: string;
    mainAccount: string;
    intermediateAccount: string;
    subAccount: string;
    label: string;
    class: { id: string; name: string; class: number };
  }>;
  setOpen: any;
  rubrics: any[];
  departments: any[];
  onSaved: () => void;
}

export default function JournalOperationForm({
  journalId,
  classes,
  accounts,
  setOpen,
  rubrics,
  departments,
  onSaved,
}: JournalOperationFormProps) {
  const form = useForm<JournalOperationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      journalId,
      direction: "CREDIT",
      classId: "",
      mainAccountId: "",
      subAccountId: "",
      type: "ASSET",
      rubric: "",
      department: "",
      label: "",
      amount: "",
      currencyCode: "",
      pieceNumber: "",
      date: "",
      beneficiary: "",
      immobilisations: [],
    },
    mode: "all",
  });

  const clean = (str: string) => str.replace(/\s+/g, "").trim();

  // Watch for selected values to filter dependent fields.
  const selectedClassId = form.watch("classId");
  const selectedMainAccountId = form.watch("mainAccountId");

  // Look up the selected class object from props
  const selectedClass = classes.find((c) => c.id === selectedClassId);

  // For main accounts, filter accounts where:
  // • The account's category matches the selected class’s numeric value
  // • The account represents a main account (all three fields equal)
  const mainAccounts = accounts.filter(
    (account) =>
      selectedClass &&
      account.class.class === selectedClass.class &&
      clean(account.mainAccount) === clean(account.intermediateAccount) &&
      clean(account.intermediateAccount) === clean(account.subAccount),
  );

  // For subaccounts, filter accounts that share the same mainAccount value
  // as the selected main account (and exclude the main account itself)
  const selectedMainAccount = accounts.find(
    (a) => a.id === selectedMainAccountId,
  );
  const subAccounts = accounts.filter(
    (account) =>
      selectedMainAccount &&
      clean(account.mainAccount) === clean(selectedMainAccount.mainAccount) &&
      account.id !== selectedMainAccount.id,
  );

  const { user } = AuthStore.useState();

  const onSubmit = async (data: JournalOperationFormValues) => {
    if (
      selectedClass &&
      selectedClass.class === 2 &&
      (!data.immobilisations || data.immobilisations.length === 0)
    ) {
      toast.error(
        "Les immobilisations sont obligatoires pour les classes de 2",
      );
      return;
    }

    addJournalOperation(data);
    toast.success("Opération ajoutée à la liste");
    onSaved(); // trigger parent action (e.g., scroll or update state)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        {/* Hidden journalId */}
        <input type="hidden" {...form.register("journalId")} />

        {/* Direction */}
        <FormField
          control={form.control}
          name="direction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Direction</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une direction" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CREDIT">CREDIT</SelectItem>
                  <SelectItem value="DEBIT">DEBIT</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Class */}
        <FormField
          control={form.control}
          name="classId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classe</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une classe comptable" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} (Class {c.class})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Main Account */}
        <FormField
          control={form.control}
          name="mainAccountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compte principal</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un compte principal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mainAccounts.map((acc) => (
                    <SelectItem key={acc.id} value={acc.id}>
                      {acc.label} - {acc.mainAccount}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sub Account */}
        <FormField
          control={form.control}
          name="subAccountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sous-Compte</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un sous-compte" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subAccounts.map((acc) => (
                    <SelectItem key={acc.id} value={acc.id}>
                      {acc.label} - {acc.subAccount}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Operation Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de l&apos;opération</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir le type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ASSET">Investissement</SelectItem>
                  <SelectItem value="LIABILITY">Charge</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rubric */}
        <FormField
          control={form.control}
          name="rubric"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rubrique</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une rubrique" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rubrics.map((r) => (
                    <SelectItem key={r.id} value={r.label}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rubric */}
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Département</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un département" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departments.map((d: any) => (
                    <SelectItem key={d.id} value={d.label}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Label */}
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Libellé</FormLabel>
              <FormControl>
                <Input placeholder="Libellé" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Currency Code */}
        <FormField
          control={form.control}
          name="currencyCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Devise</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir la devise" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USD">Dollars US</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montant en Dollars USD</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="decimal"
                  placeholder="Montant en chiffre"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value.replace(",", "."))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Piece Number */}
        <FormField
          control={form.control}
          name="pieceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de pièce</FormLabel>
              <FormControl>
                <Input placeholder="Numéro de pièce" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de l&apos;opération</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Beneficiary */}
        <FormField
          control={form.control}
          name="beneficiary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bénéficiaire</FormLabel>
              <FormControl>
                <Input placeholder="Bénéficiaire" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Conditional Immobilisations (only show if selected class has numeric value 2) */}
        {selectedClass && selectedClass.class === 2 && (
          <div className="space-y-6 border-t pt-4">
            <h3 className="mb-2 text-xl font-bold">Immobilisations</h3>
            {/* For simplicity, this example renders two fields for a single immobilisation.
                In a real app you might use a field array to allow multiple entries. */}
            <FormField
              control={form.control}
              name="immobilisations.0.nature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nature de l&apos;immobilisation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir la nature" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CORPOERELLE">Corporelle</SelectItem>
                      <SelectItem value="INCORPORELLE">Incorporelle</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="immobilisations.0.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de l&apos;immobilisation</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de l'immobilisation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="immobilisations.0.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type d&apos;immobilisation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir le type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CONSOMMABLE">CONSOMMABLE</SelectItem>
                      <SelectItem value="IMMOBILISATION">
                        IMMOBILISATION
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="immobilisations.0.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description de l&apos;immobilisation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Description de l'immobilisation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="immobilisations.0.category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie de l&apos;immobilisation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir la catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Terrains">Terrains</SelectItem>

                      <SelectItem value="Construction">Construction</SelectItem>
                      <SelectItem value="Équipements Industriels">
                        Équipements Industriels
                      </SelectItem>
                      <SelectItem value="Équipements Informatiques">
                        Équipements Informatiques
                      </SelectItem>
                      <SelectItem value="Machines & Outils">
                        Machines & Outils
                      </SelectItem>
                      <SelectItem value="Véhicules">Véhicules</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="immobilisations.0.cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coût d&apos;acquisition</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Coût d'acquisition"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="immobilisations.0.tva"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TVA</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} placeholder="TVA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="immobilisations.0.acquisitionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date d&apos;acquisition</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      min={0}
                      placeholder="Date d'acquisition"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="immobilisations.0.usageStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de mise en service</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      min={0}
                      placeholder="Date de mise en service"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="immobilisations.0.residualValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valeur résiduelle</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Valeur résiduelle"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="immobilisations.0.lifeExpectancy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durée de vie utile (en années)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Durée de vie utile (en années)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="immobilisations.0.depreciationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Méthode d&apos;amortissement</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir la méthode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LINEAR">Linéaire</SelectItem>
                      <SelectItem value="DEGRESSIVE">Dégressif</SelectItem>
                      <SelectItem value="PRODUCTION_UNIT">
                        Unité de production
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="immobilisations.0.provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fournisseur</FormLabel>
                  <FormControl>
                    <Input placeholder="Fournisseur" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="immobilisations.0.pieceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de pièce (Immobilisation)</FormLabel>
                  <FormControl>
                    <Input placeholder="Numéro de pièce" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="immobilisations.0.beneficiary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bénéficiaire (Immobilisation)</FormLabel>
                  <FormControl>
                    <Input placeholder="Bénéficiaire" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <Button className="" type="submit">
          Ajouter
        </Button>
      </form>
    </Form>
  );
}
