import MaxWidthWrapper from "@/components/layout/max-width-wrapper"
import { BarChart2, Eye, Link2, Shield, ShieldCheck, Users } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="w-full py-16 bg-[#0a0a0a] text-white">
      <MaxWidthWrapper>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-start space-y-4 mb-12">
            <span className="text-[#ffcc00] text-sm font-medium uppercase tracking-wider">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Streamlined{" "}
              <span className="text-secondary font-bold">transportation</span>{" "}
              <br />
              management that delivers
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Unlike traditional systems, Transpay simplifies levy collection
              with secure, user-friendly solutions that transform transportation
              management.
            </p>
            {/* <Link
            href="#"
            className="group inline-flex items-center gap-1 bg-[#0a0a0a] border border-[#ffcc00] hover:bg-[#ffcc00] hover:text-black transition-colors duration-300 rounded-md px-6 py-2.5 text-sm font-medium mt-4"
          >
            EXPLORE FEATURES <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#0f0f0f] border border-[#1a1a1a]">
                <Shield className="h-6 w-6 text-[#ffcc00]" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Secure Transactions
              </h3>
              <p className="text-gray-400">
                Rest assured, our top-tier security features keep your data and
                financial transactions protected at all times.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#0f0f0f] border border-[#1a1a1a]">
                <Link2 className="h-6 w-6 text-[#ffcc00]" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Seamless Integration
              </h3>
              <p className="text-gray-400">
                Connect effortlessly to existing transportation systems, payment
                gateways, and government databases.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#0f0f0f] border border-[#1a1a1a]">
                <Eye className="h-6 w-6 text-[#ffcc00]" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Visibility Dashboard
              </h3>
              <p className="text-gray-400">
                Role-specific dashboards provide complete transparency, allowing
                all stakeholders to monitor operations in real-time.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#0f0f0f] border border-[#1a1a1a]">
                <Users className="h-6 w-6 text-[#ffcc00]" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Multi-user Management
              </h3>
              <p className="text-gray-400">
                Our platform enables seamless collaboration between
                administrators, collectors, and supervisors.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#0f0f0f] border border-[#1a1a1a]">
                <BarChart2 className="h-6 w-6 text-[#ffcc00]" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Real-time Analytics
              </h3>
              <p className="text-gray-400">
                Drive your transportation system with data-backed decisions and
                achieve your revenue goals.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#0f0f0f] border border-[#1a1a1a]">
                <ShieldCheck className="h-6 w-6 text-[#ffcc00]" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Smart Fairflex Device
              </h3>
              <p className="text-gray-400">
                Our proprietary security device ensures the protection and
                tracking of every vehicle registered on our platform.
              </p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
