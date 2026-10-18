export type Maybe<T> = T | null;

export interface ReservableStockTaxonInput {
  taxonType: string;

  taxonId: Mixed;
}

export interface PayCheckoutWithMercadopagoInput {
  checkoutId?: Maybe<string>;

  email?: Maybe<string>;

  token?: Maybe<string>;

  installments?: Maybe<string>;

  paymentMethodId?: Maybe<string>;
}

export interface UpsertChildInput {
  id?: Maybe<string>;

  name?: Maybe<string>;

  birthdate?: Maybe<string>;

  gender?: Maybe<string>;
}

export interface PurchaseLicenseInput {
  childId?: Maybe<string>;

  token?: Maybe<string>;

  installments?: Maybe<string>;

  paymentMethodId?: Maybe<string>;
}

export interface CreatePlanInput {
  childId: string;
}

export interface UpsertPriceInput {
  id?: Maybe<string>;

  from?: Maybe<string>;

  to?: Maybe<string>;

  price: number;

  perDay?: Maybe<boolean>;

  priceable_type?: Maybe<string>;

  priceable_id?: Maybe<string>;
}

export interface DeletePriceInput {
  id?: Maybe<string>;
}

export interface UsePromotionCodeInput {
  childId?: Maybe<string>;

  code?: Maybe<string>;
}

export interface AnswerInput {
  planId: string;

  questionId: string;

  answerOptionId: string;
}

export interface RegisterPushTokenInput {
  token?: Maybe<string>;
}

export interface SigninInput {
  email?: Maybe<string>;

  password?: Maybe<string>;
}

export interface SignupInput {
  firstname?: Maybe<string>;

  lastname?: Maybe<string>;

  country?: Maybe<string>;

  province?: Maybe<string>;

  email?: Maybe<string>;

  password?: Maybe<string>;

  passwordConfirmation?: Maybe<string>;

  acceptTos?: Maybe<boolean>;
}

export interface DeletePromotionCodeInput {
  id: string;
}

export interface UpsertPromotionCodeInput {
  id?: Maybe<string>;

  code?: Maybe<string>;
  /** El porcentaje expresado en decimal */
  percentage?: Maybe<number>;
  /** El porcentaje expresado en 0-100 */
  percentageDisplay?: Maybe<number>;

  start?: Maybe<string>;

  end?: Maybe<string>;

  initialStock?: Maybe<number>;
}

export interface AddStockInput {
  stockeableType?: Maybe<string>;

  stockeableId?: Maybe<string>;

  amount?: Maybe<number>;
}

export interface DeleteReservableStockInput {
  id?: Maybe<string>;
}

export interface SubstractStockInput {
  stockeableType?: Maybe<string>;

  stockeableId?: Maybe<string>;

  amount?: Maybe<number>;
}

export interface UpsertReservableStockInput {
  id?: Maybe<string>;

  start?: Maybe<string>;

  end?: Maybe<string>;

  stock: number;

  allowsNegative?: Maybe<boolean>;

  reservableStockListId?: Maybe<string>;
}

/** A datetime string with format 'Y-m-d H:i:s', e.g. '2018-01-01 13:00:00'. */
export type DateTime = any;

/** A string or integer */
export type Mixed = any;

/** A date string with format 'Y-m-d', e.g. '2011-05-23'. */
export type Date = any;

/** A stringify JSON */
export type Json = any;

// ====================================================
// Documents
// ====================================================

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

    answerOptions: Maybe<AnswerOptions>;
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

export namespace PayCheckoutWithMercadopago {
  export type Variables = {
    input: PayCheckoutWithMercadopagoInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    payCheckoutWithMercadopago: Maybe<PayCheckoutWithMercadopago>;
  };

  export type PayCheckoutWithMercadopago = {
    __typename?: "Payment";

    id: string;
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

    birthdate: DateTime;

    gender: string;

    picture: string;

    currentPlan: Maybe<CurrentPlan>;
  };

  export type CurrentPlan = PlanFragment.Fragment;
}

export namespace Children {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    children: Maybe<Children>;
  };

  export type Children = {
    __typename?: "ChildCollection";

    data: Data[];
  };

  export type Data = {
    __typename?: "Child";

    currentPlan: Maybe<CurrentPlan>;
  } & ChildFragment.Fragment;

  export type CurrentPlan = PlanFragment.Fragment;
}

export namespace Child {
  export type Variables = {
    childId: string;
  };

  export type Query = {
    __typename?: "Query";

    child: Child;
  };

  export type Child = {
    __typename?: "Child";

    currentPlan: Maybe<CurrentPlan>;
  } & ChildFragment.Fragment;

  export type CurrentPlan = PlanFragment.Fragment;
}

