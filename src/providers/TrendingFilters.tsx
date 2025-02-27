import qs from "qs";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { TrendingFilterType } from "../components/TrendingFilters";
import { useQuery } from "react-query";
export interface TrendingFilters {
  type: TrendingFilterType;
  region: string | null;
}

const initialState: TrendingFilters = {
  type: "music",
  region: null,
};

const TrendingFiltersValuesContext =
  createContext<TrendingFilters>(initialState);
const SetTrendingFiltersValuesContext = createContext<any>(null);

interface ProviderProps {
  children: React.ReactNode;
}

const getInitialParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    type: (urlParams.get("type") as TrendingFilterType) ?? initialState.type,
    region: (urlParams.get("region") as string) ?? initialState.region,
  };
};

const getCountryCode = async () => {
  const request = await fetch(
    `${process.env.REACT_APP_API_URL}/api/countryCode`
  );
  return request.json();
};

interface GeoLocation {
  city: string;
  country: string;
  countryRegion: string;
  region: string;
}

export const TrendingFiltersProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const [value, setValue] = useState<TrendingFilters>(getInitialParams());
  const navigate = useNavigate();

  useQuery("country-code", () => getCountryCode(), {
    enabled: !value.region,
    onSuccess: (data: GeoLocation) => {
      setValue((previousState) => ({
        ...previousState,
        region: data.country,
      }));
    },
  });

  const handleSetValue = useCallback(
    (updatedValues: TrendingFilters) => {
      setValue(updatedValues);
      navigate(`/trending?${qs.stringify(updatedValues)}`);
    },
    [navigate]
  );

  const params = useMemo(
    () => ({
      value,
      setValue: handleSetValue,
    }),
    [value, handleSetValue]
  );

  return (
    <TrendingFiltersValuesContext.Provider value={params.value}>
      <SetTrendingFiltersValuesContext.Provider value={params.setValue}>
        {children}
      </SetTrendingFiltersValuesContext.Provider>
    </TrendingFiltersValuesContext.Provider>
  );
};

export const useTrendingFiltersValues = () =>
  useContext(TrendingFiltersValuesContext);
export const useSetTrendingFiltersValues = () =>
  useContext(SetTrendingFiltersValuesContext);
export const useTrendingUrl = () => {
  const params = useTrendingFiltersValues();
  return `/trending?${qs.stringify(params)}`;
};
