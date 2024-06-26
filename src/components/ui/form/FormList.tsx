/*
 * @Author: kasuie
 * @Date: 2024-06-15 20:58:32
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-15 22:07:35
 * @Description:
 */
"use client";
import { clsx } from "@kasuie/utils";
import { ItemsItem } from "@/lib/rules";
import { Select } from "../select/Select";
import { Input } from "../input/Input";
import { FormObj } from "./Form";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

interface FormListProps {
  className?: string;
  data?: Array<any>;
  rules?: Array<ItemsItem>;
  controlProps?: FormObj;
  title?: string;
}

export const FormList = ({
  className,
  data,
  rules,
  controlProps,
  title,
  ...props
}: FormListProps) => {
  const renderCol = (
    { controlKey, desc, value: field, label, controlProps: _props,...others }: ItemsItem,
    row: FormObj
  ) => {
    const props = {
      ...others,
      ...controlProps,
      ..._props,
      description: desc,
      className: "md:mio-col-4",
    };
    switch (controlKey) {
      case "select":
        return (
          <Select
            {...props}
            key={field}
            selectedKeys={row[field] ? [row[field]] : []}
            // items={items}
            // onSelectionChange={(val: any) => {
            //   if (!val || !val["currentKey"]) return;
            //   setFormData({
            //     ...formData,
            //     [field]: val["currentKey"],
            //   });
            // }}
          />
        );
      default:
        return (
          <Input
            key={field}
            value={row[field] || ""}
            {...props}
            // onValueChange={(val: string) => {
            //   setFormData({
            //     ...row,
            //     [field]: props?.type == "number" ? +val : val,
            //   });
            // }}
          />
        );
    }
  };

  const renderRow = (row: any, key: number) => {
    return (
      <li key={key} className="flex w-full flex-row justify-between gap-y-3">
        {rules?.map((col: ItemsItem) => renderCol(col, row))}
      </li>
    );
  };

  return (
    <Accordion className="w-full">
      <AccordionItem className="w-full" aria-label={title} title={title}>
        <ul className="flex w-full flex-col gap-3">
          <li className="flex w-full flex-row justify-between">
            {rules?.map((col: ItemsItem) => {
              return (
                <span key={col.label} className="md:mio-col-4">
                  {col.label}
                </span>
              );
            })}
          </li>
          {data?.map((v, i) => renderRow(v, i))}
        </ul>
      </AccordionItem>
    </Accordion>
  );
};