export namespace ChildWithHistory {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    child: Child;
  };

  export type Child = {
    __typename?: "Child";

    history: Maybe<string>;
  } & ChildFragment.Fragment;
}

export namespace PurchaseLicense {
  export type Variables = {
    input: PurchaseLicenseInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    purchaseLicense: PurchaseLicense;
  };

  export type PurchaseLicense = {
    __typename?: "License";

    uuid: string;

    expiresAt: DateTime;
  };
}

export namespace UsePromotionCode {
  export type Variables = {
    input: UsePromotionCodeInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    usePromotionCode: UsePromotionCode;
  };

  export type UsePromotionCode = {
    __typename?: "License";

    uuid: string;

    expiresAt: DateTime;
  };
}

export namespace License {
  export type Variables = {
    childId: string;
  };

  export type Query = {
    __typename?: "Query";

    license: Maybe<License>;
  };

  export type License = {
    __typename?: "License";

    uuid: string;

    expiresAt: DateTime;
  };
}

export namespace CreatePlan {
  export type Variables = {
    input: CreatePlanInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createPlan: CreatePlan;
  };

  export type CreatePlan = PlanFragment.Fragment;
}

export namespace Plan {
  export type Variables = {
    planId: string;
  };

  export type Query = {
    __typename?: "Query";

    plan: Maybe<Plan>;
  };

  export type Plan = {
    __typename?: "Plan";

    stages: Maybe<Stages>;

    child: Child;
  } & PlanFragment.Fragment;

  export type Stages = {
    __typename?: "PlanStageCollection";

    data: Data[];
  };

  export type Data = StageFragment.Fragment;

  export type Child = ChildFragment.Fragment;
}

export namespace Plans {
  export type Variables = {
    childId: string;
  };

  export type Query = {
    __typename?: "Query";

    plans: Maybe<Plans>;
  };

  export type Plans = {
    __typename?: "PlanCollection";

    data: Data[];
  };

  export type Data = PlanFragment.Fragment;
}

export namespace AreasWithResult {
  export type Variables = {
    childId: string;
    planId: string;
    stageId: string;
  };

  export type Query = {
    __typename?: "Query";

    areas: Maybe<Areas>;
  };

  export type Areas = {
    __typename?: "AreaCollection";

    data: Data[];
  };

  export type Data = {
    __typename?: "Area";

    id: string;

    name: string;

    slug: string;

    picture: string;

    result: Maybe<Result>;
  };

  export type Result = {
    __typename?: "Result";

    id: string;

    slug: string;

    percentage: number;

    gaugeColor: Maybe<string>;

    gaugeCardColor: Maybe<string>;

    gaugeCardBackground: Maybe<string>;
  };
}

export namespace NextQuestion {
  export type Variables = {
    stageId: string;
    planId: string;
  };

  export type Query = {
    __typename?: "Query";

    nextQuestion: Maybe<NextQuestion>;
  };

  export type NextQuestion = QuestionFragment.Fragment;
}

export namespace Questions {
  export type Variables = {
    stageId: string;
    planId: string;
  };

  export type Query = {
    __typename?: "Query";

    questions: Maybe<Questions>;
  };

  export type Questions = {
    __typename?: "QuestionCollection";

    data: Data[];
  };

  export type Data = QuestionFragment.Fragment;
}

export namespace Question {
  export type Variables = {
    id: string;
    childId: string;
    planId: string;
  };

  export type Query = {
    __typename?: "Query";

    question: Maybe<Question>;
  };

  export type Question = QuestionFragment.Fragment;
}

export namespace RapiTips {
  export type Variables = {
    page: number;
  };

  export type Query = {
    __typename?: "Query";

    rapiTips: Maybe<RapiTips>;
  };

  export type RapiTips = {
    __typename?: "RapiTipPaginator";

    data: Data[];

    paginatorInfo: PaginatorInfo;
  };

  export type Data = RapiTipFragment.Fragment;

  export type PaginatorInfo = {
    __typename?: "PaginatorInfo";

    currentPage: number;

    hasMorePages: boolean;
  };
}

export namespace RapiTip {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    rapiTip: RapiTip;
  };

  export type RapiTip = RapiTipFragment.Fragment;
}

export namespace Result {
  export type Variables = {
    id: string;
    childId: string;
  };

  export type Query = {
    __typename?: "Query";

    result: Maybe<Result>;
  };

  export type Result = {
    __typename?: "Result";

    id: string;

    slug: string;

    percentage: number;

    info: Maybe<Info>;

    games: Maybe<Games>;

    suggestions: Maybe<Suggestions>;

    gaugeColor: Maybe<string>;

    gaugeCardColor: Maybe<string>;

    gaugeCardBackground: Maybe<string>;

    plan: Plan;

    area: Area;
  };

