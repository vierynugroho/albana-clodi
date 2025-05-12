import { ReactNode } from "react";

type Props = {
  title: string;
  result: string;
  iconColor?: string;
  icon: ReactNode;
};
export default function CardReport({ title, result, icon, iconColor }: Props) {
  return (
    <div className="p-4 bg-white shadow-md rounded-2xl flex flex-col items-start gap-2 hover:border-indigo-600 border cursor-pointer h-[185px] dark:bg-gray-dark dark:border-gray-800 dark:hover:border-indigo-600">
      <div className={`p-3 rounded-2xl ${iconColor}`}>{icon}</div>
      <h3 className="text-base font-medium mt-2 dark:text-amber-50">{title}</h3>
      <h4 className="text-xl font-bold dark:text-amber-50">{result}</h4>
    </div>
  );
}
