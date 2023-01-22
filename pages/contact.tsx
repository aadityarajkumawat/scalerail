import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import z from "zod";
import { AiOutlineArrowRight } from "react-icons/ai";
import Head from "next/head";

interface ContactFormProps {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  anythingElse: string;
}

interface InputProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  textarea?: boolean;
}

function Input(props: InputProps) {
  return (
    <div className={`relative inp w-full ${props.className ?? ""}`}>
      {props.textarea ? (
        <textarea name={props.name} id={props.id}></textarea>
      ) : (
        <input
          className={`${
            props.value ? "has-value" : ""
          } border-b border-b-pleasant-blue w-full`}
          type={props.type}
          name={props.name}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      )}
      <label htmlFor={props.id} className="w-full">
        {props.label}
      </label>
      <div className="absolute text-sm text-red-400">{props.error}</div>
    </div>
  );
}

const contactFormSchema = z.object({
  name: z.string().min(0, { message: "Please enter a name" }).nullable(),
  companyName: z
    .string()
    .min(0, { message: "Please enter a company name" })
    .nullable(),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().nullable(),
  country: z.string().min(1, { message: "Please enter a country" }).nullable(),
  anythingElse: z.string(),
});

function buildAddContactQuery(boardId: string) {
  const query = `
            mutation AddContact ($itemName: String!, $columnVals: JSON!) {create_item(board_id: ${boardId}, item_name: $itemName, column_values: $columnVals) {id}}`;
  return query;
}

export async function addEntryToContactForm(
  form: ContactFormProps,
  token: string,
  boardId: string
) {
  try {
    const query = buildAddContactQuery(boardId);
    const date = new Date();

    let vars = {
      itemName: `Contact Form-${date.toISOString()}`,
      columnVals: JSON.stringify({
        email: { email: form.email, text: form.email },
        text0: form.companyName,
        phone_1: { phone: form.phone, countryShortName: form.country },
        long_text2: { text: form.anythingElse },
      }),
    };

    const res = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: JSON.stringify(vars),
      }),
    });

    if (res.ok) {
      return { success: true, error: null };
    } else {
      throw new Error("Oops! Something went wrong.");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return { success: false, error: error.message };
    }
    return { success: false, error: "Oops! Something went wrong." };
  }
}

export default function Contact() {
  const [form, setForm] = useState<ContactFormProps>({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    country: "",
    anythingElse: "",
  });

  const [errors, setErrors] = useState<Record<keyof ContactFormProps, string>>({
    anythingElse: "",
    companyName: "",
    country: "",
    email: "",
    name: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target as {
      name: keyof ContactFormProps;
      value: string;
    };

    const vali = contactFormSchema.shape[name];

    try {
      vali.parse(value);
      setErrors((ers) => ({ ...ers, [name]: "" }));
    } catch (error) {
      if (error instanceof Error) {
        const msg = JSON.parse(error.message)[0].message;
        setErrors((ers) => ({ ...ers, [name]: msg }));
      }
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const token = process.env.NEXT_PUBLIC_MONDAY_ACCESS_TOKEN;
    const boardId = process.env.NEXT_PUBLIC_CONTACT_BOARD_ID;

    if (!token || !boardId) {
      return;
    }

    const res = await addEntryToContactForm(form, token, boardId);
    if (res.error) {
      alert(res.error);
      return;
    }

    setSubmitted(true);
  }

  return (
    <div className="flex flex-col justify-center items-center px-10 py-10 w-[550px] max-md:w-full m-auto">
      <Head>
        <title>Scalerail | Contact</title>
      </Head>
      {submitted ? (
        <>
          <div className="border border-zinc-700 rounded-md px-10 py-5 appear-in">
            <h1 className="text-3xl">Thanks!</h1>
            <p className="text-zinc-400">
              Form has been successfully submitted
            </p>
            <button
              className="flex items-center gap-2 bg-pleasant-blue rounded-md px-3 py-1 mt-5"
              onClick={() => router.push("/", {})}
            >
              <p>Continue</p>
              <AiOutlineArrowRight />
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold my-3 text-pleasant-blue">
            Contact
          </h1>
          <p className="text-center text-second">
            Please fill out the following details and our team will reach out to
            you as soon as possible.
          </p>
          <form className="mt-10 w-full" onSubmit={onSubmit}>
            <div className="flex items-center justify-center gap-10 mb-10 w-full">
              <Input
                id="name"
                label="Name"
                name="name"
                type="text"
                value={form.name}
                error={errors.name}
                onChange={onChange}
                onBlur={onBlur}
              />
              <Input
                id="email"
                label="E-Mail"
                name="email"
                type="email"
                value={form.email}
                error={errors.email}
                onChange={onChange}
                onBlur={onBlur}
              />
            </div>
            <Input
              id="companyName"
              label="Company Name"
              name="companyName"
              type="text"
              value={form.companyName}
              error={errors.companyName}
              onChange={onChange}
              className="mb-10"
              onBlur={onBlur}
            />

            <div className="mb-10">
              <PhoneInput
                placeholder="Enter phone number"
                className="border-b border-b-pleasant-blue w-full text-[#333]"
                value={form.phone}
                onCountryChange={(country: any) => {
                  setForm((f) => ({ ...f, country }));
                }}
                onChange={(phone: any) => {
                  setForm((f) => ({ ...f, phone }));
                }}
                onBlur={(e: any) => {
                  const phone = e.target.value;
                  try {
                    contactFormSchema.shape.phone.parse(phone);
                    setErrors((ers) => ({ ...ers, phone: "" }));
                  } catch (error) {
                    if (error instanceof Error) {
                      const msg = JSON.parse(error.message)[0].message;
                      setErrors((ers) => ({ ...ers, phone: msg }));
                    }
                  }
                }}
                flags={flags}
              />
              <div className="text-sm text-red-400">{errors.phone}</div>
            </div>
            <div className="w-full">
              <textarea
                placeholder="Anything else you want to share?"
                className="bg-black border border-pleasant-blue rounded-md w-full px-5 py-3 mt-3"
                name="anythingElse"
                id="anything-else"
                cols={30}
                rows={5}
                onChange={(e) => {
                  setForm((f) => ({ ...f, anythingElse: e.target.value }));
                }}
              ></textarea>
            </div>
            <button
              className="w-full py-3 mt-10 rounded-lg bg-pleasant-blue text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}
