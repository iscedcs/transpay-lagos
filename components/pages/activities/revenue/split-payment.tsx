import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { AIRS, FNTC, TRANSPAY } from "@/lib/const";
import { getTotalRevenue } from "@/lib/controllers/revenue.controller";

export default async function SplitPayment() {
     const revenue = await getTotalRevenue("TOTAL");
     return (
          <Card>
               <CardHeader>
                    <CardTitle>TOTAL REVENUE SPLIT</CardTitle>
               </CardHeader>
               <CardContent>
                    <Table>
                         <TableHeader>
                              <TableRow>
                                   <TableHead>Total Sharable</TableHead>
                                   <TableHead>AIRS (90%)</TableHead>
                                   <TableHead>Transpay (10%)</TableHead>
                              </TableRow>
                         </TableHeader>
                         <TableBody>
                              <TableRow className="font-xl font-bold">
                                   <TableCell>{FNTC.format(revenue)}</TableCell>
                                   <TableCell>
                                        {FNTC.format(revenue * AIRS)}
                                   </TableCell>
                                   <TableCell>
                                        {FNTC.format(revenue * TRANSPAY)}
                                   </TableCell>
                              </TableRow>
                         </TableBody>
                    </Table>
               </CardContent>
          </Card>
     );
}
