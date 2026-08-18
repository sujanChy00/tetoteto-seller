import { useState } from "react";
import { useMMKVString } from "react-native-mmkv";

import { IPackedOrders, PackedItems } from "@/types";
import { storage } from "@/utils/storage";

export const useOrderPacking = () => {
  const [packedOrders, set] = useMMKVString("packed.orders", storage);
  const [orders, setOrders] = useState<IPackedOrders[]>(
    JSON.parse(packedOrders || "[]") || [],
  );

  const resetPackedOrdersForId = ({ orderId }: { orderId: number }) => {
    setOrders((prevOrders) => {
      const orderIndex = prevOrders.findIndex(
        (order) => order.orderId === orderId,
      );
      if (orderIndex === -1) {
        return prevOrders;
      } else {
        const updatedOrders = [...prevOrders];
        updatedOrders.splice(orderIndex, 1);
        set(JSON.stringify(updatedOrders));
        return updatedOrders;
      }
    });
  };

  const packAllOrders = (orderId: number, items: PackedItems[]) => {
    setOrders((prevOrders) => {
      const orderIndex = prevOrders.findIndex(
        (order) => order.orderId === orderId,
      );
      let updatedOrders;

      if (orderIndex === -1) {
        updatedOrders = [
          ...prevOrders,
          { orderId, items, createdAt: Date.now() },
        ];
      } else {
        updatedOrders = [...prevOrders];
        updatedOrders[orderIndex].items = items;
        updatedOrders[orderIndex].createdAt = Date.now();
      }

      if (updatedOrders.length > 5) {
        const latestOrderIndex = updatedOrders.reduce(
          (latestIndex, order, index) =>
            order.createdAt > updatedOrders[latestIndex].createdAt
              ? latestIndex
              : index,
          0,
        );
        updatedOrders.splice(latestOrderIndex, 1);
      }

      set(JSON.stringify(updatedOrders));
      return updatedOrders;
    });
  };

  const setPackedOrders = ({
    orderId,
    items,
  }: {
    orderId: number;
    items: PackedItems;
  }) => {
    setOrders((prevOrders) => {
      const orderIndex = prevOrders.findIndex(
        (order) => order.orderId === orderId,
      );

      let updatedOrders;
      if (orderIndex === -1) {
        updatedOrders = [
          ...prevOrders,
          { orderId, items: [items], createdAt: Date.now() },
        ];
      } else {
        updatedOrders = [...prevOrders];
        const existingItemIndex = updatedOrders[orderIndex].items.findIndex(
          (item) => item.itemId === items.itemId,
        );

        if (existingItemIndex === -1) {
          if (items.quantity > 0) {
            updatedOrders[orderIndex].items.push(items);
          }
        } else {
          const existingItem =
            updatedOrders[orderIndex].items[existingItemIndex];

          if (existingItem.itemId === items.itemId) {
            if (existingItem.quantity === items.quantity) {
              updatedOrders[orderIndex].items.splice(existingItemIndex, 1);
            } else {
              if (items.quantity === 0) {
                updatedOrders[orderIndex].items.splice(existingItemIndex, 1);
              } else {
                updatedOrders[orderIndex].items[existingItemIndex].quantity =
                  items.quantity;
              }
            }
          }
        }

        if (updatedOrders[orderIndex].items.length === 0) {
          updatedOrders.splice(orderIndex, 1);
        } else {
          updatedOrders[orderIndex].createdAt = Date.now();
        }
      }

      if (updatedOrders.length > 5) {
        const oldestOrderIndex = updatedOrders.reduce(
          (oldestIndex, order, index) =>
            order.createdAt < updatedOrders[oldestIndex].createdAt
              ? index
              : oldestIndex,
          0,
        );
        updatedOrders.splice(oldestOrderIndex, 1);
      }

      set(JSON.stringify(updatedOrders));

      return updatedOrders;
    });
  };

  const selectedOrder = (orderId: number) =>
    orders.find((item) => Number(item.orderId) === Number(orderId));

  const selectedItem = (orderId: number, itemId: string) =>
    selectedOrder(orderId)?.items.find((item) => item.itemId === itemId);
  const isItemSelected = (orderId: number, itemId: string) =>
    selectedItem(orderId, itemId)?.itemId === itemId;
  const totalPackedOrders = (orderId: number) =>
    selectedOrder(orderId)?.items.reduce((acc, item) => acc + item.quantity, 0);

  return {
    packedOrders: orders,
    setPackedOrders,
    resetPackedOrdersForId,
    selectedOrder,
    selectedItem,
    isItemSelected,
    packAllOrders,
    totalPackedOrders,
  };
};
