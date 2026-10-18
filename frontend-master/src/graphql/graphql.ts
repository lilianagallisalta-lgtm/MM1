/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
};

export type DateTime = any;

export type Json = any;

export interface Query {
  hi?: string | null;
  child: Child;
  children?: ChildCollection | null;
  answerOptions?: AnswerOptionCollection | null;
  nextQuestion?: Question | null;
  questions?: QuestionCollection | null;
  result?: Result | null;
  stages?: StageCollection | null;
  stage: Stage;
  me?: User | null;
  locales?: LocaleCollection | null;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  user: User;
}

export interface User {
  id: string;
  name: string;
  picture: string;
  email: string;
  role: Role;
  roles?: UserRoleCollection | null;
  permissions?: UserPermissionCollection | null;
  children?: UserChildCollection | null;
}

export interface Role {
  id: string;
  name: string;
  guard?: string | null;
}

export interface UserRoleCollection {
  data: Role[];
}

export interface UserPermissionCollection {
  data: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  guard?: string | null;
}

export interface UserChildCollection {
  data: Child[];
}

export interface ChildCollection {
  data: Child[];
}

export interface AnswerOptionCollection {
  data: AnswerOption[];
}

export interface AnswerOption {
  id: string;
  display: string;
}

export interface Question {
  id: string;
  display: string;
  idx: number;
  answerOptions?: QuestionAnswerOptionCollection | null;
  stage: Stage;
  answered: boolean;
  isNextQuestion: boolean;
  answerOption?: AnswerOption | null;
}

export interface QuestionAnswerOptionCollection {
  data: AnswerOption[];
}

export interface Stage {
  id: string;
  slug: number;
  display: string;
  progress: number;
  available: boolean;
  questions?: StageQuestionCollection | null;
  result?: Result | null;
}

export interface StageQuestionCollection {
  data: Question[];
}

export interface Result {
  id: string;
  areas?: ResultAreaCollection | null;
}

export interface ResultAreaCollection {
  data: ResultArea[];
}

export interface ResultArea {
  slug: string;
  name: string;
  percentage: number;
  result: string;
  picture: string;
  info?: string | null;
  games?: string | null;
  gaugeColor?: string | null;
  gaugeCardColor?: string | null;
}

export interface QuestionCollection {
  data: Question[];
}

export interface StageCollection {
  data: Stage[];
}

export interface LocaleCollection {
  data: Locale[];
}

export interface Locale {
  slug: string;
}

export interface Mutation {
  hello?: string | null;
  upsertChild: Child;
  answer: Answer;
  signup: string;
  signin: string;
}

export interface Answer {
  id: string;
}

export interface ResultType {
  id: string;
  name: string;
  slug: string;
}

export interface QuestionidxSchemalessAttribute {
  schemalessAttribute?: string | null;
}

export interface UserroleModelMethod {
  modelMethod?: string | null;
}

export interface PaginatorInfo {
  count: number /** Total count of available items in the page. */;
  currentPage: number /** Current pagination page. */;
  firstItem?: number | null /** Index of first item in the current page. */;
  hasMorePages: boolean /** If collection has more pages. */;
  lastItem?: number | null /** Index of last item in the current page. */;
  lastPage: number /** Last page number of the collection. */;
  perPage: number /** Number of items per page in the collection. */;
  total: number /** Total items available in the collection. */;
}

export interface PageInfo {
  hasNextPage: boolean /** When paginating forwards, are there more items? */;
  hasPreviousPage: boolean /** When paginating backwards, are there more items? */;
  startCursor?:
    | string
    | null /** When paginating backwards, the cursor to continue. */;
  endCursor?:
    | string
    | null /** When paginating forwards, the cursor to continue. */;
  total?: number | null /** Total number of node in connection. */;
  count?: number | null /** Count of nodes in current request. */;
  currentPage?: number | null /** Current page of request. */;
  lastPage?: number | null /** Last page in connection. */;
}

export interface HelloInput {
  name?: string | null;
}

export interface UpsertChildInput {
  id?: string | null;
  name: string;
  age: number;
}

