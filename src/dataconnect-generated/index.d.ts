import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateReviewData {
  review_insert: Review_Key;
}

export interface CreateReviewVariables {
  restaurantId: UUIDString;
  rating: number;
  comment?: string | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  displayName: string;
  email: string;
}

export interface Friendship_Key {
  user1Id: UUIDString;
  user2Id: UUIDString;
  __typename?: 'Friendship_Key';
}

export interface GetRestaurantData {
  restaurant?: {
    id: UUIDString;
    name: string;
    address: string;
    cuisineType: string;
    averageRating?: number | null;
    description?: string | null;
    imageUrl?: string | null;
    phoneNumber?: string | null;
    website?: string | null;
  } & Restaurant_Key;
}

export interface GetRestaurantVariables {
  id: UUIDString;
}

export interface ListRestaurantsData {
  restaurants: ({
    id: UUIDString;
    name: string;
    address: string;
    cuisineType: string;
    averageRating?: number | null;
    description?: string | null;
    imageUrl?: string | null;
    phoneNumber?: string | null;
    website?: string | null;
  } & Restaurant_Key)[];
}

export interface ReservationGuest_Key {
  reservationId: UUIDString;
  guestId: UUIDString;
  __typename?: 'ReservationGuest_Key';
}

export interface Reservation_Key {
  id: UUIDString;
  __typename?: 'Reservation_Key';
}

export interface Restaurant_Key {
  id: UUIDString;
  __typename?: 'Restaurant_Key';
}

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetRestaurantRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRestaurantVariables): QueryRef<GetRestaurantData, GetRestaurantVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetRestaurantVariables): QueryRef<GetRestaurantData, GetRestaurantVariables>;
  operationName: string;
}
export const getRestaurantRef: GetRestaurantRef;

export function getRestaurant(vars: GetRestaurantVariables): QueryPromise<GetRestaurantData, GetRestaurantVariables>;
export function getRestaurant(dc: DataConnect, vars: GetRestaurantVariables): QueryPromise<GetRestaurantData, GetRestaurantVariables>;

interface CreateReviewRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateReviewVariables): MutationRef<CreateReviewData, CreateReviewVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateReviewVariables): MutationRef<CreateReviewData, CreateReviewVariables>;
  operationName: string;
}
export const createReviewRef: CreateReviewRef;

export function createReview(vars: CreateReviewVariables): MutationPromise<CreateReviewData, CreateReviewVariables>;
export function createReview(dc: DataConnect, vars: CreateReviewVariables): MutationPromise<CreateReviewData, CreateReviewVariables>;

interface ListRestaurantsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListRestaurantsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListRestaurantsData, undefined>;
  operationName: string;
}
export const listRestaurantsRef: ListRestaurantsRef;

export function listRestaurants(): QueryPromise<ListRestaurantsData, undefined>;
export function listRestaurants(dc: DataConnect): QueryPromise<ListRestaurantsData, undefined>;

