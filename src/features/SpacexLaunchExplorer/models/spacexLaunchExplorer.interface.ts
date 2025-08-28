export interface ILaunch {
  fairings: ILaunchFairings | null;
  links: ILaunchLinks;
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean | null;
  failures: ILaunchFailure[];
  details: string | null;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: "half" | "quarter" | "year" | "month" | "day" | "hour";
  upcoming: boolean;
  cores: ILaunchCore[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
  id: string;
}

export interface ILaunchFairings {
  reused: boolean | null;
  recovery_attempt: boolean | null;
  recovered: boolean | null;
  ships: string[];
}

export interface ILaunchLinks {
  patch: {
    small: string | null;
    large: string | null;
  };
  reddit: {
    campaign: string | null;
    launch: string | null;
    media: string | null;
    recovery: string | null;
  };
  flickr: {
    small: string[];
    original: string[];
  };
  presskit: string | null;
  webcast: string | null;
  youtube_id: string | null;
  article: string | null;
  wikipedia: string | null;
}

export interface ILaunchFailure {
  time: number;
  altitude: number | null;
  reason: string;
}

export interface ILaunchCore {
  core: string | null;
  flight: number | null;
  gridfins: boolean | null;
  legs: boolean | null;
  reused: boolean | null;
  landing_attempt: boolean | null;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
}



export interface ILaunchPad {
  images: ILaunchpadImages;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];     // references to rocket IDs
  timezone: string;
  launches: string[];    // references to launch IDs
  status: "active" | "retired" | "under construction" | "inactive"; 
  details: string | null;
  id: string;
}

export interface ILaunchpadImages {
  large: string[];
}
