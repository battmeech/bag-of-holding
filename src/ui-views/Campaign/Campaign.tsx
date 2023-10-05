import { useParams } from "next/navigation";
import { trpc } from "@trpc-client/client";
import { CampaignContent } from "@ui-views/Campaign/CampaignContent";

export const Campaign = () => {
  const params = useParams();

  const { data, isInitialLoading, error, isLoading } =
    trpc.campaign.getById.useQuery({
      id: params.campaignId as string,
    });

  return (
    <CampaignContent
      isLoading={isInitialLoading || isLoading}
      data={data}
      error={!!error}
    />
  );
};
