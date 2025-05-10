import { ReactNode } from "react";

type Props = {
  title: string;
  result: string;
  icon: ReactNode;
};
export default function CardReport({ title, result, icon }: Props) {
  return (
    <div className="p-4 bg-white shadow-md rounded-2xl flex flex-col items-start gap-2 hover:border-indigo-600 border cursor-pointer">
      <div className="text-brand-500 bg-brand-200 p-3 rounded-2xl">{icon}</div>
      <h3 className="text-base font-medium mt-2">{title}</h3>
      <h4 className="text-xl font-bold">{result}</h4>
    </div>
  );
}
