//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";
import Tile from "../bricks/participant/tile";
import ListProvider from "../bricks/participant/list-provider";
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

let Participant = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Participant",
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
          {({ participantList }) =>
            participantList.map((participant) => (
              <Tile
                key={participant.id}
                participant={participant}

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

Participant = withRoute(Participant, { authenticated: true });

//@@viewOn:exports
export { Participant };
export default Participant;
//@@viewOff:exports
