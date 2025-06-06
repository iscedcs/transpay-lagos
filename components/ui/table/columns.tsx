"use client";
import { UpdateBitsForm } from "@/components/forms/update-bits-form";
import { UpdateSettingsForm } from "@/components/forms/update-settings-form";
import UpdateWaiverButton from "@/components/role/rider/update-waiver-button";
import DeleteWaiverButton from "@/components/shared/delete-buttons/delete-waiver-button";
import Receipt from "@/components/shared/receipt/vehicle-transaction";
import { Button } from "@/components/ui/button";
import {
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuLabel,
     DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { deleteIcon, editIcon, paymentIcon, printIcon } from "@/lib/icons";
import { formatDate } from "@/lib/utils";
// import { vehicle_groups, vehicles } from "@prisma/client";
import {
     DropdownMenu,
     DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
     Eye,
     EyeIcon,
     MapPinIcon,
     MoreHorizontal,
     MoreVertical,
     Trash2,
} from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "../dialog";
import { DataTableColumnHeader } from "./data-column-table-header";
import { DeleteVehicleButton } from "@/components/delete-vehicle-from-group-button";
import Pill from "../pill";
import Cbadge from "../category-badge";
import { WAIVER_STATUS } from "@/lib/const";
import { Vehicle, VehicleGroup } from "@prisma/client";
import GetCompanyVehicle from "@/components/shared/get-company-info";
import RestoreCompanyButton from "@/components/shared/delete-buttons/restore-company-button";
import DeleteCompanyButton from "@/components/shared/delete-buttons/delete-company-button";
import RemoveVehicleFromCompany from "@/components/shared/delete-buttons/remove-vehicle-from-company";

export const debtColumns: ColumnDef<IVehiclePayment>[] = [
     {
          accessorKey: " ",
          header: ({ column }) => (
               <DataTableColumnHeader column={column} title="Date" />
          ),
          cell: ({ row }) => {
               const payment = row.original;
               return (
                    <div>
                         {format(
                              new Date(payment.transaction_date),
                              "MMM, dd yyyy",
                         )}
                    </div>
               );
          },
     },
     {
          accessorKey: "amount",
          header: () => <div className="text-right">Amount</div>,
          cell: ({ row }) => {
               const amount = parseFloat(row.getValue("amount"));
               return <div className="text-right font-medium">₦{amount}</div>;
          },
     },
     {
          accessorKey: "transaction_type",
          header: () => <div className="text-right">Transaction Type</div>,
          cell: ({ row }) => {
               const tt = row.original.transaction_type;
               return <div className="text-right font-medium">{tt}</div>;
          },
     },
];
export const paymentColumns: ColumnDef<IVehiclePayment>[] = [
     {
          accessorKey: "transaction_date",
          header: ({ column }) => (
               <DataTableColumnHeader column={column} title="Date" />
          ),
          cell: ({ row }) => {
               const payment = row.original;
               return formatDate(payment.transaction_date);
          },
          sortDescFirst: true,
     },
     {
          accessorKey: "amount",
          header: () => <div className="">Amount</div>,
          cell: ({ row }) => {
               const amount = parseFloat(row.getValue("amount"));
               return <div className="font-medium">₦{amount}</div>;
          },
     },
     {
          accessorKey: "payment_status",
          header: ({ column }) => (
               <DataTableColumnHeader column={column} title="Status" />
          ),
          cell: ({ row }) => {
               const status = row.original.payment_status;
               const style =
                    status === "failed"
                         ? "text-destructive-foreground"
                         : status === "success"
                           ? "text-awesome-foreground"
                           : status === "processing"
                             ? "text-orange-300"
                             : "text-primary";
               return <div className={`uppercase ${style}`}>{status}</div>;
          },
     },
     {
          accessorKey: "payment_type",
          header: "Payment Type",
          cell: ({ row }) => (
               <div className="uppercase">{row.original.payment_type}</div>
          ),
     },
     {
          id: "actions",
          cell: ({ row }) => {
               const payment = row.original;

               return (
                    <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                   <span className="sr-only">Open menu</span>
                                   <MoreHorizontal className="h-4 w-4" />
                              </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                   onClick={() =>
                                        navigator.clipboard.writeText(
                                             payment.vehicle_transaction_id,
                                        )
                                   }
                              >
                                   Copy payment ID
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                   <Dialog>
                                        <DialogTrigger className="px-2 text-sm">
                                             View receipt
                                        </DialogTrigger>
                                        <DialogContent>
                                             <Receipt receipt={payment} />
                                             <DialogFooter className="grid grid-cols-2 gap-3">
                                                  <Button>Print</Button>
                                             </DialogFooter>
                                        </DialogContent>
                                   </Dialog>
                              </DropdownMenuItem>
                         </DropdownMenuContent>
                    </DropdownMenu>
               );
          },
     },
];
export const adminsColumns: ColumnDef<IUserExtended>[] = [
     {
          accessorKey: "name",
          header: ({ column }) => (
               <DataTableColumnHeader column={column} title="Name" />
          ),
          cell: ({ row }) => (
               <Link href={`/admins/${row.original.id}`} className="">
                    {row.original.firstName} {row.original.lastName}
               </Link>
          ),
     },
     {
          accessorKey: "email",
          header: ({ column }) => (
               <DataTableColumnHeader column={column} title="Email" />
          ),
          cell: ({ row }) => <div>{row.original.email}</div>,
     },
     {
          accessorKey: "phone",
          header: ({ column }) => (
               <DataTableColumnHeader column={column} title="Phone" />
          ),
          cell: ({ row }) => <div>{row.original.phone}</div>,
     },
     {
          accessorKey: "blacklisted",
          header: "Status",
          cell: ({ row }) => {
               if (row.getValue("blacklisted") === true)
                    return <Pill status={"inactive"} text={"inactive"} />;
               else return <Pill status={"active"} text={"active"} />;
          },
     },
     {
          id: "actions",
          header: "Action",
          cell: ({ row }) => {
               return (
                    <div className="flex items-center justify-start gap-2">
                         <Link
                              href={`/admins/${row.original.id}`}
                              className="h-5 w-5 shrink-0 items-center"
                         >
                              <EyeIcon className="h-4 w-4" />
                         </Link>
                    </div>
               );
          },
     },
];
export const agentsColumns: ColumnDef<IUserExtended>[] = [
     {
          accessorKey: "name",
          header: ({ column }) => (
               <DataTableColumnHeader column={column} title="Name" />
          ),
          cell: ({ row }) => (
               <Link href={`/agents/${row.original.id}`} className="">
                    {row.original.firstName} {row.original.lastName}
               </Link>
          ),
     },
     {
          accessorKey: "email",
          header: ({ column }) => (
               <DataTableColumnHeader column={column} title="Email" />
          ),
          cell: ({ row }) => <div>{row.original.email}</div>,
     },
     {
          accessorKey: "phone",
          header: ({ column }) => (
               <DataTableColumnHeader column={column} title="Phone" />
          ),
          cell: ({ row }) => <div>{row.original.phone}</div>,
     },
     {
          accessorKey: "blacklisted",
          header: "Status",
          cell: ({ row }) => {
               if (row.getValue("blacklisted") === true)
                    return <Pill status={"inactive"} text={"inactive"} />;
               else return <Pill status={"active"} text={"active"} />;
          },
     },
     {
          id: "actions",
          header: "Action",
          cell: ({ row }) => {
               return (
                    <div className="flex items-center justify-start gap-2">
                         <Link
                              href={`/agents/${row.original.id}`}
                              className="h-5 w-5 shrink-0 items-center"
                         >
                              <EyeIcon className="h-4 w-4" />
                         </Link>
                         {/* <DeleteAgentButton id={row.original.id} /> */}
                    </div>
               );
          },
     },
];

export const vehiclesColumns: ColumnDef<IVehicle>[] = [
  // {
  //      accessorKey: "Drivers",
  //      header: ({ column }) => (
  //           <DataTableColumnHeader column={column} title="Owner" />
  //      ),
  //      cell: ({ row }) => {
  //           const vehicle = row.original;
  //           const owner = row.original.owner
  //           return (
  //             <Link href={`/vehicles/${vehicle.id}`} className="">
  //               {owner.firstName} {owner.lastName}
  //             </Link>
  //           );
  //      },
  // },
  {
    accessorKey: "plateNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plate Number" />
    ),
    cell: ({ row }) => (
      <Link href={`/vehicles/${row.original.id}`}>
        {row.original.plateNumber}
      </Link>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div className="uppercase">{row.original.status}</div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => <div className="uppercase">{row.original.category}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const vehicle = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-black" align="end">
            <DropdownMenuItem
              className="rounded-none border-b border-black"
              asChild
            >
              <Link href={`/vehicles/${vehicle.id}`}>
                <span className="mr-3 h-4 w-4">{editIcon}</span>
                View Vehicle
              </Link>
            </DropdownMenuItem>
            {vehicle.tracker && vehicle.tracker.terminal_id && (
              <DropdownMenuItem
                className="rounded-none border-b border-black"
                asChild
              >
                <Link href={`/vehicles/${vehicle.id}/location`}>
                  <MapPinIcon className="mr-3 h-4 w-4" />
                  View Location
                </Link>
              </DropdownMenuItem>
            )}
            {/* <DropdownMenuItem
							className='border-b border-black rounded-none'
							asChild
						>
							<Link
								href={`/vehicles/${vehicle.vehicle_id}/payments`}
							>
								<span className='h-4 w-4 mr-3'>
									{paymentIcon}
								</span>
								View Payment
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							className='border-b border-black rounded-none'
							asChild
						>
							<Link
								href={`/vehicles/${vehicle.vehicle_id}/fines`}
							>
								<span className='h-4 w-4 mr-3'>
									{finesIcon}
								</span>
								View Fines
							</Link>
						</DropdownMenuItem> */}
            <DropdownMenuItem className="text-destructive">
              Delete Vehicle
            </DropdownMenuItem>
            {/* <DropdownMenuItem
							className=''
							onClick={() =>
								navigator.clipboard.writeText(
									vehicle.id
								)
							}
						>
							Copy vehicle ID
						</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const vehiclesGroupColumns: ColumnDef<IVehicle>[] = [
  {
    accessorKey: "Drivers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    cell: ({ row }) => (
      <Link href={`/vehicles/${row.original.id}`} className="">
        {row.original.owner.firstName} {row.original.owner.lastName}
      </Link>
    ),
  },
  {
    accessorKey: "plateNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plate Number" />
    ),
    cell: ({ row }) => (
      <div className="uppercase">{row.original.plateNumber}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div className="uppercase">{row.original.status}</div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => <div className="uppercase">{row.original.category}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const vehicle = row.original;
      return <DeleteVehicleButton vehicle={vehicle} />;
    },
  },
];
export const groupedVehiclesColumns: ColumnDef<VehicleGroup>[] = [
  {
    accessorKey: "groupName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Name" />
    ),
    cell: ({ row }) => (
      <Link href={`/companies/${row.original.id}`} className="">
        {row.original.groupName}
      </Link>
    ),
  },
  {
    accessorKey: "_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number Of Vehicle" />
    ),
    cell: ({ row }) => (
      <Link href={`/companies/${row.original.id}`} className="">
        {/* @ts-ignore */}
        {row.original.Vehicle.length}
      </Link>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const group = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-black" align="end">
            <DropdownMenuItem
              className="rounded-none border-b border-black"
              asChild
            >
              <Link href={`/companies/${group.id}`}>
                <span className="mr-3 h-4 w-4">{editIcon}</span>
                Edit Company
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive-foreground">
              <Link
                href={`/companies/${group.id}`}
                className="flex gap-3 items-center"
              >
                <Trash2 className="h-4 w-4" /> Delete Company
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem
							className=''
							onClick={() =>
								navigator.clipboard.writeText(
									vehicle.id
								)
							}
						>
							Copy vehicle ID
						</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const groupedVehiclesIdColumns: ColumnDef<VehicleGroup>[] = [
  {
    accessorKey: "groupName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group Name" />
    ),
    cell: ({ row }) => (
      <Link href={`/groups/${row.original.id}`} className="">
        {row.original.groupName}
      </Link>
    ),
  },
  {
    accessorKey: "vehicles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle" />
    ),
    cell: ({ row }) => (
      <Link href={`/groups/${row.original.id}`} className="">
        {/* @ts-ignore */}
        {row.original.Vehicle.length}
      </Link>
    ),
  },
  // {
  //      accessorKey: "plateNumber",
  //      header: ({ column }) => (
  //           <DataTableColumnHeader column={column} title="Plate Number" />
  //      ),
  //      cell: ({ row }) => (
  //           <div className="uppercase">{row.original.plateNumber}</div>
  //      ),
  // },
  // {
  //      accessorKey: "status",
  //      header: ({ column }) => (
  //           <DataTableColumnHeader column={column} title="Status" />
  //      ),
  //      cell: ({ row }) => (
  //           <div className="uppercase">{row.original.status}</div>
  //      ),
  // },
  // {
  //      accessorKey: "category",
  //      header: ({ column }) => (
  //           <DataTableColumnHeader column={column} title="Category" />
  //      ),
  //      cell: ({ row }) => (
  //           <div className="uppercase">{row.original.category}</div>
  //      ),
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const vehicle = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-black" align="end">
            <DropdownMenuItem
              className="rounded-none border-b border-black"
              asChild
            >
              <Link href={`/groups/${vehicle.id}`}>
                <span className="mr-3 h-4 w-4">{editIcon}</span>
                Edit Group Info
              </Link>
            </DropdownMenuItem>
            {/* {vehicle.tracker &&
                                   vehicle.tracker.terminal_id && (
                                        <DropdownMenuItem
                                             className="rounded-none border-b border-black"
                                             asChild
                                        >
                                             <Link
                                                  href={`/vehicles/${vehicle.id}/location`}
                                             >
                                                  <MapPinIcon className="mr-3 h-4 w-4" />
                                                  View Location
                                             </Link>
                                        </DropdownMenuItem>
                                   )} */}
            {/* <DropdownMenuItem
							className='border-b border-black rounded-none'
							asChild
						>
							<Link
								href={`/vehicles/${vehicle.vehicle_id}/payments`}
							>
								<span className='h-4 w-4 mr-3'>
									{paymentIcon}
								</span>
								View Payment
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							className='border-b border-black rounded-none'
							asChild
						>
							<Link
								href={`/vehicles/${vehicle.vehicle_id}/fines`}
							>
								<span className='h-4 w-4 mr-3'>
									{finesIcon}
								</span>
								View Fines
							</Link>
						</DropdownMenuItem> */}
            <DropdownMenuItem className="text-destructive">
              Remove Vehicle From Group
            </DropdownMenuItem>
            {/* <DropdownMenuItem
							className=''
							onClick={() =>
								navigator.clipboard.writeText(
									vehicle.id
								)
							}
						>
							Copy vehicle ID
						</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const agentVehiclesColumns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Driver" />
    ),
    cell: ({ row }) => (
      <Link href={`/vehicles/${row.original.id}`} className="uppercase">
        {/* @ts-expect-error */}
        {row.original.owner?.name}
      </Link>
    ),
  },
  {
    accessorKey: "plateNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plate Number" />
    ),
    cell: ({ row }) => (
      <div className="uppercase">{row.original.plateNumber}</div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => <div className="uppercase">{row.original.category}</div>,
  },
];
export const propertiesColumns: ColumnDef<IProperty>[] = [
  {
    accessorKey: "propertyId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property ID" />
    ),
    cell: ({ row }) => (
      <Link href={`/property/${row.original.propertyId}`} className="">
        {row.original.propertyId}
      </Link>
    ),
  },
  {
    accessorKey: "ownerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    cell: ({ row }) => (
      <div className="uppercase">{row.original.ownerName}</div>
    ),
  },
  // {
  // 	accessorKey: 'isPaid',
  // 	header: ({ column }) => (
  // 		<DataTableColumnHeader
  // 			column={column}
  // 			title='Status'
  // 		/>
  // 	),
  // 	cell: ({ row }) => (
  // 		<div className='uppercase'>{row.original.isPaid.valueOf()}</div>
  // 	),
  // },
  {
    accessorKey: "paymentDueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => (
      <div className="uppercase">{row.original.paymentDueDate}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const property = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-black" align="end">
            <DropdownMenuItem
              className="rounded-none border-b border-black"
              asChild
            >
              <Link href={`/property/${property.propertyId}`}>
                <span className="mr-3 h-4 w-4">{editIcon}</span>
                View Vehicle
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-none border-b border-black"
              asChild
            >
              <Link href={`/property/${property.propertyId}/location`}>
                <MapPinIcon className="mr-3 h-4 w-4" />
                View Location
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete Property
            </DropdownMenuItem>
            <DropdownMenuItem
              className=""
              onClick={() => navigator.clipboard.writeText(property.propertyId)}
            >
              Copy Property ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const propertyPaymentColumns: ColumnDef<IPropertyPaymentRecord>[] = [
  {
    accessorKey: "amountPaid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount Paid" />
    ),
    cell: ({ row }) => <div className="">{row.original.amountPaid}</div>,
  },
  {
    accessorKey: "paymentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Paid" />
    ),
    cell: ({ row }) => (
      <div className="uppercase">{row.original.paymentDate}</div>
    ),
  },
];
export const agentPaymentColumns: ColumnDef<AgentPayment>[] = [
  {
    accessorKey: "driver",
    header: "Driver",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = row.getValue("amount");
      return <div className="text-right font-medium">{`₦${amount}`}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const style =
        status === "failed"
          ? "text-destructive-foreground"
          : status === "successful"
          ? "text-awesome-foreground"
          : status === "pending"
          ? "text-orange-300"
          : "text-primary";
      return <div className={`uppercase ${style}`}>{status}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <Button
          className="gap-2"
          onClick={() => navigator.clipboard.writeText(payment.driver)}
        >
          <div className="h-4 w-4">{printIcon}</div>Print
        </Button>
      );
    },
  },
];
export const viewDriversColumns: ColumnDef<DriverPayment>[] = [
  {
    accessorKey: "Date",
    header: "Date",
  },
  {
    accessorKey: "amount_NGN",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = row.getValue("amount_NGN");
      return <div className="text-right font-medium">{`₦${amount}`}</div>;
    },
  },
  {
    accessorKey: "payment_type",
    header: "Payment Type",
    cell: ({ row }) => {
      const payment_type = row.original.payment_type;
      const style =
        payment_type === "Cash"
          ? "text-destructive-foreground"
          : payment_type === "Mobile Transfer"
          ? "text-awesome-foreground"
          : payment_type === "Transfer"
          ? "text-orange-300"
          : "text-primary";
      return <div className={`uppercase ${style}`}>{payment_type}</div>;
    },
  },

  {
    accessorKey: "handled_by",
    header: "Handled By",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <Button
          className="gap-2"
          onClick={() => navigator.clipboard.writeText(payment.driver)}
        >
          <div className="h-4 w-4">{printIcon}</div>Print
        </Button>
      );
    },
  },
];
export const driversColumns: ColumnDef<IDriver>[] = [
  {
    accessorKey: "firstname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <Link href={`/drivers/${row.original.driver_id}`} className="">
        {`${row.original.firstname} ${row.original.lastname}`}
      </Link>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "lga",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LGA" />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const driver = row.original;
      return (
        <div
          className="cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(driver.driver_id);
          }}
        >
          Copy ID
        </div>
      );
    },
  },
];
export const settingsColumns: ColumnDef<ISettings>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="">{row.original.name}</div>,
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const setting = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <EyeIcon className="h-4 w-4" />
              <span className="hidden md:block">View</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <UpdateSettingsForm settings={setting} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export const bitsColumns: ColumnDef<IBits>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="">{row.original.name}</div>,
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const bit = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <EyeIcon className="h-4 w-4" />
              <span className="hidden md:block">View</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <UpdateBitsForm bit={bit} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];

