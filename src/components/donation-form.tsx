"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePaystackPayment } from "react-paystack";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { env } from "@/env.mjs";

const donationSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    { message: "Please enter a valid amount" }
  ),
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const presetAmounts = [1000, 2500, 5000, 10000, 25000, 50000];

export function DonationForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string>("");

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      message: "",
    },
  });

  const initializePayment = usePaystackPayment({
    publicKey: env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  });

  const onSubmit = (values: DonationFormValues) => {
    setIsProcessing(true);

    const amountInKobo = Math.round(parseFloat(values.amount) * 100); // Convert to kobo (Paystack uses kobo)

    const config = {
      email: values.email,
      amount: amountInKobo,
      metadata: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone || "",
        message: values.message || "",
        custom_fields: [
          {
            display_name: "First Name",
            variable_name: "first_name",
            value: values.firstName,
          },
          {
            display_name: "Last Name",
            variable_name: "last_name",
            value: values.lastName,
          },
          ...(values.phone
            ? [
                {
                  display_name: "Phone",
                  variable_name: "phone",
                  value: values.phone,
                },
              ]
            : []),
        ],
      },
      publicKey: env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      text: "Donate Now",
      onSuccess: async (reference: any) => {
        setIsProcessing(false);
        
        // Verify payment on the server
        try {
          const verifyResponse = await fetch("/api/payments/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reference: reference.reference }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok && verifyData.success) {
            toast.success("Payment successful! Thank you for your donation.");
            form.reset();
            setSelectedAmount("");
          } else {
            toast.error("Payment received but verification failed. Please contact support.");
          }
        } catch (error) {
          console.error("Verification error:", error);
          toast.success("Payment successful! Thank you for your donation.");
          form.reset();
          setSelectedAmount("");
        }
      },
      onClose: () => {
        setIsProcessing(false);
        toast.info("Payment cancelled");
      },
    };

    initializePayment(config);
  };

  const handlePresetClick = (amount: number) => {
    const amountStr = amount.toString();
    setSelectedAmount(amountStr);
    form.setValue("amount", amountStr);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Make a Donation
        </h3>
        <p className="text-gray-600">
          Your contribution helps us continue our mission to empower communities and build peace.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Preset Amounts */}
        <div>
          <Label className="mb-3 block text-sm font-medium text-gray-700">
            Quick Select Amount (₦)
          </Label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handlePresetClick(amount)}
                className={`px-4 py-2 rounded-md border-2 transition-all text-sm font-medium ${
                  selectedAmount === amount.toString()
                    ? "border-cyan-600 bg-cyan-50 text-cyan-600"
                    : "border-gray-300 bg-white text-gray-700 hover:border-cyan-400"
                }`}
              >
                ₦{amount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div>
          <Label htmlFor="amount" className="mb-2 block">
            Amount (₦) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            step="0.01"
            min="1"
            {...form.register("amount")}
            className={form.formState.errors.amount ? "border-red-500" : ""}
          />
          {form.formState.errors.amount && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.amount.message}
            </p>
          )}
        </div>

        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="mb-2 block">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              {...form.register("firstName")}
              className={form.formState.errors.firstName ? "border-red-500" : ""}
            />
            {form.formState.errors.firstName && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName" className="mb-2 block">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              {...form.register("lastName")}
              className={form.formState.errors.lastName ? "border-red-500" : ""}
            />
            {form.formState.errors.lastName && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="mb-2 block">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            {...form.register("email")}
            className={form.formState.errors.email ? "border-red-500" : ""}
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="mb-2 block">
            Phone Number (Optional)
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+234 800 000 0000"
            {...form.register("phone")}
          />
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message" className="mb-2 block">
            Message (Optional)
          </Label>
          <textarea
            id="message"
            rows={4}
            placeholder="Leave a message with your donation..."
            {...form.register("message")}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-6 text-lg"
        >
          {isProcessing ? "Processing..." : "Donate Now"}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Your payment is secure and encrypted. We use Paystack to process all donations.
        </p>
      </form>
    </div>
  );
}
