import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GQLContext } from '../../typeDefs';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  _FieldSet: any;
};





export type AddItemInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type AddItemResult = Campaign | CampaignNotFound;

export type AddTagResult = Item | ItemNotFound;

export type Campaign = {
  __typename: 'Campaign';
  id: Scalars['ID'];
  name: Scalars['String'];
  electrum: Scalars['Int'];
  platinum: Scalars['Int'];
  gold: Scalars['Int'];
  silver: Scalars['Int'];
  copper: Scalars['Int'];
  items?: Maybe<Array<Item>>;
  createdAt: Scalars['Date'];
};

export type CampaignNotFound = {
  __typename: 'CampaignNotFound';
  message: Scalars['String'];
};

export type CreatedCampaign = {
  __typename: 'CreatedCampaign';
  id: Scalars['ID'];
};


export type EditItemInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type EditItemResult = Item | InvalidInput | ItemNotFound;

export type FetchCampaignResult = Campaign | CampaignNotFound;

export type FetchItemResult = Item | ItemNotFound;

export type InvalidInput = {
  __typename: 'InvalidInput';
  message: Scalars['String'];
};

export type Item = {
  __typename: 'Item';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  quantity: Scalars['Int'];
  notes?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type ItemNotFound = {
  __typename: 'ItemNotFound';
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type MeResult = User | UserNotFound;

export type ModifyMoneyInput = {
  modification: MoneyModification;
  electrum: Scalars['Int'];
  platinum: Scalars['Int'];
  gold: Scalars['Int'];
  silver: Scalars['Int'];
  copper: Scalars['Int'];
};

export type ModifyMoneyResult = Campaign | CampaignNotFound;

export enum MoneyModification {
  ADD = 'ADD',
  DEDUCT = 'DEDUCT'
}

export type Mutation = {
  __typename: 'Mutation';
  createCampaign: CreatedCampaign;
  modifyMoney: ModifyMoneyResult;
  addItem: AddItemResult;
  removeItem: RemoveItemResult;
  editItem: EditItemResult;
  addTag: AddTagResult;
  removeTag: RemoveTagResult;
  login: User;
};


export type MutationCreateCampaignArgs = {
  name: Scalars['String'];
};


export type MutationModifyMoneyArgs = {
  campaignId: Scalars['ID'];
  input: ModifyMoneyInput;
};


export type MutationAddItemArgs = {
  campaignId: Scalars['ID'];
  input: AddItemInput;
};


export type MutationRemoveItemArgs = {
  itemId: Scalars['ID'];
};


export type MutationEditItemArgs = {
  itemId: Scalars['ID'];
  input: EditItemInput;
};


export type MutationAddTagArgs = {
  itemId: Scalars['ID'];
  tag: Scalars['String'];
};


export type MutationRemoveTagArgs = {
  itemId: Scalars['ID'];
  tag: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Query = {
  __typename: 'Query';
  campaigns: Array<Campaign>;
  campaign: FetchCampaignResult;
  item?: Maybe<FetchItemResult>;
  me?: Maybe<MeResult>;
};


export type QueryCampaignArgs = {
  campaignId: Scalars['ID'];
};


export type QueryItemArgs = {
  itemId: Scalars['ID'];
};


export type QueryMeArgs = {
  userId: Scalars['ID'];
};

export type RemoveItemInput = {
  /** ID of the item to be removed */
  id: Scalars['ID'];
};

export type RemoveItemResult = Campaign | ItemNotFound;

export type RemoveTagResult = Item | ItemNotFound;

export type User = {
  __typename: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastLogin: Scalars['Date'];
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
  campaigns: Array<Campaign>;
};

export type UserNotFound = {
  __typename: 'UserNotFound';
  message: Scalars['String'];
};


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddItemInput: AddItemInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  AddItemResult: ResolversTypes['Campaign'] | ResolversTypes['CampaignNotFound'];
  AddTagResult: ResolversTypes['Item'] | ResolversTypes['ItemNotFound'];
  Campaign: ResolverTypeWrapper<Campaign>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  CampaignNotFound: ResolverTypeWrapper<CampaignNotFound>;
  CreatedCampaign: ResolverTypeWrapper<CreatedCampaign>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  EditItemInput: EditItemInput;
  EditItemResult: ResolversTypes['Item'] | ResolversTypes['InvalidInput'] | ResolversTypes['ItemNotFound'];
  FetchCampaignResult: ResolversTypes['Campaign'] | ResolversTypes['CampaignNotFound'];
  FetchItemResult: ResolversTypes['Item'] | ResolversTypes['ItemNotFound'];
  InvalidInput: ResolverTypeWrapper<InvalidInput>;
  Item: ResolverTypeWrapper<Item>;
  ItemNotFound: ResolverTypeWrapper<ItemNotFound>;
  LoginInput: LoginInput;
  MeResult: ResolversTypes['User'] | ResolversTypes['UserNotFound'];
  ModifyMoneyInput: ModifyMoneyInput;
  ModifyMoneyResult: ResolversTypes['Campaign'] | ResolversTypes['CampaignNotFound'];
  MoneyModification: MoneyModification;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RemoveItemInput: RemoveItemInput;
  RemoveItemResult: ResolversTypes['Campaign'] | ResolversTypes['ItemNotFound'];
  RemoveTagResult: ResolversTypes['Item'] | ResolversTypes['ItemNotFound'];
  User: ResolverTypeWrapper<User>;
  UserNotFound: ResolverTypeWrapper<UserNotFound>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddItemInput: AddItemInput;
  String: Scalars['String'];
  Int: Scalars['Int'];
  AddItemResult: ResolversParentTypes['Campaign'] | ResolversParentTypes['CampaignNotFound'];
  AddTagResult: ResolversParentTypes['Item'] | ResolversParentTypes['ItemNotFound'];
  Campaign: Campaign;
  ID: Scalars['ID'];
  CampaignNotFound: CampaignNotFound;
  CreatedCampaign: CreatedCampaign;
  Date: Scalars['Date'];
  EditItemInput: EditItemInput;
  EditItemResult: ResolversParentTypes['Item'] | ResolversParentTypes['InvalidInput'] | ResolversParentTypes['ItemNotFound'];
  FetchCampaignResult: ResolversParentTypes['Campaign'] | ResolversParentTypes['CampaignNotFound'];
  FetchItemResult: ResolversParentTypes['Item'] | ResolversParentTypes['ItemNotFound'];
  InvalidInput: InvalidInput;
  Item: Item;
  ItemNotFound: ItemNotFound;
  LoginInput: LoginInput;
  MeResult: ResolversParentTypes['User'] | ResolversParentTypes['UserNotFound'];
  ModifyMoneyInput: ModifyMoneyInput;
  ModifyMoneyResult: ResolversParentTypes['Campaign'] | ResolversParentTypes['CampaignNotFound'];
  Mutation: {};
  Query: {};
  RemoveItemInput: RemoveItemInput;
  RemoveItemResult: ResolversParentTypes['Campaign'] | ResolversParentTypes['ItemNotFound'];
  RemoveTagResult: ResolversParentTypes['Item'] | ResolversParentTypes['ItemNotFound'];
  User: User;
  UserNotFound: UserNotFound;
  Boolean: Scalars['Boolean'];
}>;

export type AddItemResultResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['AddItemResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Campaign' | 'CampaignNotFound', ParentType, ContextType>;
}>;

export type AddTagResultResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['AddTagResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Item' | 'ItemNotFound', ParentType, ContextType>;
}>;

export type CampaignResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['Campaign']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  electrum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  platinum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  silver?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  copper?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CampaignNotFoundResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['CampaignNotFound']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreatedCampaignResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['CreatedCampaign']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EditItemResultResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['EditItemResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Item' | 'InvalidInput' | 'ItemNotFound', ParentType, ContextType>;
}>;

export type FetchCampaignResultResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['FetchCampaignResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Campaign' | 'CampaignNotFound', ParentType, ContextType>;
}>;

export type FetchItemResultResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['FetchItemResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Item' | 'ItemNotFound', ParentType, ContextType>;
}>;

export type InvalidInputResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['InvalidInput']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['Item']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemNotFoundResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['ItemNotFound']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MeResultResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['MeResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'User' | 'UserNotFound', ParentType, ContextType>;
}>;

export type ModifyMoneyResultResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['ModifyMoneyResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Campaign' | 'CampaignNotFound', ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  createCampaign?: Resolver<ResolversTypes['CreatedCampaign'], ParentType, ContextType, RequireFields<MutationCreateCampaignArgs, 'name'>>;
  modifyMoney?: Resolver<ResolversTypes['ModifyMoneyResult'], ParentType, ContextType, RequireFields<MutationModifyMoneyArgs, 'campaignId' | 'input'>>;
  addItem?: Resolver<ResolversTypes['AddItemResult'], ParentType, ContextType, RequireFields<MutationAddItemArgs, 'campaignId' | 'input'>>;
  removeItem?: Resolver<ResolversTypes['RemoveItemResult'], ParentType, ContextType, RequireFields<MutationRemoveItemArgs, 'itemId'>>;
  editItem?: Resolver<ResolversTypes['EditItemResult'], ParentType, ContextType, RequireFields<MutationEditItemArgs, 'itemId' | 'input'>>;
  addTag?: Resolver<ResolversTypes['AddTagResult'], ParentType, ContextType, RequireFields<MutationAddTagArgs, 'itemId' | 'tag'>>;
  removeTag?: Resolver<ResolversTypes['RemoveTagResult'], ParentType, ContextType, RequireFields<MutationRemoveTagArgs, 'itemId' | 'tag'>>;
  login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  campaigns?: Resolver<Array<ResolversTypes['Campaign']>, ParentType, ContextType>;
  campaign?: Resolver<ResolversTypes['FetchCampaignResult'], ParentType, ContextType, RequireFields<QueryCampaignArgs, 'campaignId'>>;
  item?: Resolver<Maybe<ResolversTypes['FetchItemResult']>, ParentType, ContextType, RequireFields<QueryItemArgs, 'itemId'>>;
  me?: Resolver<Maybe<ResolversTypes['MeResult']>, ParentType, ContextType, RequireFields<QueryMeArgs, 'userId'>>;
}>;

export type RemoveItemResultResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['RemoveItemResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Campaign' | 'ItemNotFound', ParentType, ContextType>;
}>;

export type RemoveTagResultResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['RemoveTagResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Item' | 'ItemNotFound', ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastLogin?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  campaigns?: Resolver<Array<ResolversTypes['Campaign']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserNotFoundResolvers<ContextType = GQLContext, ParentType = ResolversParentTypes['UserNotFound']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GQLContext> = ResolversObject<{
  AddItemResult?: AddItemResultResolvers<ContextType>;
  AddTagResult?: AddTagResultResolvers<ContextType>;
  Campaign?: CampaignResolvers<ContextType>;
  CampaignNotFound?: CampaignNotFoundResolvers<ContextType>;
  CreatedCampaign?: CreatedCampaignResolvers<ContextType>;
  Date?: GraphQLScalarType;
  EditItemResult?: EditItemResultResolvers<ContextType>;
  FetchCampaignResult?: FetchCampaignResultResolvers<ContextType>;
  FetchItemResult?: FetchItemResultResolvers<ContextType>;
  InvalidInput?: InvalidInputResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  ItemNotFound?: ItemNotFoundResolvers<ContextType>;
  MeResult?: MeResultResolvers<ContextType>;
  ModifyMoneyResult?: ModifyMoneyResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RemoveItemResult?: RemoveItemResultResolvers<ContextType>;
  RemoveTagResult?: RemoveTagResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserNotFound?: UserNotFoundResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = GQLContext> = Resolvers<ContextType>;
