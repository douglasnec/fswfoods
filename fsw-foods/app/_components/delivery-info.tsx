import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
    restaurant: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
    return (
        <>
            <Card className='flex justify-around py-3 mt-6 px-5'>
            <div className='flex flex-col items-center'>
                <div className='flex items-center gap-1 text-muted-foreground'>
                    <span className='text-xs'>Entrega</span>
                    <BikeIcon size={14} />
                </div>
                <div>
                    {Number(restaurant.deliveryFee) > 0 ? (
                        <p className='text-sm font-semibold'>
                            {formatCurrency(Number(restaurant.deliveryFee))}
                        </p>
                    ):(
                        <p className='text-sm font-semibold'>Grátis</p>
                    )}
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <div className='flex items-center gap-1 text-muted-foreground'>
                    <span className='text-xs'>Entrega</span>
                    <TimerIcon size={14} />
                </div>
                <div>                            
                    <p className='text-sm font-semibold'>
                        {Number(restaurant.deliveryTimeMinutes)} min
                    </p>                            
                </div>
            </div>

            </Card>
        </>);
}
 
export default DeliveryInfo;