export interface AnswerInput {
  childId: string;
  questionId: string;
  answerOptionId: string;
}

export interface SignupInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SigninInput {
  email: string;
  password: string;
}
export interface ChildQueryArgs {
  id: string;
}
export interface NextQuestionQueryArgs {
  stageId: string;
  childId: string;
}
export interface QuestionsQueryArgs {
  stageId: string;
  childId: string;
}
export interface ResultQueryArgs {
  childId: string;
  stageId: string;
}
export interface StagesQueryArgs {
  childId: string;
}
export interface StageQueryArgs {
  id: string;
  childId: string;
}
export interface AnswerOptionQuestionArgs {
  childId: string;
}
export interface ProgressStageArgs {
  childId: string;
}
export interface QuestionsStageArgs {
  childId: string;
}
export interface ResultStageArgs {
  childId: string;
}
export interface HelloMutationArgs {
  input?: HelloInput | null;
}
export interface UpsertChildMutationArgs {
  input: UpsertChildInput;
}
export interface AnswerMutationArgs {
  input?: AnswerInput | null;
}
export interface SignupMutationArgs {
  input?: SignupInput | null;
}
export interface SigninMutationArgs {
  input?: SigninInput | null;
}
export interface SchemalessAttributeQuestionidxSchemalessAttributeArgs {
  select: string;
}
export interface ModelMethodUserroleModelMethodArgs {
  model?: string | null;
  method: string;
}

