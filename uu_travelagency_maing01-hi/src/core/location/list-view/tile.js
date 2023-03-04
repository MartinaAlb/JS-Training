//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, Utils, useEffect } from "uu5g05";
import Uu5Elements, { Pending, Text } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  content: () =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      height: "100%",
    }),
  text: (parent) =>
    Config.Css.css({
      display: "block",
      marginLeft: parent.padding.left,
      marginRight: parent.padding.right,
      marginBottom: parent.padding.bottom,
      marginTop: parent.padding.top,
    }),


};
//@@viewOff:css

export const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data: locationDataObject } = props;


    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);
    const location = locationDataObject.data;

    return (
      <Uu5Elements.Tile
        {...elementProps}
        header={<Header location={location} />}
        footer={<Footer location={location} />}
        footerSignificance="distinct"
        significance="subdued"
        borderRadius="elementary"
      >
        {(tile) => (
          <div className={Css.content()}>

              <Text
                category="interface"
                segment="content"
                type="medium"
                colorScheme="building"
                className={Css.text(tile)}
              >
                {location.country}
                {location.adress}
                {location.city}
              </Text>

          </div>
        )}
      </Uu5Elements.Tile>
    );
    //@@viewOff:render
  },
});

function Header({ location }) {
  return (
    <Text category="interface" segment="title" type="micro" colorScheme="building">
      {location.name}
    </Text>
  );
}

function Footer({ location }) {
  return (
    <Text category="interface" segment="title" type="micro" colorScheme="building">
      {location.phoneNumber}
    </Text>
  );
}

export default Tile;
