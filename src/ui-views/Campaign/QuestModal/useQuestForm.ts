import { useEffect, useState } from "react";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormSetValue,
} from "react-hook-form";
import { trpc } from "@trpc-client/client";
import { Quest, QuestStatus } from "@ui-views/Campaign/types";

export type FormProps = {
  errors: FieldErrors<QuestFormProps>;
  setValue: UseFormSetValue<QuestFormProps>;
  values: QuestFormProps;
};

type QuestFormProps = {
  name: string;
  source?: string;
  status: QuestStatus;
};

const useQuest = (defaultValues?: Partial<QuestFormProps>) => {
  const {
    reset,
    formState: { errors, isValid, isDirty },
    setValue,
    watch,
    getValues,
    handleSubmit,
  } = useForm<QuestFormProps>({
    defaultValues: defaultValues || {
      name: "",
      source: undefined,
    },
  });

  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const name = getValues("name");

  useEffect(() => {
    if (isValid && name && isDirty) setIsSaveEnabled(true);
    else setIsSaveEnabled(false);
  }, [name, isValid, isDirty]);

  const formProps: FormProps = {
    errors,
    setValue,
    values: watch(),
  };

  return {
    reset,
    formProps,
    handleSubmit,
    isSaveEnabled,
  };
};

export const useCreateQuest = ({
  campaignId,
  onSuccessCallback,
}: {
  campaignId: string;
  onSuccessCallback: () => void;
}) => {
  const { isSaveEnabled, formProps, handleSubmit } = useQuest();
  const trpcContext = trpc.useContext();
  const mutation = trpc.quest.create.useMutation({
    onSuccess: () => {
      trpcContext.campaign.getById.invalidate({ id: campaignId });
    },
  });

  const onSubmit: SubmitHandler<QuestFormProps> = async (data) => {
    mutation.mutate({
      campaignId,
      questName: data.name,
      source: data.source,
    });
    onSuccessCallback();
  };

  return {
    saveLoading: false,
    isSaveEnabled,
    formProps,
    saveQuest: handleSubmit(onSubmit),
  };
};

export const useEditQuest = ({
  existingQuest: { id, campaignId, name, source, status },
  onSuccessCallback,
}: {
  existingQuest: Quest;
  onSuccessCallback: () => void;
}) => {
  const { isSaveEnabled, formProps, handleSubmit } = useQuest({
    name,
    source: source || undefined,
    status,
  });

  const trpcContext = trpc.useContext();
  const mutation = trpc.quest.update.useMutation({
    onSuccess: () => {
      trpcContext.campaign.getById.invalidate({ id: campaignId });
    },
  });

  const onSubmit: SubmitHandler<QuestFormProps> = async (input) => {
    mutation.mutate({
      questId: id,
      status: input.status,
      source: input.source,
      questName: input.name,
    });
    onSuccessCallback();
  };

  return {
    saveLoading: mutation.isLoading,
    isSaveEnabled,
    formProps,
    saveQuest: handleSubmit(onSubmit),
  };
};