  export type Info = {
    __typename?: "ResultInfoCollection";

    data: Data[];
  };

  export type Data = {
    __typename?: "ResultInfo";

    display: string;
  };

  export type Games = {
    __typename?: "ResultGameCollection";

    data: _Data[];
  };

  export type _Data = {
    __typename?: "Game";

    id: string;

    title: string;

    body: string;

    materials: string;
  };

  export type Suggestions = {
    __typename?: "ResultSuggestionCollection";

    data: __Data[];
  };

  export type __Data = {
    __typename?: "Suggestion";

    id: string;

    title: string;

    body: string;
  };

  export type Plan = {
    __typename?: "Plan";

    id: string;

    child: Child;
  };

  export type Child = ChildFragment.Fragment;

  export type Area = {
    __typename?: "Area";

    id: string;

    name: string;

    slug: string;

    picture: string;
  };
}

export namespace Stages {
  export type Variables = {
    planId: string;
  };

  export type Query = {
    __typename?: "Query";

    stages: Maybe<Stages>;
  };

  export type Stages = {
    __typename?: "StageCollection";

    data: Data[];
  };

  export type Data = StageFragment.Fragment;
}

export namespace StagePage {
  export type Variables = {
    id: string;
    planId: string;
  };

  export type Query = {
    __typename?: "Query";

    stage: Maybe<Stage>;
  };

  export type Stage = {
    __typename?: "Stage";

    questions: Maybe<Questions>;
  } & StageFragment.Fragment;

  export type Questions = {
    __typename?: "StageQuestionCollection";

    data: Data[];
  };

  export type Data = QuestionFragment.Fragment;
}

export namespace StageWithProgress {
  export type Variables = {
    id: string;
    planId: string;
  };

  export type Query = {
    __typename?: "Query";

    stage: Maybe<Stage>;
  };

  export type Stage = StageFragment.Fragment;
}

export namespace Tos {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    tos: string;
  };
}

export namespace Signup {
  export type Variables = {
    input: SignupInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    signup: string;
  };
}

export namespace Signin {
  export type Variables = {
    input: SigninInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    signin: string;
  };
}

export namespace RegisterPushToken {
  export type Variables = {
    input: RegisterPushTokenInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    registerPushToken: RegisterPushToken;
  };

  export type RegisterPushToken = {
    __typename?: "PushToken";

    token: string;
  };
}

export namespace Me {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    me: Maybe<Me>;
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

    birthdate: DateTime;

    gender: string;

    picture: string;

    licensePrice: number;

    hasActiveLicense: Maybe<boolean>;

    nextPlanAt: Maybe<DateTime>;

    canCreatePlan: boolean;

    plansCompletedCount: number;
  };
}

export namespace PlanFragment {
  export type Fragment = {
    __typename?: "Plan";

    id: string;

    idx: number;

    completed: boolean;

    completedAt: Maybe<DateTime>;
  };
}

export namespace QuestionFragment {
  export type Fragment = {
    __typename?: "Question";

    id: string;

    display: string;

    idx: number;

    answered: boolean;

    answerOption: Maybe<AnswerOption>;
  };

  export type AnswerOption = {
    __typename?: "AnswerOption";

    id: string;
  };
}

export namespace RapiTipFragment {
  export type Fragment = {
    __typename?: "RapiTip";

    id: string;

    title: string;

    body: string;

    picture: string;
  };
}

export namespace StageFragment {
  export type Fragment = {
    __typename?: "Stage";

    id: string;

    slug: number;

    display: string;

    available: boolean;

    progress: number;

    unlocked: boolean;
  };
}

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Interfaces
// ====================================================

export interface Stockeable {
  id: string;

  display: string;

  picture?: Maybe<string>;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  ping?: Maybe<number>;

  tos: string;

  paymentMethods?: Maybe<PaymentMethodCollection>;

  child: Child;

  children?: Maybe<ChildCollection>;

  license?: Maybe<License>;

  currentPlan?: Maybe<Plan>;

  plan?: Maybe<Plan>;

  plans?: Maybe<PlanCollection>;

  pricesTypes?: Maybe<PricesTypeCollection>;

  answerOptions?: Maybe<AnswerOptionCollection>;

  areas?: Maybe<AreaCollection>;

  nextQuestion?: Maybe<Question>;

  question?: Maybe<Question>;

  questions?: Maybe<QuestionCollection>;

  rapiTip: RapiTip;

  rapiTips?: Maybe<RapiTipPaginator>;

  result?: Maybe<Result>;

  stage?: Maybe<Stage>;

  stages?: Maybe<StageCollection>;

  me?: Maybe<User>;

