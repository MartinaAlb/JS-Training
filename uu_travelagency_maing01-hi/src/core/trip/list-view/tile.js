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
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    tripsPermissions: PropTypes.object,
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

    function handleUpdate(event) {
      event.stopPropagation();
      props.onUpdate(tripDataObject);
    }

    function handleDelete(event) {
      event.stopPropagation();
      props.onDelete(tripDataObject);
    }

    function getItemActions() {
      const actionList = [];

      if (props.tripsPermissions.trip.canManage) {
        actionList.push({
          icon: "mdi-pencil",
          onClick: handleUpdate,
          //disabled: actionsDisabled,
        });

        actionList.push({
          icon: "mdi-delete",
          onClick: handleDelete,
          //disabled: actionsDisabled,
        });
      }

      return actionList;
    }
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
        onClick={handleDetail}
        significance="subdued"
        borderRadius="elementary"
        actionList={getItemActions()}
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
                {trip.text}
              </Text>

            {trip.imageUrl && <img src={trip.imageUrl} alt={trip.name} className={Css.image()} />}
            {trip.image && !trip.imageUrl && <Pending size="m" />}
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
      {trip.name}
    </Text>
  );
}

function Footer({ trip }) {
  return (
    <Text category="interface" segment="title" type="micro" colorScheme="building">
      Price per person: {trip.pricePerPerson} CZK
    </Text>

  );
}

export default Tile;
