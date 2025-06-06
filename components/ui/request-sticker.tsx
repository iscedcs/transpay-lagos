import { Button } from "./button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";
import { getFullVehicleById } from "@/actions/vehicles";

export default async function RequestSticker({ id }: { id: string }) {
  const fullVehicle = await getFullVehicleById(id);
  const vehicle = fullVehicle?.vehicle;

  return (
    <Dialog>
      <DialogTitle>Request For Sticker</DialogTitle>
      <DialogTrigger asChild>
        <Button variant="default">Request For Sticker</Button>
      </DialogTrigger>
      <DialogContent>
        <p className="text-[20px] font-bold">Request For Sticker</p>
        {/* <RequestStickerForm asin={vehicle?.asin_number} name={vehicle?.User?.firstName} plate_number={vehicle?.plate_number} /> */}
      </DialogContent>
    </Dialog>
  );
}
