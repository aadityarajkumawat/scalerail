import React, { FormEvent, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";
import z from "zod";

const helpRequiringDomains = [
  {
    label: "(1) Project Mgmt - spec/build/launch tool to manage the big things",
    value: "Project Mgmt",
  },
  {
    label: "(2) Task Mgmt - spec/build/launch tool to manage the little things",
    value: "Task Mgmt",
  },
  {
    label: "(3) Software Dev - spec/build/launch custom programs",
    value: "Software Dev",
  },
  {
    label: "(4) Connect/Integrate - spec/build/launch API/Webhooks etc.",
    value: "Connect/Integrate",
  },
  {
    label: "(5) Database Dev - spec/build/launch storage systems",
    value: "Database Dev",
  },
  {
    label: "(6) Models/Algos - spec/build/launch custom analytics programs",
    value: "Models/Algos",
  },
  {
    label:
      "(7) Automation Sprint - machines do machine stuff, people do people stuff",
    value: "Automation Sprint",
  },
  {
    label: "(8) QA/Testing - spec/build/lauch semi-automated testing programs",
    value: "QA/Testing",
  },
  {
    label: "(9) Market Analysis - structure/quantify your neighborhood",
    value: "Market Analysis",
  },
  {
    label: "(10) Expansion Strategy - now we take over neighborhood",
    value: "Expansion Strategy",
  },
  {
    label: "(11) Strategic Talent - find/screen/recommend absolute killers",
    value: "Strategic Talent",
  },
  {
    label: "(12) Bolt-On Talent - temp a ScaleRailer for dev/quant/ops/pm role",
    value: "Bolt-On Talent",
  },
  {
    label: "(13) Due Diligence - have ScaleRail fMRI before you buy",
    value: "Due Diligence",
  },
  {
    label: "(14) Capital Wayfinding - prep/connect in our PE/VC network",
    value: "Capital Wayfinding",
  },
  {
    label:
      "(15) Aesthetics - videos, graphics, logos, and colors to tell your story",
    value: "Aesthetics",
  },
];

type Domains = typeof helpRequiringDomains[number];

interface ContactFormProps {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  helpRequiringDomains: Array<Domains>;
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

function generateFormBodyStructure(
  name: string,
  email: { email: string; text: string },
  companyName: string,
  phoneData: { phone: string; countryShortName: string },
  dropdown: Array<number>,
  anythingElse: string
) {
  const localDate = new Date();
  let timeZoneOffset = localDate.getTimezoneOffset();

  const payload = {
    answers: {
      name,
      email,
      text0: companyName,
      phone_1: phoneData,
      dropdown,
      long_text2: anythingElse,
    },
    "form-timezone-offset": timeZoneOffset,
  };

  return JSON.stringify(payload);
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
  name: z.string().min(1, { message: "Please enter a name" }),
  companyName: z.string().min(1, { message: "Please enter a company name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  country: z.string().min(1, { message: "Please enter a country" }),
  helpRequiringDomains: z.array(z.string()),
  anythingElse: z.string(),
});

function buildAddContactQuery(boardId: string) {
  const query = `
            mutation AddContact ($itemName: String!, $columnVals: JSON!) {create_item(board_id: ${boardId}, item_name: $itemName, column_values: $columnVals) {id}}`;
  return query;
}

export default function Contact() {
  const [form, setForm] = useState<ContactFormProps>({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    country: "",
    helpRequiringDomains: [],
    anythingElse: "",
  });

  const [errors, setErrors] = useState<Record<keyof ContactFormProps, string>>({
    anythingElse: "",
    companyName: "",
    country: "",
    email: "",
    helpRequiringDomains: "",
    name: "",
    phone: "",
  });

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
    try {
      const query = buildAddContactQuery("3820808308");
      const date = new Date();

      let vars = {
        itemName: `Contact Form-${date.toISOString()}`,
        columnVals: JSON.stringify({
          email3: { email: form.email, text: form.email },
          text7: form.name,
        }),
      };

      const TOKEN =
        "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIyNDk4MzIyOCwidWlkIjozODA4MDE2OCwiaWFkIjoiMjAyMy0wMS0xOFQxMzozMjozMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTQ3NjI1NTUsInJnbiI6InVzZTEifQ.z9Bctr1BNSs8wv0IfOUiXZnWRkk3ZjUfgVfmICDEFTw";

      const res = await fetch("https://api.monday.com/v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify({
          query,
          variables: JSON.stringify(vars),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("success", data);
      } else {
        console.log("f");
      }
    } catch (error) {
      //@ts-ignore
      console.log(error.message);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center py-10">
      <h1 className="text-3xl font-bold mb-3">Contact</h1>
      <p>Some text if you want to put something here</p>
      <form className="mt-10 w-1/3 max-lg:w-1/2" onSubmit={onSubmit}>
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

        <Select
          isMulti
          placeholder="What can we help out with?"
          name="helpRequiringDomains"
          className="bg-black select text-white mb-10"
          options={helpRequiringDomains}
          styles={{
            multiValueLabel: () => ({
              color: "white",
              display: "flex",
            }),
            multiValue: () => ({
              border: "1px solid #05a8f4",
              borderRadius: "5px",
              display: "flex",
              marginRight: "1rem",
            }),
            control: () => ({
              border: "1px solid #05a8f4",
              display: "flex",
              borderRadius: "5px",
            }),
          }}
        />
        <div className="w-full">
          <label
            htmlFor="anything-else"
            className="mb-5"
            style={{ position: "static" }}
          >
            Anything else you want to share?
          </label>
          <textarea
            className="bg-black border border-pleasant-blue rounded-md w-full p-5 mt-3"
            name="anythingElse"
            id="anything-else"
            cols={30}
            rows={5}
            // onChange={onCh}
            // onBlur={onBlur}
          ></textarea>
        </div>
        <button
          className="w-full py-3 mt-10 rounded-lg bg-pleasant-blue text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
