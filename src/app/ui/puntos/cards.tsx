import {
  UserIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  teachers: UserIcon,
  students: UserCircleIcon,
  incomes: CurrencyDollarIcon,
  expenses: CreditCardIcon,
};

export default async function CardWrapper() {
  const {numberOfTeachers,
    numberOfStudents,
    totalIncomes,
    totalExpenses,
  } = await fetchCardData()
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Maestros" value={numberOfTeachers} 
      type="teachers" />
      <Card title="Estudiantes" value={numberOfStudents} 
      type="students" />
      <Card title="Puntos Ganados" value={totalIncomes} 
      type="incomes" />
      <Card
        title="Puntos Gastados"
        value={totalExpenses}
        type="expenses"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'teachers' | 'students' | 'incomes' | 'expenses';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
