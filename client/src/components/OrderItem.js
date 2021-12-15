import React from "react";

const OrderItem = ({ item }) => {

    return (
        <div className="flex p-1 justify-between mt-4 border-b">
            <div>
                <img className="h-20 relative" src={`/images/${item.photo}`} alt=""/>
            </div>
            
            <div className="flex flex-col items-end pt-6">
                
                <h2 className="font-extralight uppercase text-gray-400 text-sm">{item.name}</h2>
                <p className="text-xs">{`${item.quantity} ${item.quantity === 1 ? 'pair' : 'pairs'}`}</p>
                <p className="font-semibold textlg">{`£${item.price}`}</p>
            </div>
            
        </div>
    )
}

export default OrderItem;