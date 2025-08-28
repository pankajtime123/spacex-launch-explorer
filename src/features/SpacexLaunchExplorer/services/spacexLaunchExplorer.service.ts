import { ApiClient } from '../../../apiClient/ApiWrapper'; // Use the existing ApiClient
import { ApiResponse } from '../../../apiClient/BaseHttpClient';
import { ILaunch, ILaunchPad } from '../models/spacexLaunchExplorer.interface';


export const getLaunches = async (limit: number, offset: number): Promise<ApiResponse<ILaunch[]>> => {
  return ApiClient.get<ILaunch[]>('/v5/launches', { params: { limit, offset } });
};

export const getLaunchpad = async (id: string): Promise<ApiResponse<ILaunchPad>> => {
  return ApiClient.get<ILaunchPad>(`/v4/launchpads/${id}`);
};
