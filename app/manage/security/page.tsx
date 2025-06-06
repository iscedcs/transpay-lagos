import { InformationCardVariant } from "@/components/layout/informationCard";
import { LOGIN_DETAILS } from "@/lib/const";

export default function Security() {
  return (
    <div className="flex flex-col gap-6 px-5 w-screen">
      <div className="mt-[20px]">
        {" "}
        <h3 className="text-h4Bold">Security</h3>
        <p className="text-title1 text-gray-500">
          View password and change password
        </p>
      </div>
      <div className="">
        <InformationCardVariant header="Login Details" info={LOGIN_DETAILS} link="" />
      </div>
    </div>
  );
}