  promotionCode?: Maybe<PromotionCode>;

  promotionCodes?: Maybe<PromotionCodePaginator>;

  reservableStockList: ReservableStockList;
}

export interface PaymentMethodCollection {
  data: PaymentMethod[];
}

export interface PaymentMethod {
  id: string;

  slug: string;

  name: string;

  description: string;

  picture: string;

  charge: number;
}

export interface Child {
  id: string;

  name: string;

  birthdate: DateTime;

  gender: string;

  age: number;

  picture: string;

  user: User;

  licensePrice: number;

  hasActiveLicense?: Maybe<boolean>;

  history?: Maybe<string>;
  /** Plan activo */
  currentPlan?: Maybe<Plan>;
  /** Indica cuando podrá volver a crear un plan */
  nextPlanAt?: Maybe<DateTime>;
  /** Indica si puede crear un nuevo plan */
  canCreatePlan: boolean;
  /** Cantidad de planes completados */
  plansCompletedCount: number;
}

export interface User {
  id: string;

  name: string;

  picture: string;

  email: string;

  role: Role;

  roles?: Maybe<UserRoleCollection>;

  permissions?: Maybe<UserPermissionCollection>;

  children?: Maybe<UserChildCollection>;
}

export interface Role {
  id: string;

  name: string;

  guard?: Maybe<string>;
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

  guard?: Maybe<string>;
}

export interface UserChildCollection {
  data: Child[];
}

export interface Plan {
  id: string;

  idx: number;

  completed: boolean;

  completedAt?: Maybe<DateTime>;

  stages?: Maybe<PlanStageCollection>;

  child: Child;
}

export interface PlanStageCollection {
  data: Stage[];
}

export interface Stage {
  id: string;

  slug: number;

  display: string;
  /** Progreso de ésta etapa para un determinado niño */
  progress: number;
  /** Indica si esta etapa está disponible para un niño en particular, teniendo en cuenta si compró la licencia o no */
  available: boolean;

  questions?: Maybe<StageQuestionCollection>;
  /** Indica si esta etapa está desbloqueada, teniendo en cuenta si ya realizó la etapa anterior */
  unlocked: boolean;

  price: Price;
}

export interface StageQuestionCollection {
  data: Question[];
}

export interface Question {
  id: string;

  display: string;

  idx: number;

  answerOptions?: Maybe<QuestionAnswerOptionCollection>;

  stage: Stage;
  /** Indica si la pregunta ha sido respondida para un determinado niño */
  answered: boolean;
  /** Opción contestada para un determinado niño */
  answerOption?: Maybe<AnswerOption>;
}

export interface QuestionAnswerOptionCollection {
  data: AnswerOption[];
}

export interface AnswerOption {
  id: string;

  display: string;
}

export interface Price {
  id: string;

  price: number;

  start?: Maybe<string>;

  end?: Maybe<string>;

  perDay: boolean;

  total?: Maybe<number>;

  priceType: PriceType;
}

export interface PriceType {
  id: string;

  slug: string;

  name: string;

  default: boolean;
}

export interface ChildCollection {
  data: Child[];
}

export interface License {
  id: string;

  uuid: string;

  expiresAt: DateTime;
}

export interface PlanCollection {
  data: Plan[];
}

export interface PricesTypeCollection {
  data: PriceType[];
}

export interface AnswerOptionCollection {
  data: AnswerOption[];
}

export interface AreaCollection {
  data: Area[];
}

export interface Area {
  id: string;

  name: string;

  slug: string;

  picture: string;

  result?: Maybe<Result>;
}

export interface Result {
  id: string;

  percentage: number;

  slug: string;

  info?: Maybe<ResultInfoCollection>;

  games?: Maybe<ResultGameCollection>;

  suggestions?: Maybe<ResultSuggestionCollection>;

  gaugeColor?: Maybe<string>;

  gaugeCardColor?: Maybe<string>;

  gaugeCardBackground?: Maybe<string>;

  plan: Plan;

  area: Area;
}

export interface ResultInfoCollection {
  data: ResultInfo[];
}

export interface ResultInfo {
  display: string;
}

export interface ResultGameCollection {
  data: Game[];
}

export interface Game {
  id: string;

  title: string;

  body: string;

  materials: string;
}

export interface ResultSuggestionCollection {
  data: Suggestion[];
}

export interface Suggestion {
  id: string;

  title: string;

  body: string;
}

export interface QuestionCollection {
  data: Question[];
}

export interface RapiTip {
  id: string;

  title: string;

  body: string;

  picture: string;
}

export interface RapiTipPaginator {
  paginatorInfo: PaginatorInfo;

  data: RapiTip[];
}

