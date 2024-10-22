"use client";

import { useState } from "react";
import { Trash2, Plus, Edit, Delete } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  createMainfeatures,
  deleteMainfeatures,
  updateCoursePrice,
} from "@/app/actions";
import { MainFeatures } from "@/app/lib/types";
import { Separator } from "@/components/ui/separator";

export function UpdateMainFeatures({ data }: { data: MainFeatures[] }) {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState<string[]>([""]);
  const [newRule, setNewRules] = useState("");
  const [classPrice, setClassPrice] = useState<number | undefined>(undefined);
  const handleAddRule = () => {
    setRules([...rules, ""]);
  };

  const removeFeature = async (id: string) => {
    console.log("Updated price:", id);
    await deleteMainfeatures(id);
  };

  const handleRuleChange = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const createrRile = async (name: string) => {
    console.log({ className, description, rules });
    createMainfeatures(name);
  };

  const updatePrice = async (price: number) => {
    console.log("Updated price:", price);
    await updateCoursePrice(price);
  };

  return (
    <>
      <Card className="p-4 mt-6">
        <div className="flex items-center justify-between w-full space-x-4">
          <div className="w-full">
            <label
              htmlFor="classPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Class Price
            </label>
            <div className="flex items-center">
              <Input
                type="number"
                id="classPrice"
                value={classPrice ?? ""}
                onChange={(e) => setClassPrice(parseInt(e.target.value))}
                className="mt-1 block w-full md:w-4/5 lg:w-11/12 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter class price"
              />
              <div>
                <Button
                  type="button"
                  onClick={() => updatePrice(classPrice!)} // Pass the integer value to updatePrice
                  className="m-2"
                >
                  <Edit className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-1 mt-4">Class Rules</h2>

        <div className="flex items-center justify-between w-full space-x-4 ">
          <div className="w-full">
            <label
              htmlFor="classPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter Features
            </label>
            <div className="flex items-center">
              <Input
                type="text"
                id="newRule"
                value={newRule ?? ""}
                onChange={(e) => setNewRules(e.target.value)}
                className="mt-1 block w-full md:w-4/5 lg:w-11/12 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter class price"
              />
              <div>
                <Button
                  type="button"
                  onClick={() => createrRile(newRule!)} // Pass the integer value to updatePrice
                  className="m-2"
                >
                  <Edit className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Separator className="p-0.5 rounded-sm my-4" />
      <Card>
        <div className="p-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="w-full flex p-2 justify-between items-center"
            >
              <p className="text-base">{item.features}</p>
              <div className="">
                {/* <Button className="mx-2">
                <Edit className="h-5 w-5" />
              </Button> */}
                <Button
                  className=""
                  variant="destructive"
                  onClick={() => removeFeature(item.id)}
                >
                  <Delete className="h-5 w-5 bg-red-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
