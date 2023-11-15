import { CheckIcon } from "lucide-react";
import CheckoutButton from "./CheckoutButton";
import Link from "next/link";

const tiers= [
  {
    name: "starter",
    id: null,
    href:"#",
    priceMonthly: null,
    description: "get chatting right away with anyone, anywhere!",
    features: [
      "20 messases chat limit ",
      "2 participants limit",
      "3 chat rooms limit",
      "supports 2 languages",
      "48-hour support response time",
    ],
  },
  {
    name: "pro",
    id: "pro",
    href:"#",
    priceMonthly: "50",
    description: "get chatiing right away with anyone, anywhere!",
    features: [
      "unlimited participants in chat  ",
      "unlimited chat rooms",
      "supports upto 10 languages",
      "multimedia support in chats (coming soon)",
      "early access to new features",
    ],
  },
];


function PricingCards({ redirect }: { redirect: boolean}) {
  return (
    <div>
      <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier) => (
          <div
          key={tier.id}
          className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"

          >
            <div>
              <h3 id={tier.id + tier.name}
              className="text-base font-semibold leading-7 text-indigo-600"
              >
                {tier.name}
              </h3>
              <div className="mt-4 flex-items-baseline gap-x-2">
                {tier.priceMonthly ? (
                  <>
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    {tier.priceMonthly}
                    </span>
                    <span className="text-base font-semibold leading-7 text-gray-900">

                    /month
                  </span>
                    </>
                ) : (
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    free
                  </span>
                )}
                </div>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  {tier.description}
                </p>
                <ul
                role="list"
                className="mt-10 space-y-4 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                      className="h-6 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                </div>
                {redirect ? (
                  <Link href="/register" className="mt-8 block rounded-md bg-indigo-600 px-10 py-4 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer
                  disabled:opacity-80"
                  >
                    Get started today
                  </Link>
                ): (
                    tier.id && <CheckoutButton /> 
                )}
          </div>
        ))}
      </div>
   </div>
  );
}

export default PricingCards;