export interface PaginatorInfo {
  /** Total count of available items in the page. */
  count: number;
  /** Current pagination page. */
  currentPage: number;
  /** Index of first item in the current page. */
  firstItem?: Maybe<number>;
  /** If collection has more pages. */
  hasMorePages: boolean;
  /** Index of last item in the current page. */
  lastItem?: Maybe<number>;
  /** Last page number of the collection. */
  lastPage: number;
  /** Number of items per page in the collection. */
  perPage: number;
  /** Total items available in the collection. */
  total: number;
}

export interface StageCollection {
  data: Stage[];
}

export interface PromotionCode {
  id: string;

  code: string;

  percentage: number;

  percentageDisplay: string;

  start: DateTime;

  end: DateTime;

  isValid?: Maybe<boolean>;

  stock: Stock;
}

export interface Stock {
  id: string;
  /** El stock en éste momento */
  currentStock: number;
  /** El stock que ha salido */
  stockHaveLeft: number;

  allowsNegative: boolean;
}

export interface PromotionCodePaginator {
  paginatorInfo: PaginatorInfo;

  data: PromotionCode[];
}

export interface ReservableStockList {
  id: string;

  slug: string;

  display: string;
  /** El ítem que tiene un `ReservableStock` */
  stockeable: Stockeable;

  stockeableType?: Maybe<string>;

  stockeableId?: Maybe<string>;

  stocks?: Maybe<ReservableStockListStockCollection>;
}

export interface ReservableStockListStockCollection {
  data: ReservableStock[];
}

export interface ReservableStock {
  id: string;
  /** El stock en un determinado momento */
  stock: number;

  allowsNegative: boolean;

  start: DateTime;

  end: DateTime;
  /** Indica si, de entre todos los stocks, este es el activo */
  isActive: boolean;
  /** Indica si, de entre todos los stocks, este es el `fallback` */
  isDefault: boolean;
}

export interface Mutation {
  pong?: Maybe<number>;

  payCheckoutWithMercadopago?: Maybe<Payment>;

  upsertChild: Child;

  purchaseLicense: License;

  createPlan: Plan;

  upsertPrice?: Maybe<Price>;

  deletePrice: boolean;

  usePromotionCode: License;

  answer: Answer;

  registerPushToken: PushToken;

  signin: string;

  signup: string;

  deletePromotionCode: boolean;

  upsertPromotionCode: PromotionCode;

  addStock?: Maybe<Stock>;

  deleteReservableStock: boolean;

  substractStock?: Maybe<Stock>;

  upsertReservableStock: ReservableStock;
}

export interface Payment {
  id: string;

  amount: number;

  description?: Maybe<string>;

  created_at: DateTime;

  comments?: Maybe<string>;

  paymentMethod: PaymentMethod;
}

export interface Answer {
  id: string;
}

export interface PushToken {
  id: string;

  user: User;

  token: string;
}

export interface Checkout {
  id: string;

  code: string;

  from: DateTime;

  status: Status;

  total: number;

  balance: number;

  details?: Maybe<CheckoutDetailCollection>;

  totalPaid: number;

  paymentMethod: PaymentMethod;

  payments?: Maybe<CheckoutPaymentCollection>;
}

export interface Status {
  id: string;

  slug: string;

  display: string;
}

export interface CheckoutDetailCollection {
  data: CheckoutDetail[];
}

export interface CheckoutDetail {
  id: string;

  description: string;

  price: number;
}

export interface CheckoutPaymentCollection {
  data: Payment[];
}

export interface CheckoutbalanceModelMethod {
  modelMethod?: Maybe<string>;
}

export interface CheckoutstatusModelMethod {
  modelMethod?: Maybe<string>;
}

export interface CheckouttotalModelMethod {
  modelMethod?: Maybe<string>;
}

export interface CheckouttotalPaidModelMethod {
  modelMethod?: Maybe<string>;
}

export interface PageInfo {
  /** When paginating forwards, are there more items? */
  hasNextPage: boolean;
  /** When paginating backwards, are there more items? */
  hasPreviousPage: boolean;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<string>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<string>;
  /** Total number of node in connection. */
  total?: Maybe<number>;
  /** Count of nodes in current request. */
  count?: Maybe<number>;
  /** Current page of request. */
  currentPage?: Maybe<number>;
  /** Last page in connection. */
  lastPage?: Maybe<number>;
}

export interface PaymentcommentsSchemalessAttribute {
  schemalessAttribute?: Maybe<string>;
}

export interface PromotionCodeisValidModelMethod {
  modelMethod?: Maybe<string>;
}

export interface QuestionidxSchemalessAttribute {
  schemalessAttribute?: Maybe<string>;
}

export interface ReservableStockisActiveModelMethod {
  modelMethod?: Maybe<string>;
}

