//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import LocationListProvider from "./list-provider";
import ListView from "./list-view";
import Config from "./config/config";
//@@viewOff:imports

export const List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return (
      <LocationListProvider>
        {({ locationDataList, filterList, sorterList }) => (
              <ListView locationDataList={locationDataList}/>
        )}
      </LocationListProvider>
    );
    //@@viewOff:render
  },
});

export default List;

