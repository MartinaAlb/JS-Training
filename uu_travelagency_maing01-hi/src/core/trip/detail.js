//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";
import Config from "./config/config";
import TripProvider from "./trip-provider";
import LocationListProvider from "../location/list-provider";
import DetailView from "./detail-view";
//@@viewOff:imports

export const Detail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Detail",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    tripId: PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return (
      <TripProvider tripId={props.tripId}>
        {(tripDataObject) => (
          <LocationListProvider>
            {(locationDataList) => <DetailView tripDataObject={tripDataObject} locationDataList={locationDataList} />}
          </LocationListProvider>
        )}
      </TripProvider>
    );
    //@@viewOff:render
  },
});

export default Detail;