export interface ReservableStockisDefaultModelMethod {
  modelMethod?: Maybe<string>;
}

export interface ResultType {
  id: string;

  name: string;

  slug: string;
}

export interface UserroleModelMethod {
  modelMethod?: Maybe<string>;
}

// ====================================================
// Arguments
// ====================================================

export interface ChildQueryArgs {
  id: string;
}
export interface LicenseQueryArgs {
  childId: string;
}
export interface CurrentPlanQueryArgs {
  childId: string;
}
export interface PlanQueryArgs {
  planId: string;
}
export interface PlansQueryArgs {
  childId: string;
}
export interface NextQuestionQueryArgs {
  stageId: string;

  planId: string;
}
export interface QuestionQueryArgs {
  id: string;

  childId: string;
}
export interface QuestionsQueryArgs {
  stageId: string;

  planId: string;
}
export interface RapiTipQueryArgs {
  id: string;
}
export interface RapiTipsQueryArgs {
  count?: number;

  page?: Maybe<number>;
}
export interface ResultQueryArgs {
  id: string;
}
export interface StageQueryArgs {
  id: string;
}
export interface StagesQueryArgs {
  planId?: Maybe<string>;
}
export interface PromotionCodeQueryArgs {
  id?: Maybe<string>;

  code?: Maybe<string>;
}
export interface PromotionCodesQueryArgs {
  code?: Maybe<string>;

  onlyActives?: Maybe<boolean>;

  status?: Maybe<string>;

  start?: Maybe<string>;

  end?: Maybe<string>;

  withoutTrashed?: boolean;

  count?: number;

  page?: Maybe<number>;
}
export interface ReservableStockListQueryArgs {
  slug?: Maybe<string>;

  stockeableType: string;

  stockeableId?: Maybe<string>;

  taxons?: Maybe<ReservableStockTaxonInput[]>;
}
export interface ProgressStageArgs {
  planId: string;
}
export interface AvailableStageArgs {
  planId: string;
}
export interface QuestionsStageArgs {
  planId: string;
}
export interface UnlockedStageArgs {
  planId: string;
}
export interface AnsweredQuestionArgs {
  planId: string;
}
export interface AnswerOptionQuestionArgs {
  planId: string;
}
export interface PictureAreaArgs {
  childId?: Maybe<string>;
}
export interface ResultAreaArgs {
  planId: string;

  stageId: string;
}
export interface PayCheckoutWithMercadopagoMutationArgs {
  input: PayCheckoutWithMercadopagoInput;
}
export interface UpsertChildMutationArgs {
  input: UpsertChildInput;
}
export interface PurchaseLicenseMutationArgs {
  input: PurchaseLicenseInput;
}
export interface CreatePlanMutationArgs {
  input: CreatePlanInput;
}
export interface UpsertPriceMutationArgs {
  input: UpsertPriceInput;
}
export interface DeletePriceMutationArgs {
  input: DeletePriceInput;
}
export interface UsePromotionCodeMutationArgs {
  input: UsePromotionCodeInput;
}
export interface AnswerMutationArgs {
  input?: Maybe<AnswerInput>;
}
export interface RegisterPushTokenMutationArgs {
  input: RegisterPushTokenInput;
}
export interface SigninMutationArgs {
  input?: Maybe<SigninInput>;
}
export interface SignupMutationArgs {
  input?: Maybe<SignupInput>;
}
export interface DeletePromotionCodeMutationArgs {
  input: DeletePromotionCodeInput;
}
export interface UpsertPromotionCodeMutationArgs {
  input?: Maybe<UpsertPromotionCodeInput>;
}
export interface AddStockMutationArgs {
  input?: Maybe<AddStockInput>;
}
export interface DeleteReservableStockMutationArgs {
  input: DeleteReservableStockInput;
}
export interface SubstractStockMutationArgs {
  input?: Maybe<SubstractStockInput>;
}
export interface UpsertReservableStockMutationArgs {
  input: UpsertReservableStockInput;
}
export interface ModelMethodCheckoutbalanceModelMethodArgs {
  model?: Maybe<string>;

  method: string;

  passArgs?: boolean;
}
export interface ModelMethodCheckoutstatusModelMethodArgs {
  model?: Maybe<string>;

  method: string;

  passArgs?: boolean;
}
export interface ModelMethodCheckouttotalModelMethodArgs {
  model?: Maybe<string>;

  method: string;

  passArgs?: boolean;
}
export interface ModelMethodCheckouttotalPaidModelMethodArgs {
  model?: Maybe<string>;

  method: string;

