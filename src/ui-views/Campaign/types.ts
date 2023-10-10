import { Outputs } from "@trpc-client/client";

export type Campaign = NonNullable<Outputs["campaign"]["getById"]>;

export type Item = NonNullable<Campaign["items"]>[0];

export type Quest = NonNullable<Campaign["quests"]>[0];
