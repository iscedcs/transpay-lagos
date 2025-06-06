import PaymentDisplay from "./payment-display";

interface PaymentDisplayWrapperProps {
     check: "cvof" | "dmf" | "ff";
}

export default async function PaymentDisplayWrapper({ check }: PaymentDisplayWrapperProps) {
     return (
          <div>
               {check === "cvof" ? (
                    <PaymentDisplay check={check}  />
               ) : check === "dmf" ? (
                    <PaymentDisplay check={check}  />
               ) : check === "ff" ? (
                    <PaymentDisplay check={check}  />
               ) : null}
          </div>
     );
}