  passArgs?: boolean;
}
export interface SchemalessAttributePaymentcommentsSchemalessAttributeArgs {
  select: string;
}
export interface ModelMethodPromotionCodeisValidModelMethodArgs {
  model?: Maybe<string>;

  method: string;

  passArgs?: boolean;
}
export interface SchemalessAttributeQuestionidxSchemalessAttributeArgs {
  select: string;
}
export interface ModelMethodReservableStockisActiveModelMethodArgs {
  model?: Maybe<string>;

  method: string;

  passArgs?: boolean;
}
export interface ModelMethodReservableStockisDefaultModelMethodArgs {
  model?: Maybe<string>;

  method: string;

  passArgs?: boolean;
}
export interface ModelMethodUserroleModelMethodArgs {
  model?: Maybe<string>;

  method: string;

  passArgs?: boolean;
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// GraphQL Fragments
// ====================================================

export const ChildFragmentFragment = gql`
  fragment ChildFragment on Child {
    id
    name
    age
    birthdate
    gender
    picture
    licensePrice
    hasActiveLicense
    nextPlanAt
    canCreatePlan
    plansCompletedCount
  }
`;

export const PlanFragmentFragment = gql`
  fragment PlanFragment on Plan {
    id
    idx
    completed
    completedAt
  }
`;

export const QuestionFragmentFragment = gql`
  fragment QuestionFragment on Question {
    id
    display
    idx
    answered(planId: $planId)
    answerOption(planId: $planId) {
      id
    }
  }
`;

export const RapiTipFragmentFragment = gql`
  fragment RapiTipFragment on RapiTip {
    id
    title
    body
    picture
  }
`;

export const StageFragmentFragment = gql`
  fragment StageFragment on Stage {
    id
    slug
    display
    available(planId: $planId)
    progress(planId: $planId)
    unlocked(planId: $planId)
  }
`;

// ====================================================
// Apollo Services
// ====================================================

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
export class PayCheckoutWithMercadopagoGQL extends Apollo.Mutation<
  PayCheckoutWithMercadopago.Mutation,
  PayCheckoutWithMercadopago.Variables
> {
  document: any = gql`
    mutation PayCheckoutWithMercadopago(
      $input: PayCheckoutWithMercadopagoInput!
    ) {
      payCheckoutWithMercadopago(input: $input) {
        id
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
        birthdate
        gender
        picture
        currentPlan {
          ...PlanFragment
        }
      }
    }

    ${PlanFragmentFragment}
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
          currentPlan {
            ...PlanFragment
          }
        }
      }
    }

    ${ChildFragmentFragment}
    ${PlanFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class ChildGQL extends Apollo.Query<Child.Query, Child.Variables> {
  document: any = gql`
    query Child($childId: ID!) {
      child(id: $childId) {
        ...ChildFragment
        currentPlan {
          ...PlanFragment
        }
      }
    }

    ${ChildFragmentFragment}
    ${PlanFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class ChildWithHistoryGQL extends Apollo.Query<
  ChildWithHistory.Query,
  ChildWithHistory.Variables
> {
  document: any = gql`
    query ChildWithHistory($id: ID!) {
      child(id: $id) {
        ...ChildFragment
        history
      }
    }

    ${ChildFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class PurchaseLicenseGQL extends Apollo.Mutation<
  PurchaseLicense.Mutation,
  PurchaseLicense.Variables
> {
  document: any = gql`
    mutation PurchaseLicense($input: PurchaseLicenseInput!) {
      purchaseLicense(input: $input) {
        uuid
        expiresAt
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class UsePromotionCodeGQL extends Apollo.Mutation<
  UsePromotionCode.Mutation,
  UsePromotionCode.Variables
> {
  document: any = gql`
    mutation UsePromotionCode($input: UsePromotionCodeInput!) {
      usePromotionCode(input: $input) {
        uuid
        expiresAt
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class LicenseGQL extends Apollo.Query<License.Query, License.Variables> {
  document: any = gql`
    query License($childId: ID!) {
      license(childId: $childId) {
        uuid
        expiresAt
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CreatePlanGQL extends Apollo.Mutation<
  CreatePlan.Mutation,
  CreatePlan.Variables
> {
  document: any = gql`
    mutation CreatePlan($input: CreatePlanInput!) {
      createPlan(input: $input) {
        ...PlanFragment
      }
    }

    ${PlanFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class PlanGQL extends Apollo.Query<Plan.Query, Plan.Variables> {
  document: any = gql`
    query Plan($planId: ID!) {
      plan(planId: $planId) {
        ...PlanFragment
        stages {
          data {
            ...StageFragment
          }
        }
        child {
          ...ChildFragment
        }
      }
    }

    ${PlanFragmentFragment}
    ${StageFragmentFragment}
    ${ChildFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class PlansGQL extends Apollo.Query<Plans.Query, Plans.Variables> {
  document: any = gql`
    query Plans($childId: ID!) {
      plans(childId: $childId) {
        data {
          ...PlanFragment
        }
      }
    }

    ${PlanFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class AreasWithResultGQL extends Apollo.Query<
  AreasWithResult.Query,
  AreasWithResult.Variables
> {
  document: any = gql`
    query AreasWithResult($childId: ID!, $planId: ID!, $stageId: ID!) {
      areas {
        data {
          id
          name
          slug
          picture(childId: $childId)
          result(planId: $planId, stageId: $stageId) {
            id
            slug
            percentage
            gaugeColor
            gaugeCardColor
            gaugeCardBackground
          }
        }
      }
    }
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
    query NextQuestion($stageId: ID!, $planId: ID!) {
      nextQuestion(stageId: $stageId, planId: $planId) {
        ...QuestionFragment
      }
    }

    ${QuestionFragmentFragment}
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
    query Questions($stageId: ID!, $planId: ID!) {
      questions(stageId: $stageId, planId: $planId) {
        data {
          ...QuestionFragment
        }
      }
    }

    ${QuestionFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class QuestionGQL extends Apollo.Query<
  Question.Query,
  Question.Variables
> {
  document: any = gql`
    query Question($id: ID!, $childId: ID!, $planId: ID!) {
      question(id: $id, childId: $childId) {
        ...QuestionFragment
      }
    }

    ${QuestionFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class RapiTipsGQL extends Apollo.Query<
  RapiTips.Query,
  RapiTips.Variables
> {
  document: any = gql`
    query RapiTips($page: Int!) {
      rapiTips(page: $page) {
        data {
          ...RapiTipFragment
        }
        paginatorInfo {
          currentPage
          hasMorePages
        }
      }
    }

    ${RapiTipFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class RapiTipGQL extends Apollo.Query<RapiTip.Query, RapiTip.Variables> {
  document: any = gql`
    query RapiTip($id: ID!) {
      rapiTip(id: $id) {
        ...RapiTipFragment
      }
    }

    ${RapiTipFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class ResultGQL extends Apollo.Query<Result.Query, Result.Variables> {
  document: any = gql`
    query Result($id: ID!, $childId: ID!) {
      result(id: $id) {
        id
        slug
        percentage
        info {
          data {
            display
          }
        }
        games {
          data {
            id
            title
            body
            materials
          }
        }
        suggestions {
          data {
            id
            title
            body
          }
        }
        gaugeColor
        gaugeCardColor
        gaugeCardBackground
        plan {
          id
          child {
            ...ChildFragment
          }
        }
        area {
          id
          name
          slug
          picture(childId: $childId)
        }
      }
    }

    ${ChildFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class StagesGQL extends Apollo.Query<Stages.Query, Stages.Variables> {
  document: any = gql`
    query Stages($planId: ID!) {
      stages(planId: $planId) {
        data {
          ...StageFragment
        }
      }
    }

    ${StageFragmentFragment}
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
    query StagePage($id: ID!, $planId: ID!) {
      stage(id: $id) {
        ...StageFragment
        questions(planId: $planId) {
          data {
            ...QuestionFragment
          }
        }
      }
    }

    ${StageFragmentFragment}
    ${QuestionFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class StageWithProgressGQL extends Apollo.Query<
  StageWithProgress.Query,
  StageWithProgress.Variables
> {
  document: any = gql`
    query StageWithProgress($id: ID!, $planId: ID!) {
      stage(id: $id) {
        ...StageFragment
      }
    }

    ${StageFragmentFragment}
  `;
}
@Injectable({
  providedIn: "root"
})
export class TosGQL extends Apollo.Query<Tos.Query, Tos.Variables> {
  document: any = gql`
    query Tos {
      tos
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class SignupGQL extends Apollo.Mutation<
  Signup.Mutation,
  Signup.Variables
> {
  document: any = gql`
    mutation Signup($input: SignupInput!) {
      signup(input: $input)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class SigninGQL extends Apollo.Mutation<
  Signin.Mutation,
  Signin.Variables
> {
  document: any = gql`
    mutation Signin($input: SigninInput!) {
      signin(input: $input)
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class RegisterPushTokenGQL extends Apollo.Mutation<
  RegisterPushToken.Mutation,
  RegisterPushToken.Variables
> {
  document: any = gql`
    mutation RegisterPushToken($input: RegisterPushTokenInput!) {
      registerPushToken(input: $input) {
        token
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

// ====================================================
// END: Apollo Angular template
// ====================================================

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: "INTERFACE",
        name: "Stockeable",
        possibleTypes: []
      }
    ]
  }
};

export default result;