export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    hi?: HiResolver<string | null, any, Context>;
    child?: ChildResolver<Child, any, Context>;
    children?: ChildrenResolver<ChildCollection | null, any, Context>;
    answerOptions?: AnswerOptionsResolver<
      AnswerOptionCollection | null,
      any,
      Context
    >;
    nextQuestion?: NextQuestionResolver<Question | null, any, Context>;
    questions?: QuestionsResolver<QuestionCollection | null, any, Context>;
    result?: ResultResolver<Result | null, any, Context>;
    stages?: StagesResolver<StageCollection | null, any, Context>;
    stage?: StageResolver<Stage, any, Context>;
    me?: MeResolver<User | null, any, Context>;
    locales?: LocalesResolver<LocaleCollection | null, any, Context>;
  }

  export type HiResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ChildResolver<R = Child, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context,
    ChildArgs
  >;
  export interface ChildArgs {
    id: string;
  }

  export type ChildrenResolver<
    R = ChildCollection | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AnswerOptionsResolver<
    R = AnswerOptionCollection | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NextQuestionResolver<
    R = Question | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, NextQuestionArgs>;
  export interface NextQuestionArgs {
    stageId: string;
    childId: string;
  }

  export type QuestionsResolver<
    R = QuestionCollection | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, QuestionsArgs>;
  export interface QuestionsArgs {
    stageId: string;
    childId: string;
  }

  export type ResultResolver<
    R = Result | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ResultArgs>;
  export interface ResultArgs {
    childId: string;
    stageId: string;
  }

  export type StagesResolver<
    R = StageCollection | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, StagesArgs>;
  export interface StagesArgs {
    childId: string;
  }

  export type StageResolver<R = Stage, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context,
    StageArgs
  >;
  export interface StageArgs {
    id: string;
    childId: string;
  }

  export type MeResolver<
    R = User | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type LocalesResolver<
    R = LocaleCollection | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ChildResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    age?: AgeResolver<number, any, Context>;
    user?: UserResolver<User, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AgeResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UserResolver<R = User, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace UserResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    picture?: PictureResolver<string, any, Context>;
    email?: EmailResolver<string, any, Context>;
    role?: RoleResolver<Role, any, Context>;
    roles?: RolesResolver<UserRoleCollection | null, any, Context>;
    permissions?: PermissionsResolver<
      UserPermissionCollection | null,
      any,
      Context
    >;
    children?: ChildrenResolver<UserChildCollection | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PictureResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type RoleResolver<R = Role, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type RolesResolver<
    R = UserRoleCollection | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PermissionsResolver<
    R = UserPermissionCollection | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ChildrenResolver<
    R = UserChildCollection | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace RoleResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    guard?: GuardResolver<string | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type GuardResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace UserRoleCollectionResolvers {
  export interface Resolvers<Context = any> {
    data?: DataResolver<Role[], any, Context>;
  }

  export type DataResolver<R = Role[], Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace UserPermissionCollectionResolvers {
  export interface Resolvers<Context = any> {
    data?: DataResolver<Permission[], any, Context>;
  }

  export type DataResolver<
    R = Permission[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace PermissionResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    guard?: GuardResolver<string | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type GuardResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace UserChildCollectionResolvers {
  export interface Resolvers<Context = any> {
    data?: DataResolver<Child[], any, Context>;
  }

  export type DataResolver<R = Child[], Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace ChildCollectionResolvers {
  export interface Resolvers<Context = any> {
    data?: DataResolver<Child[], any, Context>;
  }

  export type DataResolver<R = Child[], Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace AnswerOptionCollectionResolvers {
  export interface Resolvers<Context = any> {
    data?: DataResolver<AnswerOption[], any, Context>;
  }

  export type DataResolver<
    R = AnswerOption[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace AnswerOptionResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    display?: DisplayResolver<string, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type DisplayResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace QuestionResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    display?: DisplayResolver<string, any, Context>;
    idx?: IdxResolver<number, any, Context>;
    answerOptions?: AnswerOptionsResolver<
      QuestionAnswerOptionCollection | null,
      any,
      Context
    >;
    stage?: StageResolver<Stage, any, Context>;
    answered?: AnsweredResolver<boolean, any, Context>;
    isNextQuestion?: IsNextQuestionResolver<boolean, any, Context>;
    answerOption?: AnswerOptionResolver<AnswerOption | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type DisplayResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type IdxResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AnswerOptionsResolver<
    R = QuestionAnswerOptionCollection | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type StageResolver<R = Stage, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AnsweredResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type IsNextQuestionResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AnswerOptionResolver<
    R = AnswerOption | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, AnswerOptionArgs>;
  export interface AnswerOptionArgs {
    childId: string;
  }
}

export namespace QuestionAnswerOptionCollectionResolvers {
  export interface Resolvers<Context = any> {
    data?: DataResolver<AnswerOption[], any, Context>;
  }

  export type DataResolver<
    R = AnswerOption[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace StageResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    slug?: SlugResolver<number, any, Context>;
    display?: DisplayResolver<string, any, Context>;
    progress?: ProgressResolver<number, any, Context>;
    available?: AvailableResolver<boolean, any, Context>;
    questions?: QuestionsResolver<StageQuestionCollection | null, any, Context>;
    result?: ResultResolver<Result | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type SlugResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type DisplayResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ProgressResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ProgressArgs>;
  export interface ProgressArgs {
    childId: string;
  }

  export type AvailableResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type QuestionsResolver<
    R = StageQuestionCollection | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, QuestionsArgs>;
  export interface QuestionsArgs {
    childId: string;
  }

  export type ResultResolver<
    R = Result | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ResultArgs>;
  export interface ResultArgs {
    childId: string;
  }
}

export namespace StageQuestionCollectionResolvers {
  export interface Resolvers<Context = any> {
    data?: DataResolver<Question[], any, Context>;
  }

  export type DataResolver<
    R = Question[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ResultResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    areas?: AreasResolver<ResultAreaCollection | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AreasResolver<
    R = ResultAreaCollection | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ResultAreaCollectionResolvers {
  export interface Resolvers<Context = any> {
    data?: DataResolver<ResultArea[], any, Context>;
  }

  export type DataResolver<
    R = ResultArea[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ResultAreaResolvers {
  export interface Resolvers<Context = any> {
    slug?: SlugResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    percentage?: PercentageResolver<number, any, Context>;
    result?: ResultResolver<string, any, Context>;
    picture?: PictureResolver<string, any, Context>;
    info?: InfoResolver<string | null, any, Context>;
    games?: GamesResolver<string | null, any, Context>;
    gaugeColor?: GaugeColorResolver<string | null, any, Context>;
    gaugeCardColor?: GaugeCardColorResolver<string | null, any, Context>;
  }

  export type SlugResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PercentageResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ResultResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PictureResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type InfoResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type GamesResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type GaugeColorResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type GaugeCardColorResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace QuestionCollectionResolvers {
  export interface Resolvers<Context = any> {
    data?: DataResolver<Question[], any, Context>;
  }

  export type DataResolver<
    R = Question[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace StageCollectionResolvers {
  export interface Resolvers<Context = any> {
    data?: DataResolver<Stage[], any, Context>;
  }

  export type DataResolver<R = Stage[], Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace LocaleCollectionResolvers {
  export interface Resolvers<Context = any> {
    data?: DataResolver<Locale[], any, Context>;
  }

  export type DataResolver<
    R = Locale[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace LocaleResolvers {
  export interface Resolvers<Context = any> {
    slug?: SlugResolver<string, any, Context>;
  }

  export type SlugResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = any> {
    hello?: HelloResolver<string | null, any, Context>;
    upsertChild?: UpsertChildResolver<Child, any, Context>;
    answer?: AnswerResolver<Answer, any, Context>;
    signup?: SignupResolver<string, any, Context>;
    signin?: SigninResolver<string, any, Context>;
  }

  export type HelloResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, HelloArgs>;
  export interface HelloArgs {
    input?: HelloInput | null;
  }

  export type UpsertChildResolver<
    R = Child,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpsertChildArgs>;
  export interface UpsertChildArgs {
    input: UpsertChildInput;
  }

  export type AnswerResolver<
    R = Answer,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, AnswerArgs>;
  export interface AnswerArgs {
    input?: AnswerInput | null;
  }

  export type SignupResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SignupArgs>;
  export interface SignupArgs {
    input?: SignupInput | null;
  }

  export type SigninResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SigninArgs>;
  export interface SigninArgs {
    input?: SigninInput | null;
  }
}

export namespace AnswerResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace ResultTypeResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    slug?: SlugResolver<string, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type SlugResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace QuestionidxSchemalessAttributeResolvers {
  export interface Resolvers<Context = any> {
    schemalessAttribute?: SchemalessAttributeResolver<
      string | null,
      any,
      Context
    >;
  }

  export type SchemalessAttributeResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SchemalessAttributeArgs>;
  export interface SchemalessAttributeArgs {
    select: string;
  }
}

export namespace UserroleModelMethodResolvers {
  export interface Resolvers<Context = any> {
    modelMethod?: ModelMethodResolver<string | null, any, Context>;
  }

  export type ModelMethodResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ModelMethodArgs>;
  export interface ModelMethodArgs {
    model?: string | null;
    method: string;
  }
}

export namespace PaginatorInfoResolvers {
  export interface Resolvers<Context = any> {
    count?: CountResolver<
      number,
      any,
      Context
    > /** Total count of available items in the page. */;
    currentPage?: CurrentPageResolver<
      number,
      any,
      Context
    > /** Current pagination page. */;
    firstItem?: FirstItemResolver<
      number | null,
      any,
      Context
    > /** Index of first item in the current page. */;
    hasMorePages?: HasMorePagesResolver<
      boolean,
      any,
      Context
    > /** If collection has more pages. */;
    lastItem?: LastItemResolver<
      number | null,
      any,
      Context
    > /** Index of last item in the current page. */;
    lastPage?: LastPageResolver<
      number,
      any,
      Context
    > /** Last page number of the collection. */;
    perPage?: PerPageResolver<
      number,
      any,
      Context
    > /** Number of items per page in the collection. */;
    total?: TotalResolver<
      number,
      any,
      Context
    > /** Total items available in the collection. */;
  }

  export type CountResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CurrentPageResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type FirstItemResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type HasMorePagesResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type LastItemResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type LastPageResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PerPageResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TotalResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace PageInfoResolvers {
  export interface Resolvers<Context = any> {
    hasNextPage?: HasNextPageResolver<
      boolean,
      any,
      Context
    > /** When paginating forwards, are there more items? */;
    hasPreviousPage?: HasPreviousPageResolver<
      boolean,
      any,
      Context
    > /** When paginating backwards, are there more items? */;
    startCursor?: StartCursorResolver<
      string | null,
      any,
      Context
    > /** When paginating backwards, the cursor to continue. */;
    endCursor?: EndCursorResolver<
      string | null,
      any,
      Context
    > /** When paginating forwards, the cursor to continue. */;
    total?: TotalResolver<
      number | null,
      any,
      Context
    > /** Total number of node in connection. */;
    count?: CountResolver<
      number | null,
      any,
      Context
    > /** Count of nodes in current request. */;
    currentPage?: CurrentPageResolver<
      number | null,
      any,
      Context
    > /** Current page of request. */;
    lastPage?: LastPageResolver<
      number | null,
      any,
      Context
    > /** Last page in connection. */;
  }

  export type HasNextPageResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type HasPreviousPageResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type StartCursorResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EndCursorResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TotalResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type CountResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type CurrentPageResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type LastPageResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace Answer {
  export type Variables = {
    input: AnswerInput;
  };

  export type Mutation = {
    __typename?: "Mutation";
    answer: Answer;
  };

  export type Answer = {
    __typename?: "Answer";
    id: string;
  };
}

export namespace AnswerOptions {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    answerOptions?: AnswerOptions | null;
  };

  export type AnswerOptions = {
    __typename?: "AnswerOptionCollection";
    data: Data[];
  };

  export type Data = {
    __typename?: "AnswerOption";
    id: string;
    display: string;
  };
}

export namespace UpsertChild {
  export type Variables = {
    input: UpsertChildInput;
  };

  export type Mutation = {
    __typename?: "Mutation";
    upsertChild: UpsertChild;
  };

  export type UpsertChild = {
    __typename?: "Child";
    id: string;
    name: string;
    age: number;
  };
}

export namespace Children {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    children?: Children | null;
  };

  export type Children = {
    __typename?: "ChildCollection";
    data: Data[];
  };

  export type Data = ChildFragment.Fragment;
}

export namespace Child {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";
    child: Child;
  };

  export type Child = ChildFragment.Fragment;
}

export namespace NextQuestion {
  export type Variables = {
    stageId: string;
    childId: string;
  };

  export type Query = {
    __typename?: "Query";
    nextQuestion?: NextQuestion | null;
  };

  export type NextQuestion = {
    __typename?: "Question";
    id: string;
    display: string;
  };
}

export namespace Questions {
  export type Variables = {
    stageId: string;
    childId: string;
  };

  export type Query = {
    __typename?: "Query";
    questions?: Questions | null;
  };

  export type Questions = {
    __typename?: "QuestionCollection";
    data: Data[];
  };

  export type Data = {
    __typename?: "Question";
    id: string;
    display: string;
    idx: number;
    answered: boolean;
  };
}

export namespace Result {
  export type Variables = {
    childId: string;
    stageId: string;
  };

  export type Query = {
    __typename?: "Query";
    result?: Result | null;
  };

  export type Result = {
    __typename?: "Result";
    id: string;
    areas?: Areas | null;
  };

  export type Areas = {
    __typename?: "ResultAreaCollection";
    data: Data[];
  };

  export type Data = {
    __typename?: "ResultArea";
    slug: string;
    name: string;
    percentage: number;
    picture: string;
    info?: string | null;
    games?: string | null;
    gaugeColor?: string | null;
    gaugeCardColor?: string | null;
  };
}

export namespace Stages {
  export type Variables = {
    childId: string;
  };

  export type Query = {
    __typename?: "Query";
    stages?: Stages | null;
  };

  export type Stages = {
    __typename?: "StageCollection";
    data: Data[];
  };

  export type Data = {
    __typename?: "Stage";
    id: string;
    slug: number;
    display: string;
    available: boolean;
    progress: number;
  };
}

export namespace StagePage {
  export type Variables = {
    id: string;
    childId: string;
  };

  export type Query = {
    __typename?: "Query";
    stage: Stage;
  };

  export type Stage = {
    __typename?: "Stage";
    id: string;
    slug: number;
    display: string;
    available: boolean;
    progress: number;
    questions?: Questions | null;
  };

  export type Questions = {
    __typename?: "StageQuestionCollection";
    data: Data[];
  };

  export type Data = {
    __typename?: "Question";
    id: string;
    display: string;
    answered: boolean;
    idx: number;
    isNextQuestion: boolean;
    answerOption?: AnswerOption | null;
  };

  export type AnswerOption = {
    __typename?: "AnswerOption";
    id: string;
  };
}

export namespace Me {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    me?: Me | null;
  };

  export type Me = {
    __typename?: "User";
    id: string;
    name: string;
    picture: string;
  };
}

export namespace ChildFragment {
  export type Fragment = {
    __typename?: "Child";
    id: string;
    name: string;
    age: number;
  };
}

import { Injectable } from "@angular/core";

import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

const ChildFragmentFragment = gql`
  fragment ChildFragment on Child {
    id
    name
    age
  }
`;

@Injectable({
  providedIn: "root"
})
export class AnswerGQL extends Apollo.Mutation<
  Answer.Mutation,
  Answer.Variables
> {
  document: any = gql`
    mutation Answer($input: AnswerInput!) {
      answer(input: $input) {
        id
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class AnswerOptionsGQL extends Apollo.Query<
  AnswerOptions.Query,
  AnswerOptions.Variables
> {
  document: any = gql`
    query AnswerOptions {
      answerOptions {
        data {
          id
          display
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class UpsertChildGQL extends Apollo.Mutation<
  UpsertChild.Mutation,
  UpsertChild.Variables
> {
  document: any = gql`
    mutation UpsertChild($input: UpsertChildInput!) {
      upsertChild(input: $input) {
        id
        name
        age
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class ChildrenGQL extends Apollo.Query<
  Children.Query,
  Children.Variables
> {
  document: any = gql`
    query Children {
      children {
        data {
          ...ChildFragment
        }
      }
    }

    ${ChildFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class ChildGQL extends Apollo.Query<Child.Query, Child.Variables> {
  document: any = gql`
    query Child($id: ID!) {
      child(id: $id) {
        ...ChildFragment
      }
    }

    ${ChildFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class NextQuestionGQL extends Apollo.Query<
  NextQuestion.Query,
  NextQuestion.Variables
> {
  document: any = gql`
    query NextQuestion($stageId: ID!, $childId: ID!) {
      nextQuestion(stageId: $stageId, childId: $childId) {
        id
        display
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class QuestionsGQL extends Apollo.Query<
  Questions.Query,
  Questions.Variables
> {
  document: any = gql`
    query Questions($stageId: ID!, $childId: ID!) {
      questions(stageId: $stageId, childId: $childId) {
        data {
          id
          display
          idx
          answered
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class ResultGQL extends Apollo.Query<Result.Query, Result.Variables> {
  document: any = gql`
    query Result($childId: ID!, $stageId: ID!) {
      result(childId: $childId, stageId: $stageId) {
        id
        areas {
          data {
            slug
            name
            percentage
            picture
            info
            games
            gaugeColor
            gaugeCardColor
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class StagesGQL extends Apollo.Query<Stages.Query, Stages.Variables> {
  document: any = gql`
    query Stages($childId: ID!) {
      stages(childId: $childId) {
        data {
          id
          slug
          display
          available
          progress(childId: $childId)
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class StagePageGQL extends Apollo.Query<
  StagePage.Query,
  StagePage.Variables
> {
  document: any = gql`
    query StagePage($id: ID!, $childId: ID!) {
      stage(id: $id, childId: $childId) {
        id
        slug
        display
        available
        progress(childId: $childId)
        questions(childId: $childId) {
          data {
            id
            display
            answered
            idx
            isNextQuestion
            answerOption(childId: $childId) {
              id
            }
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class MeGQL extends Apollo.Query<Me.Query, Me.Variables> {
  document: any = gql`
    query Me {
      me {
        id
        name
        picture
      }
    }
  `;
}