// WEBAGENT
export const webAgentDriversColumns: ColumnDef<AgentT>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "plate",
    header: "Vehicle Plate Number",
    cell: ({ row }) => (
      <span className="uppercase">{row.getValue("plate")}</span>
    ),
  },
  {
    accessorKey: "plate",
    header: "Vehicle Plate Number",
    cell: ({ row }) => (
      <span className="uppercase">{row.getValue("plate")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Today Status",
    cell: ({ row }) => (
      <Pill status={row.getValue("status")} text={row.getValue("status")} />
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <Cbadge variant={row.getValue("category")} />,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-black" align="end">
            <DropdownMenuItem
              className="rounded-none border-b border-black"
              asChild
            >
              <Link href={`/web-agent/driver/${row.id}`}>
                <span className="mr-3 h-4 w-4">{editIcon}</span>
                View Driver
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-none border-b border-black"
              asChild
            >
              <Link href={`/web-agent/driver/payment/${row.id}`}>
                <span className="mr-3 h-4 w-4">{paymentIcon}</span>
                Make Payment
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <span className="mr-3 h-4 w-4">{deleteIcon}</span>
              Delete Driver
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const viewWebAgentDriversColumns: ColumnDef<DriverPayment>[] = [
  {
    accessorKey: "Date",
    header: "Date",
  },
  {
    accessorKey: "amount_NGN",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = row.getValue("amount_NGN");
      return <div className="text-right font-medium">{`₦${amount}`}</div>;
    },
  },
  {
    accessorKey: "payment_type",
    header: "Payment Type",
    cell: ({ row }) => {
      const payment_type = row.original.payment_type;
      const style =
        payment_type === "Cash"
          ? "text-destructive-foreground"
          : payment_type === "Mobile Transfer"
          ? "text-awesome-foreground"
          : payment_type === "Transfer"
          ? "text-orange-300"
          : "text-primary";
      return <div className={`uppercase ${style}`}>{payment_type}</div>;
    },
  },

  {
    accessorKey: "handled_by",
    header: "Handled By",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <Button
          className="gap-2"
          onClick={() => navigator.clipboard.writeText(payment.driver)}
        >
          <div className="h-4 w-4">{printIcon}</div>Print
        </Button>
      );
    },
  },
];

export const viewWaiverColumns: ColumnDef<IWaiver>[] = [
  {
    accessorKey: "startDate",
    header: "Timeline",
    cell: ({ row }) => {
      const startDate = row.original.startDate;
      const endDate = row.original.endDate;
      return (
        <div className="font-medium">{`${format(
          new Date(startDate),
          "MMM dd"
        )} - ${
          endDate === "9999-01-01T00:00:00.000Z"
            ? "FOREVER"
            : format(new Date(endDate), "MMM dd")
        }`}</div>
      );
    },
  },
  {
    accessorKey: "reason",
    header: () => <div className="">Reason</div>,
    cell: ({ row }) => {
      const reason = row.original.reason;
      return <div className="font-medium">{`${reason}`}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="">Status</div>,
    cell: ({ row }) => {
      const status = row.original.status;

      return <div className={`uppercase`}>{status}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const waiver = row.original;
      if (waiver.status !== WAIVER_STATUS.cancelled)
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border border-black" align="end">
              <DeleteWaiverButton id={waiver.vehicle_id} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
    },
  },
];
export const viewWaiverColumnsAdmin: ColumnDef<IWaiver>[] = [
  {
    accessorKey: "startDate",
    header: "Timeline",
    cell: ({ row }) => {
      const startDate = row.original.startDate;
      const endDate = row.original.endDate;
      return (
        <div className="font-medium">{`${format(
          new Date(startDate),
          "MMM dd"
        )} - ${
          endDate === "9999-01-01T00:00:00.000Z"
            ? "FOREVER"
            : format(new Date(endDate), "MMM dd")
        }`}</div>
      );
    },
  },
  {
    accessorKey: "reason",
    header: () => <div className="">Reason</div>,
    cell: ({ row }) => {
      const reason = row.original.reason;
      return <div className="font-medium">{`${reason}`}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="">Status</div>,
    cell: ({ row }) => {
      const status = row.original.status;

      return <div className={`uppercase`}>{status}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const waiver = row.original;
      if (waiver.status !== WAIVER_STATUS.cancelled)
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border border-black" align="end">
              <DropdownMenuItem asChild>
                <UpdateWaiverButton waiver={waiver} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DeleteWaiverButton id={waiver.vehicle_id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
    },
  },
];

export const companiesColumn: ColumnDef<ICompany>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Name" />
    ),
    cell: ({ row }) => (
      <Link
        href={` ${
          row.original.deleted_at === null
            ? `/companies/${row.original.id}`
            : `/companies/${row.original.id}/deleted`
        } `}
        className=""
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "vehicles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number of Vehicles" />
    ),
    // accessorFn: (row) => row.vehicles.length,
    cell: ({ row }) => (
      <div className="">
        <GetCompanyVehicle id={row.original.id} />
      </div>
    ),
  },
  {
    accessorKey: "directorCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number of Directors" />
    ),
    // accessorFn: (row) => row.directors.length,
    cell: ({ row }) => <div className="">{row.original.directorCount}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const group = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-black" align="end">
            {group.deleted_at === null && (
              <DropdownMenuItem
                className="rounded-none border-b border-black"
                asChild
              >
                <Link
                  className="flex cursor-pointer gap-3 items-center"
                  href={`/companies/${group.id}`}
                >
                  <Eye className="  h-4 w-4" />
                  View Company
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>
              {group.deleted_at === null ? (
                <DeleteCompanyButton id={group.id} />
              ) : (
                <RestoreCompanyButton id={group.id} />
              )}
            </DropdownMenuItem>

            {/* <DropdownMenuItem
                                      className=''
                                      onClick={() =>
                                           navigator.clipboard.writeText(
                                                vehicle.id
                                           )
                                      }
                                 >
                                      Copy vehicle ID
                                 </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
   
   export const companyVehiclesColumn: ColumnDef<IVehicle>[] = [
     {
       accessorKey: "Drivers",
       header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Owner" />
       ),
       cell: ({ row }) => (
         <Link href={`/vehicles/${row.original.id}`} className="">
           {row.original.owner.firstName}{" "}{row.original.owner.lastName}
         </Link>
       ),
     },
     {
       accessorKey: "plate_number",
       header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Plate Number" />
       ),
       cell: ({ row }) => (
         <div className="uppercase">{row.original.plateNumber}</div>
       ),
     },
     {
       accessorKey: "status",
       header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Status" />
       ),
       cell: ({ row }) => <div className="uppercase">{row.original.status}</div>,
     },
     {
       accessorKey: "category",
       header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Category" />
       ),
       cell: ({ row }) => <div className="uppercase">{row.original.category}</div>,
     },
     {
       id: "actions",
       cell: ({ row }) => {
         const vehicle = row.original;
         return (
           <DropdownMenu>
             <DropdownMenuTrigger>
               <MoreVertical className="h-4 w-4" />
             </DropdownMenuTrigger>
             <DropdownMenuContent className="border border-black" align="end">
               <DropdownMenuItem
                 className="rounded-none border-b border-black"
                 asChild
               >
                 <Link href={`/vehicles/${vehicle.id}`}>
                   <span className="mr-3 h-4 w-4">{editIcon}</span>
                   View Vehicle
                 </Link>
               </DropdownMenuItem>
               {vehicle.tracker && vehicle.tracker.terminal_id && (
                 <DropdownMenuItem
                   className="rounded-none border-b border-black"
                   asChild
                 >
                   <Link href={`/vehicles/${vehicle.id}/location`}>
                     <MapPinIcon className="mr-3 h-4 w-4" />
                     View Location
                   </Link>
                 </DropdownMenuItem>
               )}
               <DropdownMenuItem>
                 <RemoveVehicleFromCompany
                   className="  text-black hover:bg-white bg-white"
                   id={vehicle.id}
                 />
               </DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
         );
       },
     },
   ];