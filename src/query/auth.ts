import { IProfile } from "@/types";
import { fetcher } from "@/utils/fetcher";

export async function getUser() {
  return await fetcher<IProfile>({
    url: "/shop/assistant/profile",
  });
}
