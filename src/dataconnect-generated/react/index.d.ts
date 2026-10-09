import { CreateUserData, CreateUserVariables, GetRestaurantData, GetRestaurantVariables, CreateReviewData, CreateReviewVariables, ListRestaurantsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useGetRestaurant(vars: GetRestaurantVariables, options?: useDataConnectQueryOptions<GetRestaurantData>): UseDataConnectQueryResult<GetRestaurantData, GetRestaurantVariables>;
export function useGetRestaurant(dc: DataConnect, vars: GetRestaurantVariables, options?: useDataConnectQueryOptions<GetRestaurantData>): UseDataConnectQueryResult<GetRestaurantData, GetRestaurantVariables>;

export function useCreateReview(options?: useDataConnectMutationOptions<CreateReviewData, FirebaseError, CreateReviewVariables>): UseDataConnectMutationResult<CreateReviewData, CreateReviewVariables>;
export function useCreateReview(dc: DataConnect, options?: useDataConnectMutationOptions<CreateReviewData, FirebaseError, CreateReviewVariables>): UseDataConnectMutationResult<CreateReviewData, CreateReviewVariables>;

export function useListRestaurants(options?: useDataConnectQueryOptions<ListRestaurantsData>): UseDataConnectQueryResult<ListRestaurantsData, undefined>;
export function useListRestaurants(dc: DataConnect, options?: useDataConnectQueryOptions<ListRestaurantsData>): UseDataConnectQueryResult<ListRestaurantsData, undefined>;
