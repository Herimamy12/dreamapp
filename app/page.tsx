import Link from "next/link";
import Wrapper from "./components/Wrapper";
import BudgetItem from "./components/BudgetItem";
import budgets from "./data";

export default function Home() {
  return (
    <Wrapper>
      <div className="flex items-center justify-center flex-col py-10 w-full">
        <div className="flex flex-col">
          <h1 className="text-7xl md:text-9xl font-bold text-center">
            dream<span className="text-info">app</span>
          </h1>
          <p className="py-2 text-gray-300 text-center">
            This is the app of our dreams
          </p>
          <div className="block mt-15 md:flex md:gap-3 max-w-screen-lg m-auto">
            <div className="bg-gray-100/5 border rounded-box p-6 mx-3 md:flex-1">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p>
                To track your spending, use analytics tools that generate
                detailed statistics. This data will allow you to adjust your
                budget.
              </p>
            </div>
            <div className="bg-gray-100/5 border rounded-box p-6 m-3 md:flex-1 md:m-0">
              <h1 className="text-2xl font-bold">Budget</h1>
              <p>
                For better financial management, it is essential to track your
                budgets precisely by detailing each expense and source of
                income.
              </p>
            </div>
            <div className="bg-gray-100/5 border rounded-box p-6 mx-3 md:flex-1">
              <h1 className="text-2xl font-bold">Transaction</h1>
              <p>
                Take note of all of your transactions to ensure complete
                traceability of your financial flows.
              </p>
            </div>
          </div>
          <ul className="grid md:grid-cols-3 gap-4 md:min-w-[1200px] mt-6">
            {budgets.map((budget) => (
              <Link href={""} key={budget.id}>
                <BudgetItem budget={budget} enableHover={1}></BudgetItem>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
}
