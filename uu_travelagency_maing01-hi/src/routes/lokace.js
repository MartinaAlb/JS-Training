//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Tile from "../bricks/lokace/tile";
import ListProvider from "../bricks/lokace/list-provider";
import Config from "./config/config.js";

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

let Lokace = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Lokace",
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
          {({ lokaceList }) =>
            lokaceList.map((lokace) => (
              <Tile
                key={lokace.id}
                lokace={lokace}
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

Lokace = withRoute(Lokace, { authenticated: true });

//@@viewOn:exports
export { Lokace };
export default Lokace;
//@@viewOff:exports
