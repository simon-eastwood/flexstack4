import { Model } from "flexlayout-react";

export enum ModelLocation {
    top, centre, left, right
}

export interface TopModel {
  model: Model,
  nrOfTabSets: Map<ModelLocation, number>
}

export const  MAXTABSETS = 4;

