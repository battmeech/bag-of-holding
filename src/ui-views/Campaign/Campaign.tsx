import { useParams } from "next/navigation";
import { trpc } from "@trpc-client/client";
import { CampaignContent } from "@ui-views/Campaign/CampaignContent";
import { ViewProvider } from "@ui-views/Campaign/ViewControls/ViewProvider";

export const Campaign = () => {
  const params = useParams();

  const { data, status, error } = trpc.campaign.getById.useQuery({
    id: params.campaignId as string,
  });

  return (
    <ViewProvider>
      <CampaignContent
        isLoading={status === "loading"}
        data={data}
        error={!!error}
      />
    </ViewProvider>
  );
};
