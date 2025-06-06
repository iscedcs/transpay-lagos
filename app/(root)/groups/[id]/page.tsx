import { getGroupById } from '@/actions/groups';
import { auth } from '@/auth';
import { AddVehicleToGroupModal } from '@/components/ui/add-to-vehicle-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { vehiclesGroupColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { formatCurrency } from '@/lib/utils';
import { $Enums, Role } from '@prisma/client';
import { format } from 'date-fns';
import { Car, Users } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | undefined }>;    
}
export async function generateMetadata({
    params}:PageProps) {
    const group = await getGroupById((await params).id);
    if (!group) return notFound();

    return {
    title: `Transpay - ${group.groupName} Group`
  }
}


export default async function IndividualGoupPage({
    params,
}: PageProps) {  
    const session = await auth();
	if(!session) return redirect("/sign-in");
    const user = session?.user
    const role = Role
    const group = await getGroupById((await params).id);
    
    if (!group) return notFound()
    return(
        <div className='px-4'>
            <Card className="mb-8">
                <CardHeader>
                <CardTitle className="text-2xl">{group.groupName}</CardTitle>
                <CardDescription>
                    Created on {format(group.createdAt, 'LLLL dd, yyyy')}
                </CardDescription>
                </CardHeader>
                <CardContent>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                    <Car className="mr-2 h-4 w-4" />
                    {/* <span>{group._count.vehicles} vehicles</span> */}
                    </div>
                    <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Total Charge: {formatCurrency(group.totalCharge)}</span>
                    </div>
                </div>
                </CardContent>
            </Card>
            
            <div className="flex items-center justify-between font-bold uppercase">
            {session.user && session.user.role?.toLowerCase() !== "green_engine" && (
                <div className="shrink-0 grow-0">
                    
                        <Dialog>
                        <DialogTrigger>
                            <AddVehicleToGroupModal group={group}/>
                        </DialogTrigger>
                        </Dialog>
                </div>
            )}
        </div>   
                
            <div className="w-full">
                {user?.role === role.SUPERADMIN || user?.role === role.ADMIN}
                {/* <DataTable 
                    showSearch
                    searchWith="plateNumber"
                    searchWithPlaceholder="Search with plate number"
                    showColumns
                    columns={vehiclesGroupColumns}
                    data={group.vehicles ?? []}
                /> */}
            </div>
        </div>
    )
}