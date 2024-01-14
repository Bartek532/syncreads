"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { memo } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { AppearanceData } from "@/types/settings.types";
import { THEME, appearanceSchema } from "@/types/settings.types";
import { onPromise } from "@/utils";

import DarkThemeIcon from "public/svg/theme/dark.svg";
import LightThemeIcon from "public/svg/theme/light.svg";
import SystemThemeIcon from "public/svg/theme/system.svg";

export const AppearanceForm = memo(() => {
  const { theme, setTheme } = useTheme();
  const form = useForm<AppearanceData>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      theme:
        theme && Object.values<string>(THEME).includes(theme)
          ? (theme as THEME)
          : THEME.SYSTEM,
    },
  });

  const onSubmit = (data: AppearanceData) => {
    setTheme(data.theme);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={onPromise(form.handleSubmit(onSubmit))}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>Select the theme for the app.</FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem
                        value={THEME.SYSTEM}
                        className="sr-only"
                      />
                    </FormControl>
                    <div className="w-48 cursor-pointer items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <SystemThemeIcon />
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Auto
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value={THEME.LIGHT} className="sr-only" />
                    </FormControl>
                    <div className="w-48 cursor-pointer items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <LightThemeIcon />
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Light
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value={THEME.DARK} className="sr-only" />
                    </FormControl>
                    <div className="w-48 cursor-pointer items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <DarkThemeIcon />
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Dark
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-6"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Update appearance"
          )}
        </Button>
      </form>
    </Form>
  );
});

AppearanceForm.displayName = "AppearanceForm";
