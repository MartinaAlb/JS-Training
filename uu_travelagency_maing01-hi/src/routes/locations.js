//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";
import Tile from "../bricks/location/tile";
import ListProvider from "../bricks/location/list-provider";

import Config from "./config/config.js";
import WelcomeRow from "../bricks/welcome-row.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  icon: () =>
    Config.Css.css({
      fontSize: 48,
      lineHeight: "1em",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Location = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Location",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps


  render() {
    //@@viewOn:render
    return (
      <>
        <ListProvider>
          {({ locationList }) =>
            locationList.map((location) => (
              <Tile
                key={location.id}
                location={location}

                style={{ width: 320, margin: "40px auto", padding: "10px" }}
              />
            ))
          }
        </ListProvider>
      </>
    );
    //@@viewOff:render
  },
});

Location = withRoute(Location, { authenticated: true });

//@@viewOn:exports
export { Location };
export default Location;
//@@viewOff:exports
