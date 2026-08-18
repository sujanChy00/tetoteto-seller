import { IPackedOrders, ITransactionByIdItems, PackedItems } from "@/types";
import { storage } from "@/utils/storage";
import {
  BottomSheetMethods,
  BottomSheetModal,
} from "@expo/ui/community/bottom-sheet";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMMKVString } from "react-native-mmkv";

interface Props {
  orderId: number;
  orderedItems: ITransactionByIdItems[];
  children: React.ReactNode;
}

export const OrderPackingContext = createContext<{
  selectedOrder: IPackedOrders | undefined;
  selectedItem: ((itemId: string) => PackedItems | undefined) | null;
  isItemSelected: ((itemId: string) => boolean) | null;
  totalPackedOrders: number;
  packAllOrders: (() => void) | null;
  resetPackedOrders: (() => void) | null;
  startPacking: boolean;
  setStartPacking: (startPacking: boolean) => void;
  totalOrderQuantity: number;
  setPackedOrders: ({ items }: { items: PackedItems }) => void;
  isTotalItemsPacked: boolean;
  oneItem: ITransactionByIdItems | undefined;
  setOneItem: (item: ITransactionByIdItems | undefined) => void;
  openSheet: () => void;
  closeSheet: () => void;
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
} | null>(null);

export const OrderPackingProvider = ({
  orderId,
  orderedItems: items,
  children,
}: Props) => {
  const [packedOrders, set] = useMMKVString("packed.orders", storage);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [startPacking, setStartPacking] = useState(false);
  const [oneItem, setOneItem] = useState<ITransactionByIdItems>();

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const itemsToPack = useMemo(
    () =>
      items.map((item) => ({
        itemId: String(item.id + item.weight),
        quantity: item.quantity,
      })),
    [items],
  );

  const orderedItems = useMemo<IPackedOrders[]>(() => {
    return JSON.parse(packedOrders || "[]") || [];
  }, [packedOrders]);

  const resetPackedOrders = useCallback(() => {
    const prevOrders = JSON.parse(packedOrders || "[]") || [];
    const orderIndex = prevOrders.findIndex(
      (order: IPackedOrders) => order.orderId === orderId,
    );

    if (orderIndex !== -1) {
      const updatedOrders = [...prevOrders];
      updatedOrders.splice(orderIndex, 1);
      set(JSON.stringify(updatedOrders));
    }
  }, [orderId, packedOrders, set]);

  const packAllOrders = useCallback(() => {
    const prevOrders = JSON.parse(packedOrders || "[]") || [];
    const orderIndex = prevOrders.findIndex(
      (order: IPackedOrders) => order.orderId === orderId,
    );
    let updatedOrders;

    if (orderIndex === -1) {
      updatedOrders = [
        ...prevOrders,
        { orderId, items: itemsToPack, createdAt: Date.now() },
      ];
    } else {
      updatedOrders = [...prevOrders];
      updatedOrders[orderIndex].items = itemsToPack;
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
  }, [orderId, itemsToPack, packedOrders, set]);

  const setPackedOrders = useCallback(
    ({ items }: { items: PackedItems }) => {
      const prevOrders = JSON.parse(packedOrders || "[]") || [];
      const orderIndex = prevOrders.findIndex(
        (order: IPackedOrders) => order.orderId === orderId,
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
          (item: PackedItems) => item.itemId === items.itemId,
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
    },
    [orderId, packedOrders, set],
  );

  const selectedOrder = useMemo(
    () => orderedItems.find((item) => Number(item.orderId) === Number(orderId)),
    [orderedItems, orderId],
  );

  const selectedItem = useCallback(
    (itemId: string) =>
      selectedOrder?.items.find((item) => item.itemId === itemId),
    [selectedOrder],
  );

  const isItemSelected = useCallback(
    (itemId: string) => selectedItem(itemId) !== undefined,
    [selectedItem],
  );

  const totalPackedOrders = useMemo(
    () =>
      selectedOrder?.items.reduce((acc, item) => acc + item.quantity, 0) || 0,
    [selectedOrder],
  );

  const totalOrderQuantity = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const isTotalItemsPacked = totalPackedOrders === totalOrderQuantity;

  return (
    <OrderPackingContext.Provider
      value={{
        selectedOrder,
        selectedItem,
        isItemSelected,
        totalPackedOrders,
        packAllOrders,
        resetPackedOrders,
        openSheet,
        closeSheet,
        startPacking,
        setStartPacking,
        totalOrderQuantity,
        setPackedOrders,
        isTotalItemsPacked,
        oneItem,
        setOneItem,
        bottomSheetRef,
      }}
    >
      {children}
    </OrderPackingContext.Provider>
  );
};

export const useOrderPacking = () => {
  const context = useContext(OrderPackingContext);
  if (!context) {
    throw new Error("useOrderPacking must be used within OrderPackingProvider");
  }
  return context;
};
