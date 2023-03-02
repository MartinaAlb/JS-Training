//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, Utils, useEffect, PropTypes } from "uu5g05";
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

  image: () => Config.Css.css({ width: "100%" }),
};
//@@viewOff:css

export const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onDetail: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data: tripDataObject } = props;

    useEffect(() => {
      if (
        tripDataObject.data.image &&
        !tripDataObject.data.imageUrl &&
        tripDataObject.state === "ready" &&
        tripDataObject.handlerMap?.getImage
      ) {
        tripDataObject.handlerMap
          .getImage(tripDataObject.data)
          .catch((error) => Tile.logger.error("Error loading image", error));
      }
    }, [tripDataObject]);

    const handleDetail = () => {
      props.onDetail(tripDataObject.data);
    };
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);
    const trip = tripDataObject.data;

    return (
      <Uu5Elements.Tile
        {...elementProps}
        header={<Header trip={trip} />}
        footer={<Footer trip={trip} />}
        footerSignificance="distinct"
        significance="subdued"
        borderRadius="elementary"
      >
        {(tile) => (
          <div className={Css.content()} onClick={handleDetail}>
            {trip.text && !trip.image && (
              <Text
                category="interface"
                segment="content"
                type="medium"
                colorScheme="building"
                className={Css.text(tile)}
              >
                {trip.text}
              </Text>
            )}
            {trip.imageUrl && <img src={trip.imageUrl} alt={trip.name} className={Css.image()} />}
            {trip.image && !trip.imageUrl && <Pending size="xl" />}
          </div>
        )}
      </Uu5Elements.Tile>
    );
    //@@viewOff:render
  },
});

function Header({ trip }) {
  return (
    <Text category="interface" segment="title" type="micro" colorScheme="building">
      {[trip.name, trip.text]}
    </Text>
  );
}

function Footer({ trip }) {
  return (
    <Text category="interface" segment="title" type="micro" colorScheme="building">
      {[trip.departureDate, trip.pricePerPerson]}
    </Text>
  );
}

export default Tile;
