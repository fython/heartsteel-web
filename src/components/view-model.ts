export interface ChargingProgressDotState {
  no: number;
  status: ChargingProgressDotStatus;
  final: boolean;
}

export enum ChargingProgressDotStatus {
  DEACTIVATED = 0,
  ACTIVATED = 1,
}
