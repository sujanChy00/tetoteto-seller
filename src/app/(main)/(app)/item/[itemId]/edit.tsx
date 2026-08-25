import { PendingComponent } from "@/components/layout/pending-component";
import { ItemFormTab } from "@/form/item/item-form-tab";
import { useGetItemDetail } from "@/queries/item-query";
import { useLocalSearchParams } from "expo-router";

const EditItemScreen = () => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { data: item, isPending, refetch } = useGetItemDetail(itemId);
  if (isPending) return <PendingComponent />;
  return <ItemFormTab editMode item={item} refetch={refetch} itemId={itemId} />;
};

export default EditItemScreen;
