"use client";

import { CheckIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PRICING_PLANS } from "@/config";
import { cn } from "@/utils";

export const Pricing = () => {
  const [billing, setBilling] =
    useState<keyof typeof PRICING_PLANS[number]["price"]>("month");

  return (
    <div className="flex w-full flex-col items-center justify-start gap-14 pb-16 lg:gap-24 lg:pb-28">
      <h1 className="lg:leading-tighter max-w-4xl text-center text-4xl font-bold tracking-tighter md:text-5xl xl:text-6xl 2xl:text-7xl">
        What works for you?
      </h1>
      <div className="-mt-6 flex items-center justify-center gap-3 lg:-mt-12">
        <span>Monthly</span>
        <Switch
          checked={billing === "year"}
          onCheckedChange={(checked) => setBilling(checked ? "year" : "month")}
        />
        <span>Yearly</span>
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-12 md:gap-6 lg:gap-4">
        {PRICING_PLANS.map((plan) => {
          const discount = Math.floor(
            ((plan.price.month * 12 - plan.price.year) /
              (plan.price.month * 12)) *
              100,
          );

          return (
            <div
              key={plan.name}
              className={cn(
                "grow-0 basis-[28rem] rounded-lg bg-gradient-to-br from-primary via-muted-foreground/50 to-primary/10 md:shrink-0",
                plan.popular
                  ? "p-1 shadow-xl shadow-muted-foreground/60"
                  : "shadow",
              )}
            >
              <Card className="relative flex flex-col gap-10 px-7 py-6 md:px-10 md:py-8">
                {plan.popular && (
                  <Badge className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 px-6 py-2.5 hover:bg-primary">
                    Most Popular
                  </Badge>
                )}
                <div>
                  <span className="text-lg font-bold">{plan.name}</span>
                  <p className="relative flex items-end gap-1 py-1.5">
                    <span className="text-4xl font-bold">
                      ${plan.price[billing]}
                    </span>
                    <span className="text-lg text-muted-foreground">
                      / {billing}
                    </span>

                    {billing === "year" && !!discount && (
                      <span className="-mt-1 ml-2 inline-block self-start rounded-lg bg-success-foreground px-2 py-0.5 text-sm text-success">
                        -{discount}%
                      </span>
                    )}
                  </p>
                  <span className="text-sm">{plan.description}</span>
                </div>

                <div className="flex flex-col gap-1">
                  {plan.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="flex items-center gap-3 py-1"
                    >
                      <div
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full ",
                          feature.available
                            ? "bg-primary"
                            : "border border-primary",
                        )}
                      >
                        {feature.available ? (
                          <CheckIcon className="w-3 text-primary-foreground" />
                        ) : (
                          <X className="w-3" />
                        )}
                      </div>
                      <span className="text-md">{feature.title}</span>
                      {feature.new && <Badge variant="outline">New</Badge>}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  {plan.trial && (
                    <Button variant="outline">Start free trial</Button>
                  )}
                  <Link href={plan.cta.link} className={buttonVariants()}>
                    {plan.cta.title}
                  </Link>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
