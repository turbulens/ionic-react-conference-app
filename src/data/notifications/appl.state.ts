import { Location } from '../../models/Location';
import { Asset } from '../../models/Asset';
import { Planification, Notification } from '../../models/Planification';
export interface ApplState {
  planification: Planification;
  notifications: Notification[];
  assets: Asset[];
  favoris: number[];
  locations: Location[];
  filteredTags: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTags: string[];
  menuEnabled: boolean;
